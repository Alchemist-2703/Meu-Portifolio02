import { useState } from 'react'

// Importações dos seus ficheiros locais de imagem:
import iconeSoundcloud from './assets/soundcloud-logo.png'
import iconeSpotify from './assets/spotify-icon.jpg'
import iconeYouTube from './assets/youtube-logo.png'
import iconeWhatsapp from './assets/whatsapp.png'
import iconePerigo from './assets/capa-perigo.jpg'
import iconeBatalhao from './assets/batalhao.jpg'
import iconeSemblante from './assets/semblante.jpg'


export default function App() {
  // Estado local para esconder o banner assim que ele clicar
const [aceitouCookies, setAceitouCookies] = useState(false);

  // Estado para controlar qual subseção está ativa ("inicio", "producoes", "catalogo", "sets", "perfis")
  const [secaoAtiva, setSecaoAtiva] = useState('inicio')


  // Lista de opções do menu para evitar repetição de código
  const menuOptions = [
    { id: 'producoes', label: 'Produções' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'sets', label: 'Sets' },
    { id: 'perfis', label: 'Perfis' }
  ]

  return (
    // ADAPTADO: Substituído o fundo sólido 'bg-black' pelo gradiente profundo e animado da Opala
    <div className="min-h-screen bg-black text-slate-100 font-['Times_New_Roman'] selection:bg-opal-flash-cyan selection:text-slate-950 relative overflow-y-auto overflow-x-hidden">

      {/* ─── REFLEXOS DO VERNIZ PRETO (Animação de Brilho Polido) ─── */}
      {/* Diminuímos a opacidade para /5 e /8 (ficando超 sutil) e ajustamos para branco/ciano para simular o reflexo do verniz na luz */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 sm:w-96 sm:h-96 lg:w-125 lg:h-125 bg-white/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none animate-opal-1 z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 sm:w-100 sm:h-100 lg:w-150 lg:h-150 bg-opal-flash-cyan/8 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none animate-opal-2 z-0" />
      <div className="absolute top-10 right-10 w-96 h-32 bg-opal-flash-violet/5 rounded-full blur-[100px] pointer-events-none animate-opal-1 z-0" />

      {/* 1. BARRA FIXA NO TOPO (NAVBAR) */}
      {/* ADAPTADO: Agora usa bg-black/40 para sumir perfeitamente no fundo envernizado */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black/40 backdrop-blur-md border-b border-white/5 z-50 px-3 md:px-6 flex items-center justify-between">
        {/* Lado Esquerdo: Logotipo / Voltar ao Início */}
        <button 
          onClick={() => setSecaoAtiva('inicio')} 
          className="text-base md:text-xl font-bold tracking-wider text-white hover:text-opal-flash-cyan transition-colors uppercase cursor-pointer shrink-0"
        >
          Portifolio
        </button>

        {/* Lado Direito: Opções de Navegação */}
        {/* ADAPTADO: gap-1 no celular para aproximar os botões entre si, md:gap-2 no PC */}
        <div className="flex items-center gap-1 md:gap-2 max-w-[calc(100%-100px)] overflow-x-auto no-scrollbar">
          {menuOptions.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setSecaoAtiva(item.id)} 
              className={`px-2 md:px-4 py-1 md:py-1.5 text-[13px] md:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                secaoAtiva === item.id 
                  ? 'bg-linear-to-r from-opal-flash-cyan to-opal-flash-violet text-slate-950 font-bold shadow-lg shadow-opal-flash-cyan/20' // Destaque Ativo Opala
                  : 'text-slate-400 hover:text-white hover:bg-white/5' // Inativo
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 2. CONTEÚDO PRINCIPAL (Muda dinamicamente conforme o estado) */}
      {/* ADAPTADO: Inserido z-10 para ficar por cima do brilho do fundo sem bloquear interações */}        
      {/* 2. CONTEÚDO PRINCIPAL (Com animação de Fade-In controlada por chaves) */}
        <main className="pt-24 md:pt-28 pb-36 px-4 md:px-6 max-w-7xl mx-auto w-full flex flex-col">
         {/* Verifique se esta tag existe antes do fim do arquivo */}

        {/* SUBSEÇÃO: MENU PRINCIPAL / INÍCIO */}
        {secaoAtiva === 'inicio' && (
          <div className="text-center max-w-3xl mx-auto space-y-8 pb-24">
            <div className="space-y-4">
              <h1 className="animar-titulo-home text-5xl md:text-7xl font-extrabold tracking-tight bg-linear-to-r from-opal-flash-cyan via-purple-400 to-opal-flash-violet bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(0,245,212,0.2)]">
                Lisa
              </h1>
              <p className="animar-titulo-home text-slate-400 text-lg md:text-xl"
              style={{ animationDelay: '200ms' }}>
                Quer me conhecer melhor e conhecer meus trabalhos?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {menuOptions.map((item, index) => (
                <button 
                  key={item.id} 
                  onClick={() => setSecaoAtiva(item.id)} 
                  className="animar-botao-home p-6 bg-white/0.5 border border-white/2 backdrop-blur-sm rounded-lg text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.5)] lg:hover:border-white/20 transition-all duration-300 group active:scale-[0.98] w-full block cursor-pointer relative overflow-hidden"
                  style={{ animationDelay: `${400 + index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white lg:group-hover:text-opal-flash-cyan transition-colors">
                      {item.label}
                    </span>
                    <span className="text-slate-500 lg:group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* VÍDEO DO YOUTUBE EXCLUSIVO DA TELA INICIAL COM ESPAÇAMENTO */}
            <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase text-center mt-10 mb-3">
               Confira meu último lançamento</p>
            <div className="w-full max-w-xl mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 p-2 backdrop-blur-md">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/qHShURxB1vk?si=kymsJgYXNTC8_XSm${aceitouCookies ? '&autoplay=1&mute=1' : ''}`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                {aceitouCookies ? "▶ Reproduzindo automaticamente (mudo) para computar visualização." : "💡 Clique em 'Aceitar Todos' no rodapé para iniciar a reprodução automática e computar a visualização."}
              </p>
            </div>

          </div>
        )}

        {/* SUBSEÇÃO: PRODUÇÕES */} 
        {secaoAtiva === 'producoes' && ( 
      <div key="perfis" className="space-y-12 w-full">

            {/* Cabeçalho */}
        <div className="space-y-2 cabecalho-fade-in"> 
           <p className="text-3xl font-bold text-white border-b border-slate-850 pb-4">Produções</p> 
           <p className="text-slate-400 text-sm md:text-base">Arraste para o lado para explorar os lançamentos musicais.</p> 
        </div>

      {/* CONTAINER DO CARROSSEL - Alterar "gap-6" muda o espaçamento entre os cards */}
      <div className="flex flex-row gap-6 overflow-x-auto pb-6 pt-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent w-full snap-x snap-mandatory animate-[slideLeft_0.8s_ease-out]"> 
      
       {/* 🌟 LISTA DE MÚSICAS PERSONALIZADA (ARRAY DE OBJETOS) 
          Altere os textos, links das capas e links das plataformas diretamente aqui abaixo:
      */}
      {[
        {
          id: 1,
          titulo: "Perigo",
          tipo: "Track da Sul - ProdLisa",
          capa: "/capas/capa-perigo.jpg",
          linkSpotify: "https://open.spotify.com/intl-pt/track/46endSHadmGaO2wuK6Sx3A?si=3a6bf8bb59344c33",
          linkYoutube: "https://www.youtube.com/watch?v=2LYxT4AiRcg&list=RD2LYxT4AiRcg&start_radio=1"
        },
        {
          id: 2,
          titulo: "Batalhão x Pocoto",
          tipo: "ProdLisa",
          capa: "/capas/batalhao.jpg",
          linkSpotify: "https://soundcloud.com/bispolisaoficial00/pocoto-x-batalhao-funkhall",
          linkYoutube: "https://youtu.be/qHShURxB1vk?si=LDLha14JLNI8SHJx"
        },
        {
          id: 3,
          titulo: "Semblante do Mal",
          tipo: "Duhduh Pereira - ProdLisa",
          capa: "/capas/semblante.jpg",
          linkSpotify: "https://open.spotify.com/intl-pt/track/46endSHadmGaO2wuK6Sx3A?si=3a6bf8bb59344c33",
          linkYoutube: "https://www.youtube.com/watch?v=2LYxT4AiRcg&list=RD2LYxT4AiRcg&start_radio=1"
        },
        {
          id: 4,
          titulo: "Nome da Música 4",
          tipo: "ProdLisa",
          capa: "/capas/musica4.jpg",
          linkSpotify: "https://open.spotify.com/intl-pt/track/46endSHadmGaO2wuK6Sx3A?si=3a6bf8bb59344c33",
          linkYoutube: "https://www.youtube.com/watch?v=2LYxT4AiRcg&list=RD2LYxT4AiRcg&start_radio=1"
        }
      ].map((musica) => ( 
        
        /* O CARD (w-64) */
        <div key={musica.id} className="w-36 sm:w-64 flex-shrink-0 bg-transparent p-0 snap-start"> 
          
          {/* A CAPA (Arredondamento em rounded-xl) */}
          <div className="w-full aspect-square bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden mb-4 shadow-md"> 
            {/* Puxa a capa individual de cada objeto */}
            <img 
              src={musica.capa} 
              alt={`Capa ${musica.titulo}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            /> 
          </div> 

          {/* O TÍTULO CENTRALIZADO E RETICÊNCIAS SE FOR GRANDE */}
          <div className="text-center px-1"> 
            {/* Puxa o título individual de cada objeto */}
            <h3 className="font-bold text-lg text-white truncate" title={musica.titulo}>
              {musica.titulo}
            </h3>  
            {musica.tipo && (
              <p className="text-slate-400 text-sm truncate" title={musica.tipo}>
                {musica.tipo}
              </p>
            )}
          </div> 

          {/* OS ÍCONES DAS PLATAFORMAS COM LINKS INTEGRADOS */}
          <div className="flex justify-center items-center gap-3"> 
            
            {/* LINK SPOTIFY */}
            <a href={musica.linkSpotify} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 hover:border-emerald-500 hover:scale-110 transition-all cursor-pointer" 
             fallback-href="https://open.spotify.com/intl-pt/track/46endSHadmGaO2wuK6Sx3A?si=3a6bf8bb59344c33">
              <img src={iconeSpotify} alt="Spotify" className="w-30 h-30 object-contain"/>
            </a> 

            {/* LINK YOUTUBE */}
            <a href={musica.linkYoutube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 hover:border-red-500 hover:scale-110 transition-all cursor-pointer" 
             fallback-href="https://www.youtube.com/watch?v=2LYxT4AiRcg&list=RD2LYxT4AiRcg&start_radio=1">
              <img src="/redes/Youtube-logo.png" alt="YouTube" className="w-7 h-7 object-contain"/>
            </a> 


          </div> 
        </div> 
      ))} 

      </div> 
     </div> 
 )}



       {/* SUBSEÇÃO: CATÁLOGO */}
      {secaoAtiva === 'catalogo' && (
       <div className="space-y-2 cabecalho-fade-in">
    
    {/* Cabeçalho */}
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-white border-b border-slate-850 pb-4">Catálogo de Beats</h2>
      <p className="text-slate-400">Ouça os instrumentais, navegue pela linha do tempo e garanta a sua produção exclusiva.</p>
    </div>

    {/* PLAYER DE ÁUDIO INVISÍVEL */}
    <audio 
      id="global-audio-player"
      preload="auto"
      onTimeUpdate={(e) => {
        const audio = e.currentTarget;
        const progresso = (audio.currentTime / audio.duration) * 100 || 0;
        
        const barra = document.getElementById(`barra-${audio.dataset.beatId}`);
        const contador = document.getElementById(`tempo-${audio.dataset.beatId}`);
        
        if (barra) barra.style.width = `${progresso}%`;
        if (contador) {
          const minAtual = Math.floor(audio.currentTime / 60);
          const segAtual = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
          const minTotal = Math.floor(audio.duration / 60) || 0;
          const segTotal = Math.floor(audio.duration % 60).toString().padStart(2, '0') || '00';
          contador.innerText = `${minAtual}:${segAtual} / ${minTotal}:${segTotal}`;
        }
      }}
      onEnded={(e) => {
        const audio = e.currentTarget;
        const btn = document.getElementById(`btn-${audio.dataset.beatId}`);
        if (btn) btn.innerText = "▶ Play";
        const barra = document.getElementById(`barra-${audio.dataset.beatId}`);
        if (barra) barra.style.width = '0%';
      }}
    />

    {/* LAYOUT EM DUAS COLUNAS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      
      {/* COLUNA 1: BEATS DISPONÍVEIS */}
      <div className="space-y-4">
        <div className="animar-catalogo delay-cat-0">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2 mb-2">
           <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
           Beats Disponíveis
          </h3>
        </div>

        {/* LISTA DE BEATS DISPONÍVEIS */}
        {[
          { id: "disp-1", nome: "Beat Aramaico", arquivo: "beats/disponiveis/BEAT ARAMAICO 13(MIX).mp3" },
          { id: "disp-2", nome: "NONAME", arquivo: "beats/disponiveis/NONAME.mp3" },
        ].map((beat, index) => (
          /* bg-slate-900/05 garante 95%-99% de transparência mantendo a borda sólida */
          <div key={beat.id} className="animar-catalogo p-4 bg-slate-900/05 border border-slate-800 rounded-xl space-y-3 backdrop-blur-xs"
           style={{ animationDelay: `${200 + index * 200}ms` }}>
            <div className="font-semibold text-white tracking-wide text-base">{beat.nome}</div>
            



            {/* LINHA DO TEMPO INTERATIVA (Ao clicar, avança ou retrocede o áudio) */}
            <div 
              onClick={(e) => {
                const audio = document.getElementById('global-audio-player');
                // Só altera o tempo se este beat específico for o que está carregado
                if (audio && audio.dataset.beatId === beat.id && audio.duration) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const cliqueX = e.clientX - rect.left; // Posição exata do clique dentro da barra
                  const larguraTotal = rect.width;
                  const novaPercentagem = cliqueX / larguraTotal;
                  audio.currentTime = novaPercentagem * audio.duration;
                }
              }}
              className="w-full h-3 bg-slate-800 rounded-full cursor-pointer relative flex items-center group"
            >
              <div id={`barra-${beat.id}`} className="h-full bg-cyan-500 w-0 rounded-full transition-all duration-75 pointer-events-none"></div>
              {/* Marcador flutuante discreto no hover */}
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none"></div>
            </div>

            {/* Linha de Controle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span id={`tempo-${beat.id}`} className="text-xs text-slate-500 font-mono">0:00 / 0:00</span>
              
              <div className="flex gap-2">
                <button 
                  id={`btn-${beat.id}`}
                  onClick={() => {
                    const audio = document.getElementById('global-audio-player');
                    const btn = document.getElementById(`btn-${beat.id}`);
                    
                    if (audio.dataset.beatId === beat.id && !audio.paused) {
                      audio.pause();
                      btn.innerText = "▶ Play";
                    } 
                    else if (audio.dataset.beatId === beat.id && audio.paused) {
                      audio.play().catch(err => console.log("Erro:", err));
                      btn.innerText = "⏸ Pause";
                    }
                    else {
                      if (audio.dataset.beatId) {
                        const oldBtn = document.getElementById(`btn-${audio.dataset.beatId}`);
                        if (oldBtn) oldBtn.innerText = "▶ Play";
                        const oldBarra = document.getElementById(`barra-${audio.dataset.beatId}`);
                        if (oldBarra) oldBarra.style.width = '0%';
                      }
                      audio.src = beat.arquivo;
                      audio.dataset.beatId = beat.id;
                      audio.load();
                      audio.play().catch(err => console.log("Erro:", err));
                      btn.innerText = "⏸ Pause";
                    }
                  }}
                  className="px-3 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  ▶ Play
                </button>

                <a 
                  href={`https://wa.me/5511959367015?text=Salve, tenho interesse no beat "${encodeURIComponent(beat.nome)}"`}
                  fallback-href="https://wa.me/5511959367015?text=Salve, tenho interesse no beat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer flex items-center"
                >
                  Tenho Interesse
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COLUNA 2: BEATS EM USO / VENDIDOS (99% TRANSPARENTE, APAGADO, COM LINHA NO TÍTULO E TIMELINE INTERATIVA) */}
      <div className="space-y-4">
        <div className="animar-catalogo delay-cat-0">
          <h3 className="text-xl font-bold text-slate-500 flex items-center gap-2 mb-2">
           <span className="w-2 h-2 rounded-full bg-slate-600"></span>
           Beats em Uso / Vendidos
          </h3>
        </div>

        {/* LISTA DE BEATS EM USO */}
        {[
          { id: "uso-1", nome: "Beat BamBamBila - Dubplate NBDG", arquivo: "beats/em-uso/bam bam bila-2.mp3" },
          { id: "uso-2", nome: "Beat ZazaStyle - Reservado", arquivo: "beats/em-uso/Project_zazaxstye.mp3" },
        ].map((beat, index) => (
          /* Mantido bg-slate-900/05 para transparência e opacity-50 para efeito apagado de esmaecimento */
          <div key={beat.id} className="animar-catalogo p-4 bg-slate-900/05 border border-slate-800/40 rounded-xl space-y-3 opacity-50 backdrop-blur-xs"
            style={{ animationDelay: `${200 + index * 200}ms` }}>
            {/* Título mantendo o riscado de cancelamento line-through */}
            <div className="font-semibold text-slate-400 tracking-wide text-base line-through">{beat.nome}</div>
            
            {/* LINHA DO TEMPO INTERATIVA PARA OS BEATS EM USO */}
            <div 
              onClick={(e) => {
                const audio = document.getElementById('global-audio-player');
                if (audio && audio.dataset.beatId === beat.id && audio.duration) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const cliqueX = e.clientX - rect.left;
                  const larguraTotal = rect.width;
                  const novaPercentagem = cliqueX / larguraTotal;
                  audio.currentTime = novaPercentagem * audio.duration;
                }
              }}
              className="w-full h-3 bg-slate-950 rounded-full cursor-pointer relative flex items-center group"
            >
              <div id={`barra-${beat.id}`} className="h-full bg-slate-500 w-0 rounded-full transition-all duration-75 pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none"></div>
            </div>

            {/* Linha de Controle */}
            <div className="flex items-center justify-between pt-1">
              <span id={`tempo-${beat.id}`} className="text-xs text-slate-600 font-mono">0:00 / 0:00</span>
              
              <button 
                id={`btn-${beat.id}`}
                onClick={() => {
                  const audio = document.getElementById('global-audio-player');
                  const btn = document.getElementById(`btn-${beat.id}`);
                  
                  if (audio.dataset.beatId === beat.id && !audio.paused) {
                    audio.pause();
                    btn.innerText = "▶ Play";
                  } 
                  else if (audio.dataset.beatId === beat.id && audio.paused) {
                    audio.play().catch(err => console.log("Erro:", err));
                    btn.innerText = "⏸ Pause";
                  }
                  else {
                    if (audio.dataset.beatId) {
                      const oldBtn = document.getElementById(`btn-${audio.dataset.beatId}`);
                      if (oldBtn) oldBtn.innerText = "▶ Play";
                      const oldBarra = document.getElementById(`barra-${audio.dataset.beatId}`);
                      if (oldBarra) oldBarra.style.width = '0%';

                    }
                    audio.src = beat.arquivo;
                    audio.dataset.beatId = beat.id;
                    audio.load(); // Força o carregamento do arquivo local também na coluna 2
                    audio.play().catch(err => console.log("Erro ao tocar:", err));
                    btn.innerText = "⏸ Pause";
                  }
                }}
                className="px-3 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                ▶ Play
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
)}


        {/* SUBSEÇÃO: SETS */}
        {secaoAtiva === 'sets' && (
    <div key="sets" className="space-y-2 w-full ">
    {/* 1. SEÇÃO SUPERIOR: CARDS DOS SETS (Animação de cima para baixo) */}
    <div className="space-y-2 cabecalho-fade-in">
      <p  className="text-3xl font-bold text-white border-b border-slate-850 pb-4">Sets</p>
        <p className="text-slate-400">Sets Gravados e Galeria Fotográfica para Portfólio.</p>
      </div>

      {/* Grid de Cards Menores (Altere o "gap-4" para mudar o espaçamento entre eles) */}
    <div className="space-y-6 animate-[slideDown_0.6s_ease-out]">
      <div className="flex flex-row gap-16 overflow-x-auto pb-4 scrollbar-none w-full snap-x snap-mandatory">
        
        {/* LISTA DE CARDS DE SETS (ARRAY DE OBJETOS) - Altere as informações diretamente aqui */}
        {[
          {
            id: 1,
            titulo: "Set Cyberpunk",
            subtitulo: "Ensaio Noturno",
            capa: "https://unsplash.com", // Link temporário
            linkPlataforma: "https://behance.net",
            iconePlataforma: "https://unpkg.com"
          },
          {
            id: 2,
            titulo: "Studio Sessions",
            subtitulo: "Sessão Minimalista",
            capa: "https://unsplash.com", // Link temporário
            linkPlataforma: "https://instagram.com",
            iconePlataforma: "https://unpkg.com"
          }
        ].map((set) => (
          
          /* O CARD MENOR (w-48) - Altere a largura aqui se quiser aumentar ou diminuir o card */
          <div key={set.id} className="w-48 flex-shrink-0 bg-transparent p-0 snap-start">
            
            {/* CAPA DO SET (Formato Quadrado e com borda leve) */}
            <div className="w-full aspect-square bg-slate-800 rounded-lg overflow-hidden mb-3 shadow-md border border-slate-800/40">
              <img src={set.capa} alt={set.titulo} className="w-full h-full object-cover" />
            </div>

            {/* TÍTULO CENTRALIZADO */}
            <div className="text-center px-1">
              {/* Altere "text-base" para mudar o tamanho da fonte do título */}
              <h3 className="font-bold text-base text-white truncate" title={set.titulo}>{set.titulo}</h3>
              <p className="text-[10px] text-slate-500 truncate mb-3">{set.subtitulo}</p>
            </div>

            {/* ÍCONE INTEGRADO - Altere "w-6 h-6" para mudar o tamanho do círculo */}
            <div className="flex justify-center items-center">
              <a href={set.linkPlataforma} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 hover:border-cyan-400 hover:scale-110 transition-all cursor-pointer">
                onClick={(e) => { 
               e.preventDefault(); 
               const appUrl = e.currentTarget.getAttribute('href'); 
                const webUrl = e.currentTarget.getAttribute('fallback-href'); 
               window.location.href = appUrl; 
               setTimeout(() => { window.open(webUrl, '_blank'); }, 500); 
            }} 
                
                {/* LOGO INTERNO - Altere "w-3 h-3" para mudar o tamanho do desenho interno */}
                <img src={set.iconePlataforma} alt="Link" className="w-3 h-3 invert" />
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>

    {/* 2. SEÇÃO INFERIOR: CARROSSEL INFINITO (Animação contínua da esquerda para a direita) */}
    <div className="space-y-4 w-full">
      <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">Galeria</h3>
      
      {/* Container Máscara que esconde as sobras nas laterais do site */}
       <div className="w-full overflow-hidden border-y border-slate-900/40 py-2 bg-slate-900/10">
  
        {/* 🌟 CONTAINER COM A NOVA CLASSE DE LOOP PERFEITO */}
        <div className="esteira-infinita gap-4">
    
         {/* 📸 BLOCO A (Lista Original) */}
       {[
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com"
        ].map((url, index) => (
       <div key={`bloco-a-${index}`} className="w-40 h-28 bg-slate-800 rounded-md overflow-hidden shadow-inner">
        <img src={url} alt={`Preview A ${index}`} className="w-full h-full object-cover" />
      </div>
    ))}

         {/* 📸 BLOCO B (Cópia Idêntica - Fica colada logo após a última imagem do Bloco A) */}
       {[
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com"
       ].map((url, index) => (
      <div key={`bloco-b-${index}`} className="w-40 h-28 bg-slate-800 rounded-md overflow-hidden shadow-inner">
        <img src={url} alt={`Preview B ${index}`} className="w-full h-full object-cover" />
      </div>
       ))}

      </div>
     </div>
    </div>

  </div>
)}



        {/* SUBSEÇÃO: PERFIS */} 
        {secaoAtiva === 'perfis' && ( 
    <div key="perfis" className="space-y-12 w-full">
       {/* Cabeçalho */}
     <div className="space-y-2 cabecalho-fade-in">  
        <p className="text-3xl font-bold text-white border-b border-slate-850 pb-4">Perfis</p> 
        <p className="text-slate-400">Entre em contato ou acompanhe meus trabalhos nas redes sociais.</p> 
       </div> 

      {/* GRID HORIZONTAL: Força 4 colunas deitadas no celular (grid-cols-4) com círculos menores */}
      <div className="grid grid-cols-4 gap-6 sm:gap-6 justify-center items-start w-full max-w-full px-1">

       {/* Grid dos Ícones de Redes Sociais  
      <div className="flex flex-row justify-center items-center gap-11 sm:gap-22 pt-22 w-full flex-wrap"> */}
      
      {/* CARD 1: INSTAGRAM */} 
      <a 
        href="https://www.instagram.com/prod.lisa_bispo/?__pwa=1" 
        fallback-href="https://www.instagram.com/prod.lisa_bispo/?__pwa=1" 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={(e) => { 
          e.preventDefault(); 
          const appUrl = e.currentTarget.getAttribute('href'); 
          const webUrl = e.currentTarget.getAttribute('fallback-href'); 
          window.location.href = appUrl; 
          setTimeout(() => { window.open(webUrl, '_blank'); }, 500); 
        }} 
         className="flex flex-col items-center group text-center animar-icone animate-delay-0" 
      > 
        
        <div className="w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-linear-to-tr from-yellow-500 via-red-500 to-purple-600 p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300"> 
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden"> 
            <img src="https://s.magecdn.com/social/tc-instagram.svg" alt="Instagram" className="w-20 h-20 object-contain" /> 
          </div> 
        </div> 
        <span className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">@prod.lisa_bispo</span> 
      </a> 


      {/* CARD 2: TIKTOK */} 
      <a 
       href="snssdk1128://user/profile/SEU_ID_NUMERICO" 
      fallback-href="https://tiktok.com" 
      target="_blank" 
      rel="noopener noreferrer" 
     onClick={(e) => { 
       e.preventDefault(); 
       const appUrl = e.currentTarget.getAttribute('href'); 
       const webUrl = e.currentTarget.getAttribute('fallback-href'); 
       window.location.href = appUrl; 
       setTimeout(() => { window.open(webUrl, '_blank'); }, 500); 
     }}  
      className="flex flex-col items-center group text-center animar-icone animate-delay-150"
  > 
    <div className="w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-slate-800 p-0.5 border border-slate-700 shadow-lg group-hover:scale-110 group-hover:border-cyan-400 transition-transform duration-300"> 
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden"> 
        <img src="https://s.magecdn.com/social/tc-tiktok.svg" alt="TikTok" className="w-20 h-20 object-contain invert" /> 
      </div> 
    </div> 
      <span className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">@seu_perfil</span> 
  </a> 

      {/* CARD 3: SPOTIFY */} 
      <a 
        href="https://open.spotify.com/intl-pt/artist/3iTMVqe25gPOQPZH28iZoR?si=b14TJfMwQ3295s4Vi4ooMQ" 
        fallback-href="https://open.spotify.com/intl-pt/artist/3iTMVqe25gPOQPZH28iZoR?si=b14TJfMwQ3295s4Vi4ooMQ" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => { 
          e.preventDefault(); 
          const appUrl = e.currentTarget.getAttribute('href'); 
          const webUrl = e.currentTarget.getAttribute('fallback-href'); 
          window.location.href = appUrl; 
          setTimeout(() => { window.open(webUrl, '_blank'); }, 500); 
        }} 
         className="flex flex-col items-center group text-center animar-icone animate-delay-300" 
 
      > 
        <div className="w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-slate-800 p-0.5 border border-slate-700 shadow-lg group-hover:scale-110 group-hover:border-blue-500 transition-transform duration-300"> 
          <div className="w-full h-full rounded-full bg-green-600 flex items-center justify-center overflow-hidden"> 
            <img src={iconeSpotify} alt="Spotify" className="w-80 h-80 object-contain"/>
          </div> 
        </div> 
        <span className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-green-400 transition-colors">ProdLisa</span> 
      </a> 

      {/* CARD 4: SOUNDCLOUD */} 
      <a 
        href="https://soundcloud.com/bispolisaoficial00" 
        fallback-href="https://soundcloud.com/bispolisaoficial00" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => { 
          e.preventDefault(); 
          const appUrl = e.currentTarget.getAttribute('href'); 
          const webUrl = e.currentTarget.getAttribute('fallback-href'); 
          window.location.href = appUrl; 
          setTimeout(() => { window.open(webUrl, '_blank'); }, 500); 
        }} 
        className="flex flex-col items-center group text-center animar-icone animate-delay-450" 
      > 
        <div className="w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-slate-800 p-0.5 border border-slate-700 shadow-lg group-hover:scale-110 group-hover:border-blue-500 transition-transform duration-300"> 
          <div className="w-full h-full rounded-full bg-orange-600 flex items-center justify-center overflow-hidden"> 
            <img src={iconeSoundcloud} alt="SoundCloud" className="w-20 h-20  object-contain"/>
          </div> 
        </div> 
        <span className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-orange-400 transition-colors">Dj Lisa</span> 
      </a> 

      {/* CARD 5: YOUTUBE */} 
      <a 
        href="https://www.youtube.com/@LisaBispo-p8z3l"
        fallback-href="https://www.youtube.com/@LisaBispo-p8z3l" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => { 
          e.preventDefault(); 
          const appUrl = e.currentTarget.getAttribute('href'); 
          const webUrl = e.currentTarget.getAttribute('fallback-href'); 
          window.location.href = appUrl; 
          setTimeout(() => { window.open(webUrl, '_blank'); }, 500); 
        }} 
        className="col-start-2 flex flex-col items-center group text-center animar-icone animate-delay-600" 
      > 
        <div className="w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-slate-800 p-0.5 border border-slate-700 shadow-lg group-hover:scale-110 group-hover:border-blue-500 transition-transform duration-300"> 
          <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center overflow-hidden"> 
            <img src={iconeYouTube} alt="YouTube" className="w-20 h-20 object-contain" /> 
          </div> 
        </div> 
        <span className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-red-400 transition-colors">ProdLisa_Bispo</span> 
      </a> 

      {/* CARD 6: WHATSAPP */}            
     <a 
        href="https://wa.me/5511959367015"
        fallback-href="https://wa.me/5511959367015" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => { 
          e.preventDefault(); 
          const appUrl = e.currentTarget.getAttribute('href'); 
          const webUrl = e.currentTarget.getAttribute('fallback-href'); 
          window.location.href = appUrl; 
          setTimeout(() => { window.open(webUrl, '_blank'); }, 500); 
        }} 
        className="flex flex-col items-center group text-center animar-icone animate-delay-750 pointer-events-none opacity-00" 
      > 
        <div className="w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-emerald-500 p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300 "> 
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden"> 
            <img src={iconeWhatsapp} alt="WhatsApp" className="w-30 h-30 object-contain " /> 
          </div> 
        </div> 
        <span className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">Contato</span> 
      </a>
        </div> 
       </div>
      )}
      </main>


      {/* 🍪 BANNER DE COOKIES (Fixo na parte inferior e independente das subseções) */}
      {!aceitouCookies && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-slate-950/95 border-t border-slate-800 p-4 backdrop-blur-md shadow-2xl">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="text-xs text-slate-400 text-center sm:text-left">
              <p className="font-semibold text-slate-200 mb-1">📋 Aviso de Privacidade e Cookies</p>
              Este site utiliza cookies de sessão e preferências para garantir a melhor experiência de navegação e reprodução de mídia em HD. Ao continuar, você concorda com nossos <span className="underline cursor-pointer text-slate-300">termos de uso</span>.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button 
                onClick={() => {
                  setAceitouCookies(true);
                  console.log("Mídia liberada!");
                }}
                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-md transition-all shadow-lg cursor-pointer"
              >
                Aceitar Todos
              </button>
              
              <button 
                onClick={() => setAceitouCookies(true)}
                className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-md transition-all cursor-pointer"
              >
                Configurar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

      