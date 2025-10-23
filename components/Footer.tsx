import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Kaneyoshi Hiratsuka. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
