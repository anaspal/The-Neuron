/**
 * Pure functions for Quiz scoring, search filtering, and state helpers.
 * Used by UI and unit-tested via Node's test runner.
 */

export interface MCQuestion {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  userAnswer?: string;
}

export interface TFQuestion {
  id: number;
  statement: string;
  correctAnswer: boolean;
  correction?: string;
}

/**
 * Calculates score for a multiple choice quiz
 */
export function calculateMCScore(
  userAnswers: Record<number, string>,
  answerKey: Record<number, string>
): { score: number; total: number; percentage: number } {
  const keys = Object.keys(answerKey).map(Number);
  const total = keys.length;
  if (total === 0) return { score: 0, total: 0, percentage: 0 };

  let score = 0;
  for (const qId of keys) {
    if (userAnswers[qId] === answerKey[qId]) {
      score += 1;
    }
  }

  const percentage = Math.round((score / total) * 100);
  return { score, total, percentage };
}

/**
 * Calculates score for True/False questions
 */
export function calculateTFScore(
  userAnswers: Record<number, boolean>,
  answerKey: Record<number, boolean>
): { score: number; total: number; percentage: number } {
  const keys = Object.keys(answerKey).map(Number);
  const total = keys.length;
  if (total === 0) return { score: 0, total: 0, percentage: 0 };

  let score = 0;
  for (const qId of keys) {
    if (userAnswers[qId] === answerKey[qId]) {
      score += 1;
    }
  }

  const percentage = Math.round((score / total) * 100);
  return { score, total, percentage };
}

/**
 * Searches verbatim text in content sections
 */
export interface SearchItem {
  sectionId: string;
  sectionTitle: string;
  textSnippet: string;
  matchIndex: number;
}

export function searchLessonContent(query: string, contentBlocks: { id: string; title: string; text: string }[]): SearchItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  const results: SearchItem[] = [];

  for (const block of contentBlocks) {
    const textLower = block.text.toLowerCase();
    let pos = textLower.indexOf(cleanQuery);
    
    while (pos !== -1 && results.length < 30) {
      const start = Math.max(0, pos - 45);
      const end = Math.min(block.text.length, pos + cleanQuery.length + 45);
      const snippet = (start > 0 ? "..." : "") + block.text.slice(start, end) + (end < block.text.length ? "..." : "");
      
      results.push({
        sectionId: block.id,
        sectionTitle: block.title,
        textSnippet: snippet,
        matchIndex: pos,
      });

      pos = textLower.indexOf(cleanQuery, pos + cleanQuery.length);
    }
  }

  return results;
}

/**
 * Format reading time based on word count
 */
export function estimateReadingTimeMinutes(wordCount: number, wordsPerMinute = 180): number {
  if (wordCount <= 0) return 1;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
