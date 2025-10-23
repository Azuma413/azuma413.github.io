import React, { FC } from 'react';
import AnimatedDiv from './AnimatedDiv';

const Contact: FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <div className="max-w-3xl mx-auto text-center bg-slate-800/50 rounded-lg p-8 sm:p-12 shadow-2xl border border-slate-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              I'm always open to discussing new research, projects, or collaboration opportunities. Feel free to reach out if you have any questions or just want to connect.
            </p>
            <a
              href="mailto:hirekatsu0523@gmail.com"
              className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Say Hello
            </a>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default Contact;