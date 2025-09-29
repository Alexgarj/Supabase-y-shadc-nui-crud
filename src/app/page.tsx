'use client'
import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Briefcase, UserCog, Clock, ClipboardList } from 'lucide-react'

export default function DashboardPage() {
  const modules = [
    {
      title: 'Usuarios',
      description: 'Gestión de usuarios registrados',
      href: '/usuarios',
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Cargos',
      description: 'Administrar los cargos de la institución',
      href: '/cargos',
      icon: <Briefcase className="h-8 w-8 text-green-600" />,
    },
    
    {
      title: 'Horarios',
      description: 'Definición y control de horarios',
      href: '/horarios',
      icon: <Clock className="h-8 w-8 text-orange-600" />,
    },
    {
      title: 'Tickeos',
      description: 'Registro de entradas y salidas',
      href: '/tickeos',
      icon: <ClipboardList className="h-8 w-8 text-red-600" />,
    },
  ]

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Card key={mod.href} className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex items-center space-x-4">
              {mod.icon}
              <CardTitle>{mod.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{mod.description}</p>
              <Link href={mod.href}>
                <Button className="w-full">Ir a {mod.title}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
