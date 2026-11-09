import React from 'react'

export interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  }[size]

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}>
      {children}
    </div>
  )
}

