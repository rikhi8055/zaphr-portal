'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, UserRoundCheck, CalendarDays, BadgeCheck, GraduationCap, LineChart, Wallet, MailCheck, Settings, LogOut, PieChart, ShieldCheck, FileText } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/components/ui'

const items = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/onboarding', icon: BadgeCheck, label: 'Onboarding' },
  { href: '/employees', icon: Users, label: 'Employees' },
  { href: '/attendance', icon: CalendarDays, label: 'Attendance' },
  { href: '/leave', icon: UserRoundCheck, label: 'Leave' },
  { href: '/performance', icon: LineChart, label: 'Performance' },
  { href: '/learning', icon: GraduationCap, label: 'Learning' },
  { href: '/surveys', icon: PieChart, label: 'Surveys' },
  { href: '/pulse', icon: PieChart, label: 'Pulse' },
  { href: '/payroll', icon: Wallet, label: 'Payroll' },
  { href: '/approvals', icon: MailCheck, label: 'Approvals' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/offboarding', icon: ShieldCheck, label: 'Offboarding' }
]

export function Sidebar(){
  const pathname = usePathname()
  return (
    <aside className="hidden md:block border-r border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
      <div className="p-4 flex items-center gap-2">
        <Logo />
      </div>
      <nav className="px-2 space-y-1">
        {items.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className={cn('flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-primary/10', pathname?.startsWith(href) && 'bg-primary/15')}>
            <Icon size={20} /> <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <button className="w-full text-left text-sm text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white flex items-center gap-2"><LogOut size={18}/> Logout</button>
      </div>
    </aside>
  )
}

export function Logo(){
  return (
    <div className="flex items-center gap-2">
      <Image src="/zaphr_logo.svg" alt="ZapHR logo" width={28} height={28} />
      <span className="font-semibold tracking-tight">ZapHR Portal</span>
    </div>
  )
}
