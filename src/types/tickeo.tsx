// src/types/tickeo.tsx
export interface Tickeo {
  id?: number;
  id_usuario: number;
  fecha: string;        // YYYY-MM-DD
  hora_entrada: string; // HH:mm:ss
  hora_salida?: string; // HH:mm:ss
  tipo: 'entrada' | 'salida';
  tipo1?: string;
  usuarios?: {
    id: number;
    nombre: string;
    email?: string;
  };
}
