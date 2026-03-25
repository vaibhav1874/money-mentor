import Sidebar from "@/components/dashboard/Sidebar";
import Topnav from "@/components/dashboard/Topnav";
import { DashboardProvider } from "@/context/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden bg-[#050505] text-white selection:bg-purple-500/30">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
          
          <Topnav />
          <main className="flex-1 overflow-y-auto z-10 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
