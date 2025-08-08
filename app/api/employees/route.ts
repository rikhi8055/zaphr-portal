import { NextResponse } from 'next/server'
import { employees } from '../../../data/employees'
export const runtime = 'nodejs'
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit')||'25')
  const items = employees.slice(0, limit)
  return NextResponse.json({ items, total: employees.length })
}
