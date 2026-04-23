import { checklistItems, type ChecklistItem, type ChecklistStatus } from '../data/checklist'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

const tableName = 'checklist_items'

interface ChecklistRow {
  id: number
  section: string
  item: string
  instruction: string
  due: string
  status: ChecklistStatus
  notes: string
  sort_order: number
}

interface ChecklistLoadResult {
  items: ChecklistItem[]
  source: 'local' | 'supabase'
  message: string
}

function mapRowToItem(row: ChecklistRow): ChecklistItem {
  return {
    id: Number(row.id),
    section: row.section,
    item: row.item,
    instruction: row.instruction,
    due: row.due,
    status: row.status,
    notes: row.notes ?? '',
  }
}

function mapItemToRow(item: ChecklistItem, sortOrder: number): ChecklistRow {
  return {
    ...item,
    sort_order: sortOrder,
  }
}

async function seedChecklistItems(): Promise<ChecklistLoadResult> {
  if (!supabase) {
    return {
      items: checklistItems,
      source: 'local',
      message: 'Using local data.',
    }
  }

  const seedRows = checklistItems.map((item, index) => mapItemToRow(item, index))
  const { error } = await supabase.from(tableName).insert(seedRows)

  if (error) {
    console.warn('Supabase seed failed, falling back to local data', error)
    return {
      items: checklistItems,
      source: 'local',
      message: 'Supabase seed failed, using local mock data.',
    }
  }

  return {
    items: checklistItems,
    source: 'supabase',
    message: 'Seeded Supabase with the starter checklist.',
  }
}

export async function loadChecklistItems(): Promise<ChecklistLoadResult> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      items: checklistItems,
      source: 'local',
      message: 'Using local data.',
    }
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('id, section, item, instruction, due, status, notes, sort_order')
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true })

    if (error) {
      throw error
    }

    if (!data || data.length === 0) {
      return await seedChecklistItems()
    }

    return {
      items: data.map((row) => mapRowToItem(row as ChecklistRow)),
      source: 'supabase',
      message: 'Loaded checklist from Supabase.',
    }
  } catch (error) {
    console.warn('Supabase load failed, falling back to local data', error)
    return {
      items: checklistItems,
      source: 'local',
      message: 'Supabase unavailable, using local data.',
    }
  }
}

export async function saveChecklistItem(item: ChecklistItem): Promise<{ persisted: boolean; message: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      persisted: false,
      message: 'Saved locally only.',
    }
  }

  try {
    const { error } = await supabase
      .from(tableName)
      .update({
        section: item.section,
        item: item.item,
        instruction: item.instruction,
        due: item.due,
        status: item.status,
        notes: item.notes,
      })
      .eq('id', item.id)

    if (error) {
      throw error
    }

    return {
      persisted: true,
      message: 'Saved to Supabase.',
    }
  } catch (error) {
    console.warn('Supabase save failed, keeping local changes', error)
    return {
      persisted: false,
      message: 'Saved locally only; Supabase update failed.',
    }
  }
}
