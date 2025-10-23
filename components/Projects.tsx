import React, { FC } from 'react';
// Fix: Corrected import for react-router-dom.
import { Link } from "react-router-dom";
import type { Project } from '../types';
import AnimatedDiv from './AnimatedDiv';

export const projectsData: Project[] = [
  {
    slug: 'audio-imitation-learning',
    title: 'Audio-informed Imitation Learning',
    description: 'A novel method to integrate audio signals for manipulation tasks unsolvable with visual information alone.',
    longDescription: `
### Overview
Accepted at RSJ 2025. This research proposed a novel method to integrate audio signals into observations for tasks that are unsolvable with visual information alone and require auditory cues.

### Key Achievements
- Demonstrated a 57.4% increase in task success rate on a real-world, audio-dependent pick-and-place task.
- Validated the approach in both simulation and on a 6-DoF manipulator, leveraging critical auditory cues for success.
`,
    imageUrl: 'https://picsum.photos/seed/robotics/600/400',
    tags: ['Imitation Learning', 'Robotics', 'Multimodal', 'PyTorch'],
  },
  {
    slug: 'nhk-robocon-2024',
    title: 'NHK Robocon 2024 Software Lead',
    description: 'Led the software team in designing and implementing a real-time control system for an autonomous robot using ROS2.',
    longDescription: `
### Role & Responsibilities
As the Software Lead for Kyoto University's NHK Robocon 2024 team, I was responsible for the entire software architecture and implementation.

### Key Achievements
- Designed and implemented a robust, real-time control system with ROS2 for a complex autonomous robot.
- Successfully managed the software team to meet tight deadlines and deliver a high-performance system for the competition.
`,
    imageUrl: 'https://picsum.photos/seed/robocon/600/400',
    tags: ['ROS2', 'C++', 'Real-time Control', 'Robotics'],
  },
  {
    slug: 'video-world-models',
    title: 'Video Generation World Models',
    description: 'Developed and optimized Transformer-Diffusion models for autonomous driving simulators at Matsuo Laboratory.',
    longDescription: `
### Internship Project at Matsuo Lab
During my internship, I focused on developing and optimizing video generation world models (Transformer-Diffusion) to enhance the realism of autonomous driving simulators.

### Key Contributions
- Contributed to more realistic traffic agent behaviors by improving the fidelity of video synthesis.
- Optimized VQ-VAE and diffusion modules, leading to significant improvements.
- Awarded "Best Poster" in an internal research presentation for this work.
`,
    imageUrl: 'https://picsum.photos/seed/driving/600/400',
    tags: ['Diffusion Models', 'Transformers', 'JAX', 'Autonomous Driving'],
  },
];

const ProjectCard: FC<{ project: Project }> = ({ project }) => (
    <div className="bg-slate-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
        <div className="overflow-hidden">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-slate-400 mb-4 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-slate-700 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <div className="mt-auto">
                <Link to={`/projects/${project.slug}`} className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors duration-300">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);


const Projects: FC = () => {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-slate-900/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            My Projects & Research
          </h2>
        </AnimatedDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <AnimatedDiv key={project.title} delay={index * 150}>
              <ProjectCard project={project} />
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
