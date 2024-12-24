# Marvel Comics Explorer

A Next.js application that allows users to explore Marvel comics, featuring authentication, favorites management, and an infinite scroll experience.

## Features ✨

- 🔐 **Authentication**
  - Multiple login providers (GitHub, Google)
  
- 📚 **Comics Exploration**
  - Browse Marvel comics collection
  - Search comics by title
  - Filter comics by various criteria
  - Infinite scroll loading
  - Responsive comic grid layout

- ❤️ **Favorites Management**
  - Add/remove comics to favorites
  - Persistent storage using localStorage
  - View favorites in a modal
  - Remove comics from favorites list

- 🎨 **UI/UX**
  - Responsive design for all devices
  - Loading states and animations
  - Modern and clean interface
  - Infinite scroll pagination

## Tech Stack 🛠

- [Next.js 13+](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Marvel API](https://developer.marvel.com/) - Comics data
- [Shadcn](https://ui.shadcn.com/) - UI components

## Getting Started 🚀

### Prerequisites

- Node.js 16+
- npm/yarn/pnpm
- Marvel API keys

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/marvel-comics-explorer.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3.Create a .env.local file:
```bash
MARVEL_PUBLIC_KEY=your_public_key
MARVEL_PRIVATE_KEY=your_private_key
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
GOOGLE_ID=your_google_oauth_id
GOOGLE_SECRET=your_google_oauth_secret
```

4. run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# Features
- [x] Tela de Login com a mais de um tipo de Providers (github, google, etc);
- [x] Tela de Listagem de Comics;
- [x] Listagem de Comics por Input;
- [x] Filtro das Comics por Input;
- [x] Favoritar as Comics;
- [x] Paginação;
- [x] Favoritar no localstorage ou armazenamento de preferência;
- [x] Modal de listagem de personagens Favoritos;
- [x] Exclusão de personagens da lista;
- [x] Responsividade;
- [x] Carregamento Infinito;
- [x] Testes Unitários;


# Pontos de melhorias
- Add unit tests for all components
- Implement integration tests for API calls
- Add end-to-end testing with Cypress/Playwright
- Set up test coverage reporting
- Consider using Zustand/Redux for complex state
- Implement proper cache management for API calls
- Store the favorites on firebase.
