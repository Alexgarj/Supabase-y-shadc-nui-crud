'use client'
import React, { useEffect, useState } from 'react'
import TablaHorarios from '@/components/TablaHorarios'
import FormularioHorario from '@/components/FormularioHorario'
import { getAllHorarios, deleteHorario } from '@/lib/horarios'
import { Horario } from '@/types/horario'

export default function PageHorarios() {
  const [rows, setRows] = useState<Horario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRow, setEditingRow] = useState<Horario | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadRows() {
    try {
      setIsLoading(true)
      setError(null)
      const res = await getAllHorarios()
      if (res.data) {
        setRows(res.data)
      } else if (res.error) {
        setError(res.error)
      }
    } catch (err) {
      setError('Error al cargar los horarios')
      console.error('Error loading horarios:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRows()
  }, [])

  async function handleDelete(row: Horario) {
    if (confirm(`¿Eliminar horario?`)) {
      try {
        setError(null)
        const result = await deleteHorario(row.id!)
        if (result.error) {
          setError(result.error)
        } else {
          await loadRows()
        }
      } catch (err) {
        setError('Error al eliminar el horario')
        console.error('Error deleting horario:', err)
      }
    }
  }

  return (
    <div className="p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {showForm ? (
        <FormularioHorario
          editingId={editingRow?.id}
          initialData={editingRow}
          onSaved={() => {
            setShowForm(false)
            setEditingRow(null)
            loadRows()
          }}
          onCancel={() => {
            setShowForm(false)
            setEditingRow(null)
          }}
        />
      ) : (
        <TablaHorarios
          horarios={rows}
          isLoading={isLoading}
          onEdit={(r) => {
            setEditingRow(r)
            setShowForm(true)
          }}
          onDelete={handleDelete}
          onNew={() => {
            setEditingRow(null)
            setShowForm(true)
          }}
        />
      )}
    </div>
  )
}