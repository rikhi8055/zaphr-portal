'use client'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { CommandK } from '@/components/commandk'

export function Topbar(){
  return (
    <header className="sticky top-0 z-20 bg-white/60 dark:bg-black/30 backdrop-blur border-b border-black/5 dark:border-white/10">
      <div className="flex items-center gap-3 p-3">
        <CommandK />
        <div className="ml-auto"><ThemeSwitcher/></div>
      </div>
    </header>
  )
}
