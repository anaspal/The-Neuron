import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { searchLessonContent, SearchItem } from '../utils/quiz';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentBlocks: { id: string; title: string; text: string }[];
  onSelectResult: (sectionId: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  contentBlocks,
  onSelectResult,
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const res = searchLessonContent(query, contentBlocks);
    setResults(res);
  }, [query, contentBlocks]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden mt-12 sm:mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في نص الدرس كاملاً (مثال: الغمد الميليني، خلايا شفان، الزوائد الشجرية)..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            aria-label="البحث في نص الدرس"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim().length > 0 && results.length === 0 && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              لم يتم العثور على نتائج مطابقة لـ &quot;{query}&quot;. حاول البحث بمصطلح علمي آخر.
            </div>
          )}

          {query.trim().length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
              اكتب كلمة أو عبارة من نص الدرس الأصلي للبحث الفوري والانتقال المباشر.
            </div>
          )}

          {results.map((res, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectResult(res.sectionId);
                onClose();
              }}
              className="w-full text-right p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 hover:border-teal-500/50 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-all flex items-start justify-between gap-3 group"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">
                  {res.sectionTitle}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {res.textSnippet}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 shrink-0 mt-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
