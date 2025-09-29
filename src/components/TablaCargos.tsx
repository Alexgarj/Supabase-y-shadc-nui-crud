'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from './ui/table'
import { Button } from './ui/button'
import { Edit, Trash2, PlusCircle } from 'lucide-react'
import { Cargo } from '@/types/cargo'

interface TablaCargosProps {
  cargos: Cargo[]
  onEdit: (cargo: Cargo) => void
  onDelete: (cargo: Cargo) => void
  onNew: () => void
  isLoading?: boolean
}

export default function TablaCargos({ cargos, onEdit, onDelete, onNew, isLoading = false }: TablaCargosProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando cargos...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Lista de Cargos</CardTitle>
        <Button onClick={onNew} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Nuevo Cargo
        </Button>
      </CardHeader>
      <CardContent>
        {cargos.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay cargos registrados</p>
            <Button onClick={onNew} className="mt-4">Crear primer cargo</Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Sueldo</TableHead>
                  <TableHead className="w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargos.map((cargo) => (
                  <TableRow key={cargo.id}>
                    <TableCell>{cargo.id}</TableCell>
                    <TableCell>{cargo.cargo}</TableCell>
                    <TableCell>{cargo.sueldo}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(cargo)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(cargo)}
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
