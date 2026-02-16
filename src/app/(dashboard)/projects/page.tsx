'use client';

import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Spinner } from '@/components/ui/Spinner';
import { useIntersectionObserver, useDebounce } from '@/hooks/utils';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { ProjectStatus } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function ProjectFeedPage() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('ALL');
    const [tech, setTech] = useState('ALL');
    const debouncedSearch = useDebounce(search, 500);

    const {
        projects,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        bookmarkProject,
        setFilters
    } = useProjects();

    useEffect(() => {
        setFilters({
            search: debouncedSearch,
            status: status === 'ALL' ? undefined : (status as ProjectStatus),
            techStack: tech === 'ALL' ? undefined : [tech]
        });
    }, [debouncedSearch, status, tech, setFilters]);

    const loadMoreRef = useIntersectionObserver(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    return (
        <div className="space-y-6">
            <Breadcrumbs items={[{ label: 'Browse Projects' }]} />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Explore Projects</h1>
                    <p className="text-slate-600">Find your next technical challenge and collaborate.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-9 bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select
                        className="w-full sm:w-40 bg-white"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { label: 'All Status', value: 'ALL' },
                            { label: 'Active', value: 'ACTIVE' },
                            { label: 'Looking for Teammates', value: 'LOOKING_FOR_TEAMMATES' },
                            { label: 'In Progress', value: 'IN_PROGRESS' },
                            { label: 'Completed', value: 'COMPLETED' },
                        ]}
                    />
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
            ) : projects.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <h3 className="text-lg font-semibold text-slate-900">No projects found</h3>
                    <p className="mt-2 text-slate-500">Try adjusting your filters or search terms.</p>
                </div>
            ) : (
                <>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onBookmark={bookmarkProject}
                            />
                        ))}
                    </motion.div>

                    <div ref={loadMoreRef} className="flex h-24 items-center justify-center">
                        {isFetchingNextPage && <Spinner />}
                        {!hasNextPage && projects.length > 0 && (
                            <p className="text-sm text-slate-400">You&apos;ve reached the end of the feed.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
