import React from 'react';
import { SECTIONS_NAV } from '../data/lessonContent';
import { Bookmark, ChevronLeft } from 'lucide-react';

interface TableOfContentsProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function TableOfContents({
  activeSection,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
}: TableOfContentsProps) {
  const content = (
    <div className="p-4 sm:p-5">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
        <Bookmark className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          فهرس محتويات الدرس
        </h3>
      </div>

      <nav className="space-y-1">
        {SECTIONS_NAV.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => {
                onSelectSection(sec.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full text-right px-3 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-between group ${
                isActive
                  ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-bold border-r-2 border-teal-600 dark:border-teal-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span className="truncate">{sec.title}</span>
              <ChevronLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                isActive ? 'opacity-100 text-teal-600 dark:text-teal-400' : 'text-slate-400'
              }`} />
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-10 overflow-y-auto">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
