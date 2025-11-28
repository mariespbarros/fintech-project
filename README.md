# Projeto Fintech Integrado (Spring Boot + ReactJS)

Este projeto implementa um sistema de gerenciamento financeiro pessoal (Fintech) utilizando Spring Boot para o Backend e ReactJS para o Frontend, com persistência de dados no Oracle Database.

## 1. Tecnologias Utilizadas

| Componente | Tecnologia | Versão Principal |
| :--- | :--- | :--- |
| **Backend** | Java / Spring Boot | 3.2.0 |
| **Banco de Dados** | Oracle Database | (FIAP Instance) |
| **Persistência** | Spring Data JPA / Hibernate | - |
| **Frontend** | ReactJS | 18.x |
| **Rotas** | React Router DOM | 6.x |
| **Comunicação API** | Axios | - |

## 2. Estrutura das Entidades

O projeto foi desenvolvido para as 6 entidades solicitadas, com CRUD (GET, POST, PUT, DELETE) completo implementado para as 3 entidades principais: **Usuário**, **Categoria** e **Gasto**.

| Entidade | Descrição | CRUD Completo? |
| :--- | :--- | :--- |
| **Usuario** | Informações de login e perfil. | Sim |
| **Categoria** | Categorias de gastos e receitas (Ex: Alimentação, Salário). | Sim |
| **Gasto** | Registro de despesas do usuário. | Sim |
| **Receita** | Registro de entradas financeiras. | Não (Somente Model/Repository) |
| **Transacao** | Representação genérica de movimentação. | Não (Somente Model/Repository) |
| **Movimentacao** | Registro de movimentações financeiras. | Não (Somente Model/Repository) |

## 3. Instruções de Inicialização (Backend)

O Backend é um projeto Maven Spring Boot.

### 3.1. Pré-requisitos
*   JDK 17 ou superior.
*   Maven.
*   Acesso à instância Oracle da FIAP.

### 3.2. Configuração do Banco de Dados

1.  **Localize o arquivo:** `fintech-project/backend/src/main/resources/application.properties`
2.  **A configuração de conexão já foi ajustada** com base nas informações fornecidas:

    ```properties
    spring.datasource.url=jdbc:oracle:thin:@//oracle.fiap.com.br:1521/ORCL
    spring.datasource.username=RM561351
    spring.datasource.password=310703
    ```

### 3.3. Execução

1.  Navegue até o diretório `fintech-project/backend`.
2. Execute o comando para compilar e rodar a aplicação. **ATENÇÃO:** O comando varia dependendo do seu sistema operacional::

    ```bash
    # Para Linux/macOS
    ./mvnw spring-boot:run
    
    # Para Windows (PowerShell/CMD)
    .\mvnw.cmd spring-boot:run
    ```

A API estará disponível em `http://localhost:8080/api`.

## 4. Instruções de Inicialização (Frontend)

O Frontend é um projeto ReactJS.

### 4.1. Pré-requisitos
*   Node.js (v18 ou superior).
*   npm ou pnpm.

### 4.2. Execução

1.  Navegue até o diretório `fintech-project/frontend`.
2.  Instale as dependências:

    ```bash
    npm install
    # ou pnpm install
    ```

3.  Inicie a aplicação:

    ```bash
    npm start
    ```

O Frontend será aberto automaticamente no seu navegador em `http://localhost:3000` (ou porta similar).

## 5. Dados de Autenticação do Usuário de Teste (Login)

Para acessar o sistema, utilize as seguintes credenciais de teste (que serão criadas automaticamente no primeiro login, se não existirem):

| Campo | Valor |
| :--- | :--- |
| **Login (Email)** | `RM561351@fiap.com.br` |
| **Senha** | `310703` |

## 6. Teste de Ponta a Ponta

Após iniciar o Backend e o Frontend:

1.  Acesse `http://localhost:3000`.
2.  Faça login com as credenciais de teste.
3.  Navegue para **Categorias** e **Gastos** para testar as operações de CRUD.
4.  Verifique se os dados estão sendo persistidos corretamente no seu banco de dados Oracle.
