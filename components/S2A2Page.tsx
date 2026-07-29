import React, { useEffect, useState, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AnimatedDiv from './AnimatedDiv';
import { useDocumentMeta } from './useDocumentMeta';

// Dedicated, paper-style page for the S2A2 project.
// Routed at /projects/s2a2 (see App.tsx) — it takes precedence over the generic
// /projects/:slug Markdown detail page. The matching entry in data/projects.js
// still supplies the Research-list row and the build-time SEO prerender.

const AUTHORS = [
  { name: 'Kaneyoshi Hiratsuka', affiliations: [1], href: '/' },
  { name: 'Benjamin Yen', affiliations: [2, 3] },
  { name: 'Ryosuke Kojima', affiliations: [1, 2] },
];

const AFFILIATIONS = [
  'Kyoto University',
  'RIKEN',
  'Institute of Science Tokyo',
];

const ARXIV_ID = '2607.26047';

const LINKS = [
  { label: 'Paper', href: `https://arxiv.org/pdf/${ARXIV_ID}`, icon: '📄' },
  { label: 'arXiv', href: `https://arxiv.org/abs/${ARXIV_ID}`, icon: '📚' },
  { label: 'Code', href: 'https://github.com/Azuma413/S2A2', icon: '💻' },
];

const BIBTEX = `@misc{hiratsuka2026s2a2audiovisualimitationlearning,
      title={S2A2: Audio-Visual Imitation Learning for Manipulation Tasks Using Acoustic Spatial Information},
      author={Kaneyoshi Hiratsuka and Benjamin Yen and Ryosuke Kojima},
      year={2026},
      eprint={2607.26047},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2607.26047},
}`;

const TASKS = [
  {
    name: 'Localization',
    needs: ['Space'],
    body:
      'Two visually indistinguishable objects; only one emits sound, and the same sound is used across every episode. Nothing but the spatial position of the source tells the robot which object to pick.',
  },
  {
    name: 'Identification',
    needs: ['Signal'],
    body:
      'One object and two boxes. The object continuously emits one of two sounds, and the robot must carry it to the box that corresponds to that timbre. Vision fixes the target; only the sound fixes the destination.',
  },
  {
    name: 'Localization & Identification',
    needs: ['Space', 'Signal'],
    body:
      'Two identical-looking objects and two boxes. One object sounds, with one of two timbres. Localization selects the object, identification selects the box — both cues are required in the same episode.',
  },
  {
    name: 'Exploratory',
    needs: ['Space', 'Signal', 'Explore'],
    body:
      'Neither object makes a sound at rest. The robot has to pick each one up and shake it, listen for a rattle, and then place the object that sounded into the box.',
  },
];

const POLICIES = ['ACT', 'Diffusion Policy', 'VQ-BeT', 'π₀'] as const;
const MODELS = ['Baseline', 'S2A2', 'w/o Spec.', 'w/o Spat.'] as const;

/** [mean, std] per task, in the order: Localization, Identification, L&I, Exploratory. */
const RESULTS: Record<(typeof MODELS)[number], Record<string, [number, number][]>> = {
  Baseline: {
    ACT: [[20.3, 7.2], [39.3, 4.0], [11.0, 3.5], [35.0, 5.3]],
    'Diffusion Policy': [[13.3, 1.2], [41.3, 2.5], [9.3, 6.1], [26.3, 0.6]],
    'VQ-BeT': [[12.7, 6.8], [24.0, 6.9], [7.7, 1.2], [17.3, 5.8]],
    'π₀': [[18.3, 2.3], [32.3, 2.1], [7.0, 4.0], [9.0, 1.0]],
  },
  S2A2: {
    ACT: [[73.0, 5.6], [76.7, 1.2], [78.7, 2.1], [77.3, 5.7]],
    'Diffusion Policy': [[68.0, 3.6], [67.7, 7.2], [89.7, 2.1], [44.0, 3.6]],
    'VQ-BeT': [[40.3, 4.5], [32.3, 10.0], [55.3, 11.7], [32.7, 12.7]],
    'π₀': [[32.0, 9.9], [73.3, 8.4], [45.7, 8.1], [18.7, 4.2]],
  },
  'w/o Spec.': {
    ACT: [[74.7, 4.7], [44.3, 2.3], [45.0, 3.6], [75.3, 5.0]],
    'Diffusion Policy': [[68.3, 13.7], [32.7, 3.1], [46.0, 5.3], [37.3, 8.1]],
    'VQ-BeT': [[44.7, 5.5], [32.7, 3.1], [32.3, 7.5], [20.0, 20.0]],
    'π₀': [[17.3, 5.0], [40.0, 11.4], [14.3, 2.9], [26.7, 3.2]],
  },
  'w/o Spat.': {
    ACT: [[15.3, 4.0], [74.3, 7.0], [25.7, 3.1], [72.3, 8.4]],
    'Diffusion Policy': [[15.3, 1.2], [80.3, 3.8], [8.7, 3.8], [6.3, 2.3]],
    'VQ-BeT': [[12.3, 3.8], [49.3, 9.8], [19.0, 1.0], [25.0, 3.6]],
    'π₀': [[14.7, 5.7], [78.7, 6.0], [19.7, 3.8], [9.3, 10.4]],
  },
};

const TASK_COLUMNS = ['Localization', 'Identification', 'L&I', 'Exploratory'];

const REAL_ROBOT = [
  { task: 'Localization & Identification', baseline: 5, s2a2: 72 },
  { task: 'Exploratory', baseline: 12, s2a2: 50 },
];

const Section: FC<{ id?: string; title: string; children: ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="mt-14 sm:mt-20">
    <h2 className="mb-5 border-b border-hair pb-2 font-heading text-2xl font-bold text-ink">
      {title}
    </h2>
    {children}
  </section>
);

const Figure: FC<{ src: string; alt: string; caption: ReactNode; className?: string }> = ({
  src,
  alt,
  caption,
  className = '',
}) => (
  <figure className={`my-8 ${className}`}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full rounded-xl border border-hair bg-white shadow-sm"
    />
    <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">{caption}</figcaption>
  </figure>
);

const S2A2Page: FC = () => {
  useDocumentMeta(
    'S2A2: Audio-Visual Imitation Learning for Manipulation Tasks Using Acoustic Spatial Information | Kaneyoshi Hiratsuka',
    'S2A2 is a multimodal imitation learning framework that fuses acoustic spatial maps and spotformed spectrograms with vision, evaluated on a new suite of acoustic-aware manipulation tasks in simulation and on a real bimanual robot.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BIBTEX).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28">
      {/* ---------- Hero ---------- */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <div className="mx-auto max-w-4xl text-center">
            <Link
              to="/#research"
              className="mb-8 inline-block text-sm text-accent hover:text-accent-hover"
            >
              &larr; Back to Research
            </Link>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Spatial-Spectral Audio Action
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Audio-Visual Imitation Learning for Manipulation Tasks Using Acoustic Spatial
              Information
            </h1>

            {/* Authors */}
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-ink-light">
              {AUTHORS.map((a) => (
                <li key={a.name}>
                  {a.href ? (
                    <Link to={a.href} className="text-accent hover:text-accent-hover">
                      {a.name}
                    </Link>
                  ) : (
                    a.name
                  )}
                  <sup className="ml-0.5 text-ink-faint">{a.affiliations.join(',')}</sup>
                </li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-ink-muted">
              {AFFILIATIONS.map((name, i) => (
                <li key={name}>
                  <sup className="mr-0.5 text-ink-faint">{i + 1}</sup>
                  {name}
                </li>
              ))}
            </ul>

            {/* Status / links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-80"
                >
                  <span aria-hidden>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              arXiv:{' '}
              <a
                href={`https://arxiv.org/abs/${ARXIV_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                {ARXIV_ID}
              </a>
            </p>
          </div>
        </AnimatedDiv>
      </header>

      {/* ---------- Body ---------- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv delay={100}>
          <article className="mx-auto mt-12 max-w-4xl text-base leading-relaxed text-ink-light sm:text-lg">
            <figure className="my-8">
              <div className="relative w-full overflow-hidden rounded-xl border border-hair shadow-sm" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/jfUMjmGBMm4"
                  title="S2A2: Audio-Visual Imitation Learning for Manipulation Tasks Using Acoustic Spatial Information"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">
                <strong className="text-ink">Video overview.</strong> A walkthrough of the
                acoustic-aware manipulation tasks, the S2A2 framework, and the simulation and
                real-robot results.
              </figcaption>
            </figure>

            <Figure
              src="/images/s2a2/overview.jpg"
              alt="Overview of the S2A2 framework"
              caption={
                <>
                  <strong className="text-ink">Overview of the S2A2 framework.</strong> RGB images
                  are encoded by a vision encoder. In parallel, the multi-channel signal from several
                  microphone arrays is turned into an <em>acoustic spatial map</em> and a{' '}
                  <em>spectrogram</em>, each with its own encoder. The three feature streams are
                  concatenated and fed to one of four imitation learning policies (ACT, Diffusion
                  Policy, VQ-BeT, π₀), which lets the robot both identify and search for sound.
                </>
              }
            />

            <Section title="Abstract">
              <p className="mb-4">
                Acoustic information provides rich cues about object location, material properties,
                and changes caused by contact or motion. This paper introduces a new set of{' '}
                <strong className="text-ink">acoustic-aware manipulation tasks</strong> for imitation
                learning, in which robots must use auditory cues to determine manipulation targets.
                These tasks require sound source localization and identification for active
                exploration in robotic manipulation.
              </p>
              <p className="mb-4">
                We propose a multimodal imitation learning framework,{' '}
                <strong className="text-ink">Spatial-Spectral Audio Action (S2A2)</strong>, that
                integrates visual features with acoustic spatial and acoustic signal information for
                these tasks. We implemented S2A2 models that integrate policies such as ACT,
                Diffusion Policy, VQ-BeT, and π₀ into our framework. Simulation experiments showed
                that the proposed method is the most effective for tasks requiring both position and
                timbre. Furthermore, real-robot experiments confirm the applicability of the proposed
                tasks and framework to real-world manipulation.
              </p>
            </Section>

            <Section title="Contributions">
              <ol className="space-y-4">
                {[
                  'A new family of acoustic-aware manipulation tasks, in which a spatially distributed sound environment governs which object to manipulate, where to put it, or whether active exploration is needed.',
                  'S2A2 — a multimodal imitation learning framework that fuses acoustic spatial information and acoustic signal information with vision, and plugs into existing policy architectures with minimal changes.',
                  'A systematic evaluation of what acoustic information actually contributes to policy learning, in both simulation and on a real robot.',
                ].map((text, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section title="Acoustic-Aware Manipulation Tasks">
              <p className="mb-6">
                Most imitation learning benchmarks quietly assume the target of manipulation is
                visible, and that the goal can be read off the image. That assumption breaks under
                occlusion, changing illumination, or — the case we focus on — when several objects
                look exactly alike. In every task below the robot must grasp the right object and drop
                it into the right box; the object positions are randomized, the boxes are fixed.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {TASKS.map((task) => (
                  <div key={task.name} className="rounded-xl border border-hair bg-white p-5">
                    <h3 className="font-heading text-lg font-semibold text-ink">{task.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {task.needs.map((n) => (
                        <span
                          key={n}
                          className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-light">{task.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Method">
              <h3 className="mb-2 mt-8 font-heading text-xl font-semibold text-ink">
                Acoustic spatial map pipeline
              </h3>
              <p className="mb-4">
                All microphone arrays sit in the same plane as the workspace. Each array's
                multi-channel signal (16&nbsp;kHz, 512-point STFT with 50% overlap) is processed with{' '}
                <strong className="text-ink">MUSIC</strong> to obtain a direction-of-arrival score per
                direction. The scores are log-normalized, attenuated with distance from the array
                center, and projected onto a 224×224 plane covering the workspace, giving an acoustic
                spatial map <em>S</em> ∈ ℝ<sup>224×224×N</sup> for <em>N</em> arrays. A ResNet-18
                widened to <em>N</em> input channels, trained from scratch, encodes it.
              </p>

              <h3 className="mb-2 mt-8 font-heading text-xl font-semibold text-ink">
                Spectrogram pipeline
              </h3>
              <p className="mb-4">
                From the same spatial map we take the highest likelihood peak as the source candidate,
                then apply <strong className="text-ink">Spotforming</strong> (multi-array separation
                with NMF) to isolate that source and produce a spectrogram. A single-channel ResNet-18,
                again from scratch, encodes it. Spotforming keeps only the components that several
                arrays agree on, which suppresses ambient noise and local sidelobes — a large part of
                why the pipeline survives the transfer to real hardware.
              </p>

              <h3 className="mb-2 mt-8 font-heading text-xl font-semibold text-ink">
                Multimodal policy
              </h3>
              <p className="mb-4">
                Each pipeline emits a feature map. The design constraint was to change the existing
                policies as little as possible: the acoustic features are converted into whatever the
                policy already consumes — tokens for ACT and π₀, spatial-softmax keypoints for
                Diffusion Policy and VQ-BeT — and concatenated with the visual features and
                proprioception. The same four policies are then trained with their usual objectives.
              </p>

              <Figure
                src="/images/s2a2/simulation-setup.png"
                alt="Simulation environment combining Genesis and Pyroomacoustics"
                caption={
                  <>
                    <strong className="text-ink">Simulation setup.</strong> The physics simulator
                    Genesis is coupled with the acoustic simulator Pyroomacoustics. RGB images update
                    at 30&nbsp;FPS, acoustic observations at 10&nbsp;FPS. The workspace center sits
                    500&nbsp;mm in front of a Franka Emika Panda, with four microphone arrays spaced
                    evenly on a 300&nbsp;mm-radius circle around it.
                  </>
                }
              />
            </Section>

            <Section title="Simulation Results">
              <p className="mb-6">
                Four configurations are compared: <strong className="text-ink">Baseline</strong>{' '}
                (vision only), <strong className="text-ink">S2A2</strong> (all three pipelines),{' '}
                <strong className="text-ink">w/o Spec.</strong> (vision + spatial map), and{' '}
                <strong className="text-ink">w/o Spat.</strong> (vision + spectrogram). Each task is
                trained with three seeds; success is grasping the correct object and dropping it into
                the correct box within 700 steps (≈23&nbsp;s), over 100 trials.
              </p>

              <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[38rem] border-collapse text-sm">
                  <caption className="caption-bottom pt-3 text-left text-sm text-ink-muted">
                    Task success rate (%), mean ± std over 3 seeds. The best value within each policy
                    is in bold.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-ink-faint/40">
                      <th className="py-2 pr-3 text-left font-semibold text-ink">Model</th>
                      {TASK_COLUMNS.map((t) => (
                        <th key={t} className="px-3 py-2 text-right font-semibold text-ink">
                          {t}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {POLICIES.map((policy) => {
                    const best = TASK_COLUMNS.map((_, taskIdx) =>
                      Math.max(...MODELS.map((m) => RESULTS[m][policy][taskIdx][0]))
                    );
                    return (
                      <tbody key={policy} className="border-b border-hair">
                        <tr className="bg-accent-soft/60">
                          <th
                            colSpan={TASK_COLUMNS.length + 1}
                            className="py-1.5 pr-3 text-left font-heading text-base font-semibold text-ink"
                          >
                            {policy}
                          </th>
                        </tr>
                        {MODELS.map((model) => (
                          <tr key={model} className="border-t border-hair/70">
                            <td className="py-1.5 pr-3 text-ink-light">{model}</td>
                            {RESULTS[model][policy].map(([mean, std], i) => {
                              const isBest = mean === best[i];
                              return (
                                <td
                                  key={i}
                                  className={`px-3 py-1.5 text-right tabular-nums ${
                                    isBest ? 'font-bold text-ink' : 'text-ink-light'
                                  }`}
                                >
                                  {mean.toFixed(1)}
                                  <span className="text-ink-faint"> ± {std.toFixed(1)}</span>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    );
                  })}
                </table>
              </div>

              <p className="mt-8 mb-4">
                The pattern is consistent: whichever configuration carries the information a task
                actually needs wins that task. Localization is solved by the spatial map alone
                (w/o&nbsp;Spec. matches S2A2), identification by the spectrogram alone
                (w/o&nbsp;Spat. matches S2A2) — but on the L&amp;I task, which needs both, only the
                full S2A2 model does well. The flip side is that adding a pipeline a task does not
                need can <em>hurt</em>: under limited data, a redundant acoustic input gets in the way
                of policy learning. How much acoustic information helps also depends on the policy —
                ACT and Diffusion Policy improve markedly, VQ-BeT much less, and π₀ swings by task.
              </p>

              <Figure
                src="/images/s2a2/learning-curves.png"
                alt="Success rate against training steps for all four tasks and policies"
                caption={
                  <>
                    <strong className="text-ink">Success rate vs. training steps.</strong>{' '}
                    Localization and identification were evaluated every 10,000 steps up to 100,000;
                    L&amp;I and exploratory every 20,000 steps up to 200,000.
                  </>
                }
              />

              <Figure
                src="/images/s2a2/latent-tsne.jpg"
                alt="t-SNE visualization of the policies' latent features"
                caption={
                  <>
                    <strong className="text-ink">What the latent space knows.</strong> (a) Diffusion
                    Policy on the L&amp;I task: points are colored by the emitted sound type (top) and
                    by the y-coordinate of the sounding object (bottom). Only the full S2A2 model
                    separates <em>both</em>; drop a pipeline and the corresponding structure
                    disappears — spatial and signal information really do occupy independent roles.
                    (b) On the exploratory task, ACT forms a clean structure over source position
                    while Diffusion Policy does not, which is exactly where their success rates
                    diverge.
                  </>
                }
              />
            </Section>

            <Section title="Real-Robot Experiments">
              <p className="mb-4">
                We used the right arm only of <strong className="text-ink">ILOHA</strong>, an
                open-source ALOHA-type bimanual manipulator — 6 joints plus a 1-DoF gripper, so
                7-dimensional states and actions. Vision came from an overhead camera and a RealSense
                on the end-effector, cropped and resized to 224×224. Audio came from four TAMAGO-03
                circular arrays (8 mics on a 35&nbsp;mm-radius circle, 16&nbsp;kHz), placed at the
                corners of a 0.6&nbsp;×&nbsp;1.2&nbsp;m rectangle around the workspace.
              </p>

              <div className="my-8 grid gap-4 sm:grid-cols-2">
                {REAL_ROBOT.map((r) => (
                  <div key={r.task} className="rounded-xl border border-hair bg-white p-5">
                    <h3 className="font-heading text-base font-semibold text-ink">{r.task}</h3>
                    <div className="mt-4 space-y-3">
                      {[
                        { label: 'Baseline (vision only)', value: r.baseline, tone: 'bg-ink-faint' },
                        { label: 'S2A2', value: r.s2a2, tone: 'bg-accent' },
                      ].map((bar) => (
                        <div key={bar.label}>
                          <div className="mb-1 flex items-baseline justify-between text-sm">
                            <span className="text-ink-muted">{bar.label}</span>
                            <span className="font-bold tabular-nums text-ink">{bar.value}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-accent-soft">
                            <div
                              className={`h-full rounded-full ${bar.tone}`}
                              style={{ width: `${bar.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mb-4">
                Success rates over 100 trials each. Tasks that a vision-only policy essentially cannot
                solve become tractable once acoustic information is in the loop — despite real
                reflections, background noise, and mechanical vibration from the robot's own drive
                train.
              </p>

              <Figure
                src="/images/s2a2/real-robot.jpg"
                alt="Real-robot rollout with acoustic spatial map and spectrogram overlays"
                caption={
                  <>
                    <strong className="text-ink">Real-robot rollout.</strong> (a) Top: the robot
                    executing the exploratory task. Middle: the acoustic spatial map, summed over
                    channels and overlaid on the overhead camera image. Bottom: the spotformed
                    spectrogram. (b) Success rates for the baseline and S2A2.
                  </>
                }
              />
            </Section>

            <Section title="Limitations">
              <p className="mb-4">
                The real-robot validation uses a single robot in a limited environment; generalizing
                across platforms (bimanual, mobile) and to scenes with many simultaneous sources is
                future work. And the efficiency with which a policy exploits acoustic information is
                architecture-dependent — π₀ and VQ-BeT improved only under some conditions. Designing
                a better way to inject acoustic information into large pre-trained models, and
                bringing in sim-to-real techniques for audio, are the obvious next steps.
              </p>
            </Section>

            <Section title="BibTeX">
              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-3 top-3 rounded-md border border-hair bg-white px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <pre className="overflow-x-auto rounded-xl border border-hair bg-white p-5 pr-20 text-xs leading-relaxed text-ink-light sm:text-sm">
                  <code>{BIBTEX}</code>
                </pre>
              </div>
            </Section>

            <div className="mt-16 border-t border-hair pt-8">
              <Link to="/#research" className="text-sm text-accent hover:text-accent-hover">
                &larr; Back to Research
              </Link>
            </div>
          </article>
        </AnimatedDiv>
      </div>
    </div>
  );
};

export default S2A2Page;
