'use client';

import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import { User, Calendar, Bell, Rocket, Trophy } from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
    const { projects, isLoading: projectsLoading } = useProjects();

    // In a real app, these would be separate hooks
    const stats = [
        { label: 'Active Projects', value: projects.length.toString(), color: 'indigo', icon: Rocket },
        { label: 'Team Requests', value: '2', color: 'fuchsia', icon: User },
        { label: 'Upcoming Events', value: '3', color: 'emerald', icon: Calendar },
        { label: 'Active Goals', value: '12', color: 'amber', icon: Trophy },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1 font-medium">Welcome back to APSIT Student Sphere.</p>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
                {stats.map((stat) => (
                    <motion.div
                        key={stat.label}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 rounded-full bg-${stat.color}-50/50 group-hover:bg-${stat.color}-100/50 transition-colors duration-300`} />
                        <div className="flex items-center justify-between relative z-10">
                            <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 mt-4 relative z-10">{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
                <motion.div
                    variants={itemVariants}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900">Recommended Projects</h2>
                        <span className="text-xs font-medium text-indigo-600 hover:underline cursor-pointer">View all</span>
                    </div>
                    {projectsLoading ? (
                        <div className="flex-1 flex items-center justify-center py-12">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-50/50 border border-dashed border-slate-200 text-slate-400">
                            No recommendations yet
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 flex-1">
                            {projects.slice(0, 2).map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Notifications</h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Project Update', desc: 'EcoTrack Mobile updated their tech stack.', time: '2m ago', icon: Bell },
                            { title: 'New Event', desc: 'APSIT Hack-A-Thon registration is open!', time: '1h ago', icon: Calendar },
                            { title: 'Team Match', desc: 'You have a new team member request.', time: '3h ago', icon: User },
                        ].map((notif, i) => (
                            <div key={i} className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm">
                                    <notif.icon className="h-5 w-5 text-slate-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-slate-900">{notif.title}</p>
                                        <span className="text-[10px] text-slate-400">{notif.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate mt-0.5">{notif.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
