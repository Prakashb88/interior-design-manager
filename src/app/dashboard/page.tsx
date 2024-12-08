import { auth } from "@clerk/nextjs";
import ProtectedLayout from "@/components/layouts/protected-layout";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = auth();
  
  // Fetch projects and recent transactions
  const projects = await db.projects.list();
  const recentProjects = projects.slice(0, 5);
  
  return (
    <ProtectedLayout>
      <div className="grid gap-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground mt-2">
            Manage your interior design projects and transactions all in one place.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/projects/new">New Project</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/transactions/new">New Transaction</Link>
          </Button>
        </div>

        {/* Recent projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            <Button asChild variant="ghost">
              <Link href="/projects">View All</Link>
            </Button>
          </div>
          
          <div className="grid gap-4">
            {recentProjects.length === 0 ? (
              <p className="text-muted-foreground">No projects yet. Create your first project to get started!</p>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.client_name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {project.status}
                      </span>
                      {project.budget && (
                        <span className="text-xs text-muted-foreground">
                          Budget: ${project.budget.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
