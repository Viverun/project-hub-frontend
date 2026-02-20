'use client';

import { User } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Github, MapPin, Link as LinkIcon, Edit, Verified, Sparkles, Calendar, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProfileHeaderProps {
    user: User;
    isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [showHearts, setShowHearts] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
            setShowHearts(true);
            setTimeout(() => setShowHearts(false), 1000);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white via-white to-indigo-50/30 shadow-xl shadow-slate-200/50 overflow-hidden"
        >
            {/* Animated background gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
            
            {/* Floating decorative elements */}
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-8 right-20 w-16 h-16 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-4 right-40 w-10 h-10 bg-white/10 rounded-full blur-lg"
            />

            <div className="relative px-6 pb-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end pt-20">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="relative -mt-12 z-10"
                    >
                        {/* Avatar ring animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-75 blur-sm scale-110" style={{ animationDuration: '8s' }} />
                        <div className="relative">
                            <Avatar
                                src={user.avatarUrl}
                                fallback={user.name.charAt(0)}
                                className="h-28 w-28 border-4 border-white shadow-2xl sm:h-36 sm:w-36 ring-4 ring-white/50"
                            />
                            {/* Online indicator */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-3 border-white rounded-full shadow-lg"
                            />
                        </div>
                        {/* Verified badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg"
                        >
                            <Verified className="h-4 w-4 text-white" />
                        </motion.div>
                    </motion.div>

                    <div className="flex-1 space-y-4 text-center sm:text-left pb-2">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                                        {user.name}
                                    </h1>
                                    <motion.div
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <Sparkles className="h-5 w-5 text-amber-500" />
                                    </motion.div>
                                </div>
                                <p className="text-slate-500 font-medium">@{user.email.split('@')[0]}</p>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-2 relative"
                            >
                                {/* Floating hearts animation */}
                                <AnimatePresence>
                                    {showHearts && (
                                        <>
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 1, y: 0, x: 0, scale: 0 }}
                                                    animate={{ 
                                                        opacity: 0, 
                                                        y: -50 - Math.random() * 30, 
                                                        x: (Math.random() - 0.5) * 60,
                                                        scale: 1 
                                                    }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                    className="absolute -top-2 left-1/2 pointer-events-none"
                                                >
                                                    <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                                                </motion.div>
                                            ))}
                                        </>
                                    )}
                                </AnimatePresence>
                                
                                {isOwnProfile ? (
                                    <Button variant="outline" size="sm" className="gap-2 border-2 hover:border-indigo-300 hover:bg-indigo-50">
                                        <Edit className="h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleFollow}
                                        className={`relative px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${
                                            isFollowing 
                                                ? 'bg-slate-100 text-slate-700 border-2 border-slate-200' 
                                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                        }`}
                                    >
                                        <motion.span
                                            initial={false}
                                            animate={{ y: isFollowing ? 0 : 0 }}
                                        >
                                            {isFollowing ? 'Following ✓' : 'Follow'}
                                        </motion.span>
                                    </motion.button>
                                )}
                            </motion.div>
                        </div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-2xl text-slate-600 leading-relaxed"
                        >
                            {user.bio || 'No bio provided yet. Add a bio to tell others about yourself!'}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap justify-center gap-4 text-sm sm:justify-start"
                        >
                            {user.githubUrl && (
                                <motion.a 
                                    href={user.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </motion.a>
                            )}
                            {user.leetCodeUrl && (
                                <motion.a 
                                    href={user.leetCodeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 transition-colors"
                                >
                                    <LinkIcon className="h-4 w-4" />
                                    LeetCode
                                </motion.a>
                            )}
                            <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600"
                            >
                                <MapPin className="h-4 w-4" />
                                Not Specified
                            </motion.span>
                            <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600"
                            >
                                <Calendar className="h-4 w-4" />
                                Joined 2024
                            </motion.span>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-2 sm:justify-start pt-2"
                        >
                            {user.skills.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.05 }}
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    onHoverStart={() => setHoveredSkill(skill)}
                                    onHoverEnd={() => setHoveredSkill(null)}
                                >
                                    <Badge 
                                        variant="secondary" 
                                        className={`cursor-pointer transition-all duration-300 ${
                                            hoveredSkill === skill 
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                                                : 'hover:shadow-md'
                                        }`}
                                    >
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
