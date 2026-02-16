'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Search,
    Users,
    Calendar,
    Bell,
    User,
    Settings,
    PlusCircle,
    X,
    Menu,
    Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
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

export function MobileMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();
    const { profile } = useUser();

    const navigation = baseNavigation.filter(item =>
        !item.role || item.role === profile?.role
    );

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    // Close menu when pathname changes
    React.useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 p-0 rounded-full"
            >
                <Menu className="h-6 w-6 text-slate-600" />
                <span className="sr-only">Open menu</span>
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100">
                        <span className="text-xl font-bold text-indigo-600">APSIT Student Sphere</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                            className="h-10 w-10 p-0 rounded-full"
                        >
                            <X className="h-6 w-6 text-slate-600" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                        <div>
                            <Link href="/projects/create">
                                <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-200 active:scale-95 transition-all">
                                    <PlusCircle className="h-6 w-6" />
                                    New Project
                                </button>
                            </Link>
                        </div>

                        <nav className="space-y-2">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-4 rounded-xl px-4 py-4 text-lg font-semibold transition-all active:bg-slate-50',
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-slate-600 hover:text-slate-900'
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                'h-6 w-6',
                                                isActive ? 'text-indigo-600' : 'text-slate-400'
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="pt-8 border-t border-slate-100">
                            <Link
                                href="/settings"
                                className={cn(
                                    'flex items-center gap-4 rounded-xl px-4 py-4 text-lg font-semibold transition-all active:bg-slate-50',
                                    pathname === '/settings'
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-slate-600 hover:text-slate-900'
                                )}
                            >
                                <Settings className="h-6 w-6 text-slate-400" />
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
