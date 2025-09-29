import { supabase } from './supabase';

/**
 * CRUD helpers for the 'tickeos' table
 */

export async function getAllTickeos() {
  try {
    const { data, error } = await supabase
      .from('tickeos')
      .select(`
        id,
        id_usuario,
        fecha,
        hora_entrada,
        hora_salida,
        tipo,
        tipo1,
        usuarios (id, nombre, email)
      `)
      .order('id', { ascending: true });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function getTickeoById(id) {
  try {
    const { data, error } = await supabase
      .from('tickeos')
      .select(`
        id,
        id_usuario,
        fecha,
        hora_entrada,
        hora_salida,
        tipo,
        tipo1,
        usuarios (id, nombre, email)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function createTickeo(payload) {
  try {
    const { data, error } = await supabase
      .from('tickeos')
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function updateTickeo(id, payload) {
  try {
    const { data, error } = await supabase
      .from('tickeos')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function deleteTickeo(id) {
  try {
    const { data, error } = await supabase
      .from('tickeos')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}
