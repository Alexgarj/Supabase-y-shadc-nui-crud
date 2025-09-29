'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createHorario, updateHorario, getHorarioById } from '../lib/horarios'
import { Horario } from '@/types/horario'

interface FormularioHorarioProps {
  onSaved: () => void
  editingId?: number | null
  initialData?: Horario | null
  onCancel?: () => void
}

export default function FormularioHorario({
  onSaved,
  editingId,
  initialData,
  onCancel,
}: FormularioHorarioProps) {
  const [hora_ingreso, setHoraIngreso] = useState('')
  const [hora_salida, setHoraSalida] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (editingId) {
      setIsLoading(true)
      getHorarioById(editingId).then((res) => {
        if (res.data) {
          setHoraIngreso(res.data.hora_ingreso || '')
          setHoraSalida(res.data.hora_salida || '')
        }
        setIsLoading(false)
      })
    } else if (initialData) {
      setHoraIngreso(initialData.hora_ingreso || '')
      setHoraSalida(initialData.hora_salida || '')
    } else {
      // Reset form for new entries
      setHoraIngreso('')
      setHoraSalida('')
    }
  }, [editingId, initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const horarioData = {
        hora_ingreso: hora_ingreso,
        hora_salida: hora_salida
      }

      if (editingId) {
        const result = await updateHorario(editingId, horarioData)
        if (result.error) {
          alert(`Error al actualizar: ${result.error}`)
          return
        }
      } else {
        const result = await createHorario(horarioData)
        if (result.error) {
          alert(`Error al crear: ${result.error}`)
          return
        }
      }
      onSaved()
    } catch (error) {
      console.error('Error saving horario:', error)
      alert('Error al guardar el horario')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && editingId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando horario...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingId ? 'Editar Horario' : 'Crear Horario'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="hora_ingreso">Hora de Entrada</Label>
            <Input
              id="hora_ingreso"
              type="time"
              value={hora_ingreso}
              onChange={(e) => setHoraIngreso(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="hora_salida">Hora de Salida</Label>
            <Input
              id="hora_salida"
              type="time"
              value={hora_salida}
              onChange={(e) => setHoraSalida(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}