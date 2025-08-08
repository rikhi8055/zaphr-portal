export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center min-h-dvh bg-gradient-to-br from-[#0cbcb9]/20 via-white to-[#005399]/20">
      <div className="elevate-card p-8 w-full max-w-md">{children}</div>
    </div>
  )
}
