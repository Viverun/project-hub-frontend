'use client';

import { Project } from '@/types';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bookmark, Users } from 'lucide-react';
import Link from 'next/link';
import { formatRelativeTime, cn } from '@/lib/utils';

import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: Project;
    onBookmark?: (id: string) => void;
}

export function ProjectCard({ project, onBookmark }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden h-full transition-shadow hover:shadow-xl border-slate-200/60 bg-white/50 backdrop-blur-sm">
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden flex items-center justify-center text-slate-300">
                    {project.thumbnailUrl ? (
                        <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover" />
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between gap-2">
                        <Badge variant={project.status === 'LOOKING_FOR_TEAMMATES' ? 'success' : 'secondary'}>
                            {project.status.replace(/_/g, ' ')}
                        </Badge>
                        <button
                            onClick={() => onBookmark?.(project.id)}
                            className={cn(
                                "text-slate-400 hover:text-indigo-600 transition-colors",
                                project.isBookmarked && "text-indigo-600"
                            )}
                        >
                            <Bookmark className="h-5 w-5" fill={project.isBookmarked ? "currentColor" : "none"} />
                        </button>
                    </div>
                    <CardTitle className="mt-2 text-xl leading-snug">
                        <Link href={`/projects/${project.id}`} className="hover:text-indigo-600 transition-colors">
                            {project.title}
                        </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-4 py-2">
                    <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="font-normal">
                                {tech}
                            </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="text-xs text-slate-400 self-center">+{project.techStack.length - 3} more</span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                <Users className="h-3.5 w-3.5" />
                                <span>{project.teamMemberCount || 0} / {project.teamCapacity || 5} members</span>
                            </div>
                            <span className="text-slate-400">
                                {formatRelativeTime(project.createdAt)}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full transition-all duration-500",
                                    (project.teamMemberCount || 0) >= (project.teamCapacity || 5)
                                        ? "bg-slate-300"
                                        : "bg-indigo-500"
                                )}
                                style={{ width: `${Math.min(100, ((project.teamMemberCount || 0) / (project.teamCapacity || 5)) * 100)}%` }}
                            />
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
