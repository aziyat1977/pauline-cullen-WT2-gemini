import React, { useState } from 'react';
import { LESSON_MODULES, MOCK_EXERCISES } from '../constants';
import { GapFillExercise, LessonModule } from '../types';
import { Check, X, HelpCircle, BookOpen, PenTool, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const Lesson: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  if (!activeModule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate-fade-in">
        <h1 className="text-4xl font-serif font-bold text-center text-slate-900 dark:text-white">Skill Acquisition</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {/* Module 1: Theory */}
          <button 
            onClick={() => setActiveModule('lesson_01')}
            className="group relative bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-[1.02] shadow-lg dark:shadow-none overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-slate-900 dark:text-white">
               <BookOpen size={120} />
             </div>
             <h2 className="text-2xl font-serif font-bold mb-2 text-slate-900 dark:text-white">Lesson 1: Theory</h2>
             <p className="text-slate-600 dark:text-white/60 mb-6">Mastering Task Response & Coherence. Based on Pauline Cullen's methodology.</p>
             <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300">
               Start Reading <ChevronRight size={16} />
             </span>
          </button>

          {/* Module 2: Practice */}
          <button 
             onClick={() => setActiveModule('practice_01')}
             className="group relative bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-[1.02] shadow-lg dark:shadow-none overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-slate-900 dark:text-white">
               <PenTool size={120} />
             </div>
             <h2 className="text-2xl font-serif font-bold mb-2 text-slate-900 dark:text-white">Precision Training</h2>
             <p className="text-slate-600 dark:text-white/60 mb-6">Interactive gap-fill exercises to refine your academic vocabulary.</p>
             <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 group-hover:text-green-500 dark:group-hover:text-green-300">
               Start Practice <ChevronRight size={16} />
             </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh]">
      <button 
        onClick={() => setActiveModule(null)}
        className="absolute top-0 left-0 z-10 flex items-center gap-2 text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <Menu size={20} /> Modules
      </button>

      {activeModule === 'lesson_01' ? (
        <SlideReader module={LESSON_MODULES[0]} onComplete={() => setActiveModule(null)} />
      ) : (
        <GapFillPractice onComplete={() => setActiveModule(null)} />
      )}
    </div>
  );
};

// --- Sub-Component: Slide Reader (The "Big Text" Reader) ---

const SlideReader: React.FC<{ module: LessonModule; onComplete: () => void }> = ({ module, onComplete }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = module.slides[slideIndex];

  const nextSlide = () => {
    if (slideIndex < module.slides.length - 1) setSlideIndex(slideIndex + 1);
    else onComplete();
  };

  const prevSlide = () => {
    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
  };

  const getSlideStyles = () => {
    switch (slide.type) {
      case 'key-idea':
        return 'bg-teal-100 dark:bg-teal-900/40 border-teal-200 dark:border-teal-500/50 text-teal-900 dark:text-teal-50';
      case 'example':
        return 'bg-amber-100 dark:bg-amber-900/40 border-amber-200 dark:border-amber-500/50 text-amber-900 dark:text-amber-50';
      case 'header':
        return 'bg-transparent border-transparent';
      default:
        return 'bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white shadow-xl dark:shadow-none';
    }
  };

  const getProgress = () => ((slideIndex + 1) / module.slides.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto pt-12">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-200 dark:bg-white/10 mb-8 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out" 
          style={{ width: `${getProgress()}%` }}
        />
      </div>

      {/* Slide Content Container */}
      <div className={`w-full min-h-[400px] flex flex-col justify-center items-center p-12 rounded-3xl border transition-all duration-500 ${getSlideStyles()}`}>
        
        {slide.type === 'key-idea' && (
          <div className="text-teal-700 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-6">Key Idea</div>
        )}
        {slide.type === 'example' && (
          <div className="text-amber-700 dark:text-amber-400 font-bold tracking-widest uppercase text-sm mb-6">Example</div>
        )}

        <div className="animate-fade-in text-center">
          {slide.type === 'header' ? (
             <h2 className="font-serif font-bold text-5xl leading-tight mb-4 text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-white/70">
               {slide.content}
             </h2>
          ) : (
             <p className="font-serif font-medium text-3xl md:text-4xl leading-relaxed">
               {slide.content}
             </p>
          )}

          {slide.subContent && (
            <div className="mt-8 space-y-4">
              {slide.subContent.map((sub, i) => (
                <p key={i} className="text-xl md:text-2xl text-slate-600 dark:text-white/70 italic font-sans">
                  {sub}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between w-full mt-12 px-8">
        <button 
          onClick={prevSlide}
          disabled={slideIndex === 0}
          className="p-4 rounded-full text-slate-600 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ChevronLeft size={32} />
        </button>

        <span className="text-slate-400 dark:text-white/30 font-mono text-sm">
          {slideIndex + 1} / {module.slides.length}
        </span>

        <button 
          onClick={nextSlide}
          className="p-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-gray-900 hover:scale-110 transition-all shadow-lg"
        >
          {slideIndex === module.slides.length - 1 ? <Check size={32} /> : <ChevronRight size={32} />}
        </button>
      </div>
    </div>
  );
};

// --- Sub-Component: Gap Fill Practice ---

const GapFillPractice: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);

  const exercise = MOCK_EXERCISES[currentIdx];
  const parts = exercise.sentence.split('_____');

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === exercise.gapWord.toLowerCase()) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  const nextExercise = () => {
    if (currentIdx < MOCK_EXERCISES.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserAnswer('');
      setStatus('idle');
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] pt-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-white/10">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / MOCK_EXERCISES.length) * 100}%` }}
            />
          </div>

          <div className="mt-4 text-3xl font-serif leading-relaxed text-center mb-8 text-slate-800 dark:text-white">
            {parts[0]}
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              disabled={status === 'correct'}
              className={`mx-2 bg-transparent border-b-2 outline-none text-center w-40 transition-colors ${
                status === 'correct' ? 'border-green-500 text-green-500' : 
                status === 'incorrect' ? 'border-red-500 text-red-500' : 
                'border-slate-300 dark:border-white/30 focus:border-slate-800 dark:focus:border-white'
              }`}
              placeholder="?"
            />
            {parts[1]}
          </div>

          {status === 'idle' && (
            <div className="flex justify-center gap-4">
               <button onClick={() => setShowHint(!showHint)} className="text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white flex items-center gap-2 text-sm">
                 <HelpCircle size={16} /> {showHint ? exercise.hint : "Need a hint?"}
               </button>
               <button onClick={checkAnswer} className="bg-slate-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors">
                 Check
               </button>
            </div>
          )}

          {status === 'incorrect' && (
             <div className="text-center animate-shake">
               <p className="text-red-500 dark:text-red-400 mb-4 flex items-center justify-center gap-2">
                 <X size={20} /> Incorrect. Try again.
               </p>
               <button onClick={() => setStatus('idle')} className="text-sm underline text-slate-500 dark:text-white/70 hover:text-slate-800 dark:hover:text-white">Retry</button>
             </div>
          )}

          {status === 'correct' && (
            <div className="text-center animate-fade-in-up">
              <p className="text-green-600 dark:text-green-400 mb-2 flex items-center justify-center gap-2 font-bold text-lg">
                <Check size={24} /> Correct
              </p>
              <p className="text-slate-600 dark:text-white/80 mb-6">{exercise.explanation}</p>
              <button onClick={nextExercise} className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-lg">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson;