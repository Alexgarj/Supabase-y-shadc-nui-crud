'use client'
import React, { useEffect, useState } from 'react'
import TablaCargos from '@/components/TablaCargos'
import FormularioCargo from '@/components/FormularioCargo'
import { getAllCargos, deleteCargo } from '@/lib/cargos'
import { Cargo } from '@/types/cargo'

export default function PageCargos() {
  const [rows, setRows] = useState<Cargo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRow, setEditingRow] = useState<Cargo | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function loadRows() {
    setIsLoading(true)
    const res = await getAllCargos()
    if (res.data) setRows(res.data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadRows()
  }, [])

  async function handleDelete(row: Cargo) {
    if (confirm(`¿Eliminar cargo "${row.cargo}"?`)) {
      await deleteCargo(row.id!)
      loadRows()
    }
  }

  return (
    <div className="p-4">
      {showForm ? (
        <FormularioCargo
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
        <TablaCargos
          cargos={rows}
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