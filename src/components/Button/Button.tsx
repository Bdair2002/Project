import React, { PropsWithChildren } from 'react';
import './Button.css';
type ButtonProps = PropsWithChildren<{
  className?: string;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: 'orange' | 'green';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}>;

const Button = ({
  className,
  variant = 'primary',
  size = 'medium',
  color = 'orange',
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const colorClass = `btn-${color}`;
  return (
    <button
      className={`btn ${className} ${variantClass} ${sizeClass} ${colorClass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
