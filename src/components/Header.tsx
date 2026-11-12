import React from 'react';
import { Sun, Moon, Search, BookOpen, Menu, X, ArrowUp } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  onChangeFontSize: (size: 'sm' | 'base' | 'lg' | 'xl') => void;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  readingProgress: number;
}

export default function Header({
  isDark,
  onToggleTheme,
  fontSize,
  onChangeFontSize,
  onOpenSearch,
  onToggleSidebar,
  isSidebarOpen,
  readingProgress,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="قائمة الفهرس"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a href="#intro" className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg tracking-tight whitespace-nowrap shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span>العصبون | الخلية العصبية</span>
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#intro" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0">
            مقدمة الدرس
          </a>
          <a href="#detailed-explanation" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0">
            الشرح التفصيلي
          </a>
          <a href="#curriculum-drawings" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0">
            الرسومات والتركيب
          </a>
          <a href="#review-questions" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0">
            أسئلة المراجعة
          </a>
          <a href="#final-exam" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0">
            الاختبار النهائي
          </a>
        </nav>

        {/* Zone 3: 1 Primary Actions Area (Search, Font Sizing, Theme Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-teal-400 dark:hover:border-teal-500 text-xs transition-colors"
            title="بحث في نص الدرس (Ctrl+K)"
            aria-label="البحث في الدرس"
          >
            <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">بحث في الدرس</span>
            <span className="hidden sm:inline text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-400">
              ⌘K
            </span>
          </button>

          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onChangeFontSize('sm')}
              className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
              title="خط صغير"
              aria-label="خط صغير"
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('base')}
              className={`px-2 py-1 rounded ${fontSize === 'base' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
              title="خط افتراضي"
              aria-label="خط قياسي"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('lg')}
              className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
              title="خط كبير"
              aria-label="خط كبير"
            >
              A+
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
            aria-label={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Reading Progress Indicator Bar */}
      <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
    </header>
  );
}
