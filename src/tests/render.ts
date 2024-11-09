import { render, RenderOptions } from '@testing-library/react';
import React from 'react';

type WrapperProps = {
  children: React.ReactNode;
};

const testRender = (Component: React.ReactElement, options: RenderOptions = {}) => {
  function Wrapper({ children }: WrapperProps) {
    return { children };
  }

  return render(Component);
};

export default testRender;
