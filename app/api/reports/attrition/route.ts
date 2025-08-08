import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
export async function GET(){
  const months = ['Jan','Feb','Mar','Apr','May','Jun']
  return NextResponse.json({ series: months.map((m, i)=> ({ month: m, attrition: 5 + i*0.2, retention: 95 - i*0.2 })) })
}
