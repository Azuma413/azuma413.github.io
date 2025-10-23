import React, { FC } from 'react';
import AnimatedDiv from './AnimatedDiv';

const About: FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            About Me
          </h2>
        </AnimatedDiv>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          <AnimatedDiv className="flex-shrink-0" delay={200}>
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl bg-slate-800 border-4 border-indigo-500/50 p-2">
                <img
                    src="https://picsum.photos/400/400?grayscale"
                    alt="Portrait of Kaneyoshi Hiratsuka"
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
          </AnimatedDiv>
          <AnimatedDiv className="max-w-2xl text-center lg:text-left" delay={400}>
            <p className="text-lg text-slate-400 mb-4">
              I am a B.Eng. student at Kyoto University, expecting to graduate in March 2026. My passion lies at the intersection of AI and robotics, with a focus on developing intelligent systems that can perceive and interact with the world in complex ways.
            </p>
            <p className="text-lg text-slate-400 mb-4">
              As a Research Intern at The University of Tokyo's Matsuo Laboratory, I developed video generation world models for autonomous driving simulators. Currently, as Co-founder & CTO of ONIXION Inc., I'm leading the development of AI-driven solutions for the manufacturing sector.
            </p>
             <p className="text-lg text-slate-400">
              I am driven by a curiosity for multimodal learning and reinforcement learning, constantly exploring how to build more capable and robust autonomous agents.
            </p>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
};

export default About;