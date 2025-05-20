# 🧸 Toy Store CRM

👉 **[Clique aqui para ver todos os comandos SQL usados no Supabase](./src/README.md)**

Um sistema completo para gerenciar **clientes e vendas** de uma loja de brinquedos. Conta com autenticação, dashboard analítico, interface responsiva e uma experiência minimalista.

---

## 🚀 Tecnologias Utilizadas

* **Next.js** – Framework React para SSR e SSG
* **TypeScript** – Tipagem estática moderna
* **Tailwind CSS** – Utilitários CSS para construção de UI rápida
* **Supabase** – Backend como serviço (Auth, banco de dados e RPCs)
* **Jest + React Testing Library** – Testes unitários e integração

---

## ✨ Funcionalidades

### Clientes

* Cadastro de novos clientes com nome, e-mail e data de nascimento
* Edição e exclusão de clientes
* Validação de dados do formulário
* Cálculo da primeira letra do alfabeto que ainda **não** aparece no nome do cliente

### Vendas

* Cadastro de vendas com cliente, valor e data
* Lista paginada com as últimas vendas
* Data da venda já vem preenchida com a data atual
* Exibição de cliente, valor formatado e data no formato **dd/mm/aaaa**

### Dashboard

* Gráfico com **total de vendas por dia**
* Destaques com:

  * Cliente com **maior volume de vendas**
  * Cliente com **maior média de valor por venda**
  * Cliente com **maior frequência de compra**

### Autenticação

* Tela de **login**
* Tela de **cadastro**
* Proteção de rotas com Supabase Auth

---

## 🧪 Testes

Framework: **Jest + Testing Library**

Cobertura:

* Componentes (`ClienteForm`, `ClienteCard`, `VendaForm`, `UltimasVendas`)
* Utilitários (`getLetraFaltante`, `formatarData`)
* Páginas (`clientes`, `vendas`)

Para rodar os testes:

npm install
npm test

---

## 🔐 Autenticação via Supabase

As rotas privadas são protegidas utilizando `supabase.auth.getSession()` no frontend. O usuário deve estar autenticado para acessar páginas como **clientes**, **vendas** e **dashboard**.

---

## 🔧 Supabase RPCs usadas

**estatisticas\_clientes** → Retorna:

* Cliente com maior volume
* Cliente com maior média por venda
* Cliente com maior número de dias únicos com compras

**vendas\_por\_dia** (view) → Soma total de vendas agrupadas por data

---

## 📦 Como rodar o projeto

1. Clone o repositório:

git clone <ssh_do_repositorio>
cd case-toy-store

1. Instale as dependências:

npm install

3. Configure o arquivo `.env.local`:

NEXT\_PUBLIC\_SUPABASE\_URL=https\://<seu-projeto>.supabase.co
NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=<sua-anon-key>

4. Rode o projeto:

npm run dev
