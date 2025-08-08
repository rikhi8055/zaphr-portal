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
