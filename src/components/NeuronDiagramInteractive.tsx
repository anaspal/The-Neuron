import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info, Zap, Sparkles, Eye } from 'lucide-react';

interface PartInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  details: string;
}

const NEURON_PARTS: Record<string, PartInfo> = {
  dendrites: {
    id: 'dendrites',
    nameAr: 'الزوائد الشجرية',
    nameEn: 'Dendrites',
    description: 'زوائد عصبية متفرعة، تُعد امتدادات للسيتوبلازم، وتتناقص في القطر كلما ابتعدت عن جسم الخلية.',
    details: 'تستقبل المعلومات وتنقلها باتجاه جسم الخلية. وتساعد كثرة تفرعاتها على زيادة مساحة الاستقبال، مما يتيح للعصبون استقبال اتصالات أكثر.'
  },
  soma: {
    id: 'soma',
    nameAr: 'جسم الخلية',
    nameEn: 'Cell Body (Soma)',
    description: 'يشكل جسم الخلية الجزء المركزي في العصبون، ويحتوي معظم عضيات الخلية باستثناء السنتريولات (المريكزات).',
    details: 'يقوم بإجراء العمليات الأيضية، وتزويد الخلية بالطاقة اللازمة لعملها، وإنتاج البروتين والنواقل العصبية.'
  },
  nucleus: {
    id: 'nucleus',
    nameAr: 'النواة وعضيات الخلية',
    nameEn: 'Nucleus & Organelles',
    description: 'تحتوي على المادة الوراثية وتدير الأنشطة الخلوية الحيوية.',
    details: 'يحتوي جسم الخلية على النواة، الميتوكوندريا، الريبوسومات، الشبكة الإندوبلازمية، وجهاز غولجي.'
  },
  axon: {
    id: 'axon',
    nameAr: 'المحور الأسطواني',
    nameEn: 'Axon',
    description: 'امتداد لجسم العصبون، ويحتوي العديد من الميتوكوندريا والأنبيبيات الدقيقة والإنزيمات، وينتهي بنهايات طرفية.',
    details: 'ينقل السيال العصبي بعيداً عن جسم الخلية نحو النهايات الطرفية والأزرار التشابكية.'
  },
  myelin: {
    id: 'myelin',
    nameAr: 'الغمد الميليني',
    nameEn: 'Myelin Sheath',
    description: 'غلاف رقيق مكوّن من مادة دهنية بروتينية، يحيط ببعض المحاور الأسطوانية.',
    details: 'يعمل كعازل حول المحور الأسطواني، ويساعد على زيادة سرعة انتقال السيال العصبي والمحافظة على كفاءته.'
  },
  schwann: {
    id: 'schwann',
    nameAr: 'خلايا شفان',
    nameEn: 'Schwann Cells',
    description: 'خلايا تسهم في تكوين الغمد الميليني المحيط ببعض المحاور الأسطوانية.',
    details: 'تنتج المادة التي تكوّن الغمد الميليني وتلتف حول المحور لتدعيمه وعزله كهربائياً.'
  },
  ranvier: {
    id: 'ranvier',
    nameAr: 'عقد رانفييه',
    nameEn: 'Nodes of Ranvier',
    description: 'انغمادات أو مناطق غير مغلفة بالغمد الميليني، توجد بين أجزاء الغمد على طول المحور الأسطواني.',
    details: 'تسهم في انتقال السيال العصبي بسرعة أكبر؛ إذ ينتقل جهد الفعل بطريقة قفزية بين عقد رانفييه.'
  },
  terminals: {
    id: 'terminals',
    nameAr: 'النهايات الطرفية والأزرار التشابكية',
    nameEn: 'Synaptic Buttons',
    description: 'نهايات المحور الأسطواني التي تحتوي تراكيب تُسمّى الأزرار الطرفية التشابكية.',
    details: 'تمثل مناطق اتصال متخصصة لنقل المعلومات والنواقل العصبية إلى الخلايا المجاورة كالعضلات والغدد.'
  }
};

export default function NeuronDiagramInteractive() {
  const [selectedPart, setSelectedPart] = useState<string>('dendrites');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [impulsePosition, setImpulsePosition] = useState<number>(0);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const requestRef = useRef<number | null>(null);

  // Active step in impulse journey based on position (0 to 100)
  const currentStep = 
    impulsePosition < 22 ? 'الزوائد الشجرية (استقبال المعلومات)' :
    impulsePosition < 45 ? 'جسم الخلية (مركز العمليات الحيوية)' :
    impulsePosition < 85 ? 'المحور الأسطواني وعقد رانفييه (نقل قفزي سريع)' :
    'الأزرار الطرفية التشابكية (نقل الإشارة إلى العضو المستجيب)';

  useEffect(() => {
    if (!isSimulating) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setImpulsePosition((prev) => {
        const next = prev + delta * 28 * simulationSpeed;
        if (next >= 100) {
          return 0; // loop
        }
        return next;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isSimulating, simulationSpeed]);

  const activePart = NEURON_PARTS[selectedPart] || NEURON_PARTS.dendrites;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">رسم بيولوجي تفاعلي</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">الشكل (2) تركيب العصبون</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            المخطط التشريحي للعصبون ومحاكاة السيال العصبي
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              isSimulating
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>إيقاف السيال</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>بدء محاكاة السيال</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsSimulating(false);
              setImpulsePosition(0);
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="إعادة ضبط المحاكاة"
            aria-label="إعادة ضبط المحاكاة"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Impulse journey indicator banner */}
      <div className="my-4 p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-pulse shrink-0" />
          <span className="font-medium text-teal-950 dark:text-teal-200">مسار السيال العصبي الحالي:</span>
          <span className="font-bold text-teal-700 dark:text-teal-300">{currentStep}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span>السرعة:</span>
          <button
            onClick={() => setSimulationSpeed(0.5)}
            className={`px-2 py-0.5 rounded text-[11px] ${simulationSpeed === 0.5 ? 'bg-teal-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800'}`}
          >
            0.5x
          </button>
          <button
            onClick={() => setSimulationSpeed(1)}
            className={`px-2 py-0.5 rounded text-[11px] ${simulationSpeed === 1 ? 'bg-teal-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800'}`}
          >
            1x
          </button>
          <button
            onClick={() => setSimulationSpeed(2)}
            className={`px-2 py-0.5 rounded text-[11px] ${simulationSpeed === 2 ? 'bg-teal-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800'}`}
          >
            2x
          </button>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[360px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <svg
          viewBox="0 0 1000 480"
          className="w-full h-full select-none"
        >
          <defs>
            <linearGradient id="somaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="nucleusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <linearGradient id="myelinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="axonCoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Direction indicator arrow */}
          <g opacity="0.4" transform="translate(420, 40)">
            <line x1="0" y1="0" x2="160" y2="0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
            <polygon points="160,-5 175,0 160,5" fill="#38bdf8" />
            <text x="80" y="-10" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">
              اتجاه السيال العصبي →
            </text>
          </g>

          {/* DENDRITES (Left branching) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setSelectedPart('dendrites')}
            filter={selectedPart === 'dendrites' ? 'url(#glowEffect)' : undefined}
          >
            {/* Dendrite branch 1 - Top */}
            <path
              d="M 190 220 C 140 180, 100 130, 60 90 M 110 145 C 90 120, 60 130, 40 110 M 80 105 C 50 85, 30 70, 20 50"
              stroke={selectedPart === 'dendrites' ? '#38bdf8' : '#0284c7'}
              strokeWidth={selectedPart === 'dendrites' ? 7 : 5}
              strokeLinecap="round"
              fill="none"
            />
            {/* Dendrite branch 2 - Mid Top */}
            <path
              d="M 180 240 C 130 220, 80 200, 30 180 M 100 210 C 70 230, 40 220, 20 230"
              stroke={selectedPart === 'dendrites' ? '#38bdf8' : '#0284c7'}
              strokeWidth={selectedPart === 'dendrites' ? 6 : 4.5}
              strokeLinecap="round"
              fill="none"
            />
            {/* Dendrite branch 3 - Mid Bottom */}
            <path
              d="M 180 260 C 120 280, 70 310, 30 330 M 110 275 C 80 320, 50 340, 30 370"
              stroke={selectedPart === 'dendrites' ? '#38bdf8' : '#0284c7'}
              strokeWidth={selectedPart === 'dendrites' ? 6 : 4.5}
              strokeLinecap="round"
              fill="none"
            />
            {/* Dendrite branch 4 - Bottom */}
            <path
              d="M 200 280 C 150 340, 110 380, 70 420 M 130 360 C 110 400, 80 430, 50 450"
              stroke={selectedPart === 'dendrites' ? '#38bdf8' : '#0284c7'}
              strokeWidth={selectedPart === 'dendrites' ? 7 : 5}
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* AXON INNER CORE (running all the way to terminals) */}
          <path
            d="M 250 250 L 780 250"
            stroke="url(#axonCoreGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            className="cursor-pointer"
            onClick={() => setSelectedPart('axon')}
          />

          {/* AXON ORGANELLES: Mitochondria & Microtubules inside axon */}
          <g pointerEvents="none" opacity="0.7">
            <line x1="280" y1="247" x2="760" y2="247" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="12,6" />
            <line x1="280" y1="253" x2="760" y2="253" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="12,6" />
            {/* Small mitochondria inside axon */}
            <ellipse cx="360" cy="250" rx="9" ry="3.5" fill="#f43f5e" />
            <ellipse cx="500" cy="250" rx="9" ry="3.5" fill="#f43f5e" />
            <ellipse cx="640" cy="250" rx="9" ry="3.5" fill="#f43f5e" />
          </g>

          {/* MYELIN SHEATH & SCHWANN CELLS & NODES OF RANVIER */}
          {/* Segment 1: 320 to 420 */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedPart('myelin')}
            filter={selectedPart === 'myelin' || selectedPart === 'schwann' ? 'url(#glowEffect)' : undefined}
          >
            <rect x="320" y="222" width="105" height="56" rx="14" fill="url(#myelinGrad)" stroke="#ffedd5" strokeWidth="2" />
            {/* Schwann cell nucleus */}
            <ellipse cx="372" cy="235" rx="14" ry="7" fill="#c2410c" />
            <circle cx="372" cy="235" r="2.5" fill="#ffedd5" />
          </g>

          {/* Node of Ranvier 1 (around 425-445) */}
          <rect
            x="425"
            y="238"
            width="20"
            height="24"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => setSelectedPart('ranvier')}
          />
          {selectedPart === 'ranvier' && (
            <rect x="428" y="240" width="14" height="20" rx="4" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
          )}

          {/* Segment 2: 445 to 550 */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedPart('myelin')}
            filter={selectedPart === 'myelin' || selectedPart === 'schwann' ? 'url(#glowEffect)' : undefined}
          >
            <rect x="445" y="222" width="105" height="56" rx="14" fill="url(#myelinGrad)" stroke="#ffedd5" strokeWidth="2" />
            {/* Schwann cell nucleus */}
            <ellipse cx="497" cy="235" rx="14" ry="7" fill="#c2410c" />
            <circle cx="497" cy="235" r="2.5" fill="#ffedd5" />
          </g>

          {/* Node of Ranvier 2 (around 550-570) */}
          <rect
            x="550"
            y="238"
            width="20"
            height="24"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => setSelectedPart('ranvier')}
          />
          {selectedPart === 'ranvier' && (
            <rect x="553" y="240" width="14" height="20" rx="4" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
          )}

          {/* Segment 3: 570 to 675 */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedPart('myelin')}
            filter={selectedPart === 'myelin' || selectedPart === 'schwann' ? 'url(#glowEffect)' : undefined}
          >
            <rect x="570" y="222" width="105" height="56" rx="14" fill="url(#myelinGrad)" stroke="#ffedd5" strokeWidth="2" />
            {/* Schwann cell nucleus */}
            <ellipse cx="622" cy="235" rx="14" ry="7" fill="#c2410c" />
            <circle cx="622" cy="235" r="2.5" fill="#ffedd5" />
          </g>

          {/* Node of Ranvier 3 (around 675-695) */}
          <rect
            x="675"
            y="238"
            width="20"
            height="24"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => setSelectedPart('ranvier')}
          />
          {selectedPart === 'ranvier' && (
            <rect x="678" y="240" width="14" height="20" rx="4" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
          )}

          {/* Segment 4: 695 to 780 */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedPart('myelin')}
            filter={selectedPart === 'myelin' || selectedPart === 'schwann' ? 'url(#glowEffect)' : undefined}
          >
            <rect x="695" y="222" width="85" height="56" rx="14" fill="url(#myelinGrad)" stroke="#ffedd5" strokeWidth="2" />
            {/* Schwann cell nucleus */}
            <ellipse cx="737" cy="235" rx="14" ry="7" fill="#c2410c" />
            <circle cx="737" cy="235" r="2.5" fill="#ffedd5" />
          </g>

          {/* SOMA (Cell body) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setSelectedPart('soma')}
            filter={selectedPart === 'soma' ? 'url(#glowEffect)' : undefined}
          >
            {/* Star-like irregular soma shape */}
            <polygon
              points="190,210 230,190 270,220 285,245 280,260 250,285 220,290 185,270 175,240"
              fill="url(#somaGrad)"
              stroke="#bae6fd"
              strokeWidth={selectedPart === 'soma' ? 4 : 2}
            />

            {/* Organelles inside Soma: Mitochondria */}
            <ellipse cx="210" cy="225" rx="8" ry="4" fill="#f43f5e" transform="rotate(-20 210 225)" />
            <ellipse cx="250" cy="265" rx="8" ry="4" fill="#f43f5e" transform="rotate(30 250 265)" />
            
            {/* Nissl bodies / Ribosomes */}
            <circle cx="215" cy="265" r="3" fill="#cbd5e1" opacity="0.8" />
            <circle cx="255" cy="220" r="3" fill="#cbd5e1" opacity="0.8" />
            <circle cx="265" cy="235" r="2.5" fill="#cbd5e1" opacity="0.8" />
            <circle cx="195" cy="245" r="3" fill="#cbd5e1" opacity="0.8" />
          </g>

          {/* NUCLEUS */}
          <g
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPart('nucleus');
            }}
            filter={selectedPart === 'nucleus' ? 'url(#strongGlow)' : undefined}
          >
            <circle cx="230" cy="245" r="24" fill="url(#nucleusGrad)" stroke="#c7d2fe" strokeWidth="2" />
            <circle cx="230" cy="245" r="9" fill="#1e1b4b" opacity="0.8" />
            <circle cx="227" cy="242" r="3" fill="#e0e7ff" />
          </g>

          {/* AXON TERMINALS & SYNAPTIC BUTTONS (Right branching) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedPart('terminals')}
            filter={selectedPart === 'terminals' ? 'url(#glowEffect)' : undefined}
          >
            {/* Terminal branch 1 - Top */}
            <path d="M 780 250 C 820 230, 860 170, 920 150" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="922" cy="150" r="9" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2" />
            
            {/* Terminal branch 2 - Mid Top */}
            <path d="M 780 250 C 830 240, 880 210, 935 210" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="937" cy="210" r="9" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2" />

            {/* Terminal branch 3 - Mid Bottom */}
            <path d="M 780 250 C 830 260, 880 290, 935 290" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="937" cy="290" r="9" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2" />

            {/* Terminal branch 4 - Bottom */}
            <path d="M 780 250 C 820 270, 860 330, 920 350" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="922" cy="350" r="9" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2" />

            {/* Synaptic vesicles release sparkles */}
            <circle cx="945" cy="150" r="2" fill="#38bdf8" />
            <circle cx="950" cy="155" r="2" fill="#38bdf8" />
            <circle cx="960" cy="210" r="2.5" fill="#38bdf8" />
            <circle cx="955" cy="290" r="2" fill="#38bdf8" />
            <circle cx="945" cy="350" r="2" fill="#38bdf8" />
          </g>

          {/* SIMULATED ACTION POTENTIAL IMPULSE (Saltatory Jumping) */}
          {isSimulating && (
            <g>
              {/* Calculate X, Y based on impulsePosition percentage */}
              {(() => {
                let x = 100;
                let y = 250;
                let isJumping = false;

                if (impulsePosition < 20) {
                  // Along dendrites to soma
                  const t = impulsePosition / 20;
                  x = 50 + t * 140;
                  y = 120 + t * 125;
                } else if (impulsePosition < 35) {
                  // Inside soma
                  const t = (impulsePosition - 20) / 15;
                  x = 190 + t * 90;
                  y = 245;
                } else if (impulsePosition < 85) {
                  // Saltatory conduction along axon nodes
                  // Nodes at X: 300 (start), 435 (node 1), 560 (node 2), 685 (node 3), 780 (end)
                  const t = (impulsePosition - 35) / 50;
                  const nodes = [280, 435, 560, 685, 780];
                  const currentSegment = Math.min(3, Math.floor(t * 4));
                  const subT = (t * 4) - currentSegment;

                  const startX = nodes[currentSegment];
                  const endX = nodes[currentSegment + 1];

                  x = startX + subT * (endX - startX);
                  // Arch jump over the myelin sheath!
                  y = 250 - Math.sin(subT * Math.PI) * 28;
                  isJumping = true;
                } else {
                  // Axon terminals to synaptic buttons
                  const t = (impulsePosition - 85) / 15;
                  x = 780 + t * 150;
                  y = 250 + Math.sin(t * Math.PI * 2) * 50;
                }

                return (
                  <g transform={`translate(${x}, ${y})`}>
                    <circle r="18" fill="#fef08a" opacity="0.3" filter="url(#glowEffect)" />
                    <circle r="10" fill="#facc15" filter="url(#glowEffect)" />
                    <circle r="5" fill="#ffffff" />
                    {isJumping && (
                      <path
                        d="M -12 8 L 0 -12 L 12 8"
                        stroke="#fef08a"
                        strokeWidth="2"
                        strokeDasharray="2,2"
                        fill="none"
                      />
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* LABELS on the diagram pointing to elements */}
          {/* Label Dendrites */}
          <g className="cursor-pointer" onClick={() => setSelectedPart('dendrites')}>
            <line x1="80" y1="60" x2="110" y2="120" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="20" y="30" width="120" height="26" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
            <text x="80" y="47" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">الزوائد الشجرية</text>
          </g>

          {/* Label Soma */}
          <g className="cursor-pointer" onClick={() => setSelectedPart('soma')}>
            <line x1="230" y1="130" x2="230" y2="190" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="180" y="105" width="100" height="26" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
            <text x="230" y="122" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">جسم الخلية</text>
          </g>

          {/* Label Myelin Sheath */}
          <g className="cursor-pointer" onClick={() => setSelectedPart('myelin')}>
            <line x1="372" y1="340" x2="372" y2="280" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="317" y="340" width="110" height="26" rx="6" fill="#0f172a" stroke="#ea580c" strokeWidth="1" />
            <text x="372" y="357" textAnchor="middle" fill="#fdba74" fontSize="12" fontWeight="bold">الغمد الميليني</text>
          </g>

          {/* Label Schwann Cell */}
          <g className="cursor-pointer" onClick={() => setSelectedPart('schwann')}>
            <line x1="497" y1="145" x2="497" y2="225" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="445" y="120" width="105" height="26" rx="6" fill="#0f172a" stroke="#ea580c" strokeWidth="1" />
            <text x="497" y="137" textAnchor="middle" fill="#fdba74" fontSize="12" fontWeight="bold">خلية شفان</text>
          </g>

          {/* Label Node of Ranvier */}
          <g className="cursor-pointer" onClick={() => setSelectedPart('ranvier')}>
            <line x1="560" y1="340" x2="560" y2="265" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="510" y="340" width="100" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="560" y="357" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">عقد رانفييه</text>
          </g>

          {/* Label Axon */}
          <g className="cursor-pointer" onClick={() => setSelectedPart('axon')}>
            <line x1="622" y1="145" x2="622" y2="245" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="565" y="120" width="115" height="26" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
            <text x="622" y="137" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">المحور الأسطواني</text>
          </g>

          {/* Label Synaptic Buttons */}
          <g className="cursor-pointer" onClick={() => setSelectedPart('terminals')}>
            <line x1="935" y1="110" x2="935" y2="195" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="850" y="85" width="140" height="26" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <text x="920" y="102" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">الأزرار التشابكية</text>
          </g>
        </svg>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-2 left-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-teal-400" />
          <span>انقر على أي جزء في المخطط أو الأزرار أدناه لقراءة الشرح الأصلي</span>
        </div>
      </div>

      {/* Part Selection Buttons */}
      <div className="mt-4 flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
        {Object.values(NEURON_PARTS).map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(part.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedPart === part.id
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {part.nameAr}
          </button>
        ))}
      </div>

      {/* Selected Part Detail Card */}
      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {activePart.nameAr}
            </h4>
            <span className="text-xs text-slate-400 font-mono" dir="ltr">
              ({activePart.nameEn})
            </span>
          </div>
          <span className="text-xs px-2.5 py-1 bg-teal-100/70 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 rounded-md font-medium">
            جزء رئيس من تركيب العصبون
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {activePart.description}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {activePart.details}
        </p>
      </div>
    </div>
  );
}
