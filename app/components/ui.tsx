'use client'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Card(
  { className, ...props }, ref
){
  return <div ref={ref} className={cn('elevate-card p-4', className)} {...props} />
})

export const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-primary text-white hover:opacity-90 active:scale-[.98] focus-visible:outline-none',
      className
    )}
    {...props}
  />
)

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      'w-full rounded-xl border border-gray-300/60 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 focus-visible:outline-none',
      props.className || ''
    )}
  />
)

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-primary/30 px-2 py-0.5 text-xs text-primary">
    {children}
  </span>
)

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-xl bg-gray-200/70 dark:bg-white/10', className)} />
)

export const PageMotion: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 140, damping: 18 }}
  >
    {children}
  </motion. Main>
)
