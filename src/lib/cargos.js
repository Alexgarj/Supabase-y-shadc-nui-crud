import { supabase } from './supabase';

/**
 * CRUD helpers for the 'cargos' table
 */

export async function getAllCargos() {
  try {
    const { data, error } = await supabase
      .from('cargos')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function getCargoById(id) {
  try {
    const { data, error } = await supabase
      .from('cargos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function createCargo(payload) {
  try {
    const { data, error } = await supabase
      .from('cargos')
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}

export async function updateCargo(id, payload) {
  try {
    const { data, error } = await supabase
      .from('cargos')
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

export async function deleteCargo(id) {
  try {
    const { data, error } = await supabase
      .from('cargos')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || String(error) };
  }
}
