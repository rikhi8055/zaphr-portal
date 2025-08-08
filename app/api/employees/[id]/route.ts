import { NextResponse } from 'next/server'
import { employees } from '../../../../data/employees'
export const runtime = 'nodejs'
export async function GET(_: Request, { params }: { params: { id: string } }){
  const emp = employees.find(e=>String(e.id)===params.id)
  return emp ? NextResponse.json(emp) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}
