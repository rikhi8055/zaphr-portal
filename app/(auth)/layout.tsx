export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center min-h-dvh bg-gradient-to-br from-[#0cbcb9]/20 via-white to-[#005399]/20">
      <div className="p-8 w-full max-w-md bg-white/70 dark:bg-white/5 rounded-2xl border border-white/20 backdrop-blur">{children}</div>
    </div>
  )
}
