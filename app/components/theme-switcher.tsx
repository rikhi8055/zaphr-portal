'use client'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitcher(){
  const { theme, setTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button aria-label="Toggle theme" onClick={()=>setTheme(next)} className="rounded-xl border px-3 py-2 hover:bg-white/50 dark:hover:bg-white/10">
      {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
    </button>
  )
}
