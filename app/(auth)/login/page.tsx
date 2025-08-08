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
