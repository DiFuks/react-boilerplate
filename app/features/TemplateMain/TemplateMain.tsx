import React from 'react';

export const TemplateMain: React.FC = ({ children }) => (
  <div>
    <header>Header</header>
    <main>{children}</main>
    <footer>Footer</footer>
  </div>
);
