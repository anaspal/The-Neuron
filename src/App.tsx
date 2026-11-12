/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TableOfContents from './components/TableOfContents';
import SearchModal from './components/SearchModal';
import NeuronDiagramInteractive from './components/NeuronDiagramInteractive';
import GlialCellsDiagram from './components/GlialCellsDiagram';
import MyelinComparisonVisualizer from './components/MyelinComparisonVisualizer';
import PracticeSection from './components/PracticeSection';
import { LESSON_META, SECTIONS_NAV } from './data/lessonContent';
import { 
  BookOpen, 
  CheckCircle, 
  Layers, 
  ExternalLink, 
  ArrowUp, 
  FileText, 
  Sparkles, 
  Activity,
  BookmarkCheck,
  Award,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [readingProgress, setReadingProgress] = useState(0);

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Scroll spy & reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Determine active section
      for (const sec of SECTIONS_NAV) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fontSizeClass = 
    fontSize === 'sm' ? 'text-sm' :
    fontSize === 'base' ? 'text-base' :
    fontSize === 'lg' ? 'text-lg' : 'text-xl';

  // Text content blocks for live search
  const contentBlocks = [
    { id: 'intro', title: '1. مقدمة الدرس', text: 'يُعد الجهاز العصبي من أهم أجهزة جسم الإنسان؛ فهو المسؤول عن استقبال المعلومات من البيئة المحيطة ومن داخل الجسم، ومعالجتها، وإصدار الاستجابات المناسبة. ويتكون الجهاز العصبي من مليارات الخلايا عالية التخصص تُسمّى العصبونات (Neurons)' },
    { id: 'objectives', title: '2. الأهداف التعليمية', text: 'تعريف العصبون، تحديد الوحدة التركيبية والوظيفية، وظيفة الخلايا الدبقية، تسمية أجزاء العصبون، الزوائد الشجرية، جسم الخلية، المحور الأسطواني، الألياف الميلينية وغير الميلينية، الغمد الميليني، خلايا شفان، عقد رانفييه، اتجاه انتقال السيال العصبي' },
    { id: 'prerequisites', title: '3. المعارف السابقة والتمهيد', text: 'الخلية هي الوحدة الأساسية في بناء أجسام الكائنات الحية. السيتوبلازم مادة شبه هلامية. التخصص الخلوي هو اختلاف شكل وتركيب الخلايا بما يتناسب مع الوظيفة التي تؤديها' },
    { id: 'detailed-explanation', title: '4. الشرح التفصيلي للدرس', text: 'العصبون: هو الوحدة التركيبية والوظيفية للنسيج العصبي، ويختص باستقبال المنبهات ونقلها والاستجابة لها على صورة سيالات عصبية تصل إلى أعضاء الاستجابة مثل الغدد والعضلات. يشكل العصبون نحو 10% من النسيج العصبي' },
    { id: 'glial-cells', title: 'ثانياً: الخلايا الدبقية (Glial Cells)', text: 'توجد حول كل عصبون حوالي عشر خلايا دبقية. وظائف الخلايا الدبقية: ربط العصبونات، دعم النسيج العصبي، إمداد العصبونات بالغذاء، إمداد العصبونات بالأكسجين، نقل الفضلات مثل ثاني أكسيد الكربون إلى الدم' },
    { id: 'neuron-structure', title: 'ثالثاً: تركيب العصبون', text: 'الزوائد الشجرية: زوائد عصبية متفرعة تُعد امتدادات للسيتوبلازم وتتناقص في القطر. جسم الخلية يحتوي معظم العضيات باستثناء السنتريولات المريكزات. المحور الأسطواني امتداد لجسم العصبون ويحتوي العديد من الميتوكوندريا والأنبيبيات الدقيقة والإنزيمات وينتهي بالأزرار الطرفية التشابكية' },
    { id: 'myelin-sheath', title: 'رابعاً وخامساً وسادساً: الغمد الميليني وخلايا شفان وعقد رانفييه', text: 'الغمد الميليني غلاف رقيق مكوّن من مادة دهنية بروتينية ينشأ من خلايا شفان. عقد رانفييه انغمادات أو مناطق غير مغلفة بالغمد الميليني توجد بين أجزاء الغمد وتسمح بانتقال قفزي سريع للسيال العصبي' },
    { id: 'curriculum-drawings', title: '5. الصور والرسومات التعليمية في الرزمة', text: 'الشكل 1 النسيج العصبي وجود العصبونات والخلايا الدبقية والمادة الرمادية والمادة البيضاء. الشكل 2 تركيب العصبون الزوائد الشجرية وجسم الخلية والمحور الأسطواني والغمد الميليني وخلية شفان وعقد رانفييه والنهايات الطرفية' },
    { id: 'applied-examples', title: '6. أمثلة تطبيقية لفهم الدرس', text: 'المثال الأول فهم وظيفة الزوائد الشجرية. المثال الثاني تحديد اتجاه السيال العصبي الزوائد الشجرية ثم جسم الخلية ثم المحور الأسطواني ثم النهايات الطرفية' },
    { id: 'common-misconceptions', title: '7. الأخطاء والمفاهيم الشائعة', text: 'الزوائد الشجرية تنقل المعلومات باتجاه جسم الخلية. الغمد الميليني مادة دهنية بروتينية. ليس كل المحاور ميلينية بل يوجد ميليني وغير ميليني' },
    { id: 'comprehensive-summary', title: '8. الملخص الشامل للدرس', text: 'نسبة العصبونات 10%، الخلايا الدبقية حول كل عصبون حوالي 10 خلايا، طول بعض العصبونات من عدة مليمترات إلى متر' },
    { id: 'review-questions', title: '9. أسئلة المراجعة والتدريب', text: 'أسئلة الاختيار من متعدد، صح أو خطأ، أكمل الفراغ، علل ما يأتي، أجب عن الأسئلة الآتية' },
    { id: 'final-exam', title: '11. الاختبار النهائي للدرس', text: 'اختبار الوحدة التعليمية لمادة العلوم الحياتية 20 علامة 25 دقيقة' },
    { id: 'references', title: '12. المراجع والمصادر العلمية', text: 'الرزمة التعليمية للعلوم الحياتية الصف الحادي عشر العلمي والزراعي وزارة التربية والتعليم الفلسطينية 2024 ومراجع NCBI' },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 ${fontSizeClass}`}>
      {/* Top Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        readingProgress={readingProgress}
      />

      {/* Main Container with Sticky TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex gap-8 items-start">
        {/* Table of Contents Sidebar */}
        <TableOfContents
          activeSection={activeSection}
          onSelectSection={scrollToSection}
          isOpenMobile={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Central Educational Reading Article */}
        <main className="flex-1 min-w-0 max-w-4xl space-y-12">
          {/* ================= HERO LESSON TITLE & METADATA ================= */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden relative">
            {/* Visual Cover Banner Image */}
            <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-slate-100 dark:border-slate-800">
              <img
                src="/src/assets/images/banner_nervous_system_1794489960931.jpg"
                alt="شبكة الجهاز العصبي البشري"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-semibold text-teal-400 mb-1">
                  {LESSON_META.subject} · {LESSON_META.chapter}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {LESSON_META.lessonTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-mono" dir="ltr">
                  {LESSON_META.sectionCode}
                </p>
              </div>
            </div>

            {/* Official Academic Lesson Information (100% faithful to the source document) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">الصف الدراسي:</span>
                <strong className="text-slate-800 dark:text-slate-200">{LESSON_META.grade}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">العام الدراسي:</span>
                <strong className="text-slate-800 dark:text-slate-200">{LESSON_META.academicYear}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">المنهاج:</span>
                <strong className="text-slate-800 dark:text-slate-200">{LESSON_META.curriculum}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">المدرسة:</span>
                <strong className="text-slate-800 dark:text-slate-200">{LESSON_META.school}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">إعداد الطالب:</span>
                <strong className="text-slate-800 dark:text-slate-200">{LESSON_META.author}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">إشراف الأستاذ:</span>
                <strong className="text-slate-800 dark:text-slate-200">{LESSON_META.supervisor}</strong>
              </div>
            </div>

            {/* Primary Source Reference Box */}
            <div className="mt-4 p-3 bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 rounded-xl text-xs text-teal-900 dark:text-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span><strong>المصدر الأساسي:</strong> {LESSON_META.primarySource}</span>
              </div>
              <span className="text-teal-700 dark:text-teal-300 font-mono text-[11px] shrink-0">
                {LESSON_META.sourceDocName}
              </span>
            </div>
          </div>

          {/* ================= 1. مقدمة الدرس ================= */}
          <section id="intro" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                1. مقدمة الدرس
              </h2>
            </div>

            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                يُعد الجهاز العصبي من أهم أجهزة جسم الإنسان؛ فهو المسؤول عن استقبال المعلومات من البيئة المحيطة ومن داخل الجسم، ومعالجتها، وإصدار الاستجابات المناسبة.
              </p>
              <p>
                ويؤدي هذا الجهاز دوراً أساسياً في تنظيم أنشطة أجهزة الجسم المختلفة والتنسيق فيما بينها، وذلك بالتآزر مع جهاز الغدد الصماء.
              </p>
              <p>
                ويتكون الجهاز العصبي من مليارات الخلايا عالية التخصص، تُسمّى العصبونات (Neurons)، وهي الخلايا المسؤولة عن استقبال المنبهات ونقل المعلومات على هيئة سيالات عصبية.
              </p>
              <p>
                ومن هنا تظهر أهمية دراسة العصبون؛ لأنه يمثل الوحدة الأساسية التي يقوم عليها عمل النسيج العصبي.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>مرجع الفقرة: الرزمة التعليمية الرسمية</span>
              <span className="font-mono">{LESSON_META.sourceDocName}</span>
            </div>
          </section>

          {/* ================= 2. الأهداف التعليمية ================= */}
          <section id="objectives" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <BookmarkCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                2. الأهداف التعليمية
              </h2>
            </div>

            <p className="font-semibold text-slate-900 dark:text-white mb-4 text-sm sm:text-base">
              يتوقع منك بعد دراسة هذا الدرس أن تكون قادراً على:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "1. تعريف العصبون وتوضيح أهميته.",
                "2. تحديد الوحدة التركيبية والوظيفية للنسيج العصبي.",
                "3. توضيح وظيفة الخلايا الدبقية.",
                "4. تسمية أجزاء العصبون وتحديد موقع كل جزء.",
                "5. شرح وظيفة الزوائد الشجرية.",
                "6. توضيح تركيب جسم الخلية ووظائفه.",
                "7. وصف المحور الأسطواني ومكوناته.",
                "8. التمييز بين الألياف الميلينية وغير الميلينية.",
                "9. تعريف الغمد الميليني وخلايا شفان وعقد رانفييه.",
                "10. تحديد اتجاه انتقال السيال العصبي في العصبون."
              ].map((obj, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 rounded-xl flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal">
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 3. المعارف السابقة والتمهيد ================= */}
          <section id="prerequisites" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Lightbulb className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                3. المعارف السابقة والتمهيد
              </h2>
            </div>

            <p className="text-slate-700 dark:text-slate-300 mb-6 text-sm sm:text-base">
              قبل الدخول في تفاصيل العصبون، من المهم استذكار بعض المفاهيم الأساسية:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  أولاً: الخلية
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  الخلية هي الوحدة الأساسية في بناء أجسام الكائنات الحية، وتتكون من تراكيب وعضيات تؤدي وظائف مختلفة.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  ثانياً: السيتوبلازم
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  مادة شبه هلامية توجد داخل الخلية وتحتوي على العديد من العضيات الخلوية.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  ثالثاً: التخصص الخلوي
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  هو اختلاف شكل وتركيب الخلايا بما يتناسب مع الوظيفة التي تؤديها.
                </p>
                <div className="mt-2.5 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                  <strong>مثال:</strong> تختلف الخلية العصبية في شكلها وامتداداتها عن خلايا الجسم الأخرى، وذلك لتتلاءم مع استقبال المعلومات ونقلها.
                </div>
              </div>
            </div>
          </section>

          {/* ================= 4. الشرح التفصيلي للدرس ================= */}
          <section id="detailed-explanation" className="scroll-mt-24 space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Activity className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    4. الشرح التفصيلي للدرس
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    النص الكامل والشامل لجميع مفاهيم وتراكيب العصبون
                  </p>
                </div>
              </div>

              {/* 4.1 العصبون */}
              <div id="neuron-intro" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    أولاً: العصبون (الخلية العصبية) – Neuron
                  </h3>
                  <span className="text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded-md font-semibold">
                    تعريف أساسي ومهم
                  </span>
                </div>

                {/* Definition Box */}
                <div className="p-5 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-2xl">
                  <p className="text-sm sm:text-base font-semibold text-teal-950 dark:text-teal-100 leading-relaxed">
                    <strong>العصبون:</strong> هو الوحدة التركيبية والوظيفية للنسيج العصبي، ويختص باستقبال المنبهات ونقلها والاستجابة لها على صورة سيالات عصبية تصل إلى أعضاء الاستجابة مثل الغدد والعضلات.
                  </p>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300">
                  لفهم هذا التعريف، علينا تحليل أجزائه:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <strong className="text-slate-900 dark:text-white block mb-1">1. الوحدة التركيبية:</strong>
                    <span className="text-slate-600 dark:text-slate-300">يعني أن العصبون يمثل أحد المكونات الأساسية التي يتكون منها النسيج العصبي.</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <strong className="text-slate-900 dark:text-white block mb-1">2. الوحدة الوظيفية:</strong>
                    <span className="text-slate-600 dark:text-slate-300">يعني أنه يؤدي الوظائف الأساسية للنسيج العصبي، مثل استقبال المعلومات ونقلها.</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <strong className="text-slate-900 dark:text-white block mb-1">3. استقبال المنبهات:</strong>
                    <span className="text-slate-600 dark:text-slate-300">المنبه هو مؤثر يحدث تغيراً في البيئة الداخلية أو الخارجية، ويمكن أن تستقبله الخلايا العصبية.</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <strong className="text-slate-900 dark:text-white block mb-1">4. نقل السيالات العصبية:</strong>
                    <span className="text-slate-600 dark:text-slate-300">السيال العصبي هو إشارة تنتقل عبر العصبون لنقل المعلومات من جزء إلى آخر.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block mb-1">5. الوصول إلى أعضاء الاستجابة:</strong>
                  تصل السيالات العصبية إلى أعضاء الاستجابة، مثل:
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                    <li>العضلات.</li>
                    <li>الغدد.</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                  <p><strong>معلومة من الرزمة التعليمية:</strong> يشكل العصبون نحو 10% من النسيج العصبي.</p>
                  <p className="mt-1">كما يمكن أن يتراوح طول بعض العصبونات من عدة مليمترات إلى حوالي متر واحد، وتختلف العصبونات في أحجامها وأشكالها وأطوالها.</p>
                </div>
              </div>
            </div>

            {/* 4.2 الخلايا الدبقية */}
            <div id="glial-cells" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                ثانياً: الخلايا الدبقية (Glial Cells)
              </h3>

              {/* Scientific illustration of Glial Support */}
              <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                  src="/src/assets/images/diagram_glial_support_1794489962081.jpg"
                  alt="الخلايا الدبقية ودعمها للعصبونات والشعيرات الدموية"
                  className="w-full h-auto object-cover max-h-80"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  لا تتكون الأنسجة العصبية من العصبونات وحدها، بل توجد حولها خلايا بنائية داعمة تُسمّى الخلايا الدبقية (Glial Cells).
                </p>
                <p>
                  يوجد حول كل عصبون حوالي عشر خلايا دبقية، وهي تختلف في أشكالها ووظائفها.
                </p>

                {/* Glial Cells Interactive Diagram Component */}
                <GlialCellsDiagram />

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    لماذا يحتاج العصبون إلى الخلايا الدبقية؟
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    لأن العصبون يحتاج إلى بيئة مناسبة تحافظ على عمله، وتوفر له الدعم والغذاء والأكسجين، وتساعد في التخلص من الفضلات.
                  </p>
                  <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <strong>ملاحظة مهمة:</strong> العصبونات لا تُعوّض بسهولة عند فقدانها؛ لأنها لا تمتلك القدرة المعتادة على الانقسام، بخلاف كثير من الخلايا الدبقية.
                  </p>
                </div>
              </div>
            </div>

            {/* 4.3 تركيب العصبون والأجزاء الرئيسة */}
            <div id="neuron-structure" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                ثالثاً: تركيب العصبون
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                يختلف العصبون عن غيره من الخلايا في تركيبه وشكله؛ إذ يحتوي على امتدادات متخصصة تساعده على استقبال المعلومات ونقلها.
              </p>
              <p className="font-semibold text-slate-900 dark:text-white mb-4">
                ويتكون من ثلاثة أجزاء رئيسة:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs sm:text-sm">
                  <strong className="block text-teal-900 dark:text-teal-200 mb-1">1. الزوائد الشجرية:</strong>
                  تستقبل المعلومات وتنقلها باتجاه جسم الخلية.
                </div>
                <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs sm:text-sm">
                  <strong className="block text-teal-900 dark:text-teal-200 mb-1">2. جسم الخلية:</strong>
                  الجزء المركزي الذي يحتوي معظم عضيات الخلية.
                </div>
                <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs sm:text-sm">
                  <strong className="block text-teal-900 dark:text-teal-200 mb-1">3. المحور الأسطواني:</strong>
                  ينقل السيال العصبي بعيداً عن جسم الخلية نحو النهايات الطرفية.
                </div>
              </div>

              {/* Interactive Scientific Neuron Diagram */}
              <NeuronDiagramInteractive />

              {/* Sub-parts detailed breakdown */}
              <div className="mt-8 space-y-6">
                {/* 1. Dendrites */}
                <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    1. الزوائد الشجرية (Dendrites)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <strong>التعريف:</strong> زوائد عصبية متفرعة، تُعد امتدادات للسيتوبلازم، وتتناقص في القطر كلما ابتعدت عن جسم الخلية.
                  </p>
                  <div className="pt-2">
                    <strong className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                      خصائص الزوائد الشجرية:
                    </strong>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pr-1">
                      <li>تكون متفرعة وتشبه أغصان الأشجار، ومن هنا جاءت تسميتها.</li>
                      <li>تُعد امتدادات للسيتوبلازم.</li>
                      <li>يتناقص قطرها كلما ابتعدت عن جسم الخلية.</li>
                      <li>تستقبل المعلومات.</li>
                      <li>تنقل المعلومات باتجاه جسم الخلية.</li>
                    </ol>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <strong className="block text-slate-900 dark:text-white mb-0.5">ما أهمية زيادة عدد التفرعات والتشعبات في الزوائد الشجرية؟</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      تؤدي زيادة التفرعات إلى زيادة مساحة الاستقبال، مما يتيح للعصبون استقبال معلومات واتصالات أكثر من خلايا عصبية أخرى.
                    </p>
                    <p className="mt-2 text-slate-500 italic">
                      <strong>مثال توضيحي:</strong> تخيل شجرة لها أغصان كثيرة؛ فكلما زادت الأغصان، زادت المساحة التي يمكن أن تمتد إليها. وبالمثل، تساعد التفرعات الكثيرة في الزوائد الشجرية على زيادة قدرة العصبون على استقبال المعلومات.
                    </p>
                  </div>
                  <div className="p-2.5 bg-teal-100/70 dark:bg-teal-900/40 text-teal-900 dark:text-teal-200 rounded-lg text-xs font-bold">
                    احفظ هذه النقطة: اتجاه انتقال المعلومات في الزوائد الشجرية يكون باتجاه جسم الخلية.
                  </div>
                </div>

                {/* 2. Cell Body */}
                <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    2. جسم الخلية (Cell Body)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <strong>التعريف:</strong> يشكل جسم الخلية الجزء المركزي في العصبون، ويحتوي معظم عضيات الخلية باستثناء السنتريولات (المريكزات).
                  </p>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <strong>تركيب جسم الخلية:</strong> يحتوي جسم الخلية على معظم العضيات اللازمة للقيام بالعمليات الحيوية.
                    <p className="mt-1 text-slate-600 dark:text-slate-300">ومن أمثلة العضيات التي تساعد على فهم هذا التركيب:</p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 pr-2 text-slate-600 dark:text-slate-300">
                      <li>النواة.</li>
                      <li>الميتوكوندريا.</li>
                      <li>الريبوسومات.</li>
                      <li>الشبكة الإندوبلازمية.</li>
                      <li>جهاز غولجي.</li>
                    </ul>
                    <p className="mt-1 text-[11px] text-slate-400">
                      توضيح إضافي: هذه أمثلة على عضيات الخلية، بينما تكتفي الرزمة بذكر احتواء جسم الخلية على معظم العضيات باستثناء المريكزات.
                    </p>
                  </div>
                  <div className="pt-2">
                    <strong className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                      وظائف جسم الخلية:
                    </strong>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pr-1">
                      <li>إجراء العمليات الأيضية اللازمة للخلية.</li>
                      <li>تزويد الخلية بالطاقة اللازمة لعملها.</li>
                      <li>إنتاج البروتين والنواقل العصبية.</li>
                    </ol>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                    <p><strong>ما المقصود بالعمليات الأيضية؟</strong> هي مجموعة التفاعلات الكيميائية التي تحدث داخل الخلية، وتساعدها على أداء وظائفها والمحافظة على نشاطها.</p>
                    <p className="pt-1 border-t border-slate-100 dark:border-slate-700">
                      <strong>لماذا لا يستطيع العصبون الانقسام؟</strong> لأن العصبونات الناضجة تكون شديدة التخصص وتخرج عادةً من دورة الانقسام الخلوي، ولذلك لا تستطيع الانقسام كمعظم الخلايا الأخرى. ويذكر الكتاب أيضاً أن جسم الخلية يحتوي معظم العضيات باستثناء المريكزات. ولا ينبغي اعتبار غياب المريكزات وحده تفسيراً كاملاً لعدم انقسام العصبون.
                    </p>
                  </div>
                </div>

                {/* 3. Axon */}
                <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      3. المحور الأسطواني (Axon)
                    </h4>
                    <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                      جزء مهم جداً في تركيب العصبون
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <strong>التعريف:</strong> المحور الأسطواني هو امتداد لجسم العصبون، ويحتوي العديد من الميتوكوندريا والأنبيبيات الدقيقة والإنزيمات، وينتهي بنهايات طرفية تحوي الأزرار الطرفية التشابكية.
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <strong className="text-slate-900 dark:text-white block">مكونات المحور الأسطواني:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <strong>أ. الميتوكوندريا (Mitochondria):</strong> عضيات تساعد على إنتاج الطاقة اللازمة للعمليات الحيوية داخل الخلية.
                      </div>
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <strong>ب. الأنبيبيات الدقيقة (Microtubules):</strong> تراكيب دقيقة تسهم في التنظيم الداخلي للامتداد العصبي، وتساعد على النقل داخل العصبون.
                      </div>
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <strong>ج. الإنزيمات (Enzymes):</strong> تساعد على حدوث التفاعلات الكيميائية الحيوية اللازمة لعمل الخلية.
                      </div>
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <strong>د. النهايات الطرفية:</strong> هي نهايات المحور الأسطواني، وتحتوي على تراكيب تُسمّى الأزرار الطرفية التشابكية.
                      </div>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                      <strong>هـ. الأزرار الطرفية التشابكية (Synaptic Buttons):</strong> توجد في نهاية المحور الأسطواني، وتمثل مناطق اتصال متخصصة تساعد على انتقال المعلومات إلى الخلايا الأخرى.
                      <p className="mt-1 text-slate-500">توضيح إضافي: تحتوي هذه النهايات على حويصلات للنواقل العصبية التي تساعد على نقل الرسالة عبر التشابك العصبي.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 rounded-xl text-xs sm:text-sm">
                    <p className="font-bold text-teal-950 dark:text-teal-200 mb-1">ما اتجاه انتقال السيال العصبي في المحور الأسطواني؟</p>
                    <p className="text-teal-900 dark:text-teal-300">ينتقل السيال العصبي بعيداً عن جسم الخلية باتجاه النهايات الطرفية.</p>
                    <div className="mt-3 pt-3 border-t border-teal-200/80 dark:border-teal-800/80 text-center font-bold text-teal-800 dark:text-teal-200">
                      إذن يكون المسار العام للسيال العصبي:
                      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded shadow-xs">الزوائد الشجرية</span>
                        <span>←</span>
                        <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded shadow-xs">جسم الخلية</span>
                        <span>←</span>
                        <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded shadow-xs">المحور الأسطواني</span>
                        <span>←</span>
                        <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded shadow-xs">الأزرار الطرفية التشابكية</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4.4 & 4.5 & 4.6 الغمد الميليني وخلايا شفان وعقد رانفييه */}
            <div id="myelin-sheath" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                رابعاً: الغمد الميليني (Myelin Sheath)
              </h3>

              {/* Scientific illustration of Myelin cross-section */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                  src="/src/assets/images/diagram_myelin_axon_1794489961675.jpg"
                  alt="مقطع تشريحي للغمد الميليني وخلية شفان وعقدة رانفييه"
                  className="w-full h-auto object-cover max-h-80"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  يحيط ببعض المحاور الأسطوانية غلاف رقيق مكوّن من مادة دهنية بروتينية، يُسمّى الغمد الميليني.
                </p>
                <p>
                  وينشأ هذا الغمد من خلايا تُسمّى خلايا شفان (Schwann Cells).
                </p>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">تركيب الغمد الميليني:</h4>
                  <p>
                    يتكون الغمد الميليني من مادة دهنية بروتينية، وتحيط هذه المادة ببعض أجزاء المحور الأسطواني.
                  </p>
                  <p>
                    وتنتظم الأجزاء المغلفة على امتداد المحور، مع وجود مناطق غير مغلفة بينها.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">أهمية الغمد الميليني:</h4>
                  <p>الغمد الميليني يؤدي وظائف مهمة، منها:</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300 pr-1">
                    <li>يعمل عازلاً حول المحور الأسطواني.</li>
                    <li>يساعد على زيادة سرعة انتقال السيال العصبي.</li>
                    <li>يساعد على المحافظة على كفاءة انتقال الإشارة العصبية.</li>
                  </ol>
                  <p className="text-[11px] text-slate-400 pt-1">
                    وتؤكد المراجع العلمية أن العزل الذي يوفره الغمد الميليني يزيد سرعة انتقال السيال العصبي.
                  </p>
                </div>

                {/* خامساً: خلايا شفان */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    خامساً: خلايا شفان (Schwann Cells)
                  </h4>
                  <p><strong>التعريف:</strong> خلايا تسهم في تكوين الغمد الميليني المحيط ببعض المحاور الأسطوانية.</p>
                  <p><strong>أهميتها:</strong> تنتج المادة التي تكوّن الغمد الميليني، وتساعد على دعم المحور العصبي وعزله.</p>
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 rounded-lg text-xs">
                    <strong>مهم:</strong> لا تخلط بين خلية شفان والغمد الميليني:
                    <ul className="list-disc list-inside mt-1 pr-1">
                      <li>خلية شفان: الخلية التي تسهم في تكوين الغمد.</li>
                      <li>الغمد الميليني: المادة الدهنية البروتينية التي تحيط بالمحور.</li>
                    </ul>
                  </div>
                </div>

                {/* سادساً: عقد رانفييه */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    سادساً: عقد رانفييه (Nodes of Ranvier)
                  </h4>
                  <p><strong>التعريف:</strong> هي انغمادات أو مناطق غير مغلفة بالغمد الميليني، توجد بين أجزاء الغمد على طول المحور الأسطواني.</p>
                  <p><strong>أهميتها:</strong> تسهم في انتقال السيال العصبي بسرعة أكبر عبر الألياف الميلينية؛ إذ ينتقل جهد الفعل بطريقة قفزية بين عقد رانفييه.</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>لماذا توجد عقد رانفييه؟</strong> لأن الغمد الميليني لا يغطي المحور الأسطواني بصورة متصلة، وإنما يترك مناطق مكشوفة بين أجزائه.
                  </p>
                </div>
              </div>
            </div>

            {/* 4.7 الألياف الميلينية وغير الميلينية */}
            <div id="nerve-fibers-comparison" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                سابعاً: الألياف العصبية الميلينية وغير الميلينية
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                يقسم المحور الأسطواني، من حيث وجود الغمد الميليني أو عدمه، إلى نوعين:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl">
                  <strong className="text-teal-900 dark:text-teal-200 block mb-1">الألياف الميلينية (Myelinated Fibers):</strong>
                  تحتوي محاورها الأسطوانية على غمد ميليني، وتوجد بينها عقد رانفييه.
                </div>
                <div className="p-4 bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <strong className="text-slate-900 dark:text-white block mb-1">الألياف غير الميلينية (Unmyelinated Fibers):</strong>
                  تخلو محاورها الأسطوانية من الغمد الميليني.
                </div>
              </div>

              {/* Comparison Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  مقارنة بين النوعين
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-right text-xs sm:text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                      <tr>
                        <th className="p-3">وجه المقارنة</th>
                        <th className="p-3">الألياف الميلينية</th>
                        <th className="p-3">الألياف غير الميلينية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-semibold">الغمد الميليني</td>
                        <td className="p-3">موجود</td>
                        <td className="p-3">غير موجود</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">خلايا شفان</td>
                        <td className="p-3">تسهم في تكوين الغمد</td>
                        <td className="p-3">لا يتكون غمد ميليني حول المحور</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">عقد رانفييه</td>
                        <td className="p-3">موجودة</td>
                        <td className="p-3">لا توجد عقد ناتجة عن انقطاع الغمد</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">سرعة انتقال السيال</td>
                        <td className="p-3 text-teal-600 dark:text-teal-400 font-bold">أعلى عادةً</td>
                        <td className="p-3">أقل عادةً</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  توضيح المقارنة المتعلقة بسرعة الانتقال مستند إلى المرجع العلمي الإضافي، وليست جميع تفاصيلها مذكورة نصاً في الصفحات المحددة.
                </p>
              </div>

              {/* Interactive Speed Comparison Visualizer */}
              <MyelinComparisonVisualizer />
            </div>
          </section>

          {/* ================= 5. الصور والرسومات التعليمية في الرزمة ================= */}
          <section id="curriculum-drawings" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  5. الصور والرسومات التعليمية في الرزمة
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  تحتوي الصفحات المحددة على رسمين رئيسين يُنصح بالاعتماد عليهما أثناء الدراسة.
                </p>
              </div>
            </div>

            {/* Drawing 1 */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                الشكل (1): النسيج العصبي
              </h3>
              <p className="text-xs text-slate-500">المصدر الأصلي: الرزمة التعليمية، صفحة الكتاب 25.</p>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <strong>ماذا يوضح؟</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 pr-1">
                  <li>وجود العصبونات داخل النسيج العصبي.</li>
                  <li>وجود الخلايا الدبقية.</li>
                  <li>العلاقة بين العصبونات والخلايا الداعمة.</li>
                  <li>وجود المادة الرمادية والمادة البيضاء في المقطع الموضح.</li>
                </ul>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {LESSON_META.sourceDocName}
              </div>
            </div>

            {/* Drawing 2 */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                الشكل (2): تركيب العصبون
              </h3>
              <p className="text-xs text-slate-500">المصدر الأصلي: الرزمة التعليمية، صفحة الكتاب 26.</p>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <strong>ماذا يوضح؟</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 pr-1">
                  <li>الزوائد الشجرية.</li>
                  <li>جسم الخلية والسيتوبلازم.</li>
                  <li>الميتوكوندريا.</li>
                  <li>المحور الأسطواني.</li>
                  <li>الغمد الميليني.</li>
                  <li>خلية شفان.</li>
                  <li>عقد رانفييه.</li>
                  <li>النهايات الطرفية.</li>
                  <li>اتجاه السيال العصبي.</li>
                </ul>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {LESSON_META.sourceDocName}
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              الرسومات المصغرة أعلاه للتوضيح، أما رسما الكتاب الأصليان فيمكن الرجوع إليهما مباشرة في ملف PDF المرفق.
            </p>
          </section>

          {/* ================= 6. أمثلة تطبيقية لفهم الدرس ================= */}
          <section id="applied-examples" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                6. أمثلة تطبيقية لفهم الدرس
              </h2>
            </div>

            <div className="space-y-4">
              {/* Example 1 */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  المثال الأول: فهم وظيفة الزوائد الشجرية
                </h3>
                <p className="text-slate-700 dark:text-slate-300">استقبل عصبون معلومات من خلية عصبية أخرى عبر زوائده الشجرية.</p>
                <p className="font-semibold text-slate-900 dark:text-white">السؤال: إلى أين تنتقل هذه المعلومات؟</p>
                <p className="text-teal-700 dark:text-teal-300 font-bold">الحل: تنتقل باتجاه جسم الخلية.</p>
                <p className="text-slate-600 dark:text-slate-400">السبب: لأن الزوائد الشجرية متخصصة في استقبال المعلومات ونقلها باتجاه جسم الخلية.</p>
              </div>

              {/* Example 2 */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  المثال الثاني: تحديد اتجاه السيال العصبي
                </h3>
                <p className="text-slate-700 dark:text-slate-300">لديك عصبون يتكون من زوائد شجرية وجسم خلية ومحور أسطواني.</p>
                <p className="font-semibold text-slate-900 dark:text-white">السؤال: ما المسار الذي يسلكه السيال العصبي؟</p>
                <p className="text-teal-700 dark:text-teal-300 font-bold">الحل: الزوائد الشجرية ← جسم الخلية ← المحور الأسطواني ← النهايات الطرفية.</p>
              </div>

              {/* Example 3 */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  المثال الثالث: تحديد وظيفة الغمد الميليني
                </h3>
                <p className="text-slate-700 dark:text-slate-300">إذا كان لدينا محور أسطواني محاط بغمد ميليني، ومحور آخر لا يحتوي على هذا الغمد.</p>
                <p className="font-semibold text-slate-900 dark:text-white">السؤال: أيهما أسرع في نقل السيال العصبي عادةً؟</p>
                <p className="text-teal-700 dark:text-teal-300 font-bold">الحل: المحور الأسطواني المغلف بالغمد الميليني.</p>
                <p className="text-slate-600 dark:text-slate-400">السبب: لأن الغمد الميليني يعزل المحور ويساعد على زيادة سرعة انتقال السيال العصبي.</p>
              </div>

              {/* Example 4 */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  المثال الرابع: أهمية الخلايا الدبقية
                </h3>
                <p className="text-slate-700 dark:text-slate-300">إذا لم تحصل العصبونات على الدعم الغذائي والأكسجين، ولم يتم التخلص من الفضلات الناتجة عن نشاطها.</p>
                <p className="font-semibold text-slate-900 dark:text-white">السؤال: أي خلايا تسهم في هذه الوظائف؟</p>
                <p className="text-teal-700 dark:text-teal-300 font-bold">الحل: الخلايا الدبقية.</p>
                <p className="text-slate-600 dark:text-slate-400">السبب: لأنها تساعد في دعم العصبونات وإمدادها بالغذاء والأكسجين ونقل الفضلات إلى الدم.</p>
              </div>
            </div>
          </section>

          {/* ================= 7. الأخطاء والمفاهيم الشائعة ================= */}
          <section id="common-misconceptions" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                7. الأخطاء والمفاهيم الشائعة
              </h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <tr>
                    <th className="p-3 w-1/2">الخطأ الشائع</th>
                    <th className="p-3 w-1/2 text-teal-700 dark:text-teal-300">التصحيح العلمي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">الزوائد الشجرية تنقل المعلومات بعيداً عن جسم الخلية.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">تنقل المعلومات باتجاه جسم الخلية.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">جسم الخلية هو المحور الأسطواني.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">جسم الخلية جزء مركزي، والمحور امتداد له.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">الغمد الميليني يتكون من السيتوبلازم.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">هو مادة دهنية بروتينية.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">عقد رانفييه هي النهايات الطرفية.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">هي مناطق غير مغلفة بين أجزاء الغمد الميليني.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">جميع المحاور الأسطوانية ميلينية.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">يوجد منها ميليني وغير ميليني.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">خلايا شفان هي نفسها عقد رانفييه.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">خلايا شفان تسهم في تكوين الغمد، وعقد رانفييه فجوات غير مغلفة.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">الخلايا الدبقية تستقبل وتنقل السيالات بالطريقة نفسها التي تقوم بها العصبونات.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">وظيفتها الأساسية في هذه الصفحات هي الدعم والربط والتغذية والمساعدة في التخلص من الفضلات.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600 dark:text-rose-400">كلما ابتعدنا عن جسم الخلية زاد قطر الزوائد الشجرية.</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-300 font-medium">يتناقص قطرها كلما ابتعدت عنه.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= 8. الملخص الشامل للدرس ================= */}
          <section id="comprehensive-summary" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <BookmarkCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                8. الملخص الشامل للدرس
              </h2>
            </div>

            {/* Definitions Summary Table */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                أهم التعريفات
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                    <tr>
                      <th className="p-3 w-1/3">المصطلح</th>
                      <th className="p-3 w-2/3">التعريف</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">العصبون</td>
                      <td className="p-3">الوحدة التركيبية والوظيفية للنسيج العصبي.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">الخلايا الدبقية</td>
                      <td className="p-3">خلايا بنائية داعمة تحيط بالعصبونات.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">الزوائد الشجرية</td>
                      <td className="p-3">امتدادات سيتوبلازمية متفرعة تستقبل المعلومات.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">جسم الخلية</td>
                      <td className="p-3">الجزء المركزي من العصبون ويحتوي معظم عضياته.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">المحور الأسطواني</td>
                      <td className="p-3">امتداد لجسم العصبون ينقل السيال العصبي باتجاه النهايات الطرفية.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">الغمد الميليني</td>
                      <td className="p-3">طبقة دهنية بروتينية تحيط ببعض المحاور الأسطوانية.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">خلايا شفان</td>
                      <td className="p-3">خلايا تسهم في تكوين الغمد الميليني.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">عقد رانفييه</td>
                      <td className="p-3">مناطق غير مغلفة بالغمد الميليني.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-700 dark:text-teal-300">الأزرار الطرفية التشابكية</td>
                      <td className="p-3">تراكيب توجد في نهايات المحور الأسطواني.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Review Card */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                بطاقة مراجعة سريعة
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-400 block mb-1">نسبة العصبونات من النسيج العصبي</span>
                  <span className="text-3xl font-black text-teal-600 dark:text-teal-400 font-mono">10%</span>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-400 block mb-1">الخلايا الدبقية حول كل عصبون</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-100">حوالي 10 خلايا</span>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-400 block mb-1">طول بعض العصبونات</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-100">عدة مليمترات إلى متر</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong className="block text-slate-900 dark:text-white mb-1">أجزاء العصبون الثلاثة:</strong>
                  <ol className="list-decimal list-inside space-y-0.5 text-slate-600 dark:text-slate-300">
                    <li>الزوائد الشجرية.</li>
                    <li>جسم الخلية.</li>
                    <li>المحور الأسطواني.</li>
                  </ol>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong className="block text-slate-900 dark:text-white mb-1">اتجاه انتقال السيال العصبي:</strong>
                  <p className="text-teal-700 dark:text-teal-300 font-bold mt-1">
                    الزوائد الشجرية ← جسم الخلية ← المحور الأسطواني ← النهايات الطرفية.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 9, 10, 11: PRACTICE QUESTIONS, MODEL ANSWERS & EXAM ================= */}
          <PracticeSection />

          {/* ================= 12. المراجع والمصادر العلمية ================= */}
          <section id="references" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                12. المراجع والمصادر العلمية
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  أولاً: المصدر الأساسي – المنهاج الفلسطيني
                </h3>
                <p>
                  الرزمة التعليمية للعلوم الحياتية، الصف الحادي عشر العلمي والزراعي، وزارة التربية والتعليم الفلسطينية، إصدار 2024.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 pr-1">
                  <li>الصفحة المطبوعة 24: مقدمة الفصل الثالث وأهدافه.</li>
                  <li>الصفحة المطبوعة 25: تعريف العصبون والخلايا الدبقية والزوائد الشجرية.</li>
                  <li>الصفحة المطبوعة 26: جسم الخلية والمحور الأسطواني والغمد الميليني وخلايا شفان وعقد رانفييه.</li>
                </ul>
                <div className="text-[11px] text-slate-400 font-mono">
                  {LESSON_META.sourceDocName}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  ثانياً: مراجع علمية مساندة
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  استُخدمت لتوضيح بعض النقاط التي طرحتها الرزمة في صورة أسئلة دون تقديم إجابات تفصيلية لها:
                </p>
                <ol className="list-decimal list-inside space-y-2 pr-1">
                  <li>
                    <a
                      href="https://www.ncbi.nlm.nih.gov/books/NBK544316/?utm_source=chatgpt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 font-mono text-xs"
                      dir="ltr"
                    >
                      Histology, Schwann Cells – NCBI Bookshelf
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="mr-2">: خلايا شفان والغمد الميليني.</span>
                  </li>
                  <li>
                    <a
                      href="https://www.ncbi.nlm.nih.gov/books/NBK537273/?utm_source=chatgpt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 font-mono text-xs"
                      dir="ltr"
                    >
                      Neuroanatomy, Nodes of Ranvier – NCBI Bookshelf
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="mr-2">: عقد رانفييه ووظيفتها.</span>
                  </li>
                  <li>
                    <a
                      href="https://www.ncbi.nlm.nih.gov/books/NBK551652/?utm_source=chatgpt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 font-mono text-xs"
                      dir="ltr"
                    >
                      Physiology, Nerve – NCBI Bookshelf
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="mr-2">: تركيب العصبون وانتقال الإشارات العصبية.</span>
                  </li>
                  <li>
                    <a
                      href="https://www.ncbi.nlm.nih.gov/books/NBK10920/?utm_source=chatgpt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 font-mono text-xs"
                      dir="ltr"
                    >
                      Generation of Neurons in the Adult Brain – NCBI Bookshelf
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="mr-2">: تخصص العصبونات وعدم انقسام العصبونات الناضجة عادةً.</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* ================= 13. المراجعة النهائية وضبط الدقة العلمية ================= */}
          <section id="quality-checklist" className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <BookmarkCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                13. المراجعة النهائية وضبط الدقة العلمية
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-3">
                  قائمة التحقق من إعداد الدرس
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    "الاعتماد على الصفحات المطبوعة 24–26 من الرزمة المرفقة.",
                    "تغطية تعريف العصبون وتركيبه وأجزائه.",
                    "شرح الخلايا الدبقية ووظائفها.",
                    "شرح الغمد الميليني وعقد رانفييه.",
                    "توضيح اتجاه انتقال السيال العصبي.",
                    "إعداد أمثلة تطبيقية وتدريبات متنوعة.",
                    "إرفاق إجابات الأسئلة ونموذج الاختبار.",
                    "إضافة مراجع علمية للتوضيحات الإضافية."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-white block">حدود المحتوى:</strong>
                <p>
                  الصفحات التي حددتها تتناول مقدمة الجهاز العصبي والقسم 1.3 الخاص بالعصبون وتركيبه. أما أنواع الخلايا العصبية وآلية تولّد السيال العصبي وتركيب الجهاز العصبي بالتفصيل، فهي موضوعات لاحقة في الرزمة، ولذلك لم أدرجها ضمن الشرح الأساسي لهذا الدرس.
                </p>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl space-y-1">
                <strong className="text-teal-950 dark:text-teal-200 block">نصيحتي للمذاكرة:</strong>
                <p className="text-teal-900 dark:text-teal-300">
                  أعطِ اهتماماً خاصاً للشكل رقم (2) في الصفحة 26؛ لأنه يجمع معظم المصطلحات المطلوبة في هذا الدرس، وتدرّب على تسمية كل جزء وذكر وظيفته دون الرجوع إلى الكتاب.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 pb-12 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              {LESSON_META.lessonTitle} · المنهاج الفلسطيني
            </p>
            <p>
              إعداد: {LESSON_META.author} · إشراف: {LESSON_META.supervisor} · {LESSON_META.school} ({LESSON_META.academicYear})
            </p>
            <p className="text-[11px] text-slate-400">
              تصميم وبناء تفاعلي فائق الدقة وفق فلسفة NASEEM FLOW مع الحفاظ الكامل بنسبة 100% على النص التعليمي الأصلي.
            </p>
          </footer>
        </main>
      </div>

      {/* Floating Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-30 p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:border-teal-500 transition-all group"
        title="العودة للأعلى"
        aria-label="العودة إلى أعلى الصفحة"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        contentBlocks={contentBlocks}
        onSelectResult={scrollToSection}
      />
    </div>
  );
}
