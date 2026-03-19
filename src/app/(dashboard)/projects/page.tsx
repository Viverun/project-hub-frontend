'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useDebounce, useIntersectionObserver } from '@/hooks/utils';
import { useUser } from '@/hooks/useUser';
import { Project } from '@/types';
import { projectApi } from '@/api/project';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function ProjectFeedPage() {
    const { profile } = useUser();
    const [search, setSearch] = useState('');
    const [tech, setTech] = useState('ALL');
    const debouncedSearch = useDebounce(search, 500);

    const {
        projects,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        bookmarkProject,
        setFilters,
    } = useProjects();

    const validProjects = (Array.isArray(projects) ? projects : []).filter(
        (project): project is Project => Boolean(project && typeof project === 'object' && (project as Project).id)
    );

    const profileId = profile?.id;
    const activeProjects = useMemo(
        () =>
            [...validProjects]
                .filter((project) => project.status === 'ACTIVE')
                .sort((a, b) => {
                    const memberDelta = (b.teamMemberCount || 0) - (a.teamMemberCount || 0);
                    if (memberDelta !== 0) return memberDelta;

                    const updatedDelta = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                    return Number.isNaN(updatedDelta) ? 0 : updatedDelta;
                }),
        [validProjects]
    );

    useEffect(() => {
        setFilters({
            search: debouncedSearch,
            status: 'ACTIVE',
            techStack: tech === 'ALL' ? undefined : [tech],
        });
    }, [debouncedSearch, setFilters, tech]);

    const loadMoreRef = useIntersectionObserver(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    const handleRequestToJoin = async (projectId: string) => {
        try {
            await projectApi.requestToJoinProject(projectId);
        } catch {
            // Keep UX minimal; failed requests are ignored silently for now.
        }
    };

    return (
        <div className="space-y-6">
            <Breadcrumbs items={[{ label: 'Browse Projects' }]} />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Browse Active Projects</h1>
                    <p className="text-slate-600">
                        Showing only active projects from students.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search active projects..."
                            className="pl-9 bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select
                        className="w-full sm:w-40 bg-white"
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                        options={[
                            { label: 'All Tech', value: 'ALL' },
                            { label: 'React', value: 'React' },
                            { label: 'Node.js', value: 'Node.js' },
                            { label: 'Python', value: 'Python' },
                            { label: 'TypeScript', value: 'TypeScript' },
                            { label: 'Tailwind', value: 'Tailwind' },
                        ]}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Spinner size="lg" />
                </div>
            ) : activeProjects.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <h3 className="text-lg font-semibold text-slate-900">No active projects found</h3>
                    <p className="mt-2 text-slate-500">
                        Try another search or check back soon.
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Search className="h-4 w-4" />
                            Showing active projects only
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {activeProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onBookmark={bookmarkProject}
                                onRequestToJoin={project.ownerId === profileId ? undefined : handleRequestToJoin}
                            />
                        ))}
                    </motion.div>

                    <div ref={loadMoreRef} className="flex h-24 items-center justify-center">
                        {isFetchingNextPage && <Spinner />}
                        {!hasNextPage && activeProjects.length > 0 && (
                            <p className="text-sm text-slate-400">You&apos;ve reached the end of the feed.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
