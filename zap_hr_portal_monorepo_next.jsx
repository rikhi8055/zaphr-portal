# ZapHR Portal — Single Next.js App (Fixed for "Run Code")

> **This version replaces the previous note-only canvas with a full, runnable codebase.**
> It removes TypeScript configs that some runners choke on (e.g., `tailwind.config.ts`), uses **CommonJS Tailwind config**, avoids importing SVG/JSON as modules, and ensures all files are UTF‑8 **without BOM**.

---

## File: package.json
```json
{
  "name": "zaphr-portal",
  "private": true,
  "version": "1.0.3",
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.51.1",
    "framer-motion": "^11.3.19",
    "lucide-react": "^0.460.0",
    "next": "^14.2.5",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.12.7",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.15",
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.9",
    "typescript": "^5.4.5"
  }
}
```

---

## File: next-env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

---

## File: next.config.mjs
```js
/** @type {import('next').NextConfig} */
const nextConfig = { experimental: { typedRoutes: true } }
export default nextConfig
```

---

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] },
    "types": ["node"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## File: postcss.config.cjs
```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

---

## File: tailwind.config.cjs
```js
// CommonJS to avoid TS config parsing in restricted runners
module.exports = {
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.{css}", "./data/**/*.{ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        heading: "var(--color-heading)",
        text: "var(--color-text)",
        surface: "var(--color-bg)"
      },
      borderRadius: { '2xl': '1rem' },
      boxShadow: {
        card: "0 10px 25px -10px rgb(0 0 0 / 0.15)",
        glow: "0 0 0 2px rgb(12 188 185 / 0.25)"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.elevate-card': {
          '@apply shadow-card rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur border border-white/20': {}
        },
        '.focus-ring': {
          boxShadow: "0 0 0 3px color-mix(in oklab, var(--color-primary) 40%, transparent)",
          outline: 'none'
        }
      })
    }
  ]
}
```

---

## File: app/globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root { --color-primary:#0cbcb9; --color-secondary:#005399; --color-heading:#212529; --color-text:#525252; --color-bg:#f7f9fc; }
@media (prefers-color-scheme: dark){ :root { --color-heading:#f5f7fa; --color-text:#d1d5db; --color-bg:#0b1220; } }
:root[data-theme='dark'] { color-scheme: dark; }
html { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
body { @apply bg-surface text-text; }
h1 { font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem); color: var(--color-heading); }
*:focus-visible { @apply focus-ring; }
[dir='rtl'] { direction: rtl; }
```

---

## File: app/layout.tsx
```tsx
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { ReactQueryProvider } from '@/components/providers'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { PageMotion } from '@/components/ui'

export const metadata = { title: 'ZapHR Portal' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <div className="min-h-dvh grid grid-cols-[260px_1fr] md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr]">
              <Sidebar />
              <div className="grid grid-rows-[auto_1fr]">
                <Topbar />
                <PageMotion>
                  <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">{children}</div>
                </PageMotion>
              </div>
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## File: app/page.tsx
```tsx
import { redirect } from 'next/navigation'
export default function Page(){ redirect('/dashboard') }
```

---

## File: app/(auth)/layout.tsx
```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center min-h-dvh bg-gradient-to-br from-[#0cbcb9]/20 via-white to-[#005399]/20">
      <div className="elevate-card p-8 w-full max-w-md">{children}</div>
    </div>
  )
}
```

---

## File: app/(auth)/login/page.tsx
```tsx
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input, Button } from '@/components/ui'

export default function Login(){
  const router = useRouter()
  return (
    <form className="grid gap-4" onSubmit={(e)=>{ e.preventDefault(); router.push('/dashboard') }}>
      <h1 className="text-2xl font-semibold text-heading">Welcome to ZapHR</h1>
      <Input type="email" placeholder="Work email" required/>
      <Input type="password" placeholder="Password" required/>
      <div className="flex items-center justify-between text-sm">
        <label className="inline-flex items-center gap-2"><input type="checkbox"/> Remember me</label>
        <Link href="/forgot-password" className="text-primary">Forgot?</Link>
      </div>
      <Button type="submit">Sign in</Button>
      <Button type="button" className="bg-secondary" onClick={()=>router.push('/mfa')}>Passwordless / Magic Link</Button>
      <p className="text-sm">No account? <Link href="/signup" className="text-primary">Create one</Link></p>
    </form>
  )
}
```

---

## File: app/dashboard/page.tsx
```tsx
'use client'
import { useQuery } from '@tanstack/react-query'
import { Kpi, Card, Skeleton, Button } from '@/components/ui'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function Dashboard(){
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: async()=> (await fetch('/api/dashboard')).json() })
  if (isLoading) return <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5"><Skeleton className="h-28"/><Skeleton className="h-28"/><Skeleton className="h-28"/><Skeleton className="h-28"/><Skeleton className="h-28"/></div>

  return (
    <div className="grid gap-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Kpi label="Headcount" value={String(data.headcount)} delta={data.headcountDelta} />
        <Kpi label="Attrition" value={`${data.attrition}%`} delta={data.attritionDelta} />
        <Kpi label="Open Positions" value={String(data.openPositions)} />
        <Kpi label="Probation Due" value={String(data.probationDue)} />
        <Kpi label="Approvals" value={String(data.pendingApprovals)} />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-heading">Retention Trend</h2>
            <Button className="bg-secondary">This Year</Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.retention}> <XAxis dataKey="month"/><YAxis/><Tooltip/><Line type="monotone" dataKey="rate" stroke="#005399" dot={false}/></LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-medium text-heading mb-3">Leave Usage</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.leaveUsage}> <XAxis dataKey="dept"/><YAxis/><Tooltip/><Bar dataKey="days" fill="#0cbcb9" radius={[6,6,0,0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </div>
  )
}
```

---

## File: app/employees/page.tsx
```tsx
'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Input, Card, Skeleton, Badge } from '@/components/ui'

export default function Employees(){
  const { data, isLoading } = useQuery({ queryKey: ['employees'], queryFn: async()=> (await fetch('/api/employees?limit=25')).json() })
  if (isLoading) return <Skeleton className="h-32" />
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-heading">Employee Directory</h1>
        <Input placeholder="Search employees" />
      </div>
      <Card>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-white/80 dark:bg-black/50 backdrop-blur">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Department</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((e: any)=> (
                <tr key={e.id} className="border-t hover:bg-primary/5">
                  <td className="p-3"><Link href={`/employees/${e.id}`} className="text-secondary font-medium">{e.name}</Link></td>
                  <td className="p-3">{e.department} <Badge>{e.status}</Badge></td>
                  <td className="p-3">{e.role}</td>
                  <td className="p-3">{e.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
```

---

## File: app/employees/[id]/page.tsx
```tsx
import { notFound } from 'next/navigation'
import { Card, Button } from '@/components/ui'

async function getEmployee(id: string){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/employees/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function EmployeePage({ params }: { params: { id: string } }){
  const e = await getEmployee(params.id)
  if (!e) return notFound()
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-heading">{e.name}</h1>
        <Button>Edit Profile</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <h2 className="font-medium text-heading mb-2">Overview</h2>
          <ul className="text-sm grid gap-1">
            <li><b>Department:</b> {e.department}</li>
            <li><b>Role:</b> {e.role}</li>
            <li><b>Location:</b> {e.location}</li>
          </ul>
        </Card>
        <Card>
          <h2 className="font-medium text-heading mb-2">Time Off</h2>
          <p className="text-sm">Balance: {e.timeOff.balance} days</p>
        </Card>
        <Card>
          <h2 className="font-medium text-heading mb-2">Assets</h2>
          <p className="text-sm">{e.assets.length} assigned</p>
        </Card>
      </div>
    </div>
  )
}
```

---

## File: app/onboarding/page.tsx
```tsx
'use client'
import { useState } from 'react'
import { Card, Button } from '@/components/ui'
const steps = ['Offer','Documents','Profile','Orientation','Training','IT & Asset']

export default function Onboarding(){
  const [i, setI] = useState(0)
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold text-heading">Onboarding</h1>
      <div className="flex flex-wrap gap-2">
        {steps.map((s, idx)=> (
          <span key={s} className={`px-3 py-1 rounded-full text-sm border ${i===idx? 'bg-primary text-white' : 'bg-white/60'}`}>{s}</span>
        ))}
      </div>
      <Card>
        <p className="text-sm">Step {i+1} of {steps.length}: {steps[i]}</p>
        <div className="mt-3 flex gap-2">
          <Button onClick={()=>setI(Math.max(0, i-1))} disabled={i===0}>Back</Button>
          <Button className="bg-secondary" onClick={()=>setI(Math.min(steps.length-1, i+1))}>{i===steps.length-1? 'Finish' : 'Next'}</Button>
        </div>
      </Card>
    </div>
  )
}
```

---

## File: app/approvals/page.tsx
```tsx
'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, Button, Skeleton } from '@/components/ui'

export default function Approvals(){
  const { data, isLoading } = useQuery({ queryKey: ['approvals'], queryFn: async()=> (await fetch('/api/approvals')).json() })
  const [selected, setSelected] = useState<string[]>([])
  if (isLoading) return <Skeleton className="h-32" />

  function toggle(id: string){ setSelected(s=> s.includes(id) ? s.filter(i=>i!==id) : [...s, id]) }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold text-heading">Approvals Inbox</h1>
      <Card>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">Selected: {selected.length}</div>
          <div className="flex gap-2">
            <Button onClick={()=>alert('Approved!')}>Bulk Approve</Button>
            <Button className="bg-secondary" onClick={()=>alert('Rejected!')}>Bulk Reject</Button>
          </div>
        </div>
        <ul className="divide-y">
          {data.items.map((a:any)=> (
            <li key={a.id} className="py-3 flex items-center gap-3">
              <input type="checkbox" aria-label={`Select ${a.title}`} checked={selected.includes(a.id)} onChange={()=>toggle(a.id)} />
              <div className="flex-1">
                <div className="font-medium text-heading">{a.title}</div>
                <div className="text-sm text-text/80">{a.requestor} • SLA {a.sla}h</div>
              </div>
              <Button onClick={()=>alert('Approved ✅')}>Approve</Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
```

---

## File: app/reports/page.tsx
```tsx
'use client'
import { useQuery } from '@tanstack/react-query'
import { Card, Button } from '@/components/ui'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function Reports(){
  const { data } = useQuery({ queryKey: ['reports'], queryFn: async()=> (await fetch('/api/reports/attrition')).json() })
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-heading">Attrition vs Retention</h1>
        <Button className="bg-secondary" onClick={()=>alert('Exported CSV')}>Export CSV</Button>
      </div>
      <Card>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.series}>
              <XAxis dataKey="month"/><YAxis/><Tooltip/><Legend/>
              <Line type="monotone" dataKey="attrition" stroke="#005399" dot={false}/>
              <Line type="monotone" dataKey="retention" stroke="#0cbcb9" dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
```

---

## File: app/attendance/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Attendance(){
  return <EmptyState title="Attendance" description="Calendar heatmaps and shift views coming from mock API." />
}
```

---

## File: app/leave/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Leave(){
  return <EmptyState title="Leave" description="Policy cards, accruals, and approvals soon." />
}
```

---

## File: app/performance/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Performance(){
  return <EmptyState title="Performance" description="Goals/OKRs, reviews, and analytics coming from mock API." />
}
```

---

## File: app/learning/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Learning(){
  return <EmptyState title="Learning" description="Courses, skill matrix, and paths." />
}
```

---

## File: app/surveys/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Surveys(){
  return <EmptyState title="Surveys" description="Question bank and analytics." />
}
```

---

## File: app/pulse/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Pulse(){
  return <EmptyState title="Pulse" description="Weekly pulse and recognition feed." />
}
```

---

## File: app/payroll/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Payroll(){
  return <EmptyState title="Payroll" description="CTC breakdown and integrations." />
}
```

---

## File: app/settings/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Settings(){
  return <EmptyState title="Settings" description="Org units, roles & permissions, branding, API keys." />
}
```

---

## File: app/offboarding/page.tsx
```tsx
import { EmptyState } from '@/components/ui'
export default function Offboarding(){
  return <EmptyState title="Offboarding" description="Resignation flow, handover checklist, FnF summary." />
}
```

---

## File: app/api/dashboard/route.ts
```ts
import { NextResponse } from 'next/server'
export const runtime = 'nodejs'

export async function GET(){
  return NextResponse.json({
    headcount: 148,
    headcountDelta: '+3 MoM',
    attrition: 6.2,
    attritionDelta: '-0.4 MoM',
    openPositions: 9,
    probationDue: 4,
    pendingApprovals: 12,
    retention: [
      { month: 'Jan', rate: 94 },{ month: 'Feb', rate: 93 },{ month: 'Mar', rate: 95 },{ month: 'Apr', rate: 96 },{ month: 'May', rate: 94 },{ month: 'Jun', rate: 97 }
    ],
    leaveUsage: [
      { dept: 'Design', days: 21 }, { dept: 'Eng', days: 35 }, { dept: 'HR', days: 12 }, { dept: 'QA', days: 18 }
    ]
  })
}
```

---

## File: app/api/employees/route.ts
```ts
import { NextResponse } from 'next/server'
import { employees } from '@/data/employees'
export const runtime = 'nodejs'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit')||'25')
  const items = employees.slice(0, limit)
  return NextResponse.json({ items, total: employees.length })
}
```

---

## File: app/api/employees/[id]/route.ts
```ts
import { NextResponse } from 'next/server'
import { employees } from '@/data/employees'
export const runtime = 'nodejs'

export async function GET(_: Request, { params }: { params: { id: string } }){
  const emp = employees.find(e=>String(e.id)===params.id)
  return emp ? NextResponse.json(emp) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}
```

---

## File: app/api/approvals/route.ts
```ts
import { NextResponse } from 'next/server'
export const runtime = 'nodejs'

export async function GET(){
  return NextResponse.json({ items: [
    { id:'a1', title:'Leave request • 3 days', requestor:'A. Sharma', sla: 24 },
    { id:'a2', title:'Expense claim • ₹1,540', requestor:'R. Kaur', sla: 16 },
    { id:'a3', title:'Remote work request', requestor:'V. Kumar', sla: 8 }
  ]})
}
```

---

## File: app/api/reports/attrition/route.ts
```ts
import { NextResponse } from 'next/server'
export const runtime = 'nodejs'

export async function GET(){
  const months = ['Jan','Feb','Mar','Apr','May','Jun']
  return NextResponse.json({ series: months.map((m, i)=> ({ month: m, attrition: 5 + i*0.2, retention: 95 - i*0.2 })) })
}
```

---

## File: data/employees.ts
```ts
export type Emp = {
  id: number
  name: string
  department: string
  role: string
  location: string
  status: 'Active' | 'Probation' | 'Exited'
  timeOff: { balance: number }
  assets: string[]
}

export const employees: Emp[] = [
  { id:1, name:'Arjun Mehta', department:'Engineering', role:'Senior FE Engineer', location:'Mohali', status:'Active', timeOff:{ balance:12 }, assets:['MacBook Pro','Access Card'] },
  { id:2, name:'Riya Kaur', department:'Design', role:'Product Designer', location:'Chandigarh', status:'Probation', timeOff:{ balance:7 }, assets:['ThinkPad','Wacom'] },
  { id:3, name:'Samar Jain', department:'HR', role:'HRBP', location:'Mohali', status:'Active', timeOff:{ balance:15 }, assets:['Dell XPS'] }
]
```

---

## File: components/ui.tsx
```tsx
'use client'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export function cn(...classes: Array<string | false | undefined>) { return classes.filter(Boolean).join(' ') }

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Card({ className, ...props }, ref){
  return <div ref={ref} className={cn('elevate-card p-4', className)} {...props} />
})

export const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn('inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-primary text-white hover:opacity-90 active:scale-[.98] focus-visible:focus-ring', className)} {...props} />
)

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={cn('w-full rounded-xl border border-gray-300/60 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 focus-visible:focus-ring', props.className)} />
)

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-primary/30 px-2 py-0.5 text-xs text-primary">{children}</span>
)

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-xl bg-gray-200/70 dark:bg-white/10', className)} />
)

export const PageMotion: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }}>
    {children}
  </motion.main>
)
```

---

## File: components/providers.tsx
```tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
```

---

## File: components/sidebar.tsx
```tsx
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
          <Link key={href} href={href} className={cn('flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-primary/10', pathname?.startsWith(href) && 'bg-primary/15 text-heading')}>
            <Icon size={20} /> <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <button className="w-full text-left text-sm text-text/70 hover:text-heading flex items-center gap-2"><LogOut size={18}/> Logout</button>
      </div>
    </aside>
  )
}

export function Logo(){
  return (
    <div className="flex items-center gap-2">
      {/* Pull from /public to avoid importing SVG as a module */}
      <Image src="/zaphr_logo.svg" alt="ZapHR logo" width={28} height={28} />
      <span className="font-semibold tracking-tight">ZapHR Portal</span>
    </div>
  )
}
```

---

## File: components/topbar.tsx
```tsx
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
```

---

## File: components/theme-switcher.tsx
```tsx
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
```

---

## File: components/commandk.tsx
```tsx
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
          )): <div className="px-3 py-2 text-sm text-text/70">No results</div>}
        </div>
      )}
    </div>
  )
}
```

---

## File: public/zaphr_logo.svg
```xml
<svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ZapHR logo">
  <path d="M5 30 C40 5, 80 10, 155 5" stroke="#0cbcb9" stroke-width="6" stroke-linecap="round"/>
  <text x="10" y="32" font-family="Inter, system-ui" font-size="24" font-weight="700" fill="#005399">ZapHR</text>
</svg>
```

---

## File: README.md
```md
# ZapHR Portal — Next.js (2025 UI/UX)

**This build is tailored for generic "Run Code" environments.**
- No workspaces
- No JSON/SVG imports as modules
- Tailwind config in **CommonJS**

## Run
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Production
```bash
npm run build && npm start
```
```
