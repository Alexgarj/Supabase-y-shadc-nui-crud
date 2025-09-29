'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from './ui/table'
import { Button } from './ui/button'
import { Edit, Trash2, PlusCircle } from 'lucide-react'
import { Tickeo } from '@/types/tickeo'

interface TablaTickeosProps {
  tickeos: Tickeo[]
  onEdit: (tickeo: Tickeo) => void
  onDelete: (tickeo: Tickeo) => void
  onNew: () => void
  isLoading?: boolean
}

export default function TablaTickeos({ tickeos, onEdit, onDelete, onNew, isLoading = false }: TablaTickeosProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando tickeos...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Registro de Tickeos</CardTitle>
        <Button onClick={onNew} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Nuevo Tickeo
        </Button>
      </CardHeader>
      <CardContent>
        {tickeos.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay tickeos registrados</p>
            <Button onClick={onNew} className="mt-4">Crear primer tickeo</Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora entrada</TableHead>
                  <TableHead>Hora salida</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Tipo1</TableHead>
                  <TableHead className="w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickeos.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.id}</TableCell>
                    <TableCell>{t.usuarios?.nombre}</TableCell>
                    <TableCell>{t.fecha}</TableCell>
                    <TableCell>{t.hora_entrada}</TableCell>
                    <TableCell>{t.hora_salida || '-'}</TableCell>
                    <TableCell>{t.tipo}</TableCell>
                    <TableCell>{t.tipo1 || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(t)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(t)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
