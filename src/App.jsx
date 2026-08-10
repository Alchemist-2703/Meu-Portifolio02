import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Importações dos seus arquivos locais de imagem:
import iconeSemblante from './assets/semblante.jpg'



export default function App() {
  // Estado local para esconder o banner assim que ele clicar
const [aceitouCookies, setAceitouCookies] = useState(false);

  // Estado para controlar qual subseção está ativa ("inicio", "producoes", "catalogo", "sets", "perfis")
  const [secaoAtiva, setSecaoAtiva] = useState('inicio')

  // Estados para controlar a abertura das gavetas de "Disponíveis" e "Usados"
  const [gavetaDisponiveis, setGavetaDisponiveis] = useState(false);
  const [gavetaUsados, setGavetaUsados] = useState(false);


  // Lista de opções do menu para evitar repetição de código
  const menuOptions = [
    { id: 'producoes', label: 'Produções' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'sets', label: 'Sets' },
    { id: 'perfis', label: 'Perfis' }
  ]

  //Ação para controlar a mídia ativa e o beat atual
  const [midiaAtiva, setMidiaAtiva] = useState(null); // 'video' | 'beat' | null
  const [beatAtual, setBeatAtual] = useState(null);
  const iframeYoutubeRef = useRef(null);
  const audioBeatRef = useRef(null);

  // Função para controlar a pausa do YouTube via postMessage
  const pausarYoutube = () => {
  if (iframeYoutubeRef.current) {
    iframeYoutubeRef.current.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      '*');}};
  const tocarYoutube = () => {
  if (iframeYoutubeRef.current) {
    iframeYoutubeRef.current.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      '*');}};

  // Função para dar play em um Beat do catálogo
  const darPlayNoBeat = (beat) => {
  // 1. Se o vídeo do YouTube estiver rodando, pausa ele
  pausarYoutube();

  // 2. Toca o beat
  if (audioBeatRef.current) {
    if (beatAtual?.id === beat.id && midiaAtiva === 'beat') {
      // Se clicar no mesmo beat que está tocando, pausa
      audioBeatRef.current.pause();
      setMidiaAtiva(null);
    } else {
      setBeatAtual(beat);
      audioBeatRef.current.src = beat.audio;
      audioBeatRef.current.play();
      setMidiaAtiva('beat');
    }
  }
};

  // Função acionada quando o usuário clica para dar play no vídeo
  const darPlayNoVideo = () => {
  // Se tiver um beat tocando, pausa o beat
  if (audioBeatRef.current) {
    audioBeatRef.current.pause();
  }
  tocarYoutube();
  setMidiaAtiva('video');
};    

const iconeSpotify = "https://ueteknuignkvidrbyynx.supabase.co/storage/v1/object/public/midia-portifolio/spotify-icon.jpg";
const iconeWhatsapp = "https://ueteknuignkvidrbyynx.supabase.co/storage/v1/object/public/midia-portifolio/whatsapp.png";
const iconeSoundcloud = "https://ueteknuignkvidrbyynx.supabase.co/storage/v1/object/public/midia-portifolio/soundcloud-logo.png";
const iconeYouTube = "https://ueteknuignkvidrbyynx.supabase.co/storage/v1/object/public/midia-portifolio/youutube-logo.avif";


  return (
    // ADAPTADO: Substituído o fundo sólido 'bg-black' pelo gradiente profundo e animado da Opala
    <div className="h-screen bg-black text-slate-100 font-['Times_New_Roman'] selection:bg-opal-flash-cyan selection:text-slate-950 relative overflow-y-auto overflow-x-hidden ">


      {/* CAMADA DO VÍDEO DE FUNDO */}
  <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-black">
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      preload="auto"
      preload="metadata"
      className="w-full h-full object-cover scale-[1.15] origin-top opacity-100 filter contrast-125 satured-110"
    >
      <source src="https://ueteknuignkvidrbyynx.supabase.co/storage/v1/object/public/midia-portifolio/Site-Fundo.mp4"
       type="video/mp4" />
    </video>

    {/* Opcional: Filtro escuro para garantir que o texto continue legível */}
    <div className="absolute inset-0 bg-black/20 backdrop-blur-none" />
  </div>



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
                  ? 'bg-cyan-950/60 backdrop-blur-md border border-white-300 text-white-400 hover:text-cyan-400 font-bold shadow-[0_0_20px_rgba(6,182,212,0.25)]'
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
        <main className="relative z-10 pt-24 md:pt-28 pb-36 px-4 md:px-6 max-w-7xl mx-auto w-full flex flex-col">
         {/* Verifique se esta tag existe antes do fim do arquivo */}

        {/* SUBSEÇÃO: MENU PRINCIPAL / INÍCIO */}
        {secaoAtiva === 'inicio' && (
        <motion.div 
      key="tela-inicio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center max-w-3xl mx-auto space-y-8 leading-[0.85]"
        >
        <div className="space-y-4">   
          {/* 1. LISA */}
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
            animate={{ 
            opacity: [0, 1, 0.9, 1],
            y: 0,
            filter: [
            'blur(0px) drop-shadow(0 0 2px #ffffff) drop-shadow(0 0 6px rgba(249, 248, 250, 0.95)) drop-shadow(0 0 30px rgba(146, 142, 179, 0.95))',
            'blur(0px) drop-shadow(0 0 8px #ffffff) drop-shadow(0 0 6px rgba(249, 248, 250, 0.95)) drop-shadow(0 0 30px rgba(146, 142, 179, 0.95))',
            'blur(0px) drop-shadow(0 0 2px #ffffff) drop-shadow(0 0 6px rgba(249, 248, 250, 0.95)) drop-shadow(0 0 30px rgba(146, 142, 179, 0.95))'
            ]
          }}
            transition={{
            opacity: { duration: 3.5, ease: [0.25, 1, 0.5, 1] },
            y: { duration: 3.5, ease: [0.25, 1, 0.5, 1] },
            filter: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
            className="bg-gradient-to-r from-[#122c72] via-[#1f6492] to-[#2305cc] bg-[length:200%_auto] bg-clip-text text-transparent text-5xl md:text-7xl font-extrabold tracking-[0.18em] uppercase leading-none -mb-2 md:-mb-3 z-10 block"
          >
          Lisa
        </motion.h1>

      {/* 2. O ALQUIMISTA */}
      <motion.h2
        initial={{ opacity: 0, y: 18, filter: 'blur(12px)', backgroundPosition: '0% 50%' }}
        animate={{ 
          opacity: [0, 1, 0.9, 1],
          y: 0,
          backgroundPosition: ['0% 50%', '-200% 50%'],
          filter: [
            'blur(0px) drop-shadow(0 0 2px #feffff) drop-shadow(0 0 6px rgba(174, 169, 179, 0.95)) drop-shadow(0 0 10px rgba(51, 19, 192, 0.7))',
            'blur(0px) drop-shadow(0 0 8px #5bd1d1) drop-shadow(0 0 6px rgba(249, 248, 250, 0.95)) drop-shadow(0 0 15px rgba(37, 29, 114, 0.95))',
            'blur(0px) drop-shadow(0 0 2px #feffff) drop-shadow(0 0 6px rgba(174, 169, 179, 0.95)) drop-shadow(0 0 10px rgba(51, 19, 192, 0.7))'
          ]
        }}
        transition={{
          opacity: { duration: 3.5, delay: 0.8, ease: [0.25, 1, 0.5, 1] },
          y: { duration: 3.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
          backgroundPosition: { duration: 10, repeat: Infinity, ease: 'linear' },
          filter: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
        }}
        className="bg-gradient-to-r from-[#317a73] via-[#2049b9] via-[#230e6d] via-[#1c03a7] to-[#25706a] bg-[length:200%_auto] bg-clip-text text-transparent text-3xl md:text-7xl font-extrabold tracking-[0.12em] uppercase leading-none z-20 block"
      >
        o alquimista
      </motion.h2>

      {/* 3. FRASE CHAMADA (Corrigido: Totalmente Nítido e Legível) */}
      <motion.h3
        initial={{ opacity: 0, y: 14 }} // Sem desfoque inicial para não embaçar a fonte
        animate={{ 
          opacity: 1,
          y: 0,
          textShadow: [
            '0 0 4px rgba(255, 255, 255, 0.6), 0 0 10px rgba(169, 255, 247, 0.2)',
            '0 0 8px rgba(255, 255, 255, 0.9), 0 0 20px rgba(169, 255, 247, 0.5)',
            '0 0 4px rgba(255, 255, 255, 0.6), 0 0 10px rgba(169, 255, 247, 0.2)'
          ]
        }}
        transition={{
          opacity: { duration: 2.8, delay: 0.4, ease: 'easeOut' },
          y: { duration: 2.8, delay: 0.4, ease: 'easeOut' },
          textShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="text-slate-100 text-lg md:text-xl font-medium tracking-wide drop-shadow-md"
      >
        Quer me conhecer melhor e conhecer meus trabalhos?
      </motion.h3>
    </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {menuOptions.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSecaoAtiva(item.id)}
                  className="animar-botao-home p-6 bg-white/0.5 border border-white/2 backdrop-blur-sm rounded-lg text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.5)] lg:hover:border-white/20 transition-all duration-300 group active:scale-[0.98] w-full block cursor-pointer relative overflow-hidden"
                  style={{ animationDelay: `${500 + index * 200}ms` }}>
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
                ref={iframeYoutubeRef}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/qHShURxB1vk?enablejsapi=1${aceitouCookies ? '&autoplay=1&mute=1' : ''}`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                {aceitouCookies ? "▶ Reproduzindo automaticamente." : "💡 Clique em 'Aceitar Todos' no rodapé para iniciar a reprodução automática."}
              </p>
            </div>

          </motion.div>
  )}
        

        {/* SUBSEÇÃO: PRODUÇÕES */} 
        {secaoAtiva === 'producoes' && ( 
      <div key="perfis" className="space-y-12 w-full">

            {/* Cabeçalho */}
        <div className="space-y-2 cabecalho-fade-in"> 
           <p className="text-3xl font-bold text-white border-b border-slate-850 pb-4">Produções</p> 
           <p className="text-slate-250 text-sm md:text-base"
           style={{ 
              animationDelay: '800ms',
              animationDuration: '1.5s',
              textShadow: '1px 1px 8px rgba(0, 0, 0, 0.95), -1px -1px 8px rgba(0, 0, 0, 0.95)'}}
            > Algumas de minhas produções.</p> 
        </div>

      {/* CONTAINER DO CARROSSEL - Alterar "gap-6" muda o espaçamento entre os cards */}
      <div className="flex flex-row gap-6 overflow-x-auto pb-6 pt-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent w-full snap-x snap-mandatory animate-[slideLeft_1.5s_ease-out]"> 
      
       {/* 🌟 LISTA DE MÚSICAS PERSONALIZADA (ARRAY DE OBJETOS) 
          Altere os textos, links das capas e links das plataformas diretamente aqui abaixo:
      */}
      {[
        {
          id: 1,
          titulo: "Perigo",
          tipo: "Track da Sul - ProdLisa",
          capa: "https://ueteknuignkvidrbyynx.supabase.co/storage/v1/object/public/midia-portifolio/capa-perigo.avif",
          linkSpotify: "https://open.spotify.com/intl-pt/track/46endSHadmGaO2wuK6Sx3A?si=3a6bf8bb59344c33",
          linkYoutube: "https://www.youtube.com/watch?v=2LYxT4AiRcg&list=RD2LYxT4AiRcg&start_radio=1"
        },
        {
          id: 2,
          titulo: "Batalhão x Pocoto",
          tipo: "ProdLisa",
          capa: "https://ueteknuignkvidrbyynx.supabase.co/storage/v1/object/public/midia-portifolio/batalhao.avif",
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
              <img src={iconeSpotify} alt="Spotify" className="w-full h-full0 object-contain rounded-full"/>
            </a> 

            {/* LINK YOUTUBE */}
            <a href={musica.linkYoutube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 hover:border-red-500 hover:scale-110 transition-all cursor-pointer" 
             fallback-href="https://www.youtube.com/watch?v=2LYxT4AiRcg&list=RD2LYxT4AiRcg&start_radio=1">
              <img src={iconeYouTube} alt="YouTube" className="w-full h-full object-contain rounded-full"/>
            </a> 


          </div> 
        </div> 
      ))} 

      </div> 
     </div> 
 )}



       {/* SUBSEÇÃO: CATÁLOGO */}
      
  <div className={secaoAtiva === 'catalogo' ?"space-y-6 cabecalho-fade-in" : "hidden"}>
    {/* Cabeçalho */}
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-white border-b border-slate-850 pb-4">Catálogo de Beats</h2>
      <p className="text-slate-250 text-sm md:text-base"
           style={{ 
              animationDelay: '800ms',
              animationDuration: '1.5s',
              textShadow: '1px 1px 8px rgba(0, 0, 0, 0.95), -1px -1px 8px rgba(0, 0, 0, 0.95)'}}
            > Ouça os Beats e garanta a sua produção exclusiva.</p>
    </div>

    

    {/* LAYOUT EM DUAS COLUNAS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      
      {/* ==================== COLUNA 1: BEATS DISPONÍVEIS ==================== */}
      <div className="space-y-4">
        <button 
          onClick={() => setGavetaDisponiveis(!gavetaDisponiveis)}
          className="w-full flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00ffff]"></span>
            <span className="text-xl font-bold text-cyan-400 tracking-wide">Beats Disponíveis</span>
          </div>
          <span className={`text-cyan-400 font-mono transition-transform duration-300 text-lg ${gavetaDisponiveis ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {gavetaDisponiveis && (
          <div className="space-y-4 pt-1">
            {[
              { id: "disp-1", nome: "BEAT ARAMAICO", arquivo: "beats/disponiveis/BEAT ARAMAICO 13(MIX).mp3" },
              { id: "disp-2", nome: "NONAME", arquivo: "beats/disponiveis/NONAME.mp3" },
              { id: "disp-3", nome: "MINI GAME", arquivo: "beats/disponiveis/mini_game.mp3" },
              { id: "disp-4", nome: "RIDDIM GENERICO", arquivo: "beats/disponiveis/BEAT DONY.mp3" },
              { id: "disp-5", nome: "NOISE LOVE", arquivo:  "beats/disponiveis/noise love.mp3" },
              { id: "disp-6", nome: "SOCA SOCA", arquivo: "beats/disponiveis/soca soca02.mp3" },
              { id: "disp-7", nome: "INDUARIANO", arquivo: "beats/disponiveis/INDUARIANO.mp3" },
              { id: "disp-8", nome: "FUNKHALL DO ASSOBIO", arquivo: "beats/disponiveis/FUNKHALL DO ASSOBIO.mp3" },
              { id: "disp-9", nome: "SYNTHALL", arquivo: "beats/disponiveis/SYNTHALL RIDDIM.mp3" },
              { id: "disp-10", nome: "DADADADA", arquivo: "beats/disponiveis/Project_SLUCKSS-02.mp3" },
              
            ].map((beat, index) => (   
              <div key={beat.id}      
              className="animar-catalogo p-6 border border-white/10 bg-slate-900/60 p-2 backdrop-blur-sm rounded-xl space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.5)] lg:hover:border-white/20 transition-all duration-300 group active:scale-[0.98] w-full block cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}>
                <div className="font-semibold text-white tracking-wide text-base lg:group-hover:text-cyan-400 transition-colors">{beat.nome}</div>
                
                {/* LINHA DO TEMPO INTERATIVA */}
                <div onClick={(e) => {
                  const audio = document.getElementById('global-audio-player');
                  if (audio && audio.dataset.beatId === beat.id && audio.duration) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const cliqueX = e.clientX - rect.left;
                    audio.currentTime = (cliqueX / rect.width) * audio.duration;
                  }
                }} className="w-full h-1.5 bg-slate-600 rounded-full cursor-pointer relative flex items-center group">
                  <div id={`barra-${beat.id}`} className="h-full bg-cyan-500 w-0 rounded-full transition-all duration-75 pointer-events-none"></div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span id={`tempo-${beat.id}`} className="text-xs text-white-500 font-mono">0:00 / 0:00</span>
                  <div className="flex gap-2">
                    <button id={`btn-${beat.id}`} onClick={() => {
                      darPlayNoBeat(beat);
                      const audio = document.getElementById('global-audio-player');
                      const btn = document.getElementById(`btn-${beat.id}`);
                      if (audio.dataset.beatId === beat.id && !audio.paused) { audio.pause(); btn.innerText = "▶ Play"; }
                      else if (audio.dataset.beatId === beat.id && audio.paused) { audio.play().catch(err => console.log(err)); btn.innerText = "⏸ Pause"; }
                      else {
                        if (audio.dataset.beatId) {
                          const oldBtn = document.getElementById(`btn-${audio.dataset.beatId}`); if (oldBtn) oldBtn.innerText = "▶ Play";
                          const oldBarra = document.getElementById(`barra-${audio.dataset.beatId}`); if (oldBarra) oldBarra.style.width = '0%';
                        }
                        audio.src = beat.arquivo; audio.dataset.beatId = beat.id; audio.load(); audio.play().catch(err => console.log(err)); btn.innerText = "⏸ Pause";
                      }
                    }} className="px-3 py-1 text-xs font-semibold bg-slate-800/20 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer">▶ Play</button>
                    <a href={`https://wa.me/5511959367015?text=Olá, tenho interesse no beat "${encodeURIComponent(beat.nome)}"`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs font-bold bg-slate-800/20 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer flex items-center">Tenho Interesse</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== COLUNA 2: BEATS EM USO / VENDIDOS ==================== */}
      <div className="space-y-4">
        <button 
          onClick={() => setGavetaUsados(!gavetaUsados)}
          className="w-full flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 backdrop-blur-md cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="text-xl font-bold text-slate-300 tracking-wide">Beats em Uso / Vendidos</span>
          </div>
          <span className={`text-slate-500 font-mono transition-transform duration-300 text-lg ${gavetaUsados ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {gavetaUsados && (
          <div className="space-y-4 pt-1">
            {[
              { id: "uso-1", nome: "Beat BamBamBila - Dubplate NBDG", arquivo: "beats/em-uso/bam bam bila-2.mp3" },
              { id: "uso-2", nome: "Beat ZazaStyle - Reservado", arquivo: "beats/em-uso/Project_zazaxstye.mp3" },
              { id: "uso-3", nome: "Beat KAMASUTRA - STP", arquivo: "beats/em-uso/kamasutra.mp3" },
              { id: "uso-4", nome: "Beat PANTERA - STP", arquivo: "beats/em-uso/PANTERA.mp3" },
              { id: "uso-5", nome: "Beat AVANÇADO - Reservado", arquivo: "beats/em-uso/Project_51.mp3" },
              { id: "uso-6", nome: "Beat SET NBDG - Reservado", arquivo: "beats/em-uso/Project_SETNBDG.mp3" },
              { id: "uso-7", nome: "Beat PERIGO - TRACK DA SUL", arquivo: "beats/em-uso/os kchorrao_00.mp3" },
              { id: "uso-8", nome: "Beat ESPECIALISTA - SDP", arquivo: "beats/em-uso/provocando.mp3" },
              { id: "uso-9", nome: "Beat 80/2YK - SDP", arquivo: "beats/em-uso/Project_provocado.mp3" },
              { id: "uso-10", nome: "FUNKHALL ASSOBOLHA - Reservado", arquivo: "beats/em-uso/dubplatewe01.mp3" },
              { id: "uso-11", nome: "Beat DUDUDUM - Reservado", arquivo: "beats/em-uso/DUDUDUM.mp3" },
              { id: "uso-12", nome: "Beat BRINCADEIRA - Reservado", arquivo: "beats/em-uso/SARRA NO POPOZAO.mp3" },
              { id: "uso-13", nome: "Beat MELODICO - Reservado", arquivo: "beats/em-uso/riddim tandy 00.mp3" },
              { id: "uso-14", nome: "Beat B X P - Reservado", arquivo: "beats/em-uso/riddim batalhao x pocoto.mp3" },


            ].map((beat, index) => (
              <div key={beat.id} 
                className="animar-catalogo p-6 border border-white/10 bg-white/20 p-2 backdrop-blur-md rounded-xl space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.5)] lg:hover:border-white/20 transition-all duration-300 group active:scale-[0.98] w-full block cursor-pointer relative overflow-hidden" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="font-semibold text-white-300 tracking-wide text-base line-through">{beat.nome}</div>
                
                
                <div onClick={(e) => {
                  const audio = document.getElementById('global-audio-player');
                  if (audio && audio.dataset.beatId === beat.id && audio.duration) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
                  }
                }} className="w-full h-1.5 bg-slate-600 rounded-full cursor-pointer relative flex items-center group">
                  <div id={`barra-${beat.id}`} className="h-full bg-slate-500 w-0 rounded-full transition-all duration-75 pointer-events-none"></div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span id={`tempo-${beat.id}`} className="text-xs text-white-300 font-mono">0:00 / 0:00</span>
                  <button id={`btn-${beat.id}`} onClick={() => {
                    darPlayNoBeat(beat);
                    const audio = document.getElementById('global-audio-player');
                    const btn = document.getElementById(`btn-${beat.id}`);
                    if (audio.dataset.beatId === beat.id && !audio.paused) { audio.pause(); btn.innerText = "▶ Play"; }
                    else if (audio.dataset.beatId === beat.id && audio.paused) { audio.play().catch(err => console.log(err)); btn.innerText = "⏸ Pause"; }
                    else {
                      if (audio.dataset.beatId) {
                        const oldBtn = document.getElementById(`btn-${audio.dataset.beatId}`); if (oldBtn) oldBtn.innerText = "▶ Play";
                        const oldBarra = document.getElementById(`barra-${audio.dataset.beatId}`); if (oldBarra) oldBarra.style.width = '0%';
                      }
                      audio.src = beat.arquivo; audio.dataset.beatId = beat.id; audio.load(); audio.play().catch(err => console.log(err)); btn.innerText = "⏸ Pause";
                    }
                  }} className="px-3 py-1 text-xs font-semibold bg-slate-800/20 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer">▶ Play</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>




        {/* SUBSEÇÃO: SETS */}
        {secaoAtiva === 'sets' && (
    <div key="sets" className="space-y-2 w-full ">
    {/* 1. SEÇÃO SUPERIOR: CARDS DOS SETS (Animação de cima para baixo) */}
    <div className="space-y-2 cabecalho-fade-in">
      <p  className="text-3xl font-bold text-white border-b border-slate-850 pb-4">Sets</p>
        <p className="text-slate-250 text-sm md:text-base"
           style={{ 
              animationDelay: '800ms',
              animationDuration: '1.5s',
              textShadow: '1px 1px 8px rgba(0, 0, 0, 0.95), -1px -1px 8px rgba(0, 0, 0, 0.95)'}}>
              Sets Gravados e Galeria Fotográfica para Portfólio.</p>
      </div>

      {/* Grid de Cards Menores (Altere o "gap-4" para mudar o espaçamento entre eles) */}
    <div className="space-y-6 animate-[slideLeft_1.5s_ease-out]">
      <div className="flex flex-row gap-16 overflow-x-auto pb-4 scrollbar-none w-full snap-x snap-mandatory">
        
        {/* LISTA DE CARDS DE SETS */}
      {[
      {
         id: 1,
         titulo: "SET DJ LISA {001}",
         subtitulo: "Set de Dancehall",
         capa: '/capas/capa-djset.jpg',
        linkPlataforma: "https://soundcloud.com/bispolisaoficial00/set-dj-lisa-001?si=3a7a1542cc2246c8be3d8111c529560d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        iconePlataforma: iconeSoundcloud // Ou use uma URL direta do ícone em formato PNG
      },
      {
        id: 2,
        titulo: "Studio Sessions",
        subtitulo: "Sessão Minimalista",
        capa: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop", 
        linkPlataforma: "https://instagram.com",
        iconePlataforma: iconeSoundcloud
      }
    ].map((set) => (
  
      <div key={set.id} className="w-48 flex-shrink-0 bg-transparent p-0 snap-start">
    
      {/* CAPA DO SET */}
      <div className="w-full aspect-square bg-slate-800 rounded-lg overflow-hidden mb-3 shadow-md border border-slate-800/40">
        <img 
          src={set.capa} 
          alt={set.titulo} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
      </div>

      {/* TÍTULO E SUBTÍTULO */}
      <div className="text-center px-1">
        <h3 className="font-bold text-base text-white truncate" title={set.titulo}>{set.titulo}</h3>
        <p className="text-[10px] text-slate-350 truncate mb-3">{set.subtitulo}</p>
      </div>

      {/* BOTAO E ÍCONE DE LINK */}
      <div className="flex justify-center items-center">
        <a 
          href={set.linkPlataforma} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 hover:border-cyan-400 hover:scale-110 transition-all cursor-pointer">
          <img src={set.iconePlataforma} alt="Link" className="w-full h-full object-contain rounded-full" />
         </a>
      </div>

      </div>
    ))}
      </div>
    </div>

    {/* 2. SEÇÃO INFERIOR: CARROSSEL INFINITO (Animação contínua da esquerda para a direita) */}
    <div className="animar-catalogo space-y-4 w-full">
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
        <p className="text-slate-250 text-sm md:text-base"
           style={{ 
              animationDelay: '800ms',
              animationDuration: '1.5s',
              textShadow: '1px 1px 8px rgba(0, 0, 0, 0.95), -1px -1px 8px rgba(0, 0, 0, 0.95)'}}
            >Me encontre e acompanhe meus trabalhos nas redes.</p> 
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
        }}                                                                                  //Quando quiser reativar o WhatsApp, basta remover "pointer-events-none opacity-00"
        className="flex flex-col items-center group text-center animar-icone animate-delay-750 pointer-events-none opacity-00" 
      > 
        <div className="w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-emerald-500 p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300 "> 
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden"> 
            <img src={iconeWhatsapp} alt="WhatsApp" className="w-full h-full object-contain rounded-full"/> 
          </div> 
        </div> 
        <span className="mt-3 text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">Contato</span> 
      </a>
        </div> 
       </div>
      )}
      </main>
        
      {/* Elemento de Áudio Global para os Beats */}
      

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
      <audio 
        id="global-audio-player" 
        className="hidden" 
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
        }}/>

    </div>
  );
}

      