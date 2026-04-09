# Portifolio

Portfolio pessoal desenvolvido com React, TypeScript e Vite. O projeto foi pensado como uma vitrine visual para apresentar projetos, repertorio, contato e identidade de interface em uma navegacao simples com transicoes suaves e fundo interativo em WebGL.

## Visao geral

O site e dividido em quatro rotas principais:

- `/` Home com apresentacao principal.
- `/projetos` Lista de projetos em cards com paginacao lateral.
- `/sobre` Resumo de abordagem, stack e repertorio.
- `/contato` Links de contato e canais profissionais.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Material UI
- Framer Motion
- OGL/WebGL para o background interativo
- Tailwind CSS 4

## Destaques do projeto

- Transicoes entre paginas com `AnimatePresence` e `motion`.
- Layout reutilizavel com `PageFrame`.
- Navegacao fixa com comportamento responsivo.
- Tema centralizado em `src/theme.ts`.
- Fundo visual interativo renderizado em shader via `src/components/orb/Orb.tsx`.

## Estrutura

```text
src/
  components/
    layout/      componentes de moldura e navegacao
    orb/         background interativo em WebGL
    projects/    card de projeto
  pages/         paginas principais do portfolio
  App.tsx        rotas e animacoes de troca de pagina
  theme.ts       tema global do Material UI
```

## Como rodar localmente

### Requisitos

- Node.js 18+ recomendado
- npm

### Instalacao

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build de producao

```bash
npm run build
```

### Preview local da build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Personalizacao

Os pontos principais para adaptar o portfolio sao:

- `src/pages/Home.tsx`: titulo e texto principal.
- `src/pages/Projects.tsx`: lista de projetos exibidos.
- `src/pages/About.tsx`: descricao profissional e skills.
- `src/pages/Contact.tsx`: email, LinkedIn e GitHub.
- `src/components/layout/PageFrame.tsx`: assinatura visual fixa da interface.
- `src/theme.ts`: cores, tipografia e tokens visuais.
- `public/projects/`: imagens usadas na galeria dos modais de projeto.

## Observacoes

- A pagina de contato ainda usa links e textos placeholder.
- A pagina de projetos hoje trabalha com dados locais em array estatico.
- O nome do repositorio e do titulo atual esta como `Portifolio`.

## Scripts disponiveis

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```
