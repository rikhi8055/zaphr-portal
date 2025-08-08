'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
const registry = [
  { q: 'Dashboard', href: '/dashboard' },
  { q: 'Employees', href: '/employees' },
  { q: 'Approvals', href: '/approvals' },
  { q: 'Reports', href: '/reports' }
]
export function CommandK(){
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState('')
  const router = useRouter()
  useEffect(()=>{
    const onKey = (e: KeyboardEvent)=>{
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); setOpen(true) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[])
  const results = registry.filter(r=>r.q.toLowerCase().includes(term.toLowerCase()))
  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-xl border bg-white/70 dark:bg-white/5 px-3 py-2 text-sm">
        <Search size={18}/>
        <input onFocus={()=>setOpen(true)} value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search (⌘/Ctrl K)" className="w-full bg-transparent outline-none"/>
      </div>
      {open && (
        <div className="absolute left-0 right-0 mt-1 rounded-xl border bg-white/90 dark:bg-black/80 backdrop-blur shadow-lg">
          {results.length ? results.map(r=> (
            <button key={r.href} onClick={()=>{ router.push(r.href); setOpen(false) }} className="w-full text-left px-3 py-2 hover:bg-primary/10">
              {r.q}
            </button>
          )): <div className="px-3 py-2 text-sm opacity-70">No results</div>}
        </div>
      )}
    </div>
  )
}
