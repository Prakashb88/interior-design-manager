-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Projects table
create table if not exists projects (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    client_name text not null,
    client_email text,
    client_phone text,
    status text not null default 'pending',
    budget numeric(10,2),
    start_date date,
    end_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id text not null -- This will store the Clerk user ID
);

-- Transactions table
create table if not exists transactions (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects(id) on delete cascade,
    description text not null,
    amount numeric(10,2) not null,
    type text not null check (type in ('income', 'expense')),
    category text not null,
    date date not null,
    receipt_url text,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id text not null -- This will store the Clerk user ID
);

-- Project tasks table
create table if not exists tasks (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects(id) on delete cascade,
    title text not null,
    description text,
    status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed')),
    due_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id text not null -- This will store the Clerk user ID
);

-- Project files table
create table if not exists files (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects(id) on delete cascade,
    name text not null,
    url text not null,
    type text not null,
    size integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id text not null -- This will store the Clerk user ID
);

-- Create indexes for better query performance
create index if not exists projects_user_id_idx on projects(user_id);
create index if not exists transactions_project_id_idx on transactions(project_id);
create index if not exists transactions_user_id_idx on transactions(user_id);
create index if not exists tasks_project_id_idx on tasks(project_id);
create index if not exists tasks_user_id_idx on tasks(user_id);
create index if not exists files_project_id_idx on files(project_id);
create index if not exists files_user_id_idx on files(user_id);

-- Create RLS (Row Level Security) policies
alter table projects enable row level security;
alter table transactions enable row level security;
alter table tasks enable row level security;
alter table files enable row level security;

-- Create policies for projects
create policy "Users can view their own projects"
    on projects for select
    using (user_id = auth.uid());

create policy "Users can create their own projects"
    on projects for insert
    with check (user_id = auth.uid());

create policy "Users can update their own projects"
    on projects for update
    using (user_id = auth.uid());

create policy "Users can delete their own projects"
    on projects for delete
    using (user_id = auth.uid());

-- Create similar policies for transactions
create policy "Users can view their own transactions"
    on transactions for select
    using (user_id = auth.uid());

create policy "Users can create their own transactions"
    on transactions for insert
    with check (user_id = auth.uid());

create policy "Users can update their own transactions"
    on transactions for update
    using (user_id = auth.uid());

create policy "Users can delete their own transactions"
    on transactions for delete
    using (user_id = auth.uid());

-- Create similar policies for tasks
create policy "Users can view their own tasks"
    on tasks for select
    using (user_id = auth.uid());

create policy "Users can create their own tasks"
    on tasks for insert
    with check (user_id = auth.uid());

create policy "Users can update their own tasks"
    on tasks for update
    using (user_id = auth.uid());

create policy "Users can delete their own tasks"
    on tasks for delete
    using (user_id = auth.uid());

-- Create similar policies for files
create policy "Users can view their own files"
    on files for select
    using (user_id = auth.uid());

create policy "Users can create their own files"
    on files for insert
    with check (user_id = auth.uid());

create policy "Users can update their own files"
    on files for update
    using (user_id = auth.uid());

create policy "Users can delete their own files"
    on files for delete
    using (user_id = auth.uid());
