import { GoogleGenAI, Type } from '@google/genai';
import { PredictionResponse } from '../types';

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey, vertexai: true });

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
You are an expert NFL analyst and Super Bowl prediction engine. 
Your task is to analyze a hypothetical or current season matchup between the New England Patriots and the Seattle Seahawks.
Use your knowledge of team rosters, historical trends, coaching styles, and statistical profiles to generate a realistic prediction.
Assume a neutral venue (Super Bowl).
`;

export const fetchMatchupAnalysis = async (): Promise<PredictionResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        role: 'user',
        parts: [{
          text: `Analyze the Super Bowl matchup: Patriots vs Seahawks.
          
          ANALYZE:
          - Current/Recent season stats (offense/defense rankings, scoring)
          - Recent performance trends
          - Head-to-head history
          - Key player stats
          - Weather (assume dome or standard Super Bowl conditions)
          
          PROVIDE JSON output matching the schema.`
        }]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patriotsWinProbability: { type: Type.NUMBER, description: "Percentage 0-100" },
            seahawksWinProbability: { type: Type.NUMBER, description: "Percentage 0-100" },
            predictedScore: {
              type: Type.OBJECT,
              properties: {
                patriots: { type: Type.INTEGER },
                seahawks: { type: Type.INTEGER },
                confidenceInterval: { type: Type.STRING, description: "e.g., +/- 3.5 points" }
              }
            },
            decidingFactors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  advantage: { type: Type.STRING, enum: ["Patriots", "Seahawks", "Neutral"] }
                }
              }
            },
            keyMatchups: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  details: { type: Type.STRING }
                }
              }
            },
            analysisSummary: { type: Type.STRING },
            teamStats: {
              type: Type.OBJECT,
              properties: {
                patriots: {
                  type: Type.OBJECT,
                  properties: {
                    offenseRank: { type: Type.NUMBER },
                    defenseRank: { type: Type.NUMBER },
                    pointsPerGame: { type: Type.NUMBER },
                    passingYards: { type: Type.NUMBER },
                    rushingYards: { type: Type.NUMBER }
                  }
                },
                seahawks: {
                  type: Type.OBJECT,
                  properties: {
                    offenseRank: { type: Type.NUMBER },
                    defenseRank: { type: Type.NUMBER },
                    pointsPerGame: { type: Type.NUMBER },
                    passingYards: { type: Type.NUMBER },
                    rushingYards: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as PredictionResponse;
    }
    throw new Error("No data returned from Gemini");
  } catch (error) {
    console.error("Error fetching analysis:", error);
    throw error;
  }
};

export const createChatSession = (contextData: PredictionResponse) => {
  const contextString = JSON.stringify(contextData);
  
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: `You are a sports betting analyst and NFL expert. 
      You have already analyzed the Patriots vs Seahawks game and produced the following data: ${contextString}.
      
      Answer user questions based on this data. 
      Keep answers concise, conversational, and data-backed.
      If asked "Who wins?", refer to the win probability and predicted score in the data.
      If asked about "Confidence", explain the confidence interval.
      `
    }
  });
};
