import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Users, Rocket, Trophy, Globe } from 'lucide-react';

const features = [
    {
        title: 'Find Teammates',
        description: 'Connect with students across branches and years to build multidisciplinary teams.',
        icon: Users,
    },
    {
        title: 'Showcase Projects',
        description: 'Build a portolio of your work and get visibility from the student community.',
        icon: Rocket,
    },
    {
        title: 'Participate in Events',
        description: 'Stay updated with upcoming hackathons, workshops, and student meetups.',
        icon: Trophy,
    },
    {
        title: 'Grow Together',
        description: 'Learn new technologies by collaborating on real-world projects.',
        icon: Globe,
    },
];

export function Features() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Everything you need to build your dreams
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Nexus provides the tools and community to take your projects from idea to reality.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.title} className="border-none shadow-none bg-transparent">
                            <CardHeader className="items-center text-center">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                                <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
