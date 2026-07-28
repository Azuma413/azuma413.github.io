import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import AnimatedDiv from './AnimatedDiv';
import { useDocumentMeta } from './useDocumentMeta';

const Profile: FC = () => {
  useDocumentMeta(
    '平塚謙良 (Kaneyoshi Hiratsuka) | AI Researcher',
    "Kaneyoshi Hiratsuka — master's student in the Learning Machines group, Kyoto University. Reinforcement learning, imitation learning, robot foundation models, robot audition, and differentiable simulators."
  );

  return (
    <section id="about" className="relative">
      {/* Calm banner — Saihō-ji moss garden, Kyoto */}
      <div className="relative h-[34vh] min-h-[240px] max-h-[440px] w-full overflow-hidden">
        <img
          src="/images/saihouji.jpg"
          alt="Moss garden of Saihō-ji, Kyoto"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Soft wash so the photo settles into the paper background */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-paper"></div>
        <div className="absolute inset-x-0 bottom-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90 drop-shadow">
              西芳寺 · Kyoto, Japan
            </span>
          </div>
        </div>
      </div>

      {/* Identity + About, on a paper panel overlapping the banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <div className="relative -mt-16 sm:-mt-20 rounded-2xl border border-hair bg-paper/95 backdrop-blur-sm shadow-sm px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              {/* Portrait */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-hair shadow-sm bg-white">
                  <img
                    src="/images/self_portrait.jpg"
                    alt="Portrait of Kaneyoshi Hiratsuka"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name + role */}
              <div className="min-w-0 flex-1 text-center md:text-left">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-2">
                  AI Researcher
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight mb-1 font-heading">
                  平塚 謙良
                </h1>
                <p className="text-lg sm:text-xl text-ink-muted font-medium mb-5">
                  Kaneyoshi Hiratsuka
                </p>
                <p className="text-base sm:text-lg text-ink-light leading-relaxed">
                  Working at the intersection of{' '}
                  <span className="text-ink font-medium">AI and robotics</span> — reinforcement
                  learning, imitation learning, robot foundation models, robot audition, and
                  differentiable simulators.
                </p>
              </div>
            </div>

            {/* About Me */}
            <div className="mt-10 pt-8 border-t border-hair">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-muted mb-5">
                About
              </h2>
              <div className="max-w-3xl space-y-4 text-base sm:text-lg text-ink-light leading-relaxed">
                <p>
                  I am a first-year master's student (M1) in the{' '}
                  <a
                    href="https://lm.sys.i.kyoto-u.ac.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                  >
                    Learning Machines group
                  </a>
                  , Department of Systems Science, Graduate School of Informatics, Kyoto University.
                </p>
                <p>
                  I want to build robots that behave like humans and think like humans. Toward that
                  goal I work on{' '}
                  <span className="text-ink font-medium">reinforcement learning</span>,{' '}
                  <span className="text-ink font-medium">imitation learning</span>,{' '}
                  <span className="text-ink font-medium">robot foundation models</span>,{' '}
                  <span className="text-ink font-medium">robot audition</span>, and{' '}
                  <span className="text-ink font-medium">differentiable simulators</span>.
                </p>
                <p>
                  Outside the lab, I serve on the organizing committee of{' '}
                  <a
                    href="https://www.kupac.org/ja/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                  >
                    KUPAC
                  </a>
                  , a student-led Physical AI community at Kyoto University, and as a Director of{' '}
                  <a
                    href="https://www.xpac.or.jp/ja/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                  >
                    XPAC
                  </a>{' '}
                  (一般社団法人次世代フィジカルAI育成機構), a non-profit growing an open Physical AI
                  ecosystem.
                </p>
                <p>
                  Earlier, I was Co-founder &amp; CTO of{' '}
                  <a
                    href="https://onixion.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                  >
                    ONIXION Inc.
                  </a>
                  , where I led the development of AI agents for the manufacturing industry. I have
                  since stepped down and am no longer involved in the company.
                </p>
                <p className="text-ink-muted">
                  The ultimate goal, of course, is a maid robot. Everything above is just the
                  research programme required to get there. 🤖🧹
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/CV.pdf"
                  download="CV.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Curriculum Vitae
                </a>
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 rounded-full border border-hair bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink-faint hover:bg-accent-soft"
                >
                  View Research
                </a>
              </div>
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default Profile;
