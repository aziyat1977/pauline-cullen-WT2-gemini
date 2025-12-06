import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { analyzeText } from '../services/cullenLogic';
import { db } from '../db';
import { Save, RefreshCw, CheckCircle } from 'lucide-react';

const SAMPLE_TASK = `You should spend about 40 minutes on this task.

Some people believe that children should be allowed to stay home and play computer games. Others believe that it is important for children to go outside and play.

Discuss both views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`;

const Simulation: React.FC = () => {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const incrementStreak = useStore(state => state.incrementStreak);
  
  const handleAnalyze = () => {
    const result = analyzeText(text);
    setFeedback(result.feedback);
    setScore(result.scoreEstimate);
  };

  const handleSave = async () => {
    if (!text.trim()) return;
    handleAnalyze();
    await db.essays.add({
      taskId: 'sample_01',
      originalText: text,
      date: new Date(),
      score: score || 0,
      feedback: feedback
    });
    incrementStreak();
    alert("Essay saved to local database!");
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4">
      {/* Left Pane: Task */}
      <div className="w-full md:w-1/3 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden shadow-sm dark:shadow-none">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
          <h2 className="font-semibold text-slate-900 dark:text-white/90">IELTS Writing Task 2</h2>
        </div>
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 dark:text-white/80 font-serif leading-relaxed whitespace-pre-wrap">
          {SAMPLE_TASK}
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm text-slate-500 dark:text-white/50">
          Status: Simulation Mode
        </div>
      </div>

      {/* Right Pane: Editor */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <div className="flex-1 bg-white/80 dark:bg-white backdrop-blur-md rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col shadow-sm dark:shadow-none">
          <textarea
            className="flex-1 w-full h-full p-6 bg-transparent resize-none focus:outline-none text-slate-900 font-serif text-lg leading-relaxed dark:bg-black/5"
            placeholder="Start typing your essay here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
          <div className="h-12 bg-gray-50 dark:bg-gray-100 border-t border-gray-200 flex items-center justify-between px-4 text-gray-600 text-sm">
             <span>Words: {text.trim().split(/\s+/).filter(Boolean).length}</span>
             <div className="flex gap-2">
                <button 
                  onClick={handleAnalyze}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                >
                  <RefreshCw size={14} /> Check
                </button>
             </div>
          </div>
        </div>

        {/* Feedback Area */}
        {feedback.length > 0 && (
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl p-4 border border-slate-200 dark:border-white/10 animate-fade-in-up shadow-sm dark:shadow-none">
             <div className="flex justify-between items-start mb-2">
               <h3 className="font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
                 <CheckCircle size={18} className="text-green-500 dark:text-green-400" /> 
                 Cullen Analysis
               </h3>
               {score && <span className="bg-slate-200 dark:bg-white/20 px-2 py-1 rounded text-sm font-bold text-slate-800 dark:text-white">Est. Band: {score}</span>}
             </div>
             <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-white/80">
               {feedback.map((item, idx) => (
                 <li key={idx}>{item}</li>
               ))}
             </ul>
             <button 
               onClick={handleSave} 
               className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm transition-colors"
             >
               <Save size={16} /> Save Progress
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulation;