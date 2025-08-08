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
