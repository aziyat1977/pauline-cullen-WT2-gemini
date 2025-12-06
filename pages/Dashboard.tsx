import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { db } from '../db';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', score: 6.0 },
  { name: 'Tue', score: 6.5 },
  { name: 'Wed', score: 6.0 },
  { name: 'Thu', score: 7.0 },
  { name: 'Fri', score: 6.5 },
  { name: 'Sat', score: 7.5 },
  { name: 'Sun', score: 7.5 },
];

const Dashboard: React.FC = () => {
  const { userMode, currentStreak } = useStore();
  const [essayCount, setEssayCount] = useState(0);

  useEffect(() => {
    db.essays.count().then(setEssayCount);
  }, []);

  const getAccentColor = () => {
    if (userMode === 'extrovert') return '#f59e0b'; // Amber
    if (userMode === 'ambivert') return '#3b82f6'; // Blue
    return '#64748b'; // Slate-500 (visible on both)
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2 text-slate-900 dark:text-white">My Progress</h1>
        <p className="text-slate-600 dark:text-white/70">Review your recent performance and consistency.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl p-6 border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-sm dark:shadow-none">
          <div className="p-3 bg-yellow-100 dark:bg-white/10 rounded-lg text-yellow-600 dark:text-yellow-400">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{currentStreak} Days</div>
            <div className="text-sm text-slate-500 dark:text-white/50">Current Streak</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl p-6 border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-sm dark:shadow-none">
           <div className="p-3 bg-green-100 dark:bg-white/10 rounded-lg text-green-600 dark:text-green-400">
            <Target size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{essayCount}</div>
            <div className="text-sm text-slate-500 dark:text-white/50">Essays Written</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl p-6 border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-sm dark:shadow-none">
           <div className="p-3 bg-red-100 dark:bg-white/10 rounded-lg text-red-600 dark:text-red-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Articles</div>
            <div className="text-sm text-slate-500 dark:text-white/50">Primary Weakness</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl p-6 border border-slate-200 dark:border-white/10 h-80 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Estimated Score Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getAccentColor()} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={getAccentColor()} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="currentColor" className="text-slate-400 dark:text-white/30" />
              <YAxis domain={[0, 9]} stroke="currentColor" className="text-slate-400 dark:text-white/30" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="score" stroke={getAccentColor()} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Action Panel */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-none">
          <div>
            <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-white">Weekly Recommendation</h3>
            <p className="text-sm text-slate-600 dark:text-white/70 mb-4">
              AI analysis suggests you are struggling with <strong>Subject-Verb Agreement</strong> and <strong>Article Usage</strong>.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-white/40 dark:bg-white/5 rounded border border-slate-200 dark:border-white/5 text-sm text-slate-700 dark:text-slate-300">
                Review: "The" vs Zero Article
              </div>
              <div className="p-3 bg-white/40 dark:bg-white/5 rounded border border-slate-200 dark:border-white/5 text-sm text-slate-700 dark:text-slate-300">
                Drill: Complex Sentences
              </div>
            </div>
          </div>
          
          <Link to="/lesson" className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors">
            Start Lesson <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;