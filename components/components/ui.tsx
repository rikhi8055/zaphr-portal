'use client'
import * as React from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Card(
  { className, ...props }, ref
){
  return (
    <div
      ref={ref}
      className={cn(
        'p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/20 shadow-[0_10px_25px_-10px_rgba(0,0,0,.15)] backdrop-blur',
        className
      )}
      {...props}
    />
  )
})

export const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-[var(--color-primary)] text-white hover:opacity-90 active:scale-[.98] outline-none',
      className
    )}
    {...props}
  />
)

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      'w-full rounded-xl border border-gray-300/60 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none',
      props.className || ''
    )}
  />
)

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-[color:var(--color-primary)]/30 px-2 py-0.5 text-xs text-[color:var(--color-primary)]">
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
  </motion.main>
)

export const EmptyState: React.FC<{ title: string; action?: React.ReactNode; description?: string }> = ({
  title, action, description
}) => (
  <div className="p-8 text-center grid place-items-center gap-2 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/20 shadow-[0_10px_25px_-10px_rgba(0,0,0,.15)] backdrop-blur">
    <div className="text-lg font-medium" style={{ color: 'var(--color-heading)' }}>{title}</div>
    {description && <p className="text-sm opacity-70 max-w-md">{description}</p>}
    {action}
  </div>
)

export const Kpi: React.FC<{ label: string; value: string; delta?: string }> = ({ label, value, delta }) => (
  <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/20 shadow-[0_10px_25px_-10px_rgba(0,0,0,.15)] backdrop-blur">
    <div className="text-sm opacity-70">{label}</div>
    <div className="text-2xl font-semibold" style={{ color: 'var(--color-heading)' }}>{value}</div>
    {delta && <div className="text-xs mt-1">{delta}</div>}
  </div>
)
