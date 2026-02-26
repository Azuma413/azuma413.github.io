import React, { FC } from 'react';
import AnimatedDiv from './AnimatedDiv';

const Hero: FC = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/50"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
                    style={{ backgroundImage: "url('/images/background.jpg')" }}
                ></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-700/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-slate-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-slate-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedDiv>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter mb-4 font-heading">
                        平塚 謙良
                    </h1>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tighter mb-4 font-heading">
                        Kaneyoshi Hiratsuka
                    </h1>
                </AnimatedDiv>
                <AnimatedDiv delay={200}>
                    <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-400 mb-8">
                        AI Researcher & Software Engineer passionate about
                        <span className="text-slate-200 font-medium"> Robotics</span>,
                        <span className="text-slate-200 font-medium"> Multimodal Learning</span>,
                        and creating intelligent autonomous systems.
                    </p>
                </AnimatedDiv>
                <AnimatedDiv delay={400}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#projects"
                            className="inline-block bg-slate-700 border border-slate-600 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            View My Work
                        </a>
                        <a
                            href="/CV.pdf"
                            download="CV.pdf"
                            className="inline-block bg-transparent border border-slate-500 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Download CV (PDF)
                        </a>
                    </div>
                </AnimatedDiv>
            </div>

            <style>{`
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
            .animation-delay-4000 {
                animation-delay: 4s;
            }
            @keyframes blob {
                0% {
                    transform: translate(0px, 0px) scale(1);
                }
                33% {
                    transform: translate(30px, -50px) scale(1.1);
                }
                66% {
                    transform: translate(-20px, 20px) scale(0.9);
                }
                100% {
                    transform: translate(0px, 0px) scale(1);
                }
            }
        `}</style>
        </section>
    );
};

export default Hero;