import React, { useState } from 'react';
import { useStore } from '../store';
import { INITIAL_QUESTIONS } from '../constants';
import { PersonalityType } from '../types';

const PersonalityTest: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ introvert: 0, extrovert: 0, ambivert: 0 });
  const setUserMode = useStore(state => state.setUserMode);

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (currentQ < INITIAL_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Finish
      const winner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b) as PersonalityType;
      setUserMode(winner);
    }
  };

  const question = INITIAL_QUESTIONS[currentQ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg p-8 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-white/10 shadow-2xl">
        <h1 className="text-3xl font-serif font-bold mb-2 text-center text-slate-900 dark:text-white">Welcome to Mastery</h1>
        <p className="text-slate-600 dark:text-white/70 text-center mb-8">First, let's tailor the environment to your mind.</p>
        
        <div className="mb-8">
            <h2 className="text-xl font-medium mb-6 text-center text-slate-800 dark:text-white">{question.text}</h2>
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.type)}
                  className="w-full p-4 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 transition-all text-left group"
                >
                  <span className="text-slate-800 dark:text-white group-hover:translate-x-1 inline-block transition-transform">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
        </div>

        <div className="w-full bg-slate-200 dark:bg-white/10 h-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-slate-900 dark:bg-white transition-all duration-300" 
            style={{ width: `${((currentQ) / INITIAL_QUESTIONS.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-center mt-4 text-slate-400 dark:text-white/40">
          Pauline Cullen based WT2 • v1.0.0
        </p>
      </div>
    </div>
  );
};

export default PersonalityTest;