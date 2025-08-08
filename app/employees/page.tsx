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
