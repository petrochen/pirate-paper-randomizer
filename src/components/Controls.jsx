import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Zap } from 'lucide-react';

export default function Controls({ onRandomize, onReset, isAnimating, availableCount, totalCells }) {
    const isFinished = availableCount === 0;

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* Stats Panel */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Status</span>
                    <span className={`text-sm font-bold flex items-center gap-2 ${isAnimating ? 'text-neon-cyan animate-pulse' : 'text-slate-300'}`}>
                        {isAnimating ? 'PROCESSING' : 'READY'}
                        <span className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-neon-cyan' : 'bg-green-500'}`}></span>
                    </span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Available</span>
                    <span className="text-neon-gold font-display text-xl leading-none">
                        {availableCount}<span className="text-slate-600 text-xs font-sans ml-1">/ {totalCells}</span>
                    </span>
                </div>
            </div>

            {/* Control Actions */}
            <div className="flex flex-col gap-3">
                {/* Primary Action */}
                <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: "rgba(34, 211, 238, 0.15)" }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onRandomize}
                    disabled={isAnimating || isFinished}
                    className={`
            w-full h-16 relative overflow-hidden rounded-lg border flex items-center justify-between px-6 group
            transition-all duration-300
            ${isAnimating || isFinished
                            ? 'bg-slate-800/50 border-white/5 text-slate-500 cursor-not-allowed'
                            : 'bg-cyan-950/30 border-cyan-500/50 text-cyan-100 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                        }
          `}
                >
                    <div className="flex flex-col items-start z-10">
                        <span className="text-xs font-sans uppercase tracking-[0.2em] text-cyan-400 group-hover:text-cyan-300">Command</span>
                        <span className="text-xl font-bold tracking-wide">{isAnimating ? 'CALCULATING...' : 'INITIATE JUMP'}</span>
                    </div>

                    <Zap className={`z-10 transition-transform duration-300 ${isAnimating ? 'animate-pulse text-cyan-400' : 'text-cyan-600 group-hover:rotate-12 group-hover:text-cyan-400'}`} size={28} />

                    {/* Tech Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none"></div>
                </motion.button>

                {/* Secondary Action */}
                <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onReset}
                    disabled={isAnimating}
                    className="
            w-full h-12 rounded-lg border border-white/10 bg-white/5 text-slate-400
            hover:text-white hover:border-white/20 transition-all
            flex items-center justify-center gap-3 font-sans text-sm uppercase tracking-wider
          "
                >
                    <RefreshCw size={16} className={isAnimating ? 'animate-spin' : ''} />
                    System Reset
                </motion.button>
            </div>

            {/* Messages */}
            {isFinished && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 text-center text-red-400 text-xs font-sans tracking-widest border-t border-red-500/20 pt-4"
                >
          // WARNING: ALL SECTORS DEPLETED
                </motion.div>
            )}
        </div>
    );
}
