import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = auth();

  // If user is authenticated, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <span className="text-2xl font-bold">Interior Design Manager</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </nav>

        {/* Hero section */}
        <div className="py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Manage Your Interior Design Business with Ease
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Streamline your projects, track transactions, and analyze performance all in one place. 
              Built specifically for interior design professionals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/sign-up">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="py-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold">Project Management</h3>
              <p className="mt-2 text-muted-foreground">
                Track projects, tasks, and deadlines in one centralized location.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold">Financial Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor income, expenses, and project budgets with ease.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
              <p className="mt-2 text-muted-foreground">
                Get intelligent suggestions and automate data entry with AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
