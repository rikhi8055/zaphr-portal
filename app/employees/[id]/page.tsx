import { notFound } from 'next/navigation'
import { Card, Button } from '../../components/ui'

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
