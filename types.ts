export type PersonalityType = 'introvert' | 'extrovert' | 'ambivert';
export type Theme = 'dark' | 'light';

export interface UserProfile {
  name: string;
  personality: PersonalityType;
  joinedDate: Date;
}

export interface Essay {
  id?: number;
  taskId: string;
  originalText: string;
  correctedText?: string;
  score?: number;
  date: Date;
  feedback?: string[];
}

export interface CullenRule {
  id: string;
  trigger: RegExp | string;
  response: string;
  category: 'vocabulary' | 'coherence' | 'task_response' | 'grammar';
}

export interface GapFillExercise {
  id: string;
  sentence: string;
  gapWord: string;
  hint: string;
  explanation: string;
}

export interface WeeklyReport {
  id?: number;
  weekNumber: number;
  mistakesSummary: Record<string, number>;
  recommendedPlan: string;
}

export type SlideType = 'text' | 'key-idea' | 'example' | 'list' | 'header';

export interface LessonSlide {
  id: string;
  type: SlideType;
  content: string;
  subContent?: string[]; // For bullet points or extra context
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  slides: LessonSlide[];
}