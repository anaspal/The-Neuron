import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Zap, Gauge } from 'lucide-react';

export default function MyelinComparisonVisualizer() {
  const [isRacing, setIsRacing] = useState(false);
  const [posMyelinated, setPosMyelinated] = useState(0);
  const [posUnmyelinated, setPosUnmyelinated] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRacing) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      let finished = false;

      setPosMyelinated((prev) => {
        const next = prev + delta * 95; // Myelinated is fast
        if (next >= 100) {
          finished = true;
          return 100;
        }
        return next;
      });

      setPosUnmyelinated((prev) => {
        const next = prev + delta * 22; // Unmyelinated is slow
        return Math.min(100, next);
      });

      if (finished) {
        setIsRacing(false);
        setHasFinished(true);
      } else {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRacing]);

  const handleStart = () => {
    setPosMyelinated(0);
    setPosUnmyelinated(0);
    setHasFinished(false);
    setIsRacing(true);
  };

  const handleReset = () => {
    setIsRacing(false);
    setPosMyelinated(0);
    setPosUnmyelinated(0);
    setHasFinished(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">محاكاة مقارنة السرعة</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">سابعاً: الألياف العصبية الميلينية وغير الميلينية</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            مقارنة سرعة انتقال السيال العصبي بين الألياف
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStart}
            disabled={isRacing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white shadow-md shadow-teal-600/20 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{hasFinished ? 'إعادة تشغيل المقارنة' : 'بدء مقارنة السرعة'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="إعادة ضبط"
            aria-label="إعادة ضبط"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Track 1: Myelinated Fiber */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                الألياف الميلينية (Myelinated Fibers)
              </h4>
              <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                (نقل قفزي فائق السرعة عبر عقد رانفييه)
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
              <Gauge className="w-3.5 h-3.5" />
              <span>أعلى عادةً (~120 م/ث)</span>
            </div>
          </div>

          {/* Fiber visual track */}
          <div className="relative h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center px-4">
            {/* Axon base line */}
            <div className="absolute left-4 right-4 h-2.5 bg-sky-900 rounded-full" />

            {/* Myelin sheaths on track */}
            <div className="absolute left-6 right-6 flex justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-16 h-8 -mt-2.5 bg-gradient-to-b from-amber-200 via-orange-400 to-amber-700 rounded-md border border-orange-200/50 shadow-sm flex items-center justify-center text-[10px] text-white font-bold"
                >
                  غمـد
                </div>
              ))}
            </div>

            {/* Impulse Particle */}
            <div
              className="absolute h-8 w-8 -ml-4 flex items-center justify-center transition-all duration-75"
              style={{
                left: `calc(1rem + ${posMyelinated}% * 0.92)`,
                transform: `translateY(${Math.sin((posMyelinated % 20) / 20 * Math.PI) * -8}px)`
              }}
            >
              <div className="w-6 h-6 rounded-full bg-yellow-300 shadow-[0_0_16px_#fde047] flex items-center justify-center animate-pulse">
                <Zap className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Track 2: Unmyelinated Fiber */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                الألياف غير الميلينية (Unmyelinated Fibers)
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                (نقل مستمر تدريجي على طول المحور بدون عزل)
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Gauge className="w-3.5 h-3.5" />
              <span>أقل عادةً (~1-2 م/ث)</span>
            </div>
          </div>

          {/* Fiber visual track */}
          <div className="relative h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center px-4">
            {/* Axon continuous uninsulated bar */}
            <div className="absolute left-4 right-4 h-4 bg-slate-700 rounded-full border border-slate-600" />

            {/* Continuous conduction markers */}
            <div className="absolute left-6 right-6 flex justify-between pointer-events-none opacity-30">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-1 h-3 bg-slate-400 rounded" />
              ))}
            </div>

            {/* Impulse Particle */}
            <div
              className="absolute h-8 w-8 -ml-4 flex items-center justify-center transition-all duration-75"
              style={{
                left: `calc(1rem + ${posUnmyelinated}% * 0.92)`
              }}
            >
              <div className="w-5 h-5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] flex items-center justify-center">
                <Zap className="w-3 h-3 text-slate-950 fill-slate-950" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasFinished && (
        <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 rounded-xl text-xs text-teal-900 dark:text-teal-200 flex items-center justify-between">
          <span>
            <strong>النتيجة العلمية:</strong> وصل السيال في الألياف الميلينية أسرع بعدة أضعاف؛ لأن الغمد الميليني يعمل عازلاً، وينتقل جهد الفعل بطريقة قفزية بين عقد رانفييه.
          </span>
        </div>
      )}
    </div>
  );
}
