import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="text-2xl font-bold text-indigo-600 tracking-tight">
                        APSIT Student Sphere
                    </Link>
                </div>

                <div className="hidden md:flex md:items-center md:gap-8">
                    <Link href="/projects" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                        Browse Projects
                    </Link>
                    <Link href="/events" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                        Events
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                        About
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm">
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
