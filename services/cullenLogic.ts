import { CULLEN_RULES } from '../constants';
import { CullenRule } from '../types';

interface FeedbackResult {
  feedback: string[];
  scoreEstimate: number;
}

export const analyzeText = (text: string): FeedbackResult => {
  const feedback: string[] = [];
  let issuesFound = 0;

  CULLEN_RULES.forEach((rule: CullenRule) => {
    if (typeof rule.trigger === 'string') {
      if (text.includes(rule.trigger)) {
        feedback.push(rule.response);
        issuesFound++;
      }
    } else {
      if (rule.trigger.test(text)) {
        feedback.push(rule.response);
        issuesFound++;
      }
    }
  });

  // Basic mock scoring based on length and issues
  const wordCount = text.trim().split(/\s+/).length;
  let baseScore = 6.0;

  if (wordCount > 150) baseScore += 0.5;
  if (wordCount > 250) baseScore += 0.5;
  
  // Deduct for specific Cullen violations
  const finalScore = Math.max(5, Math.min(9, baseScore - (issuesFound * 0.2)));

  if (feedback.length === 0 && wordCount > 50) {
    feedback.push("Good precision. No common errors detected based on current rules.");
  } else if (wordCount < 50) {
    feedback.push("The text is too short to analyze effectively. Aim for at least 250 words for Task 2.");
  }

  return {
    feedback,
    scoreEstimate: parseFloat(finalScore.toFixed(1))
  };
};