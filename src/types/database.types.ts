export type Project = {
  id: string;
  name: string;
  description?: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  budget?: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type Transaction = {
  id: string;
  project_id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  receipt_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type Task = {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type File = {
  id: string;
  project_id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
  updated_at: string;
  user_id: string;
};
