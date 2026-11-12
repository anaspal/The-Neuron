import React, { useState } from 'react';
import { ShieldCheck, HeartPulse, RefreshCw, Activity, Layers } from 'lucide-react';

export default function GlialCellsDiagram() {
  const [activeFunction, setActiveFunction] = useState<number>(1);

  const functions = [
    {
      id: 1,
      title: '1. ربط العصبونات ببعضها البعض',
      desc: 'تعمل على توفير الترابط والدعم بين العصبونات داخل النسيج العصبي.',
      icon: Layers,
      color: 'teal'
    },
    {
      id: 2,
      title: '2. دعم النسيج العصبي',
      desc: 'تساعد في المحافظة على البنية الداعمة للنسيج العصبي وثباته الميكانيكي.',
      icon: ShieldCheck,
      color: 'blue'
    },
    {
      id: 3,
      title: '3. إمداد العصبونات بالغذاء',
      desc: 'تسهم في توفير المواد الغذائية اللازمة للعصبونات (مثل الجلوكوز المستمد من الشعيرات الدموية).',
      icon: HeartPulse,
      color: 'amber'
    },
    {
      id: 4,
      title: '4. إمداد العصبونات بالأكسجين',
      desc: 'تساعد في توفير الأكسجين الضروري للعمليات الحيوية وإنتاج الطاقة ATP.',
      icon: Activity,
      color: 'emerald'
    },
    {
      id: 5,
      title: '5. نقل الفضلات',
      desc: 'تسهم في نقل الفضلات الناتجة عن نشاط العصبونات، مثل ثاني أكسيد الكربون، إلى الدم.',
      icon: RefreshCw,
      color: 'rose'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">نموذج تفاعلي توضيحي</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">النسبة: 1 عصبون إلى ~10 خلايا دبقية</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            الخلايا الدبقية (Glial Cells) ووظائفها الحيوية الخمس
          </h3>
        </div>
        <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-medium self-start sm:self-auto">
          تشكل العصبونات ~10% فقط من النسيج العصبي والباقي خلايا دبقية
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Visual SVG schematic */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[300px]">
          <svg viewBox="0 0 600 400" className="w-full h-full select-none">
            <defs>
              <radialGradient id="astroGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </radialGradient>
              <linearGradient id="capillaryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>

            {/* Blood Capillary on Right */}
            <path
              d="M 520 20 C 490 120, 530 280, 500 380"
              stroke="url(#capillaryGrad)"
              strokeWidth="48"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            {/* Capillary details */}
            <path
              d="M 520 20 C 490 120, 530 280, 500 380"
              stroke="#fca5a5"
              strokeWidth="6"
              strokeDasharray="14,10"
              fill="none"
            />
            <text x="500" y="390" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
              شعيرة دموية (الدم)
            </text>

            {/* Neuron on Left */}
            <g transform="translate(100, 200)">
              {/* Soma */}
              <circle r="44" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
              <circle r="18" fill="#1e293b" />
              <circle r="6" fill="#7dd3fc" />
              <text x="0" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                عصبون
              </text>
              {/* Axon */}
              <path d="M 0 44 L 0 160" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
              {/* Dendrites */}
              <path d="M -30 -30 L -80 -70 M -10 -42 L -30 -100 M 30 -30 L 70 -80 M -42 0 L -90 0" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Central Glial Cell (Astrocyte) */}
            <g transform="translate(320, 180)">
              {/* Astrocyte Endfeet reaching to Capillary */}
              <path
                d="M 0 0 C 80 -40, 140 -20, 190 -40"
                stroke={activeFunction === 3 || activeFunction === 4 ? '#facc15' : '#10b981'}
                strokeWidth={activeFunction === 3 || activeFunction === 4 ? '7' : '4.5'}
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx="190" cy="-40" rx="10" ry="16" fill="#059669" />

              <path
                d="M 0 0 C 70 30, 130 50, 180 80"
                stroke={activeFunction === 5 ? '#f43f5e' : '#10b981'}
                strokeWidth={activeFunction === 5 ? '7' : '4.5'}
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx="180" cy="80" rx="10" ry="16" fill="#059669" />

              {/* Astrocyte Endfeet reaching to Neuron */}
              <path
                d="M 0 0 C -80 -20, -140 0, -180 20"
                stroke={activeFunction === 1 || activeFunction === 2 ? '#38bdf8' : '#10b981'}
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx="-180" cy="20" rx="12" ry="8" fill="#059669" />

              {/* Astrocyte Body and Star Radiations */}
              <circle r="36" fill="url(#astroGrad)" stroke="#6ee7b7" strokeWidth="2.5" />
              <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                خلية دبقية
              </text>
              <text x="0" y="18" fill="#d1fae5" fontSize="9" textAnchor="middle">
                (نجمية)
              </text>

              {/* Star-like branches */}
              <path d="M 0 -36 L 0 -70 M -25 -25 L -50 -55 M 25 -25 L 50 -55 M -36 0 L -65 0 M 36 0 L 65 0 M -25 25 L -55 55 M 25 25 L 55 55" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Surrounding Glial Cells (to illustrate the 1:10 ratio) */}
            <circle cx="80" cy="60" r="14" fill="#059669" opacity="0.6" />
            <circle cx="160" cy="70" r="12" fill="#059669" opacity="0.6" />
            <circle cx="260" cy="60" r="15" fill="#059669" opacity="0.6" />
            <circle cx="360" cy="50" r="12" fill="#059669" opacity="0.6" />
            <circle cx="80" cy="340" r="14" fill="#059669" opacity="0.6" />
            <circle cx="180" cy="350" r="13" fill="#059669" opacity="0.6" />
            <circle cx="280" cy="330" r="15" fill="#059669" opacity="0.6" />
            <circle cx="390" cy="340" r="12" fill="#059669" opacity="0.6" />
            <circle cx="380" cy="260" r="14" fill="#059669" opacity="0.6" />

            {/* Dynamic Flow Particles for active function */}
            {activeFunction === 3 && (
              <g>
                {/* Glucose flow from blood to neuron */}
                <circle cx="480" cy="140" r="4" fill="#facc15" />
                <circle cx="400" cy="155" r="4" fill="#facc15" />
                <circle cx="260" cy="190" r="4" fill="#facc15" />
                <circle cx="180" cy="205" r="4" fill="#facc15" />
                <text x="320" y="110" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ← انتقال الغذاء (الجلوكوز) إلى العصبون
                </text>
              </g>
            )}

            {activeFunction === 4 && (
              <g>
                {/* Oxygen flow */}
                <circle cx="480" cy="140" r="4" fill="#38bdf8" />
                <circle cx="410" cy="155" r="4" fill="#38bdf8" />
                <circle cx="270" cy="190" r="4" fill="#38bdf8" />
                <circle cx="180" cy="205" r="4" fill="#38bdf8" />
                <text x="320" y="110" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ← إمداد العصبون بالأكسجين (O2)
                </text>
              </g>
            )}

            {activeFunction === 5 && (
              <g>
                {/* Waste flow from neuron to blood */}
                <circle cx="180" cy="210" r="4" fill="#f43f5e" />
                <circle cx="260" cy="200" r="4" fill="#f43f5e" />
                <circle cx="390" cy="210" r="4" fill="#f43f5e" />
                <circle cx="480" cy="235" r="4" fill="#f43f5e" />
                <text x="320" y="270" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">
                  نقل الفضلات (CO2) إلى الدم ←
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Function selection and explanation cards */}
        <div className="lg:col-span-5 space-y-2">
          {functions.map((fn) => {
            const Icon = fn.icon;
            const isSelected = activeFunction === fn.id;
            return (
              <button
                key={fn.id}
                onClick={() => setActiveFunction(fn.id)}
                className={`w-full text-right p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 shadow-sm'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold ${
                    isSelected ? 'text-teal-900 dark:text-teal-200' : 'text-slate-900 dark:text-white'
                  }`}>
                    {fn.title}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {fn.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
