# Lisa - O Alquimista | Portfólio Musical Interativo & Catálogo de Beats

Um portfólio web de alta performance e visualmente impressionante construído para e por **Lisa / ProdLisa (O Alquimista)**. A aplicação serve como uma vitrine de áudio e vídeo interativa para produções musicais, beats disponíveis para venda, DJ sets gravados, galeria multimídia e perfis de redes sociais.

---

## Visão Geral

O projeto foi projetado com uma estética moderna e imersiva (*cyberpunk / opal dark style*), apresentando um plano de fundo em vídeo contínuo com efeito envernizado, animações fluidas baseadas em física/keyframes e um reprodutor de áudio global integrado.

### Destaques da Aplicação

1. **Reprodutor de Áudio Global Inteligente (Beat Store / Catálogo)**
   - Mecanismo integrado de player de áudio que sincroniza barras de progresso interativas (`<input>` / `div` com clique direto na linha do tempo) e contadores de tempo em formato `MM:SS`.
   - Lógica de reprodução mutua exclusiva: ao tocar um beat, o vídeo do YouTube em reprodução é automaticamente pausado via `postMessage`.
   - Divisão inteligente entre **Beats Disponíveis** (com acionamento direto via WhatsApp para compra) e **Beats em Uso / Vendidos** com gavetas colapsáveis (*accordion*).

2. **Interface Fluida & Animações Exclusivas (Framer Motion + Tailwind CSS)**
   - Tipografia neon com efeitos de *glow*, gradientes animados e pulsação em looping sem perda de performance.
   - Efeitos de entrada em cascata (*staggered animations*) para cards e ícones sociais.
   - Navegação fluida tipo Single Page Application (SPA) alimentada por estado dinâmico no React.

3. **Integração Multimídia Completa & Galeria Interativa**
   - **Swiper.js** integrado para navegação carrossel de foto e vídeo.
   - Modal expansível customizado em alta definição para pré-visualização de mídias.
   - Embed do YouTube otimizado via API de iframe com suporte a *autoplay* inteligente controlado por aceitação de cookies.

4. **Experiência Mobile First e UX Refinada**
   - Trava de *bounce scroll* para evitar arrasto elástico incômodo em aparelhos mobile (`touch-action: none`).
   - Sistema de banner de cookies/privacidade interativo que libera recursos de mídia ao ser aceito.
   - Links diretos com suporte a deep-linking de aplicativos móveis (Instagram, TikTok, Spotify, SoundCloud, YouTube, WhatsApp).

---

## Tecnologias Utilizadas

- **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Carrossel / Swiper:** [Swiper.js](https://swiperjs.com/)
- **Icons & Assets:** Vector SVGs, Supabase Storage CDN, Web Media Formats (.avif, .mp4, .mp3)

---

##  Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18+ recomendada)
- **npm** ou **yarn** / **pnpm**

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra no navegador:
```text
http://localhost:5173
```

---

## 📁 Estrutura de Arquivos Principais

```text
├── src/
│   ├── assets/              # Recursos locais (imagens e capas)
│   ├── App.jsx              # Componente principal (Lógica de player, rotas e UI)
│   ├── index.css            # Custom @theme Tailwind v4, keyframes neon e utilitários
│   └── main.jsx             # Ponto de entrada da aplicação React
├── index.html               # Estrutura HTML base
└── package.json             # Dependências do projeto
```

---

## ✉️ Contato & Redes Sociais

- **Instagram:** [@prod.lisa_bispo](https://www.instagram.com/prod.lisa_bispo/)
- **Spotify:** [ProdLisa](https://open.spotify.com/artist/3iTMVqe25gPOQPZH28iZoR)
- **SoundCloud:** [Dj Lisa](https://soundcloud.com/bispolisaoficial00)
- **YouTube:** [Lisa Bispo](https://www.youtube.com/@LisaBispo-p8z3l)

---
*Desenvolvido para revolucionar a apresentação de produções de áudio e beats na cena musical.*
