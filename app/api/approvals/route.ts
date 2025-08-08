import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
export async function GET(){
  return NextResponse.json({ items: [
    { id:'a1', title:'Leave request • 3 days', requestor:'A. Sharma', sla: 24 },
    { id:'a2', title:'Expense claim • ₹1,540', requestor:'R. Kaur', sla: 16 },
    { id:'a3', title:'Remote work request', requestor:'V. Kumar', sla: 8 }
  ]})
}
