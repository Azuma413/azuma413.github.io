import React, { FC } from 'react';
// Fix: Corrected import for react-router-dom.
import { Link } from "react-router-dom";
import type { Project } from '../types';
import AnimatedDiv from './AnimatedDiv';

export const projectsData: Project[] = [
  {
    slug: 'audio-imitation-learning',
    title: 'RSJ 2025: Audio-informed Imitation Learning',
    description: 'A novel method to integrate audio signals for manipulation tasks unsolvable with visual information alone.',
    longDescription: `
### Overview
This research proposed a new task called "Acoustic-Informed Pick-and-Place," where sound is essential to distinguish between objects that look identical.

### Key Achievements
- Developed a framework that represents sound information from a microphone array as a 2D "acoustic map."
- This map is combined with visual information and fed into an imitation learning model.
- Experiments in both simulation and the real world showed this method significantly improves success rates on tasks that depend on sound.
- Currently extending this research to see how incorporating audio spectrograms impacts performance.

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/dJeQImQlrfs" title="音環境認識ピックアンドプレース" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

`,
    imageUrl: '/images/rsj2025.png',
    tags: ['Imitation Learning', 'Robotics', 'Multimodal', 'Acoustics', 'Computer Vision'],
  },

  {
    slug: 'nhk-robocon-2024',
    title: 'NHK Robocon 2024 Software Lead',
    description: 'Led the software team to build an autonomous mobile robot, developing a modular task architecture with Behavior Trees and ROS, and a 3D perception system.',
    longDescription: `
### Role & Responsibilities
As the Software Lead for Kyoto University's NHK Robocon 2024 team, I spearheaded the development of an autonomous mobile robot capable of operating in uncertain environments.

### Key Technologies
- **3D Perception & Pose Estimation:** Developed a system combining a YOLO model with a depth camera to compute the precise 3D global coordinates of objects.
- **Modular Task Execution:** Implemented a scalable architecture using Behavior Trees (instead of hard-coded logic) combined with async communication in ROS for modular task development and debugging.
`,
    imageUrl: '/images/nhk2024_ros.png',
    tags: ['Robotics', 'ROS', 'Behavior Trees', 'Computer Vision', 'YOLO'],
  },

  {
    slug: 'video-world-models',
    title: 'Video Generation World Models',
    description: 'Developed and optimized Transformer-Diffusion models for autonomous driving simulators at Matsuo Institute.',
    longDescription: `
### Internship Project at Matsuo Institute
During my internship, I helped develop video generation world models (combining a Transformer-Based autoregressive model and a Diffusion model) for autonomous driving.

### Key Contributions
- **Solved "Color Shift":** Identified and fixed unnatural colors in-camera generation by implementing 'v-prediction,' which stabilizes training and prevents color drift.
- **Prevented VQ Collapse:** Implemented the "rotation trick" as an alternative to STE, which redefines gradient flow during quantization to ensure more balanced codebook use and richer representations.
- **Awarded "Best Poster"** at an internal research presentation for this work.
- Currently involved in a new project to develop a VLA for autonomous driving based on the Simlingo architecture.
`,
    imageUrl: '/images/gaia_diffusion.png',
    tags: ['Diffusion Models', 'Transformers', 'World Models', 'Autonomous Driving', 'Generative AI'],
  },

  {
    slug: 'catch-robo-2025',
    title: 'Catch Robo 2025: MR Teleoperation System',
    description: 'Developed a low-cost, intuitive teleoperation system for a 6-axis arm using a Meta Quest 3 and inverse kinematics.',
    longDescription: `
### Overview
For the 2025 Catch Robo contest, my friends and I developed a custom 6-axis manipulator focused on human-robot collaboration. I designed its control system.

### Key Innovation
- Built an intuitive and immersive teleoperation system on a budget using the Meta Quest 3.
- Leveraged Mixed Reality to render a virtual master arm, which the operator manipulated with Quest controllers.
- The system captured the controller's pose in real-time, solved the inverse kinematics, and sent joint commands to the physical robot, creating a seamless, low-latency user experience.

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/UVwL7Nwp02o" title="第15回キャチロボバトルコンテスト・ライブ配信" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/aloha_arm.jpg',
    tags: ['Robotics', 'Teleoperation', 'Mixed Reality', 'Meta Quest', 'Inverse Kinematics'],
  },

  {
    slug: 'sim2real-drq-v2',
    title: 'Sim2Real RL for Line-Following Robot',
    description: 'Trained a vision-based RL policy (DrQ-v2) in simulation and achieved zero-shot transfer to a real Raspberry Pi-based robot.',
    longDescription: `
### Overview
This project tackled the Sim2Real challenge for a line-following robot. The goal was to train a policy in simulation using the DrQ-v2 algorithm and transfer it, zero-shot, to a real-world robot.

### Key Innovations
- **Diverse Simulation:** Wrote a program using a Breadth-First Search (BFS) algorithm to automatically generate thousands of complex and diverse courses, boosting model robustness.
- **Model Efficiency:** Modified the DrQ-v2 architecture to accept both image and low-dimensional inputs (orientation, velocity), drastically reducing model size for efficient execution on a Raspberry Pi 5.

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/tTh6BYUjfMs" title="DrQ-v2でライントレース（実機）" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/sim2real-line-follower.png',
    tags: ['Reinforcement Learning', 'Sim2Real', 'DrQ-v2', 'Robotics', 'Raspberry Pi'],
  },

  {
    slug: 'ai-debate-stream',
    title: 'LLM-Powered AI Debate Streaming System',
    description: 'Developed a YouTube streaming system where two AI agents debate topics, connecting LLM outputs to embodied animations in Unity.',
    longDescription: `
### Overview
To explore the capabilities of Large Language Models, I developed a YouTube streaming system featuring two AI agents debating topics provided by the audience.

### Key Innovation
- The core innovation was connecting the LLM's text output to non-verbal, embodied expressions.
- The LLM was prompted to generate both text and a corresponding "emotion" or "action" label.
- A system in Unity received this label and triggered a matching animation for the character model, creating the appearance of emotions and personalities.

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/zS5Wg6DVSHs" title="AI Vtuber ディベート" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/ai-debate-unity.png',
    tags: ['LLM', 'Embodied AI', 'Unity', 'Generative AI', 'Character Animation'],
  },

  {
    slug: 'sound-source-tracking',
    title: 'JSAI SIGAI 2024: Sound Source Tracking with World Models',
    description: 'Developed a robot with a microphone array that uses a DreamerV3 world model to track sound sources in vision-denied scenarios.',
    longDescription: `
### Overview
This research focused on situations where vision fails, such as finding objects in the dark. I developed a robot with a microphone array to track a sound source.

### Key Achievements
- Implemented the DreamerV3 world model-based RL method.
- The agent learned the temporal and spatial dynamics of the sound's direction, allowing it to build an internal model of the acoustic environment.
- This internal model enabled the agent to learn efficient, long-term exploration strategies.
`,
    imageUrl: '/images/sigai2024.png',
    tags: ['Robotics', 'RL', 'World Models', 'DreamerV3', 'Acoustics'],
  },

//   {
//     slug: 'differentiable-bone-simulator',
//     title: 'Differentiable Bone Remodeling Simulator',
//     description: 'Leading a project to develop a multi-physics bone remodeling simulator (FEM + reaction-diffusion) in JAX to solve inverse problems.',
//     longDescription: `
// ### Overview
// Currently leading a project to develop a differentiable bone remodeling simulator using JAX. It is a complex multi-physics simulator combining the Finite Element Method with a reaction-diffusion system.

// ### Key Goals
// - Make the entire simulation pipeline differentiable to efficiently solve inverse problems using gradient-based optimization.
// - This allows answering questions like, "What are the best loading conditions to achieve a target bone strength?"
// - We are also developing a model to connect the simulator with real clinical data, bridging physics-based simulation and clinical applications.
// `,
//     imageUrl: '/images/v-bone-jax.png',
//     tags: ['JAX', 'Differentiable Physics', 'Simulation', 'Finite Element Method', 'Bioengineering'],
//   },

//   {
//     slug: 'cad-generation-llm',
//     title: 'CAD-Generation LLM with GRPO',
//     description: 'Leading R&D at my startup to fine-tune an LLM for CAD generation using Python scripting and a GRPO-based reward mechanism.',
//     longDescription: `
// ### Overview
// As CTO of my co-founded startup, I am leading internal R&D to develop a CAD-generation LLM.

// ### Key Approach
// - We are using a novel approach: fine-tuning a base LLM using GRPO.
// - The model generates Python scripts that create CAD models.
// - These scripts are then evaluated by a reward function based on geometric validity and successful execution.
// - This score acts as a reward signal to efficiently specialize the LLM for this complex task.
// `,
//     imageUrl: '/images/cad-llm.png',
//     tags: ['LLM', 'Code Generation', 'CAD', 'Fine-Tuning', 'RLHF', 'GRPO'],
//   },

  {
    slug: 'meti-nep-clothing',
    title: 'METI NEP: Automation of Clothing Measurement',
    description: 'Selected for the METI NEP grant to develop and commercialize a system for automating clothing measurement using imitation learning.',
    longDescription: `
### Overview
A friend and I were selected for the METI NEP grant program for our project, "Automation of Clothing Measurement Using Imitation Learning."

### Key Goals
- We aim to commercialize the technology.
- We are developing a prototype that uses a pseudo ALOHA arm to handle garments while a vision system takes measurements automatically.

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/rp29SOOsv8U" title="SO-101 Genesis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/meti-nep.png',
    tags: ['Imitation Learning', 'Robotics', 'ALOHA', 'Computer Vision', 'Entrepreneurship'],
  },

  {
    slug: 'sony-ssup-momentum',
    title: 'Sony SSUP: Real-time Momentum Visualization',
    description: 'Developed a system for Sony SSUP that visualizes human momentum in real-time using IMUs, a lightweight CNN, and a biomechanical model.',
    longDescription: `
### Overview
For Sony's SSUP program, I developed a system that visualizes human momentum in real-time, with potential applications in sports science and rehabilitation.

### Key Technologies
- Uses a Sony Spresense board with multiple IMU sensors.
- Time-series data from the IMUs are fed into a lightweight CNN to classify motion (e.g., "walking").
- This classification, combined with a biomechanical model, is used to calculate and visualize the user's momentum.

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/-Gu7juZfhK8" title="imuを利用した動作の推定" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/sony_ssup.png',
    tags: ['Wearable', 'IMU', 'CNN', 'Real-time', 'Biomechanics', 'Sony Spresense'],
  },

//   {
//     slug: 'airoa-vla-competition',
//     title: 'AIRoA VLA Competition (Diffusion/Flow Policies)',
//     description: 'Implemented and evaluated advanced methods like ReinFlow and DSRL to stably train VLA policies based on Diffusion and Flow Matching.',
//     longDescription: `
// ### Overview
// In the AIRoA VLA Competition, I focused on training VLA models that use Diffusion or Flow Matching as their policy, which often suffer from policy collapse.

// ### Key Achievements
// - Implemented and evaluated advanced methods like ReinFlow, which adapts DPPO for Flow Matching models by framing the denoising process as an MDP.
// - Worked on reproducing DSRL, a method that applies an RL framework to generative models by treating noise inputs as actions.
// - Gained a deep theoretical and practical understanding of how to stably train these cutting-edge models.
// `,
//     imageUrl: '/images/airoa-vla.png',
//     tags: ['VLA', 'Diffusion Models', 'Flow Matching', 'Reinforcement Learning', 'ReinFlow', 'DSRL'],
//   },

//   {
//     slug: 'kupac-community',
//     title: 'KUPAC - Kyoto University Physical AI Community',
//     description: 'Co-founded and organized KUPAC, a new student community for physical AI, and ran a hands-on workshop on imitation learning (ACT).',
//     longDescription: `
// ### Overview
// I realized Kyoto University lacked a student community specializing in physical AI. To fill that gap, I worked with Assistant Professor Yagi and friends to start KUPAC.

// ### Key Activities
// - As an organizer, I planned and ran a hands-on workshop on pick-and-place using the ACT imitation learning model.
// - Participants went through the entire pipeline: data collection, model training, and deployment.
// - This activity is focused on contributing to our shared knowledge and building the community.
// `,
//     imageUrl: '/images/kupac-workshop.png',
//     tags: ['Community Building', 'Leadership', 'Imitation Learning', 'ACT', 'Workshop'],
//   },
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
