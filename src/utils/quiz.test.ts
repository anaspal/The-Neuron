import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMCScore, calculateTFScore, searchLessonContent, estimateReadingTimeMinutes } from './quiz';

test('calculateMCScore correctly computes score and percentage', () => {
  const answerKey = { 1: 'ب', 2: 'أ', 3: 'ج', 4: 'ج' };
  const userAnswers = { 1: 'ب', 2: 'أ', 3: 'د', 4: 'ج' };
  
  const result = calculateMCScore(userAnswers, answerKey);
  assert.equal(result.score, 3);
  assert.equal(result.total, 4);
  assert.equal(result.percentage, 75);
});

test('calculateTFScore correctly evaluates true/false results', () => {
  const answerKey = { 1: true, 2: false, 3: true, 4: true };
  const userAnswers = { 1: true, 2: true, 3: true, 4: true };

  const result = calculateTFScore(userAnswers, answerKey);
  assert.equal(result.score, 3);
  assert.equal(result.total, 4);
  assert.equal(result.percentage, 75);
});

test('searchLessonContent finds query in text blocks and returns snippets', () => {
  const blocks = [
    { id: 'intro', title: 'مقدمة الدرس', text: 'يتكون الجهاز العصبي من مليارات الخلايا عالية التخصص تُسمّى العصبونات' },
    { id: 'myelin', title: 'الغمد الميليني', text: 'ينشأ هذا الغمد من خلايا تُسمّى خلايا شفان' },
  ];

  const results = searchLessonContent('العصبونات', blocks);
  assert.equal(results.length, 1);
  assert.equal(results[0].sectionId, 'intro');
  assert.ok(results[0].textSnippet.includes('العصبونات'));

  const emptyResults = searchLessonContent('a', blocks); // less than 2 chars
  assert.equal(emptyResults.length, 0);
});

test('estimateReadingTimeMinutes computes reading time based on word count', () => {
  assert.equal(estimateReadingTimeMinutes(360, 180), 2);
  assert.equal(estimateReadingTimeMinutes(50, 180), 1);
  assert.equal(estimateReadingTimeMinutes(0, 180), 1);
});
