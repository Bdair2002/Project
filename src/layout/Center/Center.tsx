import React from 'react';

import './Center.css';

interface Props {
  children: React.ReactNode;
}

const Center: React.FC<Props> = ({ children }) => {
  return <div className="centered-page">{children}</div>;
};

export default Center;
