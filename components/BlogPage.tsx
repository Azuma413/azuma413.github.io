import React, { useEffect, FC } from 'react';
// Fix: Corrected import for react-router-dom.
import { useParams, Link } from "react-router-dom";
import type { Post } from '../types';
import AnimatedDiv from './AnimatedDiv';
import MarkdownRenderer from './MarkdownRenderer';

const posts: Post[] = [
    {
        slug: 'first-post',
        title: 'Welcome to My Research & Development Blog',
        date: '2024-07-28',
        excerpt: 'This is the inaugural post on my new blog. Here, I plan to share insights from my work in AI, robotics, and software engineering.',
        content: `
## Welcome to the Journey

Hello! I'm excited to launch this blog as a space to document my journey through the fascinating worlds of Artificial Intelligence and Robotics. My goal is to share not just the outcomes of my research and projects, but also the thought processes, challenges, and learnings along the way.

### What to Expect

- **In-depth Articles:** Dives into topics like Reinforcement Learning, Multimodal Models, and their applications in robotics.
- **Project Breakdowns:** Behind-the-scenes looks at my projects, from initial concept to implementation.
- **Research Summaries:** My thoughts and summaries on the latest papers and trends in the field.

I hope this blog becomes a valuable resource for fellow students, researchers, and anyone interested in the future of intelligent systems. Stay tuned!
        `,
    },
    {
        slug: 'the-power-of-multimodality',
        title: 'The Power of Multimodality in Robotics',
        date: '2024-08-05',
        excerpt: 'Exploring why combining vision, audio, and other senses is the key to building more capable and robust robots.',
        content: `
## Beyond Vision: Why Robots Need More Senses

For a long time, computer vision has been the dominant sense for robots. While cameras provide a rich source of information, relying on vision alone has its limits. Think about a simple task: picking up a metal cup versus a paper cup. Visually, they might look similar, but the sound they make when tapped, or the force required to grasp them, is completely different.

This is where **multimodality** comes in. By integrating information from various sources—like audio, touch (haptics), and even language—we can build robots that have a much deeper and more robust understanding of their environment.

### My Research in Audio-informed Learning

My recent work on "Audio-informed Imitation Learning" is a practical example. We tackled a task where a robot needed to distinguish between objects based on the sounds they made. The results were compelling: the robot's success rate jumped by over 57% when it could "hear" what it was doing.

This shows that by giving robots more senses, we're not just adding redundant information. We're unlocking new capabilities and making them more adaptable to the complexities of the real world. The future of robotics is not just seeing, but sensing.
`
    }
];

const BlogPage: FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? posts.find(p => p.slug === slug) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (slug) {
        if (!post) {
            return (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Post not found</h1>
                    <Link to="/blog" className="text-indigo-400 hover:text-indigo-300">
                        &larr; Back to Blog
                    </Link>
                </div>
            );
        }
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <AnimatedDiv>
                    <article className="max-w-4xl mx-auto">
                        <Link to="/blog" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
                            &larr; Back to Blog
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{post.title}</h1>
                        <p className="text-slate-400 mb-8">{post.date}</p>
                        <div className="text-slate-300">
                            <MarkdownRenderer>{post.content}</MarkdownRenderer>
                        </div>
                    </article>
                </AnimatedDiv>
            </div>
        );
    }

    return (
        <section id="blog" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
                        Blog
                    </h2>
                </AnimatedDiv>
                <div className="max-w-4xl mx-auto space-y-12">
                    {posts.map((p, index) => (
                        <AnimatedDiv key={p.slug} delay={index * 150}>
                            <div className="bg-slate-800/50 p-8 rounded-lg shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    <Link to={`/blog/${p.slug}`} className="hover:text-indigo-400 transition-colors">
                                        {p.title}
                                    </Link>
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">{p.date}</p>
                                <p className="text-slate-400 mb-6">{p.excerpt}</p>
                                <Link to={`/blog/${p.slug}`} className="text-indigo-400 hover:text-indigo-300 font-semibold">
                                    Read more &rarr;
                                </Link>
                            </div>
                        </AnimatedDiv>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPage;
