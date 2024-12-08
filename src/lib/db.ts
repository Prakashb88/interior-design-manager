import { supabase } from './supabase'
import type { Project, Transaction, Task, File } from '@/types/database.types'

export const db = {
  projects: {
    async create(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
      const { data: project, error } = await supabase
        .from('projects')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return project
    },

    async update(id: string, data: Partial<Project>) {
      const { data: project, error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return project
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },

    async getById(id: string) {
      const { data: project, error } = await supabase
        .from('projects')
        .select()
        .eq('id', id)
        .single()
      
      if (error) throw error
      return project
    },

    async list() {
      const { data: projects, error } = await supabase
        .from('projects')
        .select()
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return projects
    }
  },

  transactions: {
    async create(data: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) {
      const { data: transaction, error } = await supabase
        .from('transactions')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return transaction
    },

    async update(id: string, data: Partial<Transaction>) {
      const { data: transaction, error } = await supabase
        .from('transactions')
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return transaction
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },

    async getById(id: string) {
      const { data: transaction, error } = await supabase
        .from('transactions')
        .select()
        .eq('id', id)
        .single()
      
      if (error) throw error
      return transaction
    },

    async listByProject(projectId: string) {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select()
        .eq('project_id', projectId)
        .order('date', { ascending: false })
      
      if (error) throw error
      return transactions
    }
  },

  tasks: {
    async create(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
      const { data: task, error } = await supabase
        .from('tasks')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return task
    },

    async update(id: string, data: Partial<Task>) {
      const { data: task, error } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return task
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },

    async listByProject(projectId: string) {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select()
        .eq('project_id', projectId)
        .order('due_date', { ascending: true })
      
      if (error) throw error
      return tasks
    }
  },

  files: {
    async create(data: Omit<File, 'id' | 'created_at' | 'updated_at'>) {
      const { data: file, error } = await supabase
        .from('files')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return file
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },

    async listByProject(projectId: string) {
      const { data: files, error } = await supabase
        .from('files')
        .select()
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return files
    }
  }
}
