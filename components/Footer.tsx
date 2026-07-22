import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="border-t border-hair">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-ink-faint">
        <p>&copy; {new Date().getFullYear()} Kaneyoshi Hiratsuka</p>
      </div>
    </footer>
  );
};

export default Footer;
