import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import MatchupCard from './components/MatchupCard';
import StatsChart from './components/StatsChart';
import FactorsList from './components/FactorsList';
import ChatInterface from './components/ChatInterface';
import { fetchMatchupAnalysis, createChatSession } from './services/geminiService';
import { PredictionResponse, ChatMessage } from './types';
import { Loader2, AlertCircle } from 'lucide-react';
import { Chat } from '@google/genai';

const App: React.FC = () => {
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  
  // Use a ref to store the chat session instance so it persists across renders
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const result = await fetchMatchupAnalysis();
        setData(result);
        
        // Initialize chat session with the fetched data context
        chatSessionRef.current = createChatSession(result);
        
      } catch (err) {
        setError("Failed to load prediction data. Please check your API key and try again.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!chatSessionRef.current) return;

    const newUserMsg: ChatMessage = { role: 'user', text, timestamp: Date.now() };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({ message: text });
      const botMsg: ChatMessage = { 
        role: 'model', 
        text: result.text || "I couldn't generate a response.", 
        timestamp: Date.now() 
      };
      setChatMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error", err);
      const errorMsg: ChatMessage = {
        role: 'model',
        text: "Sorry, I encountered an error processing your request.",
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
        <h2 className="text-xl font-semibold">Crunching the numbers...</h2>
        <p className="text-slate-400 mt-2">Analyzing historical data, player stats, and weather conditions.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-400">Error</h2>
        <p className="text-slate-400 mt-2 text-center max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-12">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pt-8">
        {data && (
          <>
            <MatchupCard data={data} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 h-96">
                <StatsChart patsStats={data.teamStats.patriots} hawksStats={data.teamStats.seahawks} />
              </div>
              <div className="lg:col-span-2 h-96">
                <FactorsList factors={data.decidingFactors} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-1">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
                    <h3 className="text-lg font-semibold text-white mb-4">Key Matchups</h3>
                    <div className="space-y-4">
                      {data.keyMatchups.map((m, i) => (
                        <div key={i} className="border-l-2 border-indigo-500 pl-4 py-1">
                          <h4 className="font-medium text-indigo-300">{m.name}</h4>
                          <p className="text-sm text-slate-400 mt-1">{m.details}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-800">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Analysis Summary</h4>
                        <p className="text-sm text-slate-400 leading-relaxed italic">
                            "{data.analysisSummary}"
                        </p>
                    </div>
                  </div>
               </div>
               <div className="lg:col-span-2">
                 <ChatInterface 
                    messages={chatMessages} 
                    onSendMessage={handleSendMessage}
                    isLoading={chatLoading}
                 />
               </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
