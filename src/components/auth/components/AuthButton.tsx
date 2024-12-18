import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary';
}

export default function AuthButton({
  children,
  isLoading,
  loadingText,
  variant = 'primary',
  className = '',
  ...props
}: AuthButtonProps) {
  const baseStyles = "w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50";
  const variantStyles = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}