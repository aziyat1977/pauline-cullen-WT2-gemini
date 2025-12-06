import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useStore } from '../store';
import { analyzeText } from '../services/cullenLogic';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm CullenBot. I focus on precision and clarity. How can I help with your writing today?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userMode } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Simulate AI thinking
    setTimeout(() => {
      let response = "I'm not sure about that. Try asking about a specific sentence or grammar rule.";
      
      // Simple RAG-like check against logic
      if (userMsg.toLowerCase().includes('check') || userMsg.toLowerCase().includes('analyze')) {
        const analysis = analyzeText(userMsg);
        if (analysis.feedback.length > 0) {
           response = `Analysis: ${analysis.feedback.join(' ')}`;
        } else {
           response = "That looks grammatically precise. Remember to maintain this clarity throughout your essay.";
        }
      } else if (userMsg.toLowerCase().includes('template')) {
        response = "I do not provide memorized templates. They lower your score in Coherence and Cohesion. Focus on flexible language that directly answers the question.";
      } else if (userMsg.toLowerCase().includes('score')) {
        response = "I can estimate scores based on vocabulary precision and error frequency, but remember only a trained examiner can give a true IELTS score.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 800);
  };

  const getThemeColors = () => {
    if (userMode === 'extrovert') return 'bg-amber-500 hover:bg-amber-600';
    if (userMode === 'ambivert') return 'bg-blue-600 hover:bg-blue-700';
    return 'bg-slate-600 hover:bg-slate-700';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          <div className={`p-3 text-white font-semibold flex justify-between items-center ${getThemeColors()}`}>
            <span className="flex items-center gap-2"><Bot size={18}/> CullenBot</span>
            <button onClick={() => setIsOpen(false)}><X size={18}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-2 text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm border dark:border-gray-600'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about grammar..."
              className="flex-1 text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-md px-3 py-2 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <button onClick={handleSend} className={`p-2 rounded-md text-white ${getThemeColors()}`}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-4 shadow-lg text-white transition-transform hover:scale-105 ${getThemeColors()}`}
      >
        {isOpen ? <X size={24}/> : <MessageSquare size={24}/>}
      </button>
    </div>
  );
};

export default Chatbot;