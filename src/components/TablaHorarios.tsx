'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from './ui/table'
import { Button } from './ui/button'
import { Edit, Trash2, PlusCircle } from 'lucide-react'
import { Horario } from '@/types/horario'

interface TablaHorariosProps {
  horarios: Horario[]
  onEdit: (horario: Horario) => void
  onDelete: (horario: Horario) => void
  onNew: () => void
  isLoading?: boolean
}

export default function TablaHorarios({ horarios, onEdit, onDelete, onNew, isLoading = false }: TablaHorariosProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando horarios...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Lista de Horarios</CardTitle>
        <Button onClick={onNew} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Nuevo Horario
        </Button>
      </CardHeader>
      <CardContent>
        {horarios.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay horarios registrados</p>
            <Button onClick={onNew} className="mt-4">Crear primer horario</Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Hora ingreso</TableHead>
                  <TableHead>Hora salida</TableHead>
                  <TableHead className="w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {horarios.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>{h.id}</TableCell>
                    <TableCell>{h.hora_ingreso}</TableCell>
                    <TableCell>{h.hora_salida}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(h)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(h)}
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
