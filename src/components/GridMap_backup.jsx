import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull } from 'lucide-react';
import { getAllCells } from '../lib/randomizer';

export default function GridMap({ usedCells, currentHighlight, lastSelected }) {
    const cells = getAllCells();

    return (
        <div className="relative p-6 rounded-3xl overflow-hidden w-full max-w-4xl mx-auto aspect-square">
            {/* Glass Container Background */}
            <div className="absolute inset-0 bg-abyss-light/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl"></div>

            {/* Grid container */}
            <div className="relative z-10 grid grid-cols-7 grid-rows-7 h-full gap-2 p-2">
                {cells.map((cell) => {
                    const isUsed = usedCells.has(cell.key);
                    const isHighlighted = currentHighlight?.key === cell.key;
                    const isLastSelected = lastSelected?.key === cell.key;

                    return (
                        <div
                            key={cell.key}
                            className={`
                relative flex items-center justify-center rounded-xl
                transition-all duration-300
                border border-white/5
                ${isUsed ? 'bg-abyss/80' : 'bg-white/5 hover:bg-white/10'}
                ${isHighlighted ? 'z-20' : 'z-0'}
              `}
                        >
                            {/* Modern Coordinate Label */}
                            <span className={`
                absolute top-2 left-2 text-xs font-sans tracking-widest
                transition-colors duration-300
                ${isHighlighted ? 'text-abyss font-bold' : 'text-slate-600'}
              `}>
                                {cell.label}
                            </span>

                            {/* Selection Highlight (High-tech Scanner) */}
                            {isHighlighted && (
                                <motion.div
                                    layoutId="highlight"
                                    className="absolute inset-0 bg-neon-cyan/20 border-2 border-neon-cyan rounded-xl shadow-neon"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                                        className="text-slate-700"
                                    >
                                        <Skull size={32} strokeWidth={1.5} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Just Selected Pulse */}
                            {isLastSelected && !isHighlighted && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 rounded-xl border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
