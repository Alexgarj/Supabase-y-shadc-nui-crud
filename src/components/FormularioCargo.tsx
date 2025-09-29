'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createCargo, updateCargo, getCargoById } from '../lib/cargos'
import { Cargo } from '@/types/cargo'

interface FormularioCargoProps {
  onSaved: () => void
  editingId?: number | null
  initialData?: Cargo | null
  onCancel?: () => void
}

export default function FormularioCargo({
  onSaved,
  editingId,
  initialData,
  onCancel,
}: FormularioCargoProps) {
  const [cargo, setCargo] = useState('')
  const [sueldo, setSueldo] = useState('')

  useEffect(() => {
  if (editingId) {
    getCargoById(editingId).then((res) => {
      if (res.data) {
        setCargo(res.data.cargo || '')
        setSueldo(res.data.sueldo?.toString() || '')
      }
    })
  } else if (initialData) {
    setCargo(initialData.cargo || '')
    setSueldo(initialData.sueldo?.toString() || '')
  }
}, [editingId, initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { cargo, sueldo: parseFloat(sueldo) }
    if (editingId) {
      await updateCargo(editingId, payload)
    } else {
      await createCargo(payload)
    }
    onSaved()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingId ? 'Editar Cargo' : 'Crear Cargo'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cargo">Nombre</Label>
            <Input
              id="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              value={sueldo}
              onChange={(e) => setSueldo(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editingId ? 'Actualizar' : 'Crear'}</Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
