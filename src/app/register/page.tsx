import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { Users, Code } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Left Side: Illustration / Gradient */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-violet-700 via-indigo-800 to-cyan-900 p-12 text-white relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

                <div className="relative z-10">
                    <Link href="/" className="text-3xl font-bold tracking-tight">APSIT Student Sphere</Link>
                    <div className="mt-20 space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-extrabold leading-tight">Start your technical journey here.</h2>
                            <p className="text-indigo-100 text-lg max-w-md italic">&quot;Every great project starts with a single connection. Join the community of builders today.&quot;</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">Teammate Matching</p>
                                    <p className="text-indigo-200 text-sm">Find partners who complement your skills perfectly.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Code className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">Skill Showcase</p>
                                    <p className="text-indigo-200 text-sm">Link your GitHub and LeetCode to stand out.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-indigo-300 text-xs">
                    &copy; {new Date().getFullYear()} APSIT Student Sphere. All rights reserved.
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
                <div className="w-full max-w-md">
                    <div className="md:hidden mb-8 text-center text-indigo-600 font-bold text-2xl">
                        APSIT Student Sphere
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
