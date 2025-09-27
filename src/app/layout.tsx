import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react'; // 🔹 Importa ReactNode

export const metadata = {
  title: 'CRUD Usuarios - Next.js 15 + Supabase',
  description: 'Sistema de gestión de usuarios con Next.js 15, Supabase y shadcn/ui',
};

// 🔹 Definir tipo para props
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
