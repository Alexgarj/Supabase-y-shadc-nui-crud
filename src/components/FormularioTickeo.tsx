'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { createTickeo, updateTickeo, getTickeoById } from '../lib/tickeos'
import { obtenerUsuarios } from '../lib/usuarios'
import { Tickeo } from '../types/tickeo'
import { Usuario } from '../types/usuario'

interface FormularioTickeoProps {
  onSaved?: () => void
  editingId?: number | null
  initialData?: Tickeo | null
  onCancel?: () => void
}

export default function FormularioTickeo({
  onSaved,
  editingId,
  initialData,
  onCancel,
}: FormularioTickeoProps) {
  const [idUsuario, setIdUsuario] = useState('')
  const [fecha, setFecha] = useState('')
  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSalida, setHoraSalida] = useState('')
  const [tipo, setTipo] = useState('entrada')
  const [tipo1, setTipo1] = useState('')
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    (async () => {
      const resUsuarios = await obtenerUsuarios()
      if (resUsuarios.data) setUsuarios(resUsuarios.data)
    })()

    if (initialData) {
      setIdUsuario(initialData.id_usuario?.toString() || '')
      setFecha(initialData.fecha || '')
      setHoraEntrada(initialData.hora_entrada || '')
      setHoraSalida(initialData.hora_salida || '')
      setTipo(initialData.tipo || 'entrada')
      setTipo1(initialData.tipo1 || '')
    } else if (editingId) {
      (async () => {
        const res = await getTickeoById(editingId)
        if (res && res.data) {
          setIdUsuario(res.data.id_usuario?.toString() || '')
          setFecha(res.data.fecha || '')
          setHoraEntrada(res.data.hora_entrada || '')
          setHoraSalida(res.data.hora_salida || '')
          setTipo(res.data.tipo || 'entrada')
          setTipo1(res.data.tipo1 || '')
        }
      })()
    }
  }, [editingId, initialData])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      id_usuario: Number(idUsuario),
      fecha,
      hora_entrada: horaEntrada,
      hora_salida: horaSalida || null,
      tipo,
      tipo1: tipo1 || null,
    }
    if (editingId) {
      await updateTickeo(editingId, payload)
    } else {
      await createTickeo(payload)
    }
    if (onSaved) onSaved()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingId ? 'Editar Tickeo' : 'Nuevo Tickeo'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario */}
          <div>
            <Label htmlFor="usuario">Usuario</Label>
            <select
              id="usuario"
              name="usuario"
              aria-label="Seleccionar usuario"   // <-- reforzamos accesibilidad
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
              required
              className="w-full border rounded p-2"
            >
              <option value="">-- Seleccionar usuario --</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          {/* Hora de entrada */}
          <div>
            <Label htmlFor="horaEntrada">Hora de entrada</Label>
            <Input
              id="horaEntrada"
              type="time"
              value={horaEntrada}
              onChange={(e) => setHoraEntrada(e.target.value)}
              required
            />
          </div>

          {/* Hora de salida */}
          <div>
            <Label htmlFor="horaSalida">Hora de salida</Label>
            <Input
              id="horaSalida"
              type="time"
              value={horaSalida}
              onChange={(e) => setHoraSalida(e.target.value)}
            />
          </div>

          {/* Tipo */}
          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <select
              id="tipo"
              name="tipo"
              aria-label="Seleccionar tipo"      // <-- reforzamos accesibilidad
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="w-full border rounded p-2"
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>

          {/* Tipo1 */}
          <div>
            <Label htmlFor="tipo1">Tipo1 (opcional)</Label>
            <Input
              id="tipo1"
              value={tipo1}
              onChange={(e) => setTipo1(e.target.value)}
            />
          </div>

          {/* Botones */}
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
