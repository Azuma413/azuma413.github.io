import React, { FC } from 'react';
import type { Skill } from '../types';
import AnimatedDiv from './AnimatedDiv';

const skillsData: Skill[] = [
  { name: 'PyTorch', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M12.001 2.001a9.99 9.99 0 0 0-3.32.553 10.003 10.003 0 0 0-6.126 6.126A9.99 9.99 0 0 0 2 12.001c0 1.73.44 3.362 1.22 4.793a.75.75 0 0 0 1.36-.67 8.496 8.496 0 0 1-1.025-4.122 8.5 8.5 0 0 1 8.5-8.5.75.75 0 0 0 0-1.5zM20.496 6.273a.75.75 0 0 0-1.058.214 8.498 8.498 0 0 1-2.165 3.39c-1.33 1.192-3.01 1.874-4.773 1.874a.75.75 0 0 0 0 1.5c2.01 0 3.91-.78 5.4-2.27 1.49-1.49 2.27-3.39 2.27-5.4a.75.75 0 0 0-.674-1.308zM17.727 3.504a.75.75 0 0 0-1.308.674c0 1.76-.682 3.44-1.874 4.773a8.498 8.498 0 0 1-3.39 2.165.75.75 0 0 0 .428 1.416 9.992 9.992 0 0 0 3.96-2.45c1.455-1.528 2.254-3.46 2.254-5.51a.75.75 0 0 0-.27-1.068z" /></svg> },
  { name: 'JAX', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.88 5.3a1.49 1.49 0 1 1-1.49 1.5A1.5 1.5 0 0 1 10.12 7.3zm4.5 9.32a4.48 4.48 0 0 1-3.23 1.38 4.38 4.38 0 0 1-4.38-4.38V8.8h1.88v4.82a2.5 2.5 0 1 0 5 0V8.8h1.87v4.79a4.43 4.43 0 0 1-1.14 3.03z" /></svg> },
  { name: 'Reinforcement Learning', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11v2h2v-2h2v2h-2v2h-2v-2H9v-2h2zm0 4h2v2h-2v-2z" /></svg> },
  { name: 'Diffusion Models', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 11a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm-8 4a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z" /></svg> },
  { name: 'Python', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M15.4,22.2c1,0.1,2.1-0.3,2.8-1.2c0.7-0.9,0.9-2,0.5-3l-2.2-5.3l4.3-4.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-4.3,4.3 l-5.3-2.2c-1-0.4-2.2-0.2-3,0.5c-0.9,0.7-1.3,1.9-1.2,2.8l1,5.2c0,0.1,0,0.2,0.1,0.3L1.1,22c-0.4,0.4-0.4,1,0,1.4 c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l5.3-5.3c0.1,0,0.2,0,0.3,0.1l5.2,1C14.4,22.2,14.9,22.2,15.4,22.2z M8.6,1.8 c-1-0.1-2.1,0.3-2.8,1.2C5.1,3.9,4.9,5,5.3,6l2.2,5.3L3.2,15.6c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 l4.3-4.3l5.3,2.2c1,0.4,2.2,0.2,3-0.5c0.9-0.7,1.3-1.9,1.2-2.8l-1-5.2c0-0.1,0-0.2-0.1-0.3l5.3-5.3c0.4-0.4,0.4-1,0-1.4 c-0.4-0.4-1-0.4-1.4,0l-5.3,5.3c-0.1,0-0.2,0-0.3-0.1l-5.2-1C9.6,1.8,9.1,1.8,8.6,1.8z" /></svg> },
  { name: 'C++', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M13.5 1.5l-3 4.5h3l-3 4.5h3l-3 4.5h4.5v-18zm-5 0v18H4v-7.5H2v-3h2V6H2V3h6.5z" /></svg> },
  { name: 'ROS2', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg> },
  { name: 'Unity', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M21.6 9.4l-6.2-6.2c-.8-.8-2-.8-2.8 0L2.4 13.4c-.8.8-.8 2 0 2.8l6.2 6.2c.8.8 2 .8 2.8 0l10.2-10.2c.8-.8.8-2 0-2.8zM12 18.8L5.2 12 12 5.2 18.8 12 12 18.8z" /></svg> },
];

const Skills: FC = () => {
  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 font-heading">
            Technical Skills
          </h2>
        </AnimatedDiv>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 text-center">
          {skillsData.map((skill, index) => (
            <AnimatedDiv key={skill.name} delay={index * 100}>
              <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-3 transition-transform duration-300 hover:-translate-y-2 hover:shadow-slate-700/50 h-full">
                <div className="text-slate-300">
                  {skill.icon}
                </div>
                <p className="font-semibold text-white">{skill.name}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;