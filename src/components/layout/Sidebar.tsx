'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Search,
    Users,
    Calendar,
    Bell,
    User,
    Settings,
    Rocket,
    Trophy
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

const baseNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: Search },
    { name: 'My Teams', href: '/teams', icon: Users, role: 'STUDENT' },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Manage Events', href: '/manage-events', icon: Calendar, role: 'DEPARTMENT' },
    { name: 'Create Hackathon', href: '/create-hackathon', icon: Trophy, role: 'DEPARTMENT' },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
    const pathname = usePathname();
    const { profile } = useUser();

    const navigation = baseNavigation.filter(item =>
        !item.role || item.role === profile?.role
    );

    return (
        <div className="hidden md:flex md:w-64 md:flex-col border-r border-slate-200 bg-white">
            <div className="flex h-16 shrink-0 items-center px-6">
                <Link href="/" className="text-xl font-bold text-indigo-600">
                    APSIT Student Sphere
                </Link>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
                <div className="mb-6">
                    <Link href="/dashboard" className="flex items-center gap-2 px-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                            <Rocket className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                            APSIT Student Sphere
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-1 relative">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative',
                                    isActive
                                        ? 'text-indigo-600'
                                        : 'text-slate-600 hover:text-slate-900'
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 rounded-md bg-indigo-50/80 z-0"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                    />
                                )}
                                <item.icon
                                    className={cn(
                                        'h-5 w-5 shrink-0 relative z-10',
                                        isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                                    )}
                                />
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pb-4 space-y-4">
                    <Link
                        href="/settings"
                        className={cn(
                            'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            pathname === '/settings'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        )}
                    >
                        <Settings className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-slate-600" />
                        Settings
                    </Link>

                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white">
                            {profile?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-slate-900 truncate">
                                {profile?.name || 'Loading...'}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                                {profile?.role || 'User'} Account
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
