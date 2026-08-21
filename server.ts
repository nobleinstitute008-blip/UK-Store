import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client (Server-side only)
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured in process.env');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // ------------------------------------------------------------------
  // API ROUTES
  // ------------------------------------------------------------------

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'VoltSure UK Electrical & Gas Platform',
      timestamp: new Date().toISOString(),
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // AI Fault Diagnostics & Instant Estimate
  app.post('/api/ai/diagnose', async (req, res) => {
    try {
      const { description, imageUrl, category, propertyType } = req.body;

      if (!description && !imageUrl) {
        return res.status(400).json({ error: 'Please provide a fault description or image.' });
      }

      const ai = getAi();
      const promptText = `You are a Senior UK Certified Master Electrician (NICEIC Approved) and Gas Safe Registered Heating Engineer Inspector in the United Kingdom.
Analyze the following user reported fault or inquiry in the context of UK Building Regulations (Part P, BS 7671 18th Edition Amendment 2, Gas Safety Installation and Use Regulations 1998).

Category context: ${category || 'General UK Electrical/Gas Fault'}
Property Type: ${propertyType || 'Residential UK Property'}
Fault Description: "${description || 'Image provided'}"

Analyze this issue and respond ONLY with a strict valid JSON object matching this structure (no markdown formatting, no code fences):
{
  "issueTitle": "Concise technical title (e.g., RCD Tripping on Consumer Unit, Boiler F22 Low Water Pressure Fault)",
  "severity": "emergency" | "high" | "moderate" | "low",
  "category": "Electrical" | "Gas & Heating" | "Plumbing & Gas",
  "probableCause": "Detailed technical explanation of what is likely causing this issue based on UK standards.",
  "safetyWarning": "CRITICAL immediate safety advice for the UK homeowner (e.g. Do not touch exposed conductors, isolate main switch, turn off gas lever at meter).",
  "estimatedCostMin": number (in GBP £, realistic UK trade rate),
  "estimatedCostMax": number (in GBP £, realistic UK trade rate),
  "estimatedDurationMinutes": number (e.g. 60, 120, 240),
  "recommendedCertification": "Gas Safe Registered Engineer" | "NICEIC / NAPIT Certified Electrician" | "Dual Gas & Electrical Specialist",
  "recommendedActionSteps": [
    "Step 1 safety step",
    "Step 2 diagnostic step",
    "Step 3 professional repair step"
  ],
  "urgencyBadge": "EMERGENCY 30-MIN DISPATCH" | "SAME DAY REQUIRED" | "SCHEDULED INSPECTION",
  "ukStandardReference": "e.g., BS 7671 Reg 411.3.3 / Gas Safety Reg 26"
}`;

      let resultText = '';

      if (imageUrl && imageUrl.startsWith('data:image/')) {
        // Multi-modal request with image
        const matches = imageUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const base64Data = matches[2];

          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: {
              parts: [
                { inlineData: { mimeType, data: base64Data } },
                { text: promptText },
              ],
            },
          });
          resultText = response.text || '';
        } else {
          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: promptText,
          });
          resultText = response.text || '';
        }
      } else {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: promptText,
        });
        resultText = response.text || '';
      }

      // Clean string if code fence exists
      let cleanedJson = resultText.trim();
      if (cleanedJson.startsWith('```json')) {
        cleanedJson = cleanedJson.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (cleanedJson.startsWith('```')) {
        cleanedJson = cleanedJson.replace(/^```/, '').replace(/```$/, '').trim();
      }

      try {
        const parsedData = JSON.parse(cleanedJson);
        return res.json({ success: true, diagnosis: parsedData });
      } catch (parseErr) {
        console.error('Failed to parse Gemini JSON output:', resultText);
        // Fallback structured diagnosis if raw text couldn't parse
        return res.json({
          success: true,
          diagnosis: {
            issueTitle: category === 'Gas' ? 'Gas System Fault / Pressure Warning' : 'Electrical Circuit Tripping / Inspection Required',
            severity: description?.toLowerCase().includes('gas') || description?.toLowerCase().includes('smell') ? 'emergency' : 'high',
            category: category || 'Electrical',
            probableCause: description || 'Visual fault reported on home installation.',
            safetyWarning: 'If you smell gas, turn off gas supply at meter and open windows. If fuse box is smoking, isolate main switch immediately.',
            estimatedCostMin: 95,
            estimatedCostMax: 185,
            estimatedDurationMinutes: 90,
            recommendedCertification: category === 'Gas' ? 'Gas Safe Registered Engineer' : 'NICEIC / NAPIT Certified Electrician',
            recommendedActionSteps: [
              'Perform visual inspection of installation',
              'Isolate faulty circuit or gas valve',
              'Dispatch certified engineer for diagnostic testing'
            ],
            urgencyBadge: 'SAME DAY REQUIRED',
            ukStandardReference: 'BS 7671 18th Edition & Gas Safety Regs'
          }
        });
      }
    } catch (error: any) {
      console.error('Error in /api/ai/diagnose:', error);
      res.status(500).json({
        error: error.message || 'Failed to complete AI diagnostic assessment.',
      });
    }
  });

  // AI Advisory Chatbot / Voice Assistant Helper
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
      }

      const ai = getAi();
      const systemInstruction = `You are "VoltBot AI", the chief technical virtual assistant for VoltSure UK - the premier UK platform for NICEIC electricians and Gas Safe registered engineers.
You assist UK homeowners, landlords, estate agents, and commercial property managers.
Provide knowledgeable, reassuring, professional advice regarding:
- UK Electrical safety (EICR landlord certificates, fuse board upgrades, 18th edition regulations BS 7671, PAT testing, EV chargers).
- UK Gas safety (Gas Safe CP12 landlord certificates, boiler servicing for Worcester Bosch, Vaillant, Ideal, Baxi, combi boiler fault codes like F22, F75, E119, radiator power flushing).
- Emergency safety advice (smelling gas, water leaking into light fittings, buzzing consumer units).
- Pricing transparency in GBP £ (mentioning standard 20% UK VAT).

Keep responses helpful, structured, concise (2-4 paragraphs max), and politely suggest booking a certified VoltSure engineer when appropriate.`;

      const formattedContents = history && Array.isArray(history) && history.length > 0
        ? [...history.map(item => `${item.role === 'user' ? 'Customer' : 'VoltBot'}: ${item.content}`), `Customer: ${message}`].join('\n')
        : message;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });

      res.json({ success: true, reply: response.text });
    } catch (error: any) {
      console.error('Error in /api/ai/chat:', error);
      res.status(500).json({ error: error.message || 'Failed to generate AI response.' });
    }
  });

  // ------------------------------------------------------------------
  // VITE OR STATIC SERVING
  // ------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VoltSure UK Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
