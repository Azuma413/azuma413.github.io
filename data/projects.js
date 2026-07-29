// Single source of truth for Research + Projects entries.
// Imported by the app (components/Projects.tsx) AND the build-time SEO prerender
// (scripts/prerender-seo.js), so it must stay plain data — no JSX / React imports.
//
// NOTE: `date` and `venue` are PROVISIONAL (inferred from titles/context).
// Replace them with the authoritative list when available.

export const projectsData = [
  {
    slug: 's2a2',
    category: 'research',
    date: '2026-07',
    title: 'S2A2: Audio-Visual Imitation Learning for Manipulation Tasks Using Acoustic Spatial Information',
    description:
      'A multimodal imitation learning framework that fuses acoustic spatial maps and spotformed spectrograms with vision, plus a new suite of acoustic-aware manipulation tasks.',
    // NOTE: /projects/s2a2 is rendered by components/S2A2Page.tsx (a dedicated
    // paper-style page), not by the generic Markdown detail page. This
    // longDescription is what the build-time SEO prerender indexes.
    longDescription: `
### Abstract
Acoustic information provides rich cues about object location, material properties, and changes caused by contact or motion. This work introduces a new set of **acoustic-aware manipulation tasks** for imitation learning, in which a robot must use auditory cues to determine what to manipulate and where to put it. These tasks require sound source localization and identification for active exploration in robotic manipulation.

We propose **Spatial-Spectral Audio Action (S2A2)**, a multimodal imitation learning framework that integrates visual features with acoustic *spatial* information (an acoustic spatial map computed with MUSIC over multiple microphone arrays) and acoustic *signal* information (a spectrogram extracted by Spotforming). S2A2 is implemented on top of four policies — ACT, Diffusion Policy, VQ-BeT, and $\\pi_0$. Simulation experiments show that the full framework is the most effective for tasks that require both position and timbre, and real-robot experiments confirm that both the tasks and the framework transfer to real-world manipulation.

### Tasks
- **Localization** — two visually identical objects; only one emits sound. Spatial information alone determines the target.
- **Identification** — one object emitting one of two sounds; the timbre determines the destination box.
- **Localization & Identification (L&I)** — both cues are required at once.
- **Exploratory** — neither object sounds at rest; the robot must shake each one to find the one that rattles.

### Results
On the L&I task the full S2A2 model is the only configuration that performs well across policies (e.g. 89.7% with Diffusion Policy vs. 9.3% for a vision-only baseline), while ablations that drop a pipeline collapse on the task requiring that modality. On the real robot, S2A2 reaches 72% on L&I (baseline 5%) and 50% on the exploratory task (baseline 12%).

### Links
- Paper / arXiv: [arXiv:2607.26047](https://arxiv.org/abs/2607.26047)
- Code: [github.com/Azuma413/S2A2](https://github.com/Azuma413/S2A2)
`,
    imageUrl: '/images/s2a2/overview.jpg',
    tags: [
      'Imitation Learning',
      'Robot Audition',
      'Multimodal',
      'Manipulation',
      'Sound Source Localization',
      'Diffusion Policy',
    ],
  },

  {
    slug: 'jsai-2026-acoustic-imitation',
    category: 'research',
    date: '2026-06',
    venue: 'JSAI 2026',
    title: 'JSAI 2026: Multimodal Imitation Learning Using Acoustic Spatial Information',
    description:
      '音空間情報を用いたマニピュレータのためのマルチモーダル模倣学習 — sound source localization and separation over microphone arrays, fused with vision for manipulation policies.',
    longDescription: `
### Overview
*音空間情報を用いたマニピュレータのためのマルチモーダル模倣学習*
(Multimodal Imitation Learning for Robotic Manipulators Using Acoustic Spatial Information)

Imitation learning has made complex manipulation learnable mostly from visual observations, but non-visual cues — contact sounds, and the ambient sound produced while an object is being manipulated — remain underused. This work proposes a multimodal imitation learning method for robotic manipulators that exploits **acoustic spatial information**.

### Approach
- Apply sound source localization and sound source separation to the signals captured by several microphone arrays.
- Extract an acoustic representation that reflects the *spatial distribution* of the sound sources.
- Fuse it with visual observations so that the manipulator learns from sound and vision together.

Experiments show the method improves both learning efficiency and success rate on manipulation tasks where the acoustic environment is a necessary cue.

### Related
This is the domestic-conference presentation of the line of work developed in [S2A2](/projects/s2a2) and started in [RSJ 2025](/projects/audio-imitation-learning).

Co-authors: Ryosuke Kojima (Kyoto University, RIKEN), Benjamin Yen (RIKEN, Institute of Science Tokyo).
`,
    imageUrl: '/images/s2a2/simulation-setup.png',
    tags: ['Imitation Learning', 'Robot Audition', 'Multimodal', 'Manipulation', 'JSAI'],
  },

  {
    slug: 'matsuo-institute-vla',
    category: 'project',
    date: '2025-12',
    venue: 'Matsuo Lab',
    title: 'Matsuo Institute: VLA for Autonomous Driving',
    description: 'Engaged in closed-loop autonomous driving verification and model refinement in CARLA, building upon Simlingo and OpenEMMA.',
    longDescription: `
### Overview
At Matsuo Institute, I am working on the development of a Vision-Language-Action (VLA) model for autonomous driving. This project builds upon existing research such as Simlingo and OpenEMMA.

### Key Activities
- Conducted closed-loop autonomous driving verification using CARLA, an Unreal Engine-based simulator.
- Focused on identifying failure cases and continuously improving the model's capabilities to navigate complex driving scenarios.
`,
    imageUrl: '/images/openema.png',
    tags: ['VLA', 'Autonomous Driving', 'CARLA', 'Simlingo', 'Generative AI'],
  },

  {
    slug: 'differentiable-bone-metabolism',
    category: 'research',
    date: '2026-02',
    venue: 'Graduation Thesis',
    title: 'In-Silico Bone Biopsy: Fusing Machine Learning with a Differentiable Bone Metabolism Simulator',
    description:
      'A gray-box system that estimates a patient\'s internal bone state — trabecular microstructure, signalling molecule and cell distributions, stress state — from non-invasive clinical data, by inverting a differentiable bone remodelling simulator. Patent filed.',
    longDescription: `
### Overview
Fragility fractures caused by osteoporosis are a major obstacle to healthy life expectancy in an ageing society. Bone strength is governed not only by bone *density* but also by bone *quality* — the structural and material properties of trabecular bone. The clinical standard, DXA, is non-invasive but only yields a 2D density measure; obtaining detailed bone-quality indices or the underlying metabolic dynamics requires an invasive bone biopsy. Diagnosis therefore faces a hard trade-off between non-invasiveness and information content.

My graduation thesis (Kyoto University, Faculty of Engineering, February 2026; supervised by Prof. Taiji Adachi) proposes **In-Silico Bone Biopsy (ISBB)**: a computational system that estimates and visualizes a patient's internal bone state from non-invasively obtainable clinical data.

> **A patent application has been filed on this work.**

![In-Silico Bone Biopsy — system concept](/images/isbb/isbb-concept.png)

### Approach: a modular gray-box system
Black-box machine learning adapts well to individual data but is hard to interpret; white-box mathematical models are physiologically consistent but hard to personalize. ISBB loosely couples the two:

1. **Machine learning module.** A model predicts bone mineral density (BMD) from serum biomarkers, anthropometrics, and demographics, trained on two cycles (1999–2002) of the NHANES cohort (8,722 subjects). Among the candidates, a **heteroscedastic regression model** — which predicts the mean *and* the variance — generalized best, so the boundary conditions carry a quantified uncertainty rather than a single point estimate. Predicted BMD and bone turnover markers (uNTx, BAP) are mapped to BV/TV and to patient-specific formation/resorption rates.

2. **Differentiable simulator: D-Bone.** A bone remodelling simulator built on **JAX**. Stress analysis (FEM, EBE-PCG) → mechanical-to-biochemical transduction (convolution) → signalling molecule transport (reaction–diffusion) → osteoclast/osteoblast dynamics (advection–reaction–diffusion) → bone surface motion (phase field). Writing every stage as a continuous field makes the whole loop end-to-end differentiable.

![D-Bone — the differentiable bone metabolism loop](/images/isbb/d-bone-overview.png)

### Forward analysis
D-Bone stably reproduces mechanical adaptation from a single trabecula up to the tissue scale, and reproduces the progression of a range of bone pathologies under modulated mechanical and biochemical factors.

![Mechanical adaptation of a single trabecula](/images/isbb/d-bone-remodeling.png)

### Inverse analysis
Because the simulator is differentiable, gradients can be used to search the high-dimensional parameter space of the remodelling model. Twin experiments show that gradient-based optimization (AdamW) attains higher accuracy and stability than the conventional gradient-free baseline (Nelder–Mead), in both normal and abnormal regimes.

![Twin experiment: AdamW vs. Nelder-Mead](/images/isbb/twin-experiment.png)

![Gradient-based inverse analysis in progress](/images/isbb/inverse-optimization.gif)

A case study on real clinical data then recovers the internal bone state — static trabecular geometry together with the dynamic metabolic state (mechanical stimulus ratio, sclerostin / RANKL / MDGF concentrations, osteoblast and osteoclast densities) — and tracks its change over time.

![Estimated internal bone state for two subjects](/images/isbb/trabecular-inverse.jpg)

### Contribution
ISBB establishes a basis for inferring, from non-invasive clinical data alone, the detailed internal bone information that previously required an invasive biopsy — and for observing how it evolves. This should deepen our understanding of osteoporosis and support treatment planning tailored to each patient's metabolic state.

### Thesis
[Download the thesis (PDF, Japanese)](/thesis-isbb-hiratsuka.pdf) — 機械学習と微分可能シミュレータの融合による In-Silico Bone Biopsy の実現
`,
    imageUrl: '/images/isbb/isbb-concept.png',
    tags: [
      'Differentiable Simulation',
      'JAX',
      'Biomechanics',
      'Inverse Analysis',
      'Machine Learning',
      'Patent',
    ],
  },

  {
    slug: 'audio-imitation-learning',
    category: 'research',
    date: '2025-09',
    venue: 'RSJ 2025',
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
    slug: 'video-world-models',
    category: 'project',
    date: '2024-09',
    venue: 'Matsuo Lab · Internship',
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

### Award
最優秀賞 (Best Poster Award) — 松尾・岩澤研究室主催 ポスターDay, The University of Tokyo, 25 September 2024, for 「自動運転のための世界モデル構築」 (Building World Models for Autonomous Driving).

![Best Poster Award certificate](/images/best-poster-award.jpg)
`,
    imageUrl: '/images/gaia_diffusion.png',
    tags: ['Diffusion Models', 'Transformers', 'World Models', 'Autonomous Driving', 'Generative AI'],
  },

  {
    slug: 'sound-source-tracking',
    category: 'research',
    date: '2024-07',
    venue: 'JSAI SIG-Challenge 2024',
    title: 'JSAI SIGAI 2024: Sound Source Tracking with World Models',
    description: 'Developed a robot with a microphone array that uses a DreamerV3 world model to track sound sources in vision-denied scenarios.',
    longDescription: `
### Overview
This research focused on situations where vision fails, such as finding objects in the dark. I developed a robot with a microphone array to track a sound source.

### Key Achievements
- Implemented the DreamerV3 world model-based RL method.
- The agent learned the temporal and spatial dynamics of the sound's direction, allowing it to build an internal model of the acoustic environment.
- This internal model enabled the agent to learn efficient, long-term exploration strategies.

### YouTube Demo
<iframe width="556" height="1355" src="https://www.youtube.com/embed/M2v6pbK3IeE" title="音源追跡" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Paper: [https://www.jstage.jst.go.jp/article/jsaisigtwo/2024/Challenge-066/2024_07/_article/-char/ja/](https://www.jstage.jst.go.jp/article/jsaisigtwo/2024/Challenge-066/2024_07/_article/-char/ja/)
`,
    imageUrl: '/images/sigai2024.png',
    tags: ['Robotics', 'RL', 'World Models', 'DreamerV3', 'Acoustics'],
  },

  {
    slug: 'sim2real-drq-v2',
    category: 'project',
    date: '2024-11',
    venue: 'KaiRA Journal vol.8',
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

Also featured in KaiRA Journal vol.8: [https://kyoto-kaira.github.io/works/collection_of_journals.html](https://kyoto-kaira.github.io/works/collection_of_journals.html)
`,
    imageUrl: '/images/sim2real-line-follower.png',
    tags: ['Reinforcement Learning', 'Sim2Real', 'DrQ-v2', 'Robotics', 'Raspberry Pi'],
  },

  {
    slug: 'kyoto-univ-nf-act',
    category: 'project',
    date: '2025-11',
    venue: 'Kyoto Univ NF',
    title: 'Kyoto University NF: Imitation Learning Demo with a Self-Built ALOHA',
    description:
      'Built an ALOHA-compatible bimanual manipulator on a student budget, collected demonstrations by teleoperating it from a Meta Quest 3, trained an ACT policy, and ran it live at the Kyoto University November Festival.',
    longDescription: `
### Overview
An ALOHA costs millions of yen, which is not a student budget. So we built **ILOHA** — an ALOHA-compatible bimanual manipulator — designed the data-collection pipeline around a Meta Quest 3, trained an [ACT](https://tonyzhaozh.github.io/aloha/) policy on what we recorded, and demonstrated it live at the Kyoto University November Festival (NF).

### The robot: a hybrid actuator layout
The cost of an ALOHA is dominated by its actuators, but not every joint needs the same one:

- **Wrist / distal joints — Dynamixel.** These sit inside the camera's field of view, and how they look genuinely matters to a vision-based policy, so we kept the standard part here.
- **Base / proximal joints — QDD motors (Robstride).** These are barely visible in the observations, so a much cheaper actuator does the job.

The result stays faithful to the reference design where the policy can see it, and saves money where it cannot.

### Data collection: teleoperation from a Quest 3
Rather than build a leader arm, we teleoperate from a Meta Quest 3:

- Controller pose → **inverse kinematics** → target joint angles, sent to the robot through a PC.
- A RealSense camera records images synchronized with the robot state, in the format the **LeRobot** library expects — so recorded data flows into training with no conversion step.

Getting this stable took more work than the IK itself:

- **Gimbal lock** near singular poses was handled with a singularity-avoidance step on the Quest side.
- **Runaway motion** was prevented on the PC side with angle unwrapping, per-step relative motion limits, and exponential smoothing of the commands.
- **Packet loss** turned out to be the real enemy. Swapping the mobile router for a Wi-Fi 6 router fixed the dropouts that were corrupting control signals — a recurring theme in this kind of work: the network, not the algorithm.

### Result
The trained ACT policy reliably picked up a snack and placed it in a box, and ran autonomously in front of a public audience for the length of the festival.

### Technical Details
- **Qiita Article:** [Read the detailed technical write-up on Qiita](https://qiita.com/hirekatsu0523/items/0b850d63bb9c7182e2fb)

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/rdS3Xbs53qA" title="Kyoto Univ NF ILOHA Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/nf.png',
    tags: ['Robotics', 'Imitation Learning', 'ACT', 'Teleoperation', 'Meta Quest 3', 'LeRobot', 'ILOHA'],
  },

  {
    slug: 'nhk-robocon-2024',
    category: 'project',
    date: '2024-04',
    venue: 'NHK Robocon',
    title: 'NHK Robocon 2024 Software Lead',
    description: 'Led the software team to build an autonomous mobile robot, developing a modular task architecture with Behavior Trees and ROS, and a 3D perception system.',
    longDescription: `
### Role & Responsibilities
As the Software Lead for Kyoto University's NHK Robocon 2024 team, I spearheaded the development of an autonomous mobile robot capable of operating in uncertain environments.

### Key Technologies
- **3D Perception & Pose Estimation:** Developed a system combining a YOLO model with a depth camera to compute the precise 3D global coordinates of objects.
- **Modular Task Execution:** Implemented a scalable architecture using Behavior Trees (instead of hard-coded logic) combined with async communication in ROS for modular task development and debugging.

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/1SvK_JmMgQU" title="NHK学生ロボコン2024" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/nhk2024_ros.png',
    tags: ['Robotics', 'ROS', 'Behavior Trees', 'Computer Vision', 'YOLO'],
  },

  {
    slug: 'catch-robo-2025',
    category: 'project',
    date: '2025-09',
    venue: 'Catch Robo',
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
3:06:53 mark:
<iframe width="812" height="461" src="https://www.youtube.com/embed/UVwL7Nwp02o" title="第15回キャチロボバトルコンテスト・ライブ配信" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/aloha_arm.jpg',
    tags: ['Robotics', 'Teleoperation', 'Mixed Reality', 'Meta Quest', 'Inverse Kinematics'],
  },

  {
    slug: 'ai-debate-stream',
    category: 'project',
    // NOTE: was '2023', but the write-up uses gemini-2.0-flash-thinking-exp
    // (released Dec 2024), so the entry has been moved to 2025. Adjust if wrong.
    date: '2025-02',
    venue: 'Personal Project',
    title: 'AI Vtuber: A Multi-Agent LLM Debate Streaming System',
    description:
      'A live YouTube streaming system in which several LLM agents search the web in real time and debate a topic against each other, embodied as Unity avatars and steered by viewer comments.',
    longDescription: `
### Overview
A single LLM answering a question sounds authoritative whether or not it is right — hallucinations are hard to notice precisely because nothing contradicts them. This project takes the opposite approach: instead of one assistant handing down an answer, several agents are given **opposing positions and made to argue**, live, while the audience watches and joins in. The friction between them is the point; it gives a viewer a handle for scrutinizing the claims themselves.

The result is an AI Vtuber debate stream on YouTube: agents collect information from the live web, argue in character, and respond to viewer comments in real time.

### Backend
- **LLM** — Gemini API on Vertex AI, using \`gemini-2.0-flash-thinking-exp\` where extra reasoning helps.
- **Agent orchestration** — [LangGraph](https://langchain-ai.github.io/langgraph/), so the debate flow (research → statement → rebuttal → summary) is an explicit graph rather than one long prompt.
- **Live information gathering** — \`browser-use\` drives a real Chrome instance, so an agent can go look something up mid-debate instead of relying on its training data.
- **Memory** — past utterances are embedded into ChromaDB and retrieved (RAG) so agents stay consistent with what they already argued.
- **Infrastructure** — the GPU-bound parts run on GCE; the UI runs locally. Splitting it this way keeps the interface responsive and the cloud bill bounded.

### Frontend & streaming
- **Unity** drives the avatars — expression and gesture animations are triggered from the agent output, so the debate reads as embodied rather than as a wall of subtitles.
- **AivisSpeech** for speech synthesis, with lip-sync driven by the audio.
- **WebSocket** carries comments and utterances; **WebRTC** shares the agent's browser screen so viewers can see what it is reading.
- **OBS Studio** composites everything and pushes it to a YouTube live stream — which conveniently makes the audience size somebody else's scaling problem.

### Things I liked building
- **Comment clustering.** Viewer comments are sentence-embedded and projected to 2D with UMAP, so the chat becomes a visible map of opinion instead of a scrolling wall. Euclidean distance in that space can even be used to judge which side of the debate the audience drifted toward.
- **Tunable personalities.** Each agent's system prompt is a parameter, so the same machinery can be dialled from a rigorous logical debate to pure entertainment.

### Write-up
[マルチエージェントによるディベート配信システムを作った話 (Zenn)](https://zenn.dev/hirekatsu0523/articles/8b0583ba9a01f6)

### YouTube Demo
<iframe width="890" height="509" src="https://www.youtube.com/embed/zS5Wg6DVSHs" title="AI Vtuber ディベート" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/ai-debate-unity.png',
    tags: ['LLM', 'Multi-Agent', 'LangGraph', 'RAG', 'Unity', 'Embodied AI', 'Live Streaming'],
  },

  {
    slug: 'meti-nep-clothing',
    category: 'project',
    date: '2025',
    venue: 'METI NEP',
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
    category: 'project',
    date: '2025-03',
    venue: 'Sony SSUP',
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
<iframe width="860" height="484" src="https://www.youtube.com/embed/lkN7b5Yi3QY" title="Spresense運動量推定" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
    imageUrl: '/images/sony_ssup.png',
    tags: ['Wearable', 'IMU', 'CNN', 'Real-time', 'Biomechanics', 'Sony Spresense'],
  },

  {
    slug: 'airoa-vla-competition',
    category: 'project',
    date: '2025-09',
    venue: 'AIRoA Competition',
    title: 'AIRoA VLA Competition (Diffusion/Flow Policies)',
    description: 'Implemented and evaluated advanced methods like ReinFlow and DSRL to stably train VLA policies based on Diffusion and Flow Matching.',
    longDescription: `
  ### Overview
  In the AIRoA VLA Competition, I focused on training VLA models that use Diffusion or Flow Matching as their policy, which often suffer from policy collapse.

  ### Key Achievements
  - Implemented and evaluated advanced methods like ReinFlow, which adapts DPPO for Flow Matching models by framing the denoising process as an MDP.
  - Worked on reproducing DSRL, a method that applies an RL framework to generative models by treating noise inputs as actions.
  - Gained a deep theoretical and practical understanding of how to stably train these cutting-edge models.
  `,
    imageUrl: '/images/airoa-vla.gif',
    tags: ['VLA', 'Diffusion Models', 'Flow Matching', 'Reinforcement Learning', 'ReinFlow', 'DSRL'],
  },

  {
    slug: 'kakusei-project-r8',
    category: 'project',
    date: '2026',
    venue: 'AIST 覚醒プロジェクト',
    title: 'Selected for the AIST "Kakusei" Project (FY2026)',
    description:
      'Selected for 覚醒プロジェクト, AIST\'s programme backing original deep-tech R&D by young researchers with funding, access to ABCI 3.0, and mentoring.',
    longDescription: `
### Overview
I was selected for the **令和8年度 覚醒プロジェクト** (FY2026 "Kakusei" Project), run by the National Institute of Advanced Industrial Science and Technology (AIST) with Kadokawa ASCII Research Laboratories as the secretariat.

The programme backs young researchers pursuing original, unconventional deep-tech R&D that tackles societal problems, across four fields: AI, life engineering, materials & chemistry, and quantum.

### What the programme provides
- **Funding** — up to ¥3M (salary + research expenses).
- **Facilities** — access to AIST's leading-edge research infrastructure, including the ABCI 3.0 supercomputer and the MPI platform.
- **People** — a dedicated project manager, plus a network of fellow awardees and experienced mentors.

![令和8年度 覚醒プロジェクト](/images/kakusei-project.jpg)

Programme page: [kakusei.aist.go.jp/r8](https://kakusei.aist.go.jp/r8/)
`,
    imageUrl: '/images/kakusei-project.jpg',
    tags: ['Deep Tech', 'AIST', 'Research Grant', 'ABCI', 'Physical AI'],
  },

  {
    slug: 'sushi-tech-tokyo-2026',
    category: 'project',
    date: '2026-04',
    venue: 'SusHi Tech Tokyo',
    title: 'SusHi Tech Tokyo 2026: Cloth-Folding VLA on a Self-Built Bimanual Robot',
    description:
      'Exhibited a handkerchief-folding demo at SusHi Tech Tokyo 2026 with KUPAC, running a fine-tuned X-VLA policy on ILOHA, our self-built bimanual robot.',
    longDescription: `
### Overview
With [KUPAC](https://www.kupac.org/ja/), the student-led Physical AI community at Kyoto University, we exhibited a **cloth-folding demonstration** at SusHi Tech Tokyo 2026, running a Vision-Language-Action policy on **ILOHA** — the open-source bimanual manipulator we build ourselves.

### Summary Movie
<iframe width="890" height="509" src="https://www.youtube.com/embed/mP7oChvzbms" title="SusHi Tech Tokyo 2026 サマリームービー" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### What we did
- Collected roughly **300 teleoperated episodes** of handkerchief folding.
- Compared candidate VLA models and settled on **X-VLA**, fine-tuned on a dataset in which high- and low-quality demonstrations carry an explicit quality label.
- On site, the lighting, background, and camera angles differed enough from our lab that the policy degraded. We collected **50 extra episodes at the venue** and re-fine-tuned for 3.5 hours, taking the success rate from roughly 60% to over 90%.

### The Robot in Action
<iframe width="890" height="509" src="https://www.youtube.com/embed/pBRmm-Ko0Rc" title="SusHi Tech Tokyo 2026 実機デモ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Lesson learned
The bottleneck was not the model. Cable reliability and USB bandwidth were what actually limited the demo — a reminder that in Physical AI the hardware plumbing decides how much of your policy the audience ever gets to see.

### Write-up
[【SusHi Tech Tokyo 2026】自作双腕ロボット×VLAで布畳みロボを展示した話 (Qiita)](https://qiita.com/hirekatsu0523/items/781b6a368d735f5a6bbe)
`,
    imageUrl: '/images/noimage.png',
    tags: ['VLA', 'Imitation Learning', 'Robotics', 'ILOHA', 'Exhibition', 'KUPAC'],
  },
];

export const researchEntries = projectsData.filter((p) => p.category === 'research');
export const projectEntries = projectsData.filter((p) => p.category === 'project');
