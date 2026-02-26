import React, { FC } from 'react';
import AnimatedDiv from './AnimatedDiv';

const About: FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 font-heading">
            About Me
          </h2>
        </AnimatedDiv>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          <AnimatedDiv className="flex-shrink-0" delay={200}>
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl bg-slate-800 border-4 border-slate-500/50 p-2">
              <img
                src="/images/self_portrait.jpg"
                alt="Portrait of Kaneyoshi Hiratsuka"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </AnimatedDiv>
          <AnimatedDiv className="max-w-2xl text-center lg:text-left" delay={400}>
            <p className="text-lg text-slate-400 mb-4">
              I am currently a 4th-year B.Eng. student at Kyoto University, affiliated with the <a href="https://www2.infront.kyoto-u.ac.jp/bf05/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">Biomechanics Lab</a>. Expecting to graduate in March 2026, I will be joining the <a href="https://lm.sys.i.kyoto-u.ac.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">Learning machines group</a> at the Graduate School of Informatics, Kyoto University, from the 2026 academic year. My passion lies at the intersection of AI and robotics, with a focus on developing intelligent systems that can perceive and interact with the world in complex ways.
            </p>
            <p className="text-lg text-slate-400 mb-4">
              As a Research Intern at The University of Tokyo's Matsuo Laboratory, I developed video generation world models and Vision-Language-Action (VLA) models for autonomous driving. Previously, as Co-founder & CTO of ONIXION Inc., I led the development of AI-driven solutions for the manufacturing sector. Currently, I am actively involved in the management of <a href="https://www.kupac.org/ja/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">KUPAC</a>, a student-led Physical AI community.
            </p>
            <p className="text-lg text-slate-400">
              I am driven by a curiosity for multimodal learning and reinforcement learning, constantly exploring how to build more capable and robust autonomous agents.
            </p>
            {/* <p className="text-lg text-slate-400 mb-4">
              I am a B.Eng. student at Kyoto University, expecting to graduate in March 2026. My passion lies at the intersection of AI and robotics, with a focus on developing intelligent systems that can perceive and interact with the world in complex ways.
            </p>
            <p className="text-lg text-slate-400 mb-4">
              As a Research Intern at The University of Tokyo's Matsuo Laboratory, I developed video generation world models for autonomous driving simulators. And I was CTO of ONIXION Inc., I'm leading the development of AI-driven solutions for the manufacturing sector.
            </p>
            <p className="text-lg text-slate-400">
              I am driven by a curiosity for multimodal learning and reinforcement learning, constantly exploring how to build more capable and robust autonomous agents.
            </p> */}
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
};

export default About;
