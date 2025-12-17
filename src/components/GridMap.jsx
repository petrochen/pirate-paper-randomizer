import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull } from 'lucide-react';
import { getAllCells } from '../lib/randomizer';

export default function GridMap({ usedCells, currentHighlight, lastSelected, onCellClick, isAnimating }) {
    const cells = getAllCells();

    return (
        <div className="relative h-full w-auto aspect-square max-h-full max-w-full mx-auto p-4 rounded-3xl overflow-hidden shadow-2xl flex-shrink-1">
            {/* Glass Container Background */}
            <div className="absolute inset-0 bg-abyss-light/60 backdrop-blur-xl border border-white/10 rounded-3xl"></div>

            {/* Grid container */}
            <div className="relative z-10 grid grid-cols-7 grid-rows-7 h-full w-full gap-2 p-2">
                {cells.map((cell) => {
                    const isUsed = usedCells.has(cell.key);
                    const isHighlighted = currentHighlight?.key === cell.key;
                    const isLastSelected = lastSelected?.key === cell.key;

                    return (
                        <button
                            key={cell.key}
                            onClick={() => !isAnimating && !isUsed && onCellClick && onCellClick(cell)}
                            disabled={isAnimating || isUsed}
                            className={`
                relative flex items-center justify-center rounded-xl group
                transition-all duration-200
                border border-white/5 outline-none
                ${isUsed ? 'bg-abyss/80 cursor-not-allowed border-white/5' : 'bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 cursor-pointer'}
                ${isHighlighted ? 'z-20' : 'z-0'}
              `}
                        >
                            {/* Modern Coordinate Label */}
                            <span className={`
                absolute top-0.5 left-0.5 text-[10px] sm:text-xs font-sans tracking-tight
                transition-colors duration-300
                ${isHighlighted ? 'text-abyss font-bold' : 'text-slate-600 group-hover:text-cyan-400/80'}
              `}>
                                {cell.label}
                            </span>

                            {/* Selection Highlight (High-tech Scanner) - Automatic */}
                            {isHighlighted && (
                                <motion.div
                                    layoutId="highlight"
                                    className="absolute inset-0 bg-neon-cyan/20 border-2 border-neon-cyan rounded-md shadow-neon pointer-events-none z-30"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 25,
                                        mass: 0.5
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                                </motion.div>
                            )}

                            {/* Used State (Subtle Skull) */}
                            <AnimatePresence>
                                {isUsed && (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-slate-700 pointer-events-none"
                                    >
                                        <Skull size={32} strokeWidth={1.5} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Just Selected Pulse - Manual or Automatic */}
                            {isLastSelected && !isHighlighted && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 rounded-xl border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] pointer-events-none"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
