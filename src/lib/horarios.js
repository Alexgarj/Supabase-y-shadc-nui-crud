import { supabase } from './supabase';

/**
 * CRUD helpers for the 'horarios' table
 */

export async function getAllHorarios() {
  try {
    const { data, error } = await supabase
      .from('horarios')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function getHorarioById(id) {
  try {
    const { data, error } = await supabase
      .from('horarios')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function createHorario(payload) {
  try {
    const { data, error } = await supabase
      .from('horarios')
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function updateHorario(id, payload) {
  try {
    const { data, error } = await supabase
      .from('horarios')
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

export async function deleteHorario(id) {
  try {
    const { data, error } = await supabase
      .from('horarios')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}
