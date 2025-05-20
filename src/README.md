# 🧩 Supabase SQL – Toy Store

Este documento reúne **todos os comandos SQL utilizados no Supabase** para estruturar o banco de dados do projeto Toy Store (clientes, vendas, estatísticas, permissões e views).

---

## 📁 1. Criação da tabela `clientes`

```sql
create table clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  nascimento date not null,
  created_at timestamp with time zone default now()
);
```

---

## 📁 2. Criação da tabela `sales`

```sql
create table sales (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id) on delete cascade,
  valor numeric not null,
  data_venda date not null,
  created_at timestamp with time zone default now()
);
```

---

## 🔐 3. Permissões (Row Level Security)

### Ativar RLS:

```sql
alter table clientes enable row level security;
alter table sales enable row level security;
```

### Permitir acesso total a todos os usuários autenticados:

```sql
create policy "Allow all actions for authenticated users"
on clientes
for all
to authenticated
using (true)
with check (true);

create policy "Allow all actions for authenticated users"
on sales
for all
to authenticated
using (true)
with check (true);
```

---

## 📊 4. View `vendas_por_dia`

```sql
create or replace view vendas_por_dia as
select
  data_venda,
  sum(valor) as total
from sales
group by data_venda
order by data_venda;
```

---

## 🧠 5. Função RPC `estatisticas_clientes`

```sql
create or replace function estatisticas_clientes()
returns json as $$
declare
  cliente_mais_vendeu record;
  cliente_maior_media record;
  cliente_mais_frequente record;
begin
  select c.id, c.nome, sum(s.valor) as total
  into cliente_mais_vendeu
  from clientes c
  join sales s on s.cliente_id = c.id
  group by c.id
  order by total desc
  limit 1;

  select c.id, c.nome, avg(s.valor) as media
  into cliente_maior_media
  from clientes c
  join sales s on s.cliente_id = c.id
  group by c.id
  order by media desc
  limit 1;

  select c.id, c.nome, count(distinct s.data_venda) as dias
  into cliente_mais_frequente
  from clientes c
  join sales s on s.cliente_id = c.id
  group by c.id
  order by dias desc
  limit 1;

  return json_build_object(
    'maior_volume', cliente_mais_vendeu,
    'maior_media', cliente_maior_media,
    'maior_frequencia', cliente_mais_frequente
  );
end;
$$ language plpgsql;
```

---

## ✅ Outras boas práticas aplicadas

* Uso de `uuid` como chave primária
* `on delete cascade` para garantir exclusão em cascata de vendas ao remover cliente
* Timestamps automáticos via `created_at`
* Views para evitar lógica repetida no front
* RPC para consolidar lógicas de estatísticas