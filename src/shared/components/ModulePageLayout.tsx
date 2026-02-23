import { type ReactNode } from "react";

interface ModulePageLayoutProps {
  title: string;
  children: ReactNode;
}

export function ModulePageLayout({ title, children }: ModulePageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Header with Ribbon */}
      <div className="flex justify-center">
        <div className="ribbon">
          <div className="content">{title}</div>
        </div>
      </div>

      {children}
    </div>
  );
}
