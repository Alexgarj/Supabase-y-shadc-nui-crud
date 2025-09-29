'use client'
import React, { useEffect, useState } from 'react'
import TablaTickeos from '@/components/TablaTickeos'
import FormularioTickeo from '@/components/FormularioTickeo'
import { getAllTickeos, deleteTickeo } from '@/lib/tickeos'
import { Tickeo } from '@/types/tickeo'

export default function PageTickeos() {
  const [rows, setRows] = useState<Tickeo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRow, setEditingRow] = useState<Tickeo | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function loadRows() {
    setIsLoading(true)
    const res = await getAllTickeos()
    if (res.data) setRows(res.data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadRows()
  }, [])

  async function handleDelete(row: Tickeo) {
    if (confirm(`¿Eliminar tickeo de ${row.usuarios?.nombre}?`)) {
      await deleteTickeo(row.id!)
      loadRows()
    }
  }

  return (
    <div className="p-4">
      {showForm ? (
        <FormularioTickeo
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
        <TablaTickeos
          tickeos={rows}
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
