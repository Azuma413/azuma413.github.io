import React, { useEffect, useState, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AnimatedDiv from './AnimatedDiv';
import { useDocumentMeta } from './useDocumentMeta';

// Dedicated, paper-style page for GatedVLA (AlpaSim E2E Closed Loop Challenge).
// Routed at /projects/gatedvla (see App.tsx) — it takes precedence over the generic
// /projects/:slug Markdown detail page. The matching entry in data/projects.js
// still supplies the Research-list row and the build-time SEO prerender.

const AUTHORS = [
  { name: 'Kaneyoshi Hiratsuka', affiliations: [1], href: '/' },
  { name: 'Naoki Takada', affiliations: [2] },
  { name: 'Makoto Kawano', affiliations: [3] },
];

const AFFILIATIONS = [
  'Kyoto University',
  'Tokyo University of Agriculture and Technology',
  'The University of Tokyo',
];

const ARXIV_ID = '2611.01663';

const LINKS = [
  { label: 'Paper', href: `https://arxiv.org/pdf/${ARXIV_ID}`, icon: '📄' },
  { label: 'arXiv', href: `https://arxiv.org/abs/${ARXIV_ID}`, icon: '📚' },
  { label: 'Code', href: 'https://github.com/Azuma413/GatedVLA', icon: '💻' },
  {
    label: 'Challenge',
    href: 'https://huggingface.co/spaces/nvidia/AlpasimE2EClosedLoopChallenge2026',
    icon: '🏁',
  },
];

const BIBTEX = `@misc{hiratsuka2026gatedvla,
      title={GatedVLA with Camera-Based Emergency Braking: AlpaSim E2E Closed Loop Challenge Technical Report},
      author={Kaneyoshi Hiratsuka and Naoki Takada and Makoto Kawano},
      year={2026},
      eprint={2611.01663},
      archivePrefix={arXiv},
      url={https://arxiv.org/abs/2611.01663},
}`;

/** Open-loop error at step 38,400 on 240 fixed validation samples: [baseline, mask]. */
const OPEN_LOOP = [
  { split: 'All', ade: [0.337, 0.341], fde: [1.029, 1.023], miss: [0.125, 0.125] },
  { split: 'Left', ade: [0.405, 0.376], fde: [1.213, 1.1], miss: [0.2, 0.15] },
  { split: 'Right', ade: [0.367, 0.36], fde: [1.136, 1.089], miss: [0.087, 0.1] },
  { split: 'Straight', ade: [0.239, 0.287], fde: [0.737, 0.879], miss: [0.087, 0.125] },
];

/** Local closed-loop results over the same 150 scenes (failure counts = affected scenes). */
const CLOSED_LOOP = [
  { config: 'Baseline, 1st', host: 'Blackwell', score: 0.476, atFault: 42, offroad: 25, corridor: 8, rearEnded: 12 },
  { config: 'Baseline, 2nd', host: 'Ada', score: 0.481, atFault: 41, offroad: 19, corridor: 15, rearEnded: 9 },
  { config: 'Mask, 1st', host: 'Blackwell', score: 0.499, atFault: 35, offroad: 22, corridor: 12, rearEnded: 15 },
  { config: 'Mask, 2nd', host: 'Ada', score: 0.534, atFault: 33, offroad: 23, corridor: 8, rearEnded: 15 },
  { config: 'Mask + AEB 10 Hz, 1st', host: 'Blackwell', score: 0.607, atFault: 12, offroad: 27, corridor: 11, rearEnded: 25 },
  { config: 'Mask + AEB 10 Hz, 2nd', host: 'Ada', score: 0.591, atFault: 10, offroad: 31, corridor: 13, rearEnded: 23 },
  { config: 'Mask + AEB 5 Hz', host: 'Ada', score: 0.59, atFault: 13, offroad: 27, corridor: 10, rearEnded: 28 },
];

const HEADLINE = [
  { label: 'Baseline', value: 0.479, tone: 'bg-ink-faint' },
  { label: '+ Visual mask', value: 0.517, tone: 'bg-accent/60' },
  { label: '+ Visual mask + AEB', value: 0.599, tone: 'bg-accent' },
];

const TRAINING_PATHS = [
  {
    name: 'Path A',
    tag: 'ungated',
    body:
      'Standard flow-matching loss with the target point dropped at p = 0.5. Updates both the VLM and the DiT.',
  },
  {
    name: 'Path B',
    tag: 'inference path',
    body:
      'Stop-gradient mask, target point provided. Distilled toward Path A’s velocity; updates the DiT only.',
  },
  {
    name: 'Path C',
    tag: 'trains the gate',
    body:
      'Active mask, target point hidden from the DiT but given to the gate. Distilled toward Path A; updates only the gating module — so the mask must keep the tokens that carry navigation intent.',
  },
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

const fmt = (v: number) => v.toFixed(3);

const GatedVLAPage: FC = () => {
  useDocumentMeta(
    'GatedVLA with Camera-Based Emergency Braking — AlpaSim E2E Closed Loop Challenge | Kaneyoshi Hiratsuka',
    'GatedVLA pairs the Qwen-Drive-1.0-4B VLM with a flow-matching action expert and a learned visual mask, plus a camera-based emergency braking module, for the AlpaSim E2E Closed Loop Challenge.'
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

  const bestScore = Math.max(...CLOSED_LOOP.map((r) => r.score));
  const fewestAtFault = Math.min(...CLOSED_LOOP.map((r) => r.atFault));

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
              AlpaSim E2E Closed Loop Challenge · Technical Report
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              GatedVLA with Camera-Based Emergency Braking
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
              <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-white px-5 py-2 text-sm font-medium text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Team HogeHoge · PAI-AV track
              </span>
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
            <Figure
              src="/images/gatedvla/system.png"
              alt="System overview of GatedVLA and the emergency braking module"
              caption={
                <>
                  <strong className="text-ink">System overview.</strong> (a) The GatedVLA policy,
                  trained end-to-end: a visual mask <em>m<sub>p</sub></em> biases the flow-matching
                  action expert’s cross-attention to the VLM’s image tokens. (b) A pretrained
                  detector and rule-based emergency braking (AEB), added only at deployment, re-time
                  the planned waypoints along their own path.
                </>
              }
            />

            <Section title="Abstract">
              <p className="mb-4">
                This report presents <strong className="text-ink">GatedVLA</strong>, our entry for
                the Physical AI AV (PAI-AV) track of the NVIDIA AlpaSim E2E Closed Loop Challenge.
                The learned vision-language-action (VLA) policy pairs the driving-pretrained{' '}
                <strong className="text-ink">Qwen-Drive-1.0-4B</strong> vision-language model with a
                layer-wise <strong className="text-ink">flow-matching action expert</strong> that
                outputs a 2.5&nbsp;s horizon of acceleration and curvature controls, augmented with a{' '}
                <strong className="text-ink">soft visual mask</strong> applied to the expert’s
                cross-attention.
              </p>
              <p className="mb-4">
                Compared with an identically trained baseline, the masked policy reaches comparable
                overall open-loop error while reducing error on left turns. In local closed-loop
                evaluation over the same 150 scenes (two rollouts per scene), the visual mask raises
                the mean scene score from 0.479 to 0.517 (paired difference +0.038, 95% bootstrap CI
                [−0.018, +0.093]). Adding a rule-based{' '}
                <strong className="text-ink">automatic emergency braking (AEB)</strong> module at
                deployment raises it further to <strong className="text-ink">0.599</strong> (+0.082,
                CI [+0.023, +0.143]) and cuts the mean number of scenes with at-fault collisions from
                34.0 to 11.0.
              </p>
            </Section>

            <Section title="Why Closed Loop">
              <p className="mb-4">
                Even small planning errors change the observations a driving policy sees next — a
                compounding effect that only closed-loop evaluation reveals. AlpaSim scores each
                held-out scene in closed loop, and a scene scores <em>zero</em> if the ego vehicle
                causes an at-fault collision, drives off-road, or leaves the recorded driving
                corridor; otherwise it scores min(progress&nbsp;/&nbsp;0.8, 1).
              </p>
              <p className="mb-4">
                In our preliminary runs, at-fault collisions were the main source of lost score —
                mostly slow or stationary lead vehicles where the planned trajectory never started
                braking. That observation drives the two additions in this work:
              </p>
              <ol className="space-y-4">
                {[
                  'A learned visual mask, trained to keep the image evidence that encodes navigation intent for the action expert.',
                  'A detector-based emergency braking module that intervenes when the learned policy fails to decelerate.',
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

            <Section title="Method">
              <h3 className="mb-2 mt-8 font-heading text-xl font-semibold text-ink">
                Policy: VLM + flow-matching action expert
              </h3>
              <p className="mb-4">
                Two front wide-angle frames (<em>t</em><sub>0</sub> and <em>t</em><sub>0</sub>
                −0.1&nbsp;s) and the fixed prompt “predict trajectory” go into the VLM. Ego-state
                history and navigation are given only to the action expert: five 10&nbsp;Hz steps of
                [x, y, heading, speed, a<sub>lon</sub>] plus a{' '}
                <strong className="text-ink">target point</strong> 25&nbsp;m ahead (along AlpaSim’s
                map route at deployment). The expert is a π₀-style 32-block Diffusion Transformer
                whose cross-attention blocks each read a matching VLM layer. Trained with conditional
                flow matching and sampled with 10 Euler steps, it predicts 25 steps of
                [acceleration, curvature] at 10&nbsp;Hz in a kinematic unicycle action space adapted
                from NVIDIA Alpamayo&nbsp;1.5; integrating them from the current speed gives the
                waypoints. The policy replans every 0.5&nbsp;s.
              </p>

              <h3 className="mb-2 mt-8 font-heading text-xl font-semibold text-ink">
                Budgeted visual mask
              </h3>
              <p className="mb-4">
                A gating module scores each visual token from its (detached) final-layer VLM hidden
                state and a query built from the target point and ego state, following the visual
                evidence budget formulation of S². Scores are standardized per frame and squashed
                into soft retention weights <em>m<sub>p</sub></em>, with a bias solved by bisection
                so that the per-frame mean equals the budget <em>ρ</em> = 0.2{' '}
                <em>by construction</em> — no auxiliary budget loss, and no collapse to all-keep or
                to a binary mask. The mask acts only through the expert:{' '}
                <code className="rounded bg-accent-soft px-1 text-sm">log m<sub>p</sub></code> is
                added to the cross-attention logits of image tokens, while text tokens and the VLM
                itself stay unmasked.
              </p>
              <p className="mb-6">
                Every training step runs three expert passes that share one VLM forward pass, the
                same noise, and the same flow time:
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {TRAINING_PATHS.map((p) => (
                  <div key={p.name} className="rounded-xl border border-hair bg-white p-5">
                    <h4 className="font-heading text-lg font-semibold text-ink">{p.name}</h4>
                    <span className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                      {p.tag}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-ink-light">{p.body}</p>
                  </div>
                ))}
              </div>

              <Figure
                src="/images/gatedvla/mask-left-turn.jpg"
                alt="Visual mask, gate score, DiT attention and predicted trajectory on a left turn"
                caption={
                  <>
                    <strong className="text-ink">The mask on a left turn</strong> (step 38,400).
                    From left to right: front camera, retention weight <em>m</em>, standardized gate
                    score <em>z</em>, the DiT’s cross-attention on the frame, and a bird’s-eye view of
                    past trajectory, ground truth, prediction, and target point.
                  </>
                }
              />

              <h3 className="mb-2 mt-8 font-heading text-xl font-semibold text-ink">
                Camera-based emergency braking
              </h3>
              <p className="mb-4">
                An off-the-shelf <strong className="text-ink">RT-DETRv2-R18</strong> (COCO) runs on
                the current front frame and keeps seven traffic classes above 0.5 confidence. The
                central 40% of each box’s bottom edge is projected onto the flat ground plane with
                the nominal camera calibration. Among obstacles within a 1.3&nbsp;m lateral corridor
                around the planned path, the closest one gives the arc-length gap <em>d</em>, and a
                linear fit over the last second gives the closing speed <em>c</em>. With braking
                margin <em>g</em> = <em>d</em> − 2.5&nbsp;m − 0.4&nbsp;s·<em>c</em>, the planned
                speed profile is capped by a deceleration ramp whenever <em>g</em> ≤ 0 or the
                required deceleration exceeds 3&nbsp;m/s². Because the plan is{' '}
                <strong className="text-ink">re-timed along its own path</strong>, AEB can only slow
                the car down — it never steers, and a braked ego does not accelerate to catch up with
                a stale plan.
              </p>
            </Section>

            <Section title="Open-Loop Results">
              <p className="mb-6">
                Both models were trained from the same commit and seed for 12 epochs (38,400 steps)
                on the NVIDIA PhysicalAI-Autonomous-Vehicles dataset, using only front wide-angle
                camera streams and egomotion, on 12 Intel Aurora XPU tiles. Evaluation uses a fixed
                validation subset of 240 samples (80 left, 80 right, 80 straight).
              </p>

              <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[34rem] border-collapse text-sm">
                  <caption className="caption-bottom pt-3 text-left text-sm text-ink-muted">
                    Open-loop error at step 38,400 (baseline / mask). ADE and FDE in meters over
                    2.5&nbsp;s; miss = any waypoint error &gt; 2&nbsp;m. The lower value is in bold.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-ink-faint/40">
                      <th className="py-2 pr-3 text-left font-semibold text-ink">Split</th>
                      {['ADE', 'FDE', 'Miss rate'].map((h) => (
                        <th key={h} className="px-3 py-2 text-right font-semibold text-ink">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {OPEN_LOOP.map((row) => (
                      <tr key={row.split} className="border-t border-hair/70">
                        <td className="py-1.5 pr-3 text-ink-light">{row.split}</td>
                        {[row.ade, row.fde, row.miss].map(([base, mask], i) => (
                          <td key={i} className="px-3 py-1.5 text-right tabular-nums text-ink-light">
                            <span className={base < mask ? 'font-bold text-ink' : ''}>{fmt(base)}</span>
                            <span className="text-ink-faint"> / </span>
                            <span className={mask < base ? 'font-bold text-ink' : ''}>{fmt(mask)}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-8 mb-4">
                Overall error is on par. The mask helps on left turns (FDE 1.100 vs. 1.213, miss
                rate 0.150 vs. 0.200) and slightly on right turns, at the cost of straight segments.
                Removing the images hurts far more than removing the target point (masked policy FDE
                1.564 with black frames vs. 1.135 with neither target nor mask), so visual evidence
                strongly informs planning in both models.
              </p>

              <Figure
                src="/images/gatedvla/mask-samples.jpg"
                alt="Visual mask on a left turn, a right turn, and straight driving"
                caption={
                  <>
                    <strong className="text-ink">Validation samples at step 38,400</strong> — a left
                    turn, a right turn, and straight driving (top to bottom), with the same panels as
                    above. The mask is sample-dependent rather than a fixed spatial prior: the rank
                    correlation between two samples’ masks is only 0.055, while the DiT’s
                    cross-attention largely follows the mask (0.827).
                  </>
                }
              />
            </Section>

            <Section title="Closed-Loop Results">
              <p className="mb-6">
                Local closed-loop evaluation on the same 150 scenes, sampled from the 441-scene
                curated validation split with the dev challenge preset. Each configuration was rolled
                out twice, on different hosts (NVIDIA Blackwell and Ada).
              </p>

              <div className="my-8 rounded-xl border border-hair bg-white p-5">
                <h3 className="font-heading text-base font-semibold text-ink">
                  Mean scene score (two rollouts averaged)
                </h3>
                <div className="mt-4 space-y-3">
                  {HEADLINE.map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-1 flex items-baseline justify-between text-sm">
                        <span className="text-ink-muted">{bar.label}</span>
                        <span className="font-bold tabular-nums text-ink">{fmt(bar.value)}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-accent-soft">
                        <div
                          className={`h-full rounded-full ${bar.tone}`}
                          style={{ width: `${bar.value * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[40rem] border-collapse text-sm">
                  <caption className="caption-bottom pt-3 text-left text-sm text-ink-muted">
                    Per-rollout results. Failure columns count affected scenes. Being rear-ended by
                    another agent is not at fault and only halts progress.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-ink-faint/40">
                      {['Configuration', 'Host', 'Score', 'At-fault', 'Off-road', 'Corridor exit', 'Rear-ended'].map(
                        (h, i) => (
                          <th
                            key={h}
                            className={`py-2 font-semibold text-ink ${
                              i < 2 ? 'pr-3 text-left' : 'px-3 text-right'
                            }`}
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {CLOSED_LOOP.map((r) => (
                      <tr
                        key={r.config}
                        className={`border-t border-hair/70 ${
                          r.config.includes('AEB') ? 'bg-accent-soft/40' : ''
                        }`}
                      >
                        <td className="py-1.5 pr-3 text-ink-light">{r.config}</td>
                        <td className="py-1.5 pr-3 text-ink-muted">{r.host}</td>
                        <td
                          className={`px-3 py-1.5 text-right tabular-nums ${
                            r.score === bestScore ? 'font-bold text-ink' : 'text-ink-light'
                          }`}
                        >
                          {fmt(r.score)}
                        </td>
                        <td
                          className={`px-3 py-1.5 text-right tabular-nums ${
                            r.atFault === fewestAtFault ? 'font-bold text-ink' : 'text-ink-light'
                          }`}
                        >
                          {r.atFault}
                        </td>
                        <td className="px-3 py-1.5 text-right tabular-nums text-ink-light">{r.offroad}</td>
                        <td className="px-3 py-1.5 text-right tabular-nums text-ink-light">{r.corridor}</td>
                        <td className="px-3 py-1.5 text-right tabular-nums text-ink-light">{r.rearEnded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-8 mb-4">
                The mask alone gives a modest, not yet significant gain (+0.038, wins/losses 37/26).
                AEB is what moves the needle on collisions: at-fault scenes drop from 33–35 to
                10–12, and the score gain over the mask alone is +0.082 with a confidence interval
                that excludes zero. Running the detector at 5&nbsp;Hz instead of 10&nbsp;Hz makes no
                measurable difference (−0.009, 34/34).
              </p>

              <Figure
                src="/images/gatedvla/aeb-pairs.jpg"
                alt="Map and camera views of the same scenes with and without AEB"
                caption={
                  <>
                    <strong className="text-ink">With vs. without AEB.</strong> Map and camera views
                    0.3&nbsp;s before the collision without AEB (left), and at the same elapsed time
                    with AEB (right). With braking, the ego vehicle holds a safe gap to the slower lead
                    vehicle.
                  </>
                }
              />

              <Figure
                src="/images/gatedvla/aeb-speed.png"
                alt="Ego speed profiles with and without AEB in three scenes"
                caption={
                  <>
                    <strong className="text-ink">Ego speed profiles</strong> in scenes that collided
                    without AEB but reached full score with it. Dashed lines mark the collision time
                    without AEB.
                  </>
                }
              />
            </Section>

            <Section title="Limitations">
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong className="text-ink">AEB thresholds were tuned on the evaluation scenes</strong>{' '}
                  (by replaying cached detections), so the gains may be optimistic for the held-out
                  private test set.
                </li>
                <li>
                  <strong className="text-ink">Remaining collisions.</strong> Of the 12 left in the
                  first 10&nbsp;Hz AEB rollout, 6 involved obstacles about 2&nbsp;m to the side that
                  entered the narrow 1.3&nbsp;m corridor too late — the price of suppressing
                  false-positive braking.
                </li>
                <li>
                  <strong className="text-ink">Braking has side effects.</strong> AEB raises
                  rear-ended scenes from 15 to 25. These are not at fault in the simulator, but abrupt
                  braking is a genuine hazard on real roads.
                </li>
                <li>
                  <strong className="text-ink">Lateral failures now dominate.</strong> Off-road
                  departures and corridor exits account for 0.253 of the 0.393 lost score with AEB —
                  failure modes a longitudinal brake cannot fix.
                </li>
              </ul>
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

export default GatedVLAPage;
