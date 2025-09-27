import type { Metadata } from "next"; // ✅ Importar Metadata
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react';

// ✅ Tipar metadata
export const metadata: Metadata = {
  title: 'CRUD Usuarios - Next.js 15 + Supabase',
  description: 'Sistema de gestión de usuarios con Next.js 15, Supabase y shadcn/ui',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
