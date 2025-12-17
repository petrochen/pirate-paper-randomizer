import React, { useState, useCallback, useRef } from 'react';
import GridMap from './components/GridMap';
import Controls from './components/Controls';
import { getAvailableCells, secureRandom, shuffleArray, TOTAL_CELLS } from './lib/randomizer';

function App() {
  const [currentHighlight, setCurrentHighlight] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const [usedCells, setUsedCells] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const usedCellsRef = useRef(new Set());

  // Animation constants
  const ANIMATION_STEPS = 20;
  const ANIMATION_SPEED = 120; // Slower for smoother visual tracking

  const markCellAsUsed = useCallback((cell) => {
    usedCellsRef.current = new Set([...usedCellsRef.current, cell.key]);
    setUsedCells(new Set(usedCellsRef.current));
    setLastSelected(cell);
  }, []);

  const handleCellClick = useCallback((cell) => {
    if (usedCellsRef.current.has(cell.key)) return;
    markCellAsUsed(cell);
    setCurrentHighlight(null);
  }, [markCellAsUsed]);

  const handleRandomize = useCallback(() => {
    const available = getAvailableCells(usedCellsRef.current);
    if (available.length === 0) return;

    setIsAnimating(true);
    setCurrentHighlight(null);

    // Pick random available cells for animation trace
    const animationTrace = [];
    for (let i = 0; i < ANIMATION_STEPS; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      animationTrace.push(available[randomIndex]);
    }

    let count = 0;

    const interval = setInterval(() => {
      // Use the pre-calculated trace
      const cell = animationTrace[count];
      setCurrentHighlight(cell);
      count++;

      if (count >= ANIMATION_STEPS) {
        clearInterval(interval);

        const finalAvailable = getAvailableCells(usedCellsRef.current);
        const finalIndex = secureRandom(finalAvailable.length);
        const finalCell = finalAvailable[finalIndex];

        markCellAsUsed(finalCell);
        setCurrentHighlight(finalCell);
        setIsAnimating(false);
      }
    }, ANIMATION_SPEED);
  }, [markCellAsUsed]);

  const handleReset = useCallback(() => {
    usedCellsRef.current = new Set();
    setUsedCells(new Set());
    setCurrentHighlight(null);
    setLastSelected(null);
  }, []);

  const availableCount = TOTAL_CELLS - usedCells.size;

  return (
    <div className="min-h-screen bg-ocean-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden text-slate-200 font-sans selection:bg-neon-cyan/30">

      {/* Background Ambience (Subtle Glows) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="relative z-10 w-full h-screen max-w-[1920px] flex flex-col md:flex-row overflow-hidden">

        {/* LEFT PANEL: Header + Controls */}
        <aside className="w-full md:w-[400px] flex-shrink-0 flex flex-col justify-center p-6 md:p-12 gap-12 bg-abyss/40 backdrop-blur-sm border-r border-white/5 relative z-20 shadow-2xl">
          {/* Header */}
          <header className="text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/20 text-cyan-400 text-[10px] tracking-[0.2em] font-sans uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              System Online
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-white leading-[0.85] tracking-wide">
              FORTUNE<br /><span className="text-slate-500 text-4xl md:text-5xl">GRID</span>
            </h1>
            <p className="text-slate-400 font-sans text-sm max-w-xs leading-relaxed border-l-2 border-neon-gold/50 pl-4">
              Quantum-secure randomization for high-stakes pirate strategy.
            </p>
          </header>

          {/* Controls */}
          <div className="w-full">
            <Controls
              onRandomize={handleRandomize}
              onReset={handleReset}
              isAnimating={isAnimating}
              availableCount={availableCount}
              totalCells={TOTAL_CELLS}
            />
          </div>

          {/* Footer in sidebar */}
          <footer className="mt-auto pt-8 text-slate-600 text-[10px] font-sans tracking-widest uppercase">
            Nana Banana Pro v2.0
          </footer>
        </aside>

        {/* RIGHT PANEL: Full Height Grid */}
        <section className="flex-1 w-full h-full p-4 md:p-8 flex items-center justify-center bg-ocean-gradient relative min-h-0 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>

          <div className="relative w-full h-full flex items-center justify-center min-h-0">
            <GridMap
              usedCells={usedCells}
              currentHighlight={currentHighlight}
              lastSelected={lastSelected}
              onCellClick={handleCellClick}
              isAnimating={isAnimating}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
