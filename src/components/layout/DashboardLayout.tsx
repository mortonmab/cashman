import { Banknote, BarChart, ClipboardCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Transactions', href: '/', icon: Banknote },
  { name: 'Reconciliation', href: '/reconciliation', icon: ClipboardCheck },
  { name: 'Reports', href: '/reports', icon: BarChart },
];

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden w-64 bg-white shadow-md lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-4">
            <Banknote className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-semibold">Cash Manager</span>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
