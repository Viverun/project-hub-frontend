'use client';

import { motion } from 'framer-motion';
import { Folder, Users, UserPlus, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ProfileStatsProps {
    followers: number;
    following: number;
    projects: number;
}

export function ProfileStats({ followers, following, projects }: ProfileStatsProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const stats = [
        { 
            label: 'Projects', 
            value: projects, 
            icon: Folder, 
            color: 'indigo',
            gradient: 'from-indigo-500 to-purple-600',
            bgGradient: 'from-indigo-50 to-purple-50',
            shadowColor: 'shadow-indigo-500/20'
        },
        { 
            label: 'Followers', 
            value: followers, 
            icon: Users, 
            color: 'rose',
            gradient: 'from-rose-500 to-pink-600',
            bgGradient: 'from-rose-50 to-pink-50',
            shadowColor: 'shadow-rose-500/20'
        },
        { 
            label: 'Following', 
            value: following, 
            icon: UserPlus, 
            color: 'emerald',
            gradient: 'from-emerald-500 to-teal-600',
            bgGradient: 'from-emerald-50 to-teal-50',
            shadowColor: 'shadow-emerald-500/20'
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isHovered = hoveredIndex === index;
                
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                        whileHover={{ 
                            scale: 1.05, 
                            y: -5,
                            transition: { type: 'spring', stiffness: 400, damping: 17 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        className={`relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br ${stat.bgGradient} p-4 shadow-lg ${stat.shadowColor} hover:shadow-xl transition-shadow duration-300`}
                    >
                        {/* Animated background glow */}
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0`}
                            animate={{ opacity: isHovered ? 0.1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Floating particles effect */}
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-2 right-2"
                            >
                                <Sparkles className={`h-4 w-4 text-${stat.color}-400`} />
                            </motion.div>
                        )}
                        
                        <div className="relative flex flex-col items-center gap-2">
                            {/* Icon with gradient background */}
                            <motion.div
                                animate={{ 
                                    rotate: isHovered ? [0, -10, 10, 0] : 0,
                                    scale: isHovered ? 1.1 : 1
                                }}
                                transition={{ duration: 0.5 }}
                                className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md ${stat.shadowColor}`}
                            >
                                <Icon className="h-4 w-4 text-white" />
                            </motion.div>
                            
                            {/* Animated counter */}
                            <motion.span 
                                className={`text-2xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                                animate={{ scale: isHovered ? 1.1 : 1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {stat.value}
                            </motion.span>
                            
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                                {stat.label}
                            </span>
                        </div>
                        
                        {/* Bottom highlight line */}
                        <motion.div
                            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
