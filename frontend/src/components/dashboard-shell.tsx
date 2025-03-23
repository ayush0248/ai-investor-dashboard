import { DashboardNav } from "@/components/dashboard-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:hidden">
            <MobileNav />
          </div>
          <div className="hidden gap-10 md:flex">
            <span className="flex items-center text-lg font-semibold tracking-tight">
              InvestDash
            </span>
            <nav className="flex items-center gap-6 text-sm">
              <a
                href="/dashboard"
                className="font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </a>
              <a
                href="/portfolio"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Portfolio
              </a>
              <a
                href="/market"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Market
              </a>
              <a
                href="/news"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                News
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
