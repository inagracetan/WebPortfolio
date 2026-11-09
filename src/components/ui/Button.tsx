import React, { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useSound } from '@/hooks/useSound'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'hud'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  children?: React.ReactNode
  icon?: React.ReactNode
  badge?: string
  isLoading?: boolean
  playSound?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      badge,
      isLoading = false,
      playSound = true,
      className = '',
      onClick,
      onMouseEnter,
      disabled,
      ...props
    },
    ref
  ) => {
    const { playClick, playHover } = useSound()

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs tracking-wider font-medium',
      md: 'px-5 py-2.5 text-sm tracking-wider font-semibold',
      lg: 'px-7 py-3.5 text-base tracking-widest font-bold',
      icon: 'p-2.5 w-10 h-10 flex items-center justify-center',
    }[size]

    const variantClasses = {
      primary:
        'bg-electric-blue text-deep-navy font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:bg-sky-light active:brightness-90 border border-electric-blue/50',
      secondary:
        'bg-deep-navy-card/85 text-warm-ivory border border-sky-blue/30 hover:border-electric-blue hover:text-electric-blue hover:bg-deep-navy-surface shadow-md backdrop-blur-md',
      outline:
        'bg-transparent text-warm-ivory border border-warm-ivory/25 hover:border-warm-ivory hover:bg-warm-ivory/10',
      ghost:
        'bg-transparent text-warm-ivory/80 hover:text-electric-blue hover:bg-white/5 border border-transparent',
      hud: 'relative bg-deep-navy/80 text-warm-ivory border border-sky-blue/40 hover:border-electric-blue hover:text-electric-blue tracking-widest uppercase font-mono text-xs backdrop-blur-md before:absolute before:-top-0.5 before:-left-0.5 before:w-1.5 before:h-1.5 before:border-t-2 before:border-l-2 before:border-electric-blue after:absolute after:-bottom-0.5 after:-right-0.5 after:w-1.5 after:h-1.5 after:border-b-2 after:border-r-2 after:border-electric-blue',
    }[variant]

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (playSound && !disabled && !isLoading) {
        playHover()
      }
      onMouseEnter?.(e)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return
      if (playSound) {
        playClick()
      }
      onClick?.(e)
    }

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2.5 transition-colors select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed uppercase rounded-sm ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {badge && (
          <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-electric-blue/20 text-electric-blue rounded border border-electric-blue/40 font-mono">
            {badge}
          </span>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

