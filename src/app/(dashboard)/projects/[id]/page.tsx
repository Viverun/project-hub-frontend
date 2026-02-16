'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { projectApi } from '@/api/project';
import { teamApi } from '@/api/team';
import { TeamMember } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { JoinRequestCard } from '@/components/team/JoinRequestCard';
import {
    Github,
    ExternalLink,
    Calendar,
    Trophy,
    MessageSquare,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/lib/utils';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const id = params.id as string;

    const { data: projectRes, isLoading: isProjectLoading } = useQuery({
        queryKey: ['project', id],
        queryFn: () => projectApi.getProjectById(id),
    });

    const { data: teamRes } = useQuery({
        queryKey: ['team', id],
        queryFn: () => teamApi.getTeamByProjectId(id),
    });

    const project = projectRes?.data;
    const team = teamRes?.data;
    const isOwner = user?.id === project?.ownerId;

    if (isProjectLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Project not found</h2>
                <Button variant="ghost" onClick={() => router.push('/projects')}>Go to Projects</Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <Breadcrumbs
                items={[
                    { label: 'Projects', href: '/projects' },
                    { label: project.title }
                ]}
            />

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px]">
                <div className="md:col-span-3 rounded-2xl overflow-hidden bg-slate-100 relative group">
                    {project.thumbnailUrl ? (
                        <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <Trophy className="h-20 w-20 opacity-20" />
                        </div>
                    )}
                </div>
                <div className="hidden md:flex flex-col gap-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex-1 rounded-2xl bg-slate-100 overflow-hidden relative group">
                            {project.images?.[i] ? (
                                <Image src={project.images[i]} alt={`${project.title} ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-slate-200">
                                    <Calendar className="h-8 w-8 opacity-30" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant={project.status === 'COMPLETED' ? 'success' : 'secondary'}>
                                        {project.status}
                                    </Badge>
                                    <span className="text-sm text-slate-500 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Created {formatDate(project.createdAt)}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-bold text-slate-900">{project.title}</h1>
                            </div>
                            {isOwner && (
                                <Button variant="outline" size="sm">Edit Project</Button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {project.techStack.map(tech => (
                                <Badge key={tech} variant="outline" className="bg-slate-50">
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <h3 className="text-xl font-semibold">About this project</h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    <Tabs defaultValue="team">
                        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none p-0 h-auto gap-8">
                            <TabsTrigger
                                value="team"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 bg-transparent shadow-none px-0 py-2"
                            >
                                Team ({team?.members.length || 0})
                            </TabsTrigger>
                            <TabsTrigger
                                value="showcase"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 bg-transparent shadow-none px-0 py-2"
                            >
                                Showcase
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="team" className="pt-6 space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {team?.members.map((member: TeamMember) => (
                                    <TeamMemberCard key={member.userId} member={member} />
                                ))}
                            </div>

                            {isOwner && (
                                <div className="space-y-4 pt-6">
                                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                                        Pending Requests
                                        <Badge variant="secondary" className="rounded-full h-5 w-5 flex items-center justify-center p-0">3</Badge>
                                    </h4>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* Mocking join requests for demonstration */}
                                        <JoinRequestCard
                                            request={{
                                                id: '1',
                                                projectId: id,
                                                userId: 'user-2',
                                                role: 'Frontend Developer',
                                                message: "I'd love to help with the UI/UX design and React implementation!",
                                                status: 'PENDING',
                                                createdAt: new Date().toISOString(),
                                                user: {
                                                    id: 'user-2',
                                                    name: 'Sarah Chen',
                                                    email: 'sarah@example.com',
                                                    role: 'STUDENT',
                                                    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                                                    location: 'Toronto, Canada',
                                                    skills: ['React', 'TypeScript', 'Tailwind'],
                                                    followersCount: 120,
                                                    followingCount: 85,
                                                    projectsCount: 12,
                                                    createdAt: new Date().toISOString()
                                                }
                                            }}
                                            onAccept={(requestId: string) => console.log('Accept', requestId)}
                                            onReject={(requestId: string) => console.log('Reject', requestId)}
                                        />
                                        <JoinRequestCard
                                            request={{
                                                id: '2',
                                                projectId: id,
                                                userId: 'user-3',
                                                role: 'Backend Developer',
                                                message: 'Experienced with Node.js and PostgreSQL. Ready to build robust APIs.',
                                                status: 'PENDING',
                                                createdAt: new Date(Date.now() - 86400000).toISOString(),
                                                user: {
                                                    id: 'user-3',
                                                    name: 'Alex Rivera',
                                                    email: 'alex@example.com',
                                                    role: 'STUDENT',
                                                    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                                                    location: 'San Francisco, USA',
                                                    skills: ['Node.js', 'PostgreSQL', 'Docker'],
                                                    followersCount: 450,
                                                    followingCount: 320,
                                                    projectsCount: 28,
                                                    createdAt: new Date().toISOString()
                                                }
                                            }}
                                            onAccept={(requestId: string) => console.log('Accept', requestId)}
                                            onReject={(requestId: string) => console.log('Reject', requestId)}
                                        />
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                        <h4 className="font-semibold text-slate-900">Project Links</h4>
                        <div className="space-y-3">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Github className="h-5 w-5" />
                                        <span className="text-sm font-medium">Repository</span>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-slate-400" />
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Trophy className="h-5 w-5 text-amber-500" />
                                        <span className="text-sm font-medium">Live Demo</span>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-slate-400" />
                                </a>
                            )}
                        </div>

                        {!isOwner && (
                            <div className="pt-6 border-t border-slate-100 space-y-4">
                                <div className="flex items-center justify-between text-sm mb-4">
                                    <span className="text-slate-500">Team Capacity</span>
                                    <span className="font-bold">{team?.members.length || 0} / {team?.capacity || 4}</span>
                                </div>
                                <Button className="w-full gap-2" variant="primary">
                                    Join Project
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button className="w-full gap-2" variant="outline">
                                    <MessageSquare className="h-4 w-4" />
                                    Ask a Question
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
