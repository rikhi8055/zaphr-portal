'use client'
import { useQuery } from '@tanstack/react-query'
import { Kpi, Card, Skeleton, Button } from '../components/ui'
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
