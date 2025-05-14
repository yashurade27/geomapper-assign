export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen">
      <div className="flex-1 relative">
        {children}
      </div>
    </main>
  );
}
