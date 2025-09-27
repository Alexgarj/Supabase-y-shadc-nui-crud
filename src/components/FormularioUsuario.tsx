'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Usuario } from '@/types/usuario'

interface FormularioUsuarioProps {
  usuario?: Usuario | null
  onSubmit: (usuario: Omit<Usuario, 'id'>) => void
  onCancel?: () => void
  isLoading?: boolean
}

export default function FormularioUsuario({
  usuario,
  onSubmit,
  onCancel,
  isLoading = false,
}: FormularioUsuarioProps) {
  const [formData, setFormData] = useState<Omit<Usuario, 'id'>>({
    nombre: '',
    edad: 0,
    genero: '',
    email: '',
    username: '',
    password: '',
  })

  useEffect(() => {
    if (usuario) {
      const { id, ...rest } = usuario
      setFormData({
        nombre: rest.nombre ?? '',
        edad: rest.edad ?? 0,
        genero: rest.genero ?? '',
        email: rest.email ?? '',
        username: rest.username ?? '',
        password: rest.password ?? '',
      })
    }
  }, [usuario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'edad' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="edad">Edad</Label>
            <Input
              id="edad"
              name="edad"
              type="number"
              value={formData.edad.toString()}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="genero">Género</Label>
            <Input
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
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
