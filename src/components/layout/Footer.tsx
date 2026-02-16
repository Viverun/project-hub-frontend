'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold text-indigo-600">
                            APSIT Student Sphere
                        </Link>
                        <p className="mt-4 text-sm text-slate-500 max-w-xs">
                            The ultimate platform for student collaboration, project discovery, and team formation.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link href="/projects" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Browse Projects</Link></li>
                            <li><Link href="/events" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Hackathons</Link></li>
                            <li><Link href="/teams" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">My Teams</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4">Newsletter</h3>
                        <p className="text-sm text-slate-500 mb-4">Get notified about new projects and hackathons.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                                <Mail className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-100 pt-8 text-center">
                    <p className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} APSIT Student Sphere. Built for students, by students.
                    </p>
                </div>
            </div>
        </footer>
    );
}
