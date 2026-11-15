import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const styles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-slate-200 text-slate-800 hover:bg-slate-300';

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
