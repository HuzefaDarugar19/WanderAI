/**
 * Lightweight Mock Supabase Client for Trip Storage.
 * Persists data to browser localStorage while replicating the Supabase query builder interface:
 * supabase.from('trips').select(...).order(...)
 * supabase.from('trips').insert(...)
 * supabase.from('trips').update(...).eq(...)
 * supabase.from('trips').delete(...).eq(...)
 */

const STORAGE_KEY = 'wanderai_trips_db';

class QueryBuilder {
  constructor(tableName) {
    this.tableName = tableName;
    this._filters = [];
    this._orderCol = null;
    this._orderAsc = true;
    this._limitVal = null;
  }

  _getData() {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}_${this.tableName}`);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Error reading from localStorage mock DB:', e);
      return [];
    }
  }

  _saveData(data) {
    try {
      localStorage.setItem(`${STORAGE_KEY}_${this.tableName}`, JSON.stringify(data));
    } catch (e) {
      console.warn('Error saving to localStorage mock DB:', e);
    }
  }

  select(columns = '*') {
    this._mode = 'select';
    this._columns = columns;
    return this;
  }

  insert(rows) {
    this._mode = 'insert';
    this._insertPayload = Array.isArray(rows) ? rows : [rows];
    return this;
  }

  update(values) {
    this._mode = 'update';
    this._updatePayload = values;
    return this;
  }

  delete() {
    this._mode = 'delete';
    return this;
  }

  eq(column, value) {
    this._filters.push({ column, operator: 'eq', value });
    return this;
  }

  order(column, { ascending = true } = {}) {
    this._orderCol = column;
    this._orderAsc = ascending;
    return this;
  }

  limit(count) {
    this._limitVal = count;
    return this;
  }

  async then(resolve, reject) {
    try {
      const result = await this._execute();
      resolve(result);
    } catch (error) {
      if (reject) reject(error);
      else resolve({ data: null, error });
    }
  }

  async _execute() {
    let items = this._getData();

    if (this._mode === 'select') {
      let filtered = [...items];
      for (const filter of this._filters) {
        if (filter.operator === 'eq') {
          filtered = filtered.filter(item => item[filter.column] === filter.value);
        }
      }

      if (this._orderCol) {
        filtered.sort((a, b) => {
          const valA = a[this._orderCol];
          const valB = b[this._orderCol];
          if (valA < valB) return this._orderAsc ? -1 : 1;
          if (valA > valB) return this._orderAsc ? 1 : -1;
          return 0;
        });
      }

      if (this._limitVal !== null) {
        filtered = filtered.slice(0, this._limitVal);
      }

      return { data: filtered, error: null };
    }

    if (this._mode === 'insert') {
      const now = new Date().toISOString();
      const newItems = this._insertPayload.map(row => ({
        id: row.id || `trip-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        createdAt: row.createdAt || now,
        ...row
      }));
      const combined = [...newItems, ...items];
      this._saveData(combined);
      return { data: newItems, error: null };
    }

    if (this._mode === 'update') {
      let matchedCount = 0;
      const updated = items.map(item => {
        const matches = this._filters.every(f => f.operator === 'eq' && item[f.column] === f.value);
        if (matches) {
          matchedCount++;
          return { ...item, ...this._updatePayload, updatedAt: new Date().toISOString() };
        }
        return item;
      });
      this._saveData(updated);
      return { data: updated, count: matchedCount, error: null };
    }

    if (this._mode === 'delete') {
      const remaining = items.filter(item => {
        return !this._filters.every(f => f.operator === 'eq' && item[f.column] === f.value);
      });
      this._saveData(remaining);
      return { data: remaining, error: null };
    }

    return { data: items, error: null };
  }
}

export class MockSupabaseClient {
  constructor(url, anonKey) {
    this.supabaseUrl = url;
    this.supabaseKey = anonKey;
  }

  from(tableName) {
    return new QueryBuilder(tableName);
  }
}

// Singleton helper
export const createClient = (url = 'https://mock-supabase.local', anonKey = 'mock-anon-key') => {
  return new MockSupabaseClient(url, anonKey);
};

export const supabase = createClient();
