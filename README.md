# Contact Frontend - Documentacao Tecnica

Frontend Angular para cadastro, consulta e monitoramento de contatos, integrado ao backend de envio/gestao de e-mails.

## Sumario

- [Visao Geral](#visao-geral)
- [Preview da Interface](#preview-da-interface)
- [Stack Tecnica](#stack-tecnica)
- [Arquitetura Aplicada](#arquitetura-aplicada)
- [Mudancas Tecnicas Realizadas](#mudancas-tecnicas-realizadas)
- [Rotas da Aplicacao](#rotas-da-aplicacao)
- [Integracao com Backend](#integracao-com-backend)
- [Componentes Reutilizados](#componentes-reutilizados)
- [Build e Execucao](#build-e-execucao)
- [Observacoes Tecnicas](#observacoes-tecnicas)

## Visao Geral

O projeto foi evoluido para um padrao baseado em `pages` e `components`, com separacao clara entre:

- componentes visuais reutilizaveis
- paginas responsaveis por rota e orquestracao
- servicos e modelos por dominio

Tambem foi criada uma pagina dedicada de tracking de erros (`ERROR`) para facilitar diagnostico operacional.

## Preview da Interface

### Home / Landing Page

<img width="1080" height="749" alt="Landing Page" src="https://github.com/user-attachments/assets/cf5eff3f-dd46-433d-b6d5-f36b2af4638c" />

### Listagem de Contatos

<img width="1083" height="752" alt="Listagem de Contatos" src="https://github.com/user-attachments/assets/b8c9d20c-262c-4c18-b58f-29c364f08307" />

### Tracking de Erros

<img width="1100" height="748" alt="Tracking de Erros" src="https://github.com/user-attachments/assets/533cc2a3-2b8b-4135-98f6-e6e4f0b8119e" />

## Stack Tecnica

- Angular 16
- Angular Material
- RxJS
- Reactive Forms
- HttpClient
- ngx-toastr
- SCSS

## Arquitetura Aplicada

```text
src/app/
  core/
    api/
    services/
  shared/
    components/
      button/
      input/
      loading/
      navbar/
  features/
    contact/
      components/
        contract-form/
        contact-list/
        contact-search/
        error-tracking-list/
      pages/
        create-contact-page/
        list-contacts-page/
        error-tracking-page/
      services/
      models/
```

## Mudancas Tecnicas Realizadas

### 1) Reorganizacao por Pages e Components

- `create-contact-page` atua como container da home
- `contract-form` ficou focado em UI + emissao de evento
- `list-contacts-page` atua como container da listagem
- `contact-list` ficou como componente de tabela reutilizavel
- `contact-search` ficou como componente de busca reutilizavel

### 2) Separacao de Responsabilidades

- chamadas HTTP, loading, toast e navegacao ficam nas `pages`
- componentes focam em renderizacao e eventos

### 3) Landing Page na Home

- secao principal de apresentacao do produto
- cards de beneficios, diferenciais e fluxo
- CTA para iniciar cadastro
- layout responsivo com Angular Material

### 4) Busca Unificada na Listagem

- busca por ID ou e-mail em um unico input
- deteccao automatica do tipo da busca na `list-contacts-page`
- botao de limpar para recarregar todos os contatos

### 5) Status com Cores

Na listagem, o status e exibido como badge:

- `PENDING` em tom amarelo
- `SENT` em tom verde
- `ERROR` em tom vermelho

### 6) Pagina de Tracking de Erros

- nova rota: `/error-tracking`
- lista somente contatos com status `ERROR`
- exibe motivo do erro em tabela dedicada
- suporta fallback para os campos:
- `errorReason`
- `error_message`
- `errorMessage`
- `reason`
- `message`
- fallback final: `Motivo nao informado pelo backend.`

### 7) Navbar Global

Navegacao principal:

- Home (`/`)
- Listagem (`/list-all`)
- Tracking de erros (`/error-tracking`)

## Rotas da Aplicacao

- `/` -> `CreateContactPageComponent`
- `/list-all` -> `ListContactsPageComponent`
- `/error-tracking` -> `ErrorTrackingPageComponent`

## Integracao com Backend

Endpoints usados pelo frontend:

- `POST /sender-email/send` -> cria contato
- `GET /sender-email` -> lista contatos
- `GET /sender-email/{id}` -> busca por ID
- `GET /sender-email?email={email}` -> busca por e-mail

Observacao de arquitetura:

- hoje o tracking de erros filtra `ERROR` no frontend
- para escala, o ideal e o backend suportar `GET /sender-email?status=ERROR` com paginacao

## Componentes Reutilizados

- `app-input`
- `app-button`
- `app-loading`
- `app-navbar`

## Build e Execucao

Instalacao:

```bash
npm install
```

Execucao local:

```bash
npm start
```

Aplicacao:

```text
http://localhost:4200
```

Build:

```bash
npm run build
```

Testes:

```bash
npm test
```
