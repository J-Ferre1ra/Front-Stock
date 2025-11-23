# 📦 EstoqueMaster - Front-end

Sistema completo de gestão de estoque, vendas, clientes e leilão, desenvolvido para uso profissional em pequenas e médias empresas.
Interface do sistema de gestão de estoque desenvolvida em **React + Vite**, com foco em simplicidade, performance e fluxo intuitivo para o usuário.

---

## 🚀 Tecnologias Utilizadas

- **React.js**
- **Vite**
- **Axios**
- **JSZip**
- **FileSaver**
- **React Router DOM**
- **CSS puro**

---

## 📁 Estrutura de Pastas

/src
/assets
/components
/contexts
/pages
/services
index.html


---

## 📌 Funcionalidades

### 🏠 Dashboard
- Resumo do estoque e vendas  
- Transações recentes  
- Itens com estoque baixo  
- Ações rápidas:
  - Adicionar estoque
  - Registrar venda
  - Gerar relatório (modal para escolher tipo)

---

### 📦 Estoque
- Listagem completa dos produtos  
- Busca em tempo real  
- Atualização da tabela  
- Adicionar produto  
- Editar produto  
- Excluir produto  
- Geração de relatório PDF do estoque  

---

### 💰 Transações
- Listagem com filtros  
- Cadastro de entrada, saída, venda e despesa  
- Modal completo para criação de transações  
- Relatório por período:
  - Últimos 7 dias
  - Últimos 30 dias
  - Mês atual
  - Ano atual
  - Período personalizado

---

### 👥 Clientes
- Cadastro de clientes  
- Busca  
- Editar cliente  
- Excluir cliente  

---

### 📜 Registro de Atividades
- Log das ações dos usuários:  
  - Data  
  - Usuário  
  - Ação  

---

### 📸 Leilão
- Painel com todos os produtos  
- Copiar texto formatado do produto  
- Baixar imagens em ZIP  
- Preview das imagens  

---

## 🔐 Autenticação
- Fluxo de login com token JWT  
- Controle de sessão  
- Rotas protegidas  
- Logout simples  

---

## 🛠️ Como Rodar o Projeto

### 📦 Instalar dependências
Antes de iniciar, instale as dependências do projeto:

````bash
npm install
🚀 Rodar o servidor de desenvolvimento
Para iniciar o projeto localmente:
````

````bash
npm run dev
🧪 Build de Produção
Para gerar a versão otimizada para deploy:
````
````bash

npm run build
Os arquivos serão gerados na pasta /dist e estarão prontos para o deploy.
````

🤝 Conexão com o Back-end
As configurações de API e requisições estão centralizadas em:

src/services/api.js

Nota: Modifique a variável baseURL neste arquivo caso mude o endereço do servidor back-end ou vá para produção.

---

## 📄 Licença
Este projeto é de uso privado e exclusivo do cliente.
