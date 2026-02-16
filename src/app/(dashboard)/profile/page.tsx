'use client';

import { useUser } from '@/hooks/useUser';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { Spinner } from '@/components/ui/Spinner';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import { GitHubStats } from '@/components/profile/GitHubStats';
import { LeetCodeStats } from '@/components/profile/LeetCodeStats';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { motion } from 'framer-motion';

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

export default function ProfilePage() {
    const { profile, isLoading: userLoading } = useUser();
    const { projects, isLoading: projectsLoading } = useProjects(); // Ideally filter by user

    if (userLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Profile not found</h2>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Breadcrumbs items={[{ label: 'Profile' }]} />
            <ProfileHeader user={profile} isOwnProfile={true} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 lg:grid-cols-3"
            >
                <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
                    <ProfileStats
                        followers={profile.followersCount}
                        following={profile.followingCount}
                        projects={profile.projectsCount}
                    />

                    <GitHubStats username={profile.githubUsername} />
                    <LeetCodeStats username={profile.name.toLowerCase().replace(' ', '-')} />
                </motion.div>

                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
                    </div>

                    {projectsLoading ? (
                        <div className="flex h-32 items-center justify-center">
                            <Spinner />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
                            <p className="text-slate-500">No projects showcase yet.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2">
                            {projects.slice(0, 4).map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
