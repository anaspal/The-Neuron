import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Eye, EyeOff, Timer, Award, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { calculateMCScore, calculateTFScore } from '../utils/quiz';

export default function PracticeSection() {
  // Review MCQs State
  const [reviewMCAnswers, setReviewMCAnswers] = useState<Record<number, string>>({});
  // Review TF State
  const [reviewTFAnswers, setReviewTFAnswers] = useState<Record<number, boolean>>({});
  // Revealed states for text answers
  const [revealedReviewBlanks, setRevealedReviewBlanks] = useState<Record<number, boolean>>({});
  const [revealedReasoning, setRevealedReasoning] = useState<Record<number, boolean>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  // Final Exam State
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examTimeLeft, setExamTimeLeft] = useState<number>(25 * 60); // 25 mins
  const [examMCAnswers, setExamMCAnswers] = useState<Record<number, string>>({});
  const [examTFAnswers, setExamTFAnswers] = useState<Record<number, boolean>>({});
  const [examWrittenRevealed, setExamWrittenRevealed] = useState<boolean>(false);

  // Timer for Exam
  useEffect(() => {
    if (!examStarted || examSubmitted) return;
    const interval = setInterval(() => {
      setExamTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examStarted, examSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Review MCQs Data (verbatim from Section 9 & 10)
  const reviewMCQs = [
    {
      id: 1,
      q: '1. ما الوحدة التركيبية والوظيفية للنسيج العصبي؟',
      options: [
        { k: 'أ', text: 'أ. الخلية الدبقية.' },
        { k: 'ب', text: 'ب. العصبون.' },
        { k: 'ج', text: 'ج. العضلة.' },
        { k: 'د', text: 'د. الغدة.' }
      ],
      correct: 'ب',
      correctText: 'ب – العصبون'
    },
    {
      id: 2,
      q: '2. ما نسبة العصبونات من النسيج العصبي بحسب الرزمة؟',
      options: [
        { k: 'أ', text: 'أ. 10%.' },
        { k: 'ب', text: 'ب. 20%.' },
        { k: 'ج', text: 'ج. 50%.' },
        { k: 'د', text: 'د. 90%.' }
      ],
      correct: 'أ',
      correctText: 'أ – 10%'
    },
    {
      id: 3,
      q: '3. ما الخلايا التي تحيط بالعصبون وتدعمه؟',
      options: [
        { k: 'أ', text: 'أ. خلايا الدم الحمراء.' },
        { k: 'ب', text: 'ب. الخلايا العضلية.' },
        { k: 'ج', text: 'ج. الخلايا الدبقية.' },
        { k: 'د', text: 'د. الخلايا العظمية.' }
      ],
      correct: 'ج',
      correctText: 'ج – الخلايا الدبقية'
    },
    {
      id: 4,
      q: '4. أي أجزاء العصبون تستقبل المعلومات وتنقلها باتجاه جسم الخلية؟',
      options: [
        { k: 'أ', text: 'أ. المحور الأسطواني.' },
        { k: 'ب', text: 'ب. النهايات الطرفية.' },
        { k: 'ج', text: 'ج. الزوائد الشجرية.' },
        { k: 'د', text: 'د. الغمد الميليني.' }
      ],
      correct: 'ج',
      correctText: 'ج – الزوائد الشجرية'
    },
    {
      id: 5,
      q: '5. ما الجزء الذي يحتوي معظم عضيات العصبون؟',
      options: [
        { k: 'أ', text: 'أ. الزوائد الشجرية.' },
        { k: 'ب', text: 'ب. جسم الخلية.' },
        { k: 'ج', text: 'ج. عقد رانفييه.' },
        { k: 'د', text: 'د. الغمد الميليني.' }
      ],
      correct: 'ب',
      correctText: 'ب – جسم الخلية'
    },
    {
      id: 6,
      q: '6. مم يتكون الغمد الميليني؟',
      options: [
        { k: 'أ', text: 'أ. مادة بروتينية فقط.' },
        { k: 'ب', text: 'ب. مادة دهنية فقط.' },
        { k: 'ج', text: 'ج. مادة دهنية بروتينية.' },
        { k: 'د', text: 'د. مادة كربوهيدراتية.' }
      ],
      correct: 'ج',
      correctText: 'ج – مادة دهنية بروتينية'
    },
    {
      id: 7,
      q: '7. ما الخلايا التي تسهم في تكوين الغمد الميليني؟',
      options: [
        { k: 'أ', text: 'أ. خلايا شفان.' },
        { k: 'ب', text: 'ب. خلايا الدم.' },
        { k: 'ج', text: 'ج. الخلايا العضلية.' },
        { k: 'د', text: 'د. الخلايا الطلائية.' }
      ],
      correct: 'أ',
      correctText: 'أ – خلايا شفان'
    },
    {
      id: 8,
      q: '8. ماذا تسمى الانغمادات غير المغلفة بالغمد الميليني؟',
      options: [
        { k: 'أ', text: 'أ. الزوائد الشجرية.' },
        { k: 'ب', text: 'ب. عقد رانفييه.' },
        { k: 'ج', text: 'ج. الأزرار التشابكية.' },
        { k: 'د', text: 'د. الميتوكوندريا.' }
      ],
      correct: 'ب',
      correctText: 'ب – عقد رانفييه'
    }
  ];

  // Review True/False Data
  const reviewTF = [
    { id: 1, text: '1. العصبون هو الوحدة التركيبية والوظيفية للنسيج العصبي.', correct: true, explain: 'صح.' },
    { id: 2, text: '2. الزوائد الشجرية تنقل المعلومات بعيداً عن جسم الخلية.', correct: false, explain: 'خطأ: الزوائد الشجرية تنقل المعلومات باتجاه جسم الخلية.' },
    { id: 3, text: '3. جسم الخلية يحتوي معظم عضيات الخلية باستثناء المريكزات.', correct: true, explain: 'صح.' },
    { id: 4, text: '4. الغمد الميليني مادة دهنية بروتينية.', correct: true, explain: 'صح.' },
    { id: 5, text: '5. جميع المحاور الأسطوانية تحتوي على غمد ميليني.', correct: false, explain: 'خطأ: يوجد محاور ميلينية وأخرى غير ميلينية.' },
    { id: 6, text: '6. خلايا شفان تسهم في تكوين الغمد الميليني.', correct: true, explain: 'صح.' },
    { id: 7, text: '7. عقد رانفييه مناطق غير مغلفة بالغمد الميليني.', correct: true, explain: 'صح.' },
    { id: 8, text: '8. المحور الأسطواني ينقل السيال العصبي بعيداً عن جسم الخلية.', correct: true, explain: 'صح.' }
  ];

  // Review Fill in Blanks
  const reviewBlanks = [
    { id: 1, text: '1. تسمى الوحدة التركيبية والوظيفية للنسيج العصبي ...............', ans: 'العصبون.' },
    { id: 2, text: '2. الخلايا التي تدعم العصبونات تسمى ...............', ans: 'الخلايا الدبقية.' },
    { id: 3, text: '3. يستقبل العصبون المعلومات بواسطة ...............', ans: 'الزوائد الشجرية.' },
    { id: 4, text: '4. الجزء المركزي من العصبون يسمى ...............', ans: 'جسم الخلية.' },
    { id: 5, text: '5. امتداد جسم العصبون يسمى ...............', ans: 'المحور الأسطواني.' },
    { id: 6, text: '6. المادة الدهنية البروتينية التي تحيط ببعض المحاور تسمى ...............', ans: 'الغمد الميليني.' },
    { id: 7, text: '7. الخلايا التي تسهم في تكوين الغمد الميليني تسمى ...............', ans: 'خلايا شفان.' },
    { id: 8, text: '8. المناطق غير المغلفة بين أجزاء الغمد الميليني تسمى ...............', ans: 'عقد رانفييه.' }
  ];

  // Review Reasoning questions
  const reviewReasoning = [
    {
      id: 1,
      q: '1. أهمية زيادة عدد التفرعات في الزوائد الشجرية.',
      ans: 'لزيادة مساحة الاستقبال، وتمكين العصبون من استقبال معلومات واتصالات أكثر.'
    },
    {
      id: 2,
      q: '2. أهمية وجود الخلايا الدبقية حول العصبونات.',
      ans: 'لأنها تربط العصبونات وتدعم النسيج العصبي، وتسهم في إمداد العصبونات بالغذاء والأكسجين ونقل الفضلات إلى الدم.'
    },
    {
      id: 3,
      q: '3. وجود غمد ميليني حول بعض المحاور الأسطوانية.',
      ans: 'لأنه يعمل عازلاً حول المحور الأسطواني ويساعد على زيادة سرعة انتقال السيال العصبي.'
    },
    {
      id: 4,
      q: '4. وجود عقد رانفييه على امتداد المحور الأسطواني.',
      ans: 'لأنها مناطق غير مغلفة بين أجزاء الغمد الميليني، وتساعد على انتقال السيال العصبي بطريقة قفزية أسرع.'
    }
  ];

  // Review Explanatory questions
  const reviewExplanatory = [
    {
      id: 1,
      q: '1. عرّف العصبون.',
      ans: 'هو الوحدة التركيبية والوظيفية للنسيج العصبي، ويختص باستقبال المنبهات ونقلها والاستجابة لها على صورة سيالات عصبية تصل إلى أعضاء الاستجابة مثل الغدد والعضلات.'
    },
    {
      id: 2,
      q: '2. اذكر ثلاثة أجزاء رئيسة يتكون منها العصبون.',
      ans: '1. الزوائد الشجرية.\n2. جسم الخلية.\n3. المحور الأسطواني.'
    },
    {
      id: 3,
      q: '3. اشرح وظائف الخلايا الدبقية.',
      ans: 'ربط العصبونات ببعضها، ودعم النسيج العصبي، وإمداد العصبونات بالغذاء والأكسجين، ونقل الفضلات مثل ثاني أكسيد الكربون إلى الدم.'
    },
    {
      id: 4,
      q: '4. وضح تركيب جسم الخلية ووظائفه.',
      ans: 'يشكل الجزء المركزي من العصبون، ويحوي معظم عضيات الخلية باستثناء المريكزات، ويقوم بالعمليات الأيضية وتزويد الخلية بالطاقة وإنتاج البروتين والنواقل العصبية.'
    },
    {
      id: 5,
      q: '5. صف تركيب المحور الأسطواني.',
      ans: 'هو امتداد لجسم العصبون، ويحتوي على الميتوكوندريا والأنبيبيات الدقيقة والإنزيمات، وينتهي بنهايات طرفية تحوي الأزرار الطرفية التشابكية.'
    },
    {
      id: 6,
      q: '6. ما الفرق بين الغمد الميليني وعقد رانفييه؟',
      ans: 'الغمد الميليني مادة دهنية بروتينية تحيط ببعض أجزاء المحور، أما عقد رانفييه فهي مناطق غير مغلفة تفصل بين أجزاء هذا الغمد.'
    },
    {
      id: 7,
      q: '7. قارن بين الألياف الميلينية وغير الميلينية.',
      ans: 'الألياف الميلينية تحتوي على غمد ميليني حول المحور الأسطواني، بينما الألياف غير الميلينية تخلو من هذا الغمد.'
    },
    {
      id: 8,
      q: '8. حدد اتجاه انتقال السيال العصبي في العصبون.',
      ans: 'من الزوائد الشجرية إلى جسم الخلية، ثم عبر المحور الأسطواني باتجاه النهايات الطرفية.'
    }
  ];

  // Final Exam Data (Verbatim from Section 11)
  const examMCQs = [
    {
      id: 1,
      q: '1. الوحدة التركيبية والوظيفية للنسيج العصبي هي:',
      options: ['أ. الخلية الدبقية.', 'ب. العصبون.', 'ج. الغدة.', 'د. العضلة.'],
      correct: 'ب'
    },
    {
      id: 2,
      q: '2. أي مما يأتي يمثل جزءاً من العصبون يستقبل المعلومات؟',
      options: ['أ. الزوائد الشجرية.', 'ب. المحور الأسطواني.', 'ج. الغمد الميليني.', 'د. عقد رانفييه.'],
      correct: 'أ'
    },
    {
      id: 3,
      q: '3. أي مما يأتي يوجد في نهاية المحور الأسطواني؟',
      options: ['أ. المريكزات.', 'ب. الأزرار الطرفية التشابكية.', 'ج. الزوائد الشجرية.', 'د. جسم الخلية.'],
      correct: 'ب'
    },
    {
      id: 4,
      q: '4. ما اسم الخلايا التي تنتج الغمد الميليني بحسب الرزمة؟',
      options: ['أ. الخلايا الدبقية عامة.', 'ب. خلايا شفان.', 'ج. الخلايا العضلية.', 'د. خلايا الدم.'],
      correct: 'ب'
    },
    {
      id: 5,
      q: '5. ما المقصود بعقد رانفييه؟',
      options: ['أ. عضيات خلوية.', 'ب. مناطق غير مغلفة بالغمد الميليني.', 'ج. أجزاء من جسم الخلية.', 'د. زوائد سيتوبلازمية متفرعة.'],
      correct: 'ب'
    }
  ];

  const examTF = [
    { id: 1, text: '1. العصبونات لا تستطيع الانقسام بحسب الرزمة التعليمية.', correct: true, explain: 'صح.' },
    { id: 2, text: '2. جسم الخلية يمثل امتداداً من جسم العصبون.', correct: false, explain: 'خطأ: المحور الأسطواني هو امتداد جسم العصبون.' },
    { id: 3, text: '3. الغمد الميليني يتكون من مادة دهنية بروتينية.', correct: true, explain: 'صح.' },
    { id: 4, text: '4. الخلايا الدبقية تساعد في التخلص من الفضلات الناتجة عن نشاط العصبونات.', correct: true, explain: 'صح.' },
    { id: 5, text: '5. تنتقل المعلومات عبر الزوائد الشجرية باتجاه جسم الخلية.', correct: true, explain: 'صح.' },
    { id: 6, text: '6. الألياف غير الميلينية تحتوي على غمد ميليني.', correct: false, explain: 'خطأ: الألياف غير الميلينية تخلو من الغمد الميليني.' }
  ];

  // Calculate scores for final exam
  const examMCKey = { 1: 'ب', 2: 'أ', 3: 'ب', 4: 'ب', 5: 'ب' };
  const examTFKey = { 1: true, 2: false, 3: true, 4: true, 5: true, 6: false };

  const mcResult = calculateMCScore(examMCAnswers, examMCKey);
  const tfResult = calculateTFScore(examTFAnswers, examTFKey);
  // MC: 5 marks (1 each). TF: 4 marks (0.5 each = 6 * 0.5 = 3 or 4 marks)
  const examAutoScore = mcResult.score + tfResult.score * 0.67;

  return (
    <div className="space-y-12">
      {/* ================= SECTION 9: REVIEW QUESTIONS ================= */}
      <section id="review-questions" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              9. أسئلة المراجعة والتدريب
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              حاول الإجابة عن الأسئلة بنفسك قبل الانتقال إلى نموذج الإجابة.
            </p>
          </div>
        </div>

        {/* 9.1 MCQs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              أولاً: اختر الإجابة الصحيحة
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              8 أسئلة تدريبية
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {reviewMCQs.map((q) => {
              const selected = reviewMCAnswers[q.id];
              const isCorrect = selected === q.correct;
              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                    {q.q}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt) => {
                      const isOptionSelected = selected === opt.k;
                      let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400';
                      if (selected) {
                        if (opt.k === q.correct) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200';
                        }
                      }
                      return (
                        <button
                          key={opt.k}
                          onClick={() => setReviewMCAnswers(prev => ({ ...prev, [q.id]: opt.k }))}
                          className={`text-right px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt.text}</span>
                          {selected && opt.k === q.correct && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {selected && isOptionSelected && opt.k !== q.correct && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {selected && (
                    <div className={`mt-2.5 text-xs p-2.5 rounded-lg flex items-center gap-2 ${
                      isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                      <span>
                        {isCorrect ? 'إجابة صحيحة وممتازة!' : `إجابة غير صحيحة. الإجابة الصحيحة هي: ${q.correctText}`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 9.2 True or False */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              ثانياً: ضع علامة صح أو خطأ
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              8 فقرات
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {reviewTF.map((item) => {
              const selected = reviewTFAnswers[item.id];
              return (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setReviewTFAnswers(prev => ({ ...prev, [item.id]: true }))}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selected === true
                            ? item.correct
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500'
                        }`}
                      >
                        صح
                      </button>
                      <button
                        onClick={() => setReviewTFAnswers(prev => ({ ...prev, [item.id]: false }))}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selected === false
                            ? !item.correct
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500'
                        }`}
                      >
                        خطأ
                      </button>
                    </div>
                  </div>
                  {selected !== undefined && (
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <strong>التوضيح العلمي:</strong> {item.explain}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 9.3 Fill in the Blanks */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              ثالثاً: أكمل الفراغ
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              8 عبارات
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {reviewBlanks.map((b) => {
              const isRevealed = revealedReviewBlanks[b.id];
              return (
                <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    {b.text}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {isRevealed && (
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 px-2 py-1 bg-teal-50 dark:bg-teal-950/60 rounded">
                        {b.ans}
                      </span>
                    )}
                    <button
                      onClick={() => setRevealedReviewBlanks(prev => ({ ...prev, [b.id]: !prev[b.id] }))}
                      className="text-xs px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      {isRevealed ? 'إخفاء' : 'إظهار الإجابة'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 9.4 Reasoning (علل ما يأتي) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              رابعاً: علل ما يأتي
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              4 أسئلة تعليل
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {reviewReasoning.map((r) => {
              const isRevealed = revealedReasoning[r.id];
              return (
                <div key={r.id} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setRevealedReasoning(prev => ({ ...prev, [r.id]: !prev[r.id] }))}
                    className="w-full text-right p-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 flex items-center justify-between gap-3 transition-colors"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {r.q}
                    </span>
                    {isRevealed ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isRevealed && (
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-teal-900 dark:text-teal-200 leading-relaxed">
                      <strong>الإجابة النموذجية:</strong> {r.ans}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 9.5 Explanatory Questions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              خامساً: أجب عن الأسئلة الآتية
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              8 أسئلة مقالية
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {reviewExplanatory.map((ex) => {
              const isRevealed = revealedQuestions[ex.id];
              return (
                <div key={ex.id} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setRevealedQuestions(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                    className="w-full text-right p-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 flex items-center justify-between gap-3 transition-colors"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {ex.q}
                    </span>
                    {isRevealed ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isRevealed && (
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-teal-900 dark:text-teal-200 whitespace-pre-line leading-relaxed">
                      <strong>الإجابة النموذجية:</strong>{'\n'}{ex.ans}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 11: FINAL EXAM ================= */}
      <section id="final-exam" className="scroll-mt-24 pt-8">
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-teal-800/40 shadow-xl relative overflow-hidden">
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Exam Header Header Banner */}
          <div className="border-b border-teal-800/50 pb-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
                  11. الاختبار النهائي للدرس
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  اختبار الوحدة التعليمية: العصبون (الخلية العصبية)
                </h2>
                <div className="flex flex-wrap gap-4 text-xs text-teal-200 mt-2">
                  <span>المادة: العلوم الحياتية</span>
                  <span>·</span>
                  <span>الصف: الحادي عشر العلمي</span>
                  <span>·</span>
                  <span>الزمن المقترح: 25 دقيقة</span>
                  <span>·</span>
                  <span className="text-amber-300 font-bold">العلامة الكلية: 20 علامة</span>
                </div>
              </div>

              {/* Timer & Exam Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/80 border border-teal-700/60 rounded-xl font-mono text-base font-bold text-teal-300">
                  <Timer className="w-4 h-4 text-teal-400 animate-spin" />
                  <span>{formatTime(examTimeLeft)}</span>
                </div>
                {!examStarted ? (
                  <button
                    onClick={() => setExamStarted(true)}
                    className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-teal-500/20"
                  >
                    بدء الاختبار
                  </button>
                ) : !examSubmitted ? (
                  <button
                    onClick={() => setExamSubmitted(true)}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
                  >
                    إنهاء وتصحيح الاختبار
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setExamStarted(true);
                      setExamSubmitted(false);
                      setExamTimeLeft(25 * 60);
                      setExamMCAnswers({});
                      setExamTFAnswers({});
                      setExamWrittenRevealed(false);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة الاختبار</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Exam Result Banner when submitted */}
          {examSubmitted && (
            <div className="mb-8 p-5 bg-teal-900/60 border border-teal-500/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-xl">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    تم تصحيح الأسئلة الموضوعية بنجاح!
                  </h4>
                  <p className="text-xs text-teal-200 mt-0.5">
                    علامة الأسئلة الموضوعية (السؤال الأول والثاني): <strong>{Math.round(examAutoScore * 10) / 10} من 9 علامات</strong>. راجع الأسئلة المقالية أدناه مع نموذج الإجابة.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExamWrittenRevealed(!examWrittenRevealed)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                {examWrittenRevealed ? 'إخفاء الإجابات النموذجية' : 'عرض الإجابات النموذجية الكاملة'}
              </button>
            </div>
          )}

          {/* Exam Questions Container */}
          <div className="space-y-8 text-slate-100">
            {/* Question 1: MCQs (5 Marks) */}
            <div className="bg-slate-950/60 rounded-2xl p-5 border border-teal-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-teal-900/80 mb-4">
                <h4 className="font-bold text-base text-teal-300">
                  السؤال الأول: اختر الإجابة الصحيحة (5 علامات)
                </h4>
                <span className="text-xs text-slate-400">لكل فقرة علامة واحدة</span>
              </div>
              <div className="space-y-4">
                {examMCQs.map((q) => (
                  <div key={q.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-xs sm:text-sm font-semibold text-white mb-2">{q.q}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, idx) => {
                        const optKey = ['أ', 'ب', 'ج', 'د'][idx];
                        const isSelected = examMCAnswers[q.id] === optKey;
                        let btnColor = 'bg-slate-800/80 border-slate-700 hover:border-teal-500';
                        if (examSubmitted) {
                          if (optKey === q.correct) btnColor = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          else if (isSelected) btnColor = 'bg-rose-950 border-rose-500 text-rose-200';
                        } else if (isSelected) {
                          btnColor = 'bg-teal-600 border-teal-400 text-white font-bold';
                        }
                        return (
                          <button
                            key={optKey}
                            disabled={examSubmitted}
                            onClick={() => setExamMCAnswers(prev => ({ ...prev, [q.id]: optKey }))}
                            className={`text-right px-3 py-2 rounded-lg border text-xs transition-colors ${btnColor}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 2: True/False (4 Marks) */}
            <div className="bg-slate-950/60 rounded-2xl p-5 border border-teal-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-teal-900/80 mb-4">
                <h4 className="font-bold text-base text-teal-300">
                  السؤال الثاني: ضع إشارة صح أو خطأ (4 علامات)
                </h4>
                <span className="text-xs text-slate-400">لكل فقرة نصف علامة</span>
              </div>
              <div className="space-y-3">
                {examTF.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm text-slate-200">{item.text}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        disabled={examSubmitted}
                        onClick={() => setExamTFAnswers(prev => ({ ...prev, [item.id]: true }))}
                        className={`px-3.5 py-1 rounded text-xs font-bold border transition-colors ${
                          examTFAnswers[item.id] === true
                            ? 'bg-teal-600 text-white border-teal-400'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        صح
                      </button>
                      <button
                        disabled={examSubmitted}
                        onClick={() => setExamTFAnswers(prev => ({ ...prev, [item.id]: false }))}
                        className={`px-3.5 py-1 rounded text-xs font-bold border transition-colors ${
                          examTFAnswers[item.id] === false
                            ? 'bg-teal-600 text-white border-teal-400'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        خطأ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 3: Essay (6 Marks) */}
            <div className="bg-slate-950/60 rounded-2xl p-5 border border-teal-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-teal-900/80 mb-4">
                <h4 className="font-bold text-base text-teal-300">
                  السؤال الثالث: أجب عن الأسئلة الآتية (6 علامات)
                </h4>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <p>1. عرّف العصبون. (علامة)</p>
                <p>2. عدد وظائف الخلايا الدبقية. (علامتان)</p>
                <p>3. عدد أجزاء العصبون الرئيسة، مع ذكر وظيفة كل جزء. (3 علامات)</p>
              </div>
              {examWrittenRevealed && (
                <div className="mt-4 p-4 bg-teal-950/70 border border-teal-600/40 rounded-xl text-xs text-teal-200 space-y-2">
                  <p><strong>1. تعريف العصبون:</strong> العصبون هو الوحدة التركيبية والوظيفية للنسيج العصبي.</p>
                  <p><strong>2. وظائف الخلايا الدبقية:</strong> الربط بين العصبونات، دعم النسيج العصبي، الإمداد بالغذاء والأكسجين، والمساعدة على نقل الفضلات إلى الدم.</p>
                  <p><strong>3. أجزاء العصبون ووظائفها:</strong></p>
                  <ul className="list-disc list-inside space-y-1 pr-2">
                    <li>الزوائد الشجرية: استقبال المعلومات ونقلها باتجاه جسم الخلية.</li>
                    <li>جسم الخلية: القيام بالعمليات الأيضية وتزويد الخلية بالطاقة وإنتاج البروتين والنواقل العصبية.</li>
                    <li>المحور الأسطواني: نقل السيال العصبي باتجاه النهايات الطرفية.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Question 4: Reasoning (3 Marks) */}
            <div className="bg-slate-950/60 rounded-2xl p-5 border border-teal-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-teal-900/80 mb-4">
                <h4 className="font-bold text-base text-teal-300">
                  السؤال الرابع: علل ما يأتي (3 علامات)
                </h4>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <p>1. أهمية التفرعات في الزوائد الشجرية.</p>
                <p>2. أهمية الغمد الميليني في المحاور الأسطوانية.</p>
                <p>3. اختلاف الألياف العصبية إلى ميلينية وغير ميلينية.</p>
              </div>
              {examWrittenRevealed && (
                <div className="mt-4 p-4 bg-teal-950/70 border border-teal-600/40 rounded-xl text-xs text-teal-200 space-y-2">
                  <p><strong>1. تعليل تفرعات الزوائد الشجرية:</strong> لزيادة مساحة استقبال المعلومات.</p>
                  <p><strong>2. تعليل أهمية الغمد الميليني:</strong> لأنه يعزل المحور الأسطواني ويساعد على زيادة سرعة انتقال السيال العصبي.</p>
                  <p><strong>3. تعليل اختلاف الألياف:</strong> لاختلافها من حيث وجود الغمد الميليني أو عدم وجوده.</p>
                </div>
              )}
            </div>

            {/* Question 5: Applied Question (2 Marks) */}
            <div className="bg-slate-950/60 rounded-2xl p-5 border border-teal-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-teal-900/80 mb-4">
                <h4 className="font-bold text-base text-teal-300">
                  السؤال الخامس: سؤال تطبيقي (علامتان)
                </h4>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                <p>تأمل تركيب عصبون، ثم أجب:</p>
                <p>أ. اكتب المسار الصحيح الذي يسلكه السيال العصبي عبر أجزاء العصبون.</p>
                <p>ب. ما اسم المناطق غير المغلفة التي توجد بين أجزاء الغمد الميليني؟</p>
              </div>
              {examWrittenRevealed && (
                <div className="mt-4 p-4 bg-teal-950/70 border border-teal-600/40 rounded-xl text-xs text-teal-200 space-y-1">
                  <p><strong>أ. المسار الصحيح للسيال العصبي:</strong> الزوائد الشجرية ← جسم الخلية ← المحور الأسطواني ← النهايات الطرفية.</p>
                  <p><strong>ب. اسم المناطق غير المغلفة:</strong> عقد رانفييه.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
