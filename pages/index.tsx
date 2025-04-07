import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';
import shutdownStyles from './Shutdown.module.css';

export default function Home() {
  const [showCard, setShowCard] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showStartMenu, setShowStartMenu] = useState<boolean>(false);
  const [activeWindow, setActiveWindow] = useState<string>('card');
  const [minimized, setMinimized] = useState<{[key: string]: boolean}>({
    card: false,
    notepad: false,
    music: false,
    photo: false,
    cake: false
  });
  const [showNotepad, setShowNotepad] = useState<boolean>(false);
  const [showMusic, setShowMusic] = useState<boolean>(false);
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [showCake, setShowCake] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuttingDown, setIsShuttingDown] = useState<boolean>(false);
  const [showLoveMessage, setShowLoveMessage] = useState<boolean>(false);
  const [candleLit, setCandleLit] = useState<boolean>(true);
  const [showBlowAnimation, setShowBlowAnimation] = useState<boolean>(false);
  
  // Gallery slideshow state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('/gallery/video1.mp4');
  const [videoLoadAttempt, setVideoLoadAttempt] = useState<number>(0);
  
  // Catatan: Pastikan file video1.mp4 ada di folder public/gallery
  // Jika belum ada, silahkan tambahkan file tersebut ke folder:
  // D:\Bisnis akbar\PT. ISA TECHNOLOGY\HeyTML\retro90s-birthday-card\public\gallery\video1.mp4
  const galleryItems = [
    { type: 'image', src: '/gallery/gambar1.jpg', caption: 'Semoga', fallback: '🎈' },
    { type: 'image', src: '/gallery/gambar2.jpg', caption: 'Bahagia', fallback: '😊' },
    { type: 'image', src: '/gallery/gambar3.jpg', caption: 'Selalu', fallback: '🎁' },
    { type: 'video', src: '/gallery/video1.mp4', caption: 'Video Ucapan', fallback: '🎬' }
  ];
  
  // Audio player
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime2, setCurrentTime2] = useState<number>(0);
  const [volume, setVolume] = useState<number>(80);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Memastikan isVideo selalu konsisten dengan currentSlide
  useEffect(() => {
    setIsVideo(galleryItems[currentSlide].type === 'video');
    
    // Jika slide saat ini adalah video, atur fullscreen otomatis
    if (galleryItems[currentSlide].type === 'video') {
      // Berikan sedikit jeda untuk memastikan video dimuat
      setTimeout(() => {
        setIsVideoFullscreen(true);
      }, 500);
    } else {
      // Pastikan fullscreen dinonaktifkan jika bukan video
      setIsVideoFullscreen(false);
    }
  }, [currentSlide]);
  
  // Musik yang akan diputar
  const musicFile = "/audio/birthday-song.mp3";
  
  // Posisi default yang akan diupdate setelah component mount
  const [windowPosition, setWindowPosition] = useState<{[key: string]: {x: number, y: number}}>({
    card: {x: 100, y: 50},
    notepad: {x: 350, y: 250},
    music: {x: 150, y: 150},
    photo: {x: 250, y: 200},
    cake: {x: 200, y: 100}
  });
  
  const router = useRouter();
  
  // Pastikan bahwa router.query tidak null sebelum diakses
  const recipientName = typeof router.query.untuk === 'string' ? router.query.untuk : 'Kamu';
  const senderName = typeof router.query.dari === 'string' ? router.query.dari : 'Aku';
  const message = typeof router.query.pesan === 'string' 
    ? router.query.pesan 
    : 'Haiii, selamat ulang tahun yaa sayang! Hari ini aku pengen kamu ngerasain semua vibes positif dan keajaiban yang cuma bisa didapetin kalo kamu ada di dunia ini. Semoga segala keinginanmu tercapai, apalagi yang kocak-kocak dan gak biasa, karena kamu tuh unik banget! Aku selalu bersyukur bisa ngeliat kamu jadi versi terbaik dari dirimu, yang kadang-kadang lucu banget pas lagi baper, tapi juga selalu bikin aku tersenyum tanpa henti.\n\nMakasih udah jadi temen curhat, partner in crime, dan sumber inspirasi sehari-hari. Semoga tahun ini kamu makin kece, makin banyak momen bahagia, dan makin dicintai, karena kamu emang pantas dapetin semua itu. Jangan lupa, kita bakal terus jalan bareng, ngejar mimpi, dan ngelewatin segala drama hidup dengan tawa. Happy birthday, love!';
  const age = typeof router.query.umur === 'string' ? router.query.umur : '?';

  useEffect(() => {
    // Pastikan bahwa kode ini hanya dijalankan di browser
    if (typeof window !== 'undefined') {
      // Update waktu setiap detik untuk tampilan jam digital
      const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
      
      // Menghitung posisi tengah untuk windows
      const centerWindow = () => {
        const containerWidth = document.querySelector(`.${styles.container}`)?.clientWidth || 800;
        const containerHeight = document.querySelector(`.${styles.container}`)?.clientHeight || 600;
        
        // Posisi kartu ulang tahun di tengah
        const cardWidth = 600; // max-width dari kartu
        const cardHeight = containerHeight * 0.8; // height 80% dari container
        const cardX = Math.max(0, (containerWidth - cardWidth) / 2);
        const cardY = Math.max(0, (containerHeight - cardHeight) / 4);
        
        // Posisi music player di tengah
        const musicWidth = 320; // lebar music player
        const musicHeight = 250; // tinggi music player
        const musicX = Math.max(0, (containerWidth - musicWidth) / 2);
        const musicY = Math.max(0, (containerHeight - musicHeight) / 2);
        
        // Posisi cake di tengah
        const cakeWidth = 400; // lebar cake window
        const cakeHeight = 300; // tinggi cake window
        const cakeX = Math.max(0, (containerWidth - cakeWidth) / 2);
        const cakeY = Math.max(0, (containerHeight - cakeHeight) / 2);
        
        // Posisi gallery di tengah, pastikan tidak terlalu rendah
        const galleryWidth = 480; // lebar gallery
        const galleryHeight = 400; // tinggi gallery
        const galleryX = Math.max(0, (containerWidth - galleryWidth) / 2);
        const galleryY = Math.max(0, (containerHeight - galleryHeight) / 2 - 20); // Posisi sedikit ke atas
        
        setWindowPosition({
          card: {x: cardX, y: cardY},
          notepad: {x: cardX + 50, y: cardY + 50},
          music: {x: musicX, y: musicY},
          photo: {x: galleryX, y: galleryY},
          cake: {x: cakeX, y: cakeY}
        });
      };
      
      // Posisikan jendela di tengah saat pertama kali dimuat
      centerWindow();
      window.addEventListener('resize', centerWindow);
      
      // Tampilkan card setelah beberapa detik
      const showTimer = setTimeout(() => {
        setLoading(false);
        // Efek pengetikan, delay sebentar
        setTimeout(() => setShowCard(true), 500);
      }, 2000);
      
      return () => {
        clearInterval(timerID);
        clearTimeout(showTimer);
        window.removeEventListener('resize', centerWindow);
      };
    }
  }, []);

  // Format waktu untuk jam digital retro
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
    });
  };

  // Format tanggal retro
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Fungsi untuk slideshow gallery yang dioptimalkan
  const prevSlide = () => {
    // Jika dalam mode fullscreen, keluar terlebih dahulu
    if (isVideoFullscreen) {
      setIsVideoFullscreen(false);
      // Berikan sedikit jeda agar animasi transisi terlihat
      setTimeout(() => {
        const newSlide = currentSlide === 0 ? galleryItems.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
        setIsVideo(galleryItems[newSlide].type === 'video');
      }, 300);
    } else {
      const newSlide = currentSlide === 0 ? galleryItems.length - 1 : currentSlide - 1;
      setCurrentSlide(newSlide);
      setIsVideo(galleryItems[newSlide].type === 'video');
    }
  };

  const nextSlide = () => {
    // Jika dalam mode fullscreen, keluar terlebih dahulu
    if (isVideoFullscreen) {
      setIsVideoFullscreen(false);
      // Berikan sedikit jeda agar animasi transisi terlihat
      setTimeout(() => {
        const newSlide = currentSlide === galleryItems.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
        setIsVideo(galleryItems[newSlide].type === 'video');
      }, 300);
    } else {
      const newSlide = currentSlide === galleryItems.length - 1 ? 0 : currentSlide + 1;
      setCurrentSlide(newSlide);
      setIsVideo(galleryItems[newSlide].type === 'video');
    }
  };

  // Fungsi untuk menangani klik pada ikon
  const handleIconClick = (icon: string) => {
    if (icon === 'present') {
      // Buka kartu ucapan jika minimized atau belum ditampilkan
      setShowCard(true);
      setMinimized({...minimized, card: false});
      setActiveWindow('card');
      
      // Posisikan kartu di tengah layar jika di-klik dari ikon
      const containerWidth = document.querySelector(`.${styles.container}`)?.clientWidth || 800;
      const containerHeight = document.querySelector(`.${styles.container}`)?.clientHeight || 600;
      const cardWidth = 600; // max-width dari kartu
      const cardHeight = containerHeight * 0.8; // height 80% dari container
      const cardX = Math.max(0, (containerWidth - cardWidth) / 2);
      const cardY = Math.max(0, (containerHeight - cardHeight) / 4);
      
      setWindowPosition({
        ...windowPosition,
        card: {x: cardX, y: cardY}
      });
    } else if (icon === 'cake') {
      // Buka jendela kue ulang tahun
      setShowCake(true);
      setMinimized({...minimized, cake: false});
      setActiveWindow('cake');
      
      // Posisikan cake di tengah layar
      const containerWidth = document.querySelector(`.${styles.container}`)?.clientWidth || 800;
      const containerHeight = document.querySelector(`.${styles.container}`)?.clientHeight || 600;
      const cakeWidth = 400; // lebar cake window
      const cakeHeight = 300; // tinggi cake window
      const cakeX = Math.max(0, (containerWidth - cakeWidth) / 2);
      const cakeY = Math.max(0, (containerHeight - cakeHeight) / 2);
      
      setWindowPosition({
        ...windowPosition,
        cake: {x: cakeX, y: cakeY}
      });
    } else if (icon === 'music') {
      setShowMusic(true);
      setMinimized({...minimized, music: false});
      setActiveWindow('music');
      
      // Posisikan music player di tengah layar
      const containerWidth = document.querySelector(`.${styles.container}`)?.clientWidth || 800;
      const containerHeight = document.querySelector(`.${styles.container}`)?.clientHeight || 600;
      const musicWidth = 320; // lebar music player
      const musicHeight = 250; // tinggi music player
      const musicX = Math.max(0, (containerWidth - musicWidth) / 2);
      const musicY = Math.max(0, (containerHeight - musicHeight) / 2);
      
      setWindowPosition({
        ...windowPosition,
        music: {x: musicX, y: musicY}
      });
    } else if (icon === 'photo') {
      setShowPhoto(true);
      setMinimized({...minimized, photo: false});
      setActiveWindow('photo');
      setIsVideo(galleryItems[currentSlide].type === 'video');
      
      // Posisikan gallery di tengah layar
      const containerWidth = document.querySelector(`.${styles.container}`)?.clientWidth || 800;
      const containerHeight = document.querySelector(`.${styles.container}`)?.clientHeight || 600;
      const galleryWidth = 480; // lebar gallery
      const galleryHeight = 400; // tinggi gallery
      const galleryX = Math.max(0, (containerWidth - galleryWidth) / 2);
      const galleryY = Math.max(0, (containerHeight - galleryHeight) / 2 - 20); // Posisi sedikit ke atas
      
      setWindowPosition({
        ...windowPosition,
        photo: {x: galleryX, y: galleryY}
      });
      
      // Jika slide saat ini adalah video, coba muat ulang videonya
      if (galleryItems[currentSlide].type === 'video') {
        // Berikan jeda sebentar untuk memastikan DOM telah diperbarui
        setTimeout(() => {
          const videoElement = document.querySelector(`.${styles.slideVideo}`) as HTMLVideoElement;
          if (videoElement) {
            videoElement.load();
            console.log("Video dimuat ulang saat gallery dibuka");
          }
        }, 500);
      }
    }
  };

  // Fungsi untuk menangani tiup lilin
  const handleBlowCandle = () => {
    setShowBlowAnimation(true);
    
    // Setelah 1 detik, matikan lilin
    setTimeout(() => {
      setCandleLit(false);
      setShowBlowAnimation(false);
    }, 1000);
  };

  // Fungsi untuk menghidupkan kembali lilin
  const handleRelightCandle = () => {
    setCandleLit(true);
  };

  // Fungsi untuk menangani minimize, maximize, dan close
  const handleWindowControl = (action: string, window: string) => {
    if (action === 'minimize') {
      setMinimized({...minimized, [window]: true});
    } else if (action === 'close') {
      if (window === 'card') {
        setShowCard(false);
        // Tidak perlu menampilkan ulang kartu secara otomatis
      } else if (window === 'notepad') {
        setShowNotepad(false);
      } else if (window === 'music') {
        setShowMusic(false);
        setIsPlaying(false);
      } else if (window === 'photo') {
        setShowPhoto(false);
      } else if (window === 'cake') {
        setShowCake(false);
      }
    } else if (action === 'maximize') {
      // Tidak ada tindakan khusus untuk maximize dalam contoh sederhana ini
    }
  };

  // Fungsi untuk menangani klik pada program di taskbar
  const handleProgramClick = (program: string) => {
    if (program === 'party') {
      // Aktifkan mode pesta (bisa menambahkan konfeti atau animasi lain)
      document.body.classList.toggle('party-mode');
    } else if (program === 'cake') {
      // Toggle minimized state untuk kartu ulang tahun
      setMinimized({...minimized, card: !minimized.card});
      if (minimized.card) {
        setActiveWindow('card');
      }
    }
  };

  // Fungsi untuk menangani klik pada Start button
  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  // Fungsi untuk menangani permulaan drag
  const startDrag = (e: React.MouseEvent, window: string) => {
    e.preventDefault();
    
    setActiveWindow(window);
    
    const initialX = e.clientX;
    const initialY = e.clientY;
    const startX = windowPosition[window].x;
    const startY = windowPosition[window].y;
    
    // Dapatkan batas container
    const container = document.querySelector(`.${styles.desktop}`);
    const containerWidth = container?.clientWidth || 800;
    const containerHeight = container?.clientHeight || 600;
    
    // Perkiraan lebar dan tinggi window
    const windowWidth = window === 'card' ? 600 : 
                        window === 'notepad' ? 400 : 
                        window === 'music' ? 320 :
                        window === 'photo' ? 450 : 350;
    const windowHeight = window === 'card' ? containerHeight * 0.8 : 
                         window === 'notepad' ? 350 : 
                         window === 'music' ? 200 : 
                         window === 'photo' ? 350 : 300;
    
    const onMouseMove = (e: MouseEvent) => {
      // Batasi supaya window tidak keluar area
      const newX = Math.max(0, Math.min(containerWidth - windowWidth/2, startX + (e.clientX - initialX)));
      const newY = Math.max(0, Math.min(containerHeight - 100, startY + (e.clientY - initialY)));
      
      setWindowPosition({
        ...windowPosition,
        [window]: { x: newX, y: newY }
      });
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Fungsi untuk menangani play/pause musik
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.log("Pengguna harus berinteraksi dengan halaman terlebih dahulu untuk memainkan audio", e);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Fungsi untuk mengatur volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  // Fungsi untuk memperbarui progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime2(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };
  
  // Effect untuk mengatur volume saat komponen dimuat
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, showMusic]);
  
  // Effect untuk menangani akhir lagu
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []); // Re-run effect when component mounts

  // Fungsi untuk menangani shutdown
  const handleShutdown = () => {
    // Hentikan musik saat shutdown
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    
    setShowStartMenu(false);
    setIsShuttingDown(true);
    
    // Setelah 1.5 detik tampilkan pesan "I love you!"
    setTimeout(() => {
      setShowLoveMessage(true);
      
      // Setelah 5 detik, refresh halaman untuk kembali ke awal
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }, 1500);
  };

  // Fungsi untuk mengonversi waktu dalam detik ke format mm:ss untuk audio player
  const formatAudioTime = (time: number): string => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Fungsi untuk menangani klik pada progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime2(newTime);
  };

  // Fungsi untuk toggle fullscreen video
  const toggleVideoFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoFullscreen(!isVideoFullscreen);
  };

  // Effect untuk menangani tombol ESC saat fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoFullscreen) {
        setIsVideoFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoFullscreen]);

  return (
    <>
      <Head>
        <title>{`Selamat Ulang Tahun ${recipientName}!`}</title>
        <meta name="description" content={`Kartu ucapan retro 90an untuk ${recipientName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        {/* Audio element untuk music player, hidden */}
        <audio 
          ref={audioRef} 
          style={{ display: 'none' }} 
          src={musicFile}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
        
        {loading && (
          <div className={styles.loading}>
            <div className={styles.loadingText}>LOADING...</div>
            <div className={styles.progressBar}>
              <div className={styles.progress}></div>
            </div>
            <div className={styles.loadingSubtext}>WINDOWS 95</div>
          </div>
        )}
        
        {isShuttingDown && (
          <div className={shutdownStyles.shutdown}>
            <div className={shutdownStyles.progressBar}>
              <div className={shutdownStyles.progress}></div>
            </div>
            {showLoveMessage && (
              <div className={shutdownStyles.loveMessage}>I love you!</div>
            )}
          </div>
        )}
        
        {!loading && !isShuttingDown && (
          <div className={styles.container}>
            <div className={styles.desktop}>
              <div className={styles.icons}>
                <div className={styles.icon} onClick={() => handleIconClick('present')}>
                  <div className={styles.iconImage}>🎁</div>
                  <div className={styles.iconText}>Present.exe</div>
                </div>
                <div className={styles.icon} onClick={() => handleIconClick('music')}>
                  <div className={styles.iconImage}>🎵</div>
                  <div className={styles.iconText}>Music.mp3</div>
                </div>
                <div className={styles.icon} onClick={() => handleIconClick('cake')}>
                  <div className={styles.iconImage}>🎂</div>
                  <div className={styles.iconText}>Cake.exe</div>
                </div>
                <div className={styles.icon} onClick={() => handleIconClick('photo')}>
                  <div className={styles.iconImage}>📷</div>
                  <div className={styles.iconText}>Gallery.jpg</div>
                </div>
              </div>
              
              {/* Start Menu */}
              {showStartMenu && (
                <div className={styles.startMenu}>
                  <div className={styles.startMenuHeader}>
                    <span className={styles.startMenuLogo}>W</span>
                    <span>Windows 95</span>
                  </div>
                  <div className={styles.startMenuItems}>
                    <div className={styles.startMenuItem} onClick={() => {
                      setShowStartMenu(false);
                      setShowCard(true);
                      setMinimized({...minimized, card: false});
                      setActiveWindow('card');
                    }}>
                      <span>🎁</span> Kartu Ucapan
                    </div>
                    <div className={styles.startMenuItem} onClick={() => {
                      setShowStartMenu(false);
                      setShowCake(true);
                      setMinimized({...minimized, cake: false});
                      setActiveWindow('cake');
                    }}>
                      <span>🎂</span> Kue Ulang Tahun
                    </div>
                    <div className={styles.startMenuItem} onClick={() => {
                      setShowStartMenu(false);
                      setShowNotepad(true);
                      setMinimized({...minimized, notepad: false});
                      setActiveWindow('notepad');
                    }}>
                      <span>📝</span> Notepad
                    </div>
                    <div className={styles.startMenuItem} onClick={() => {
                      setShowStartMenu(false);
                      window.location.reload();
                    }}>
                      <span>🔄</span> Restart
                    </div>
                    <div className={styles.startMenuSeparator}></div>
                    <div className={styles.startMenuItem} onClick={() => {
                      setShowStartMenu(false);
                      alert('Terima kasih telah menggunakan aplikasi ini!');
                    }}>
                      <span>⭐</span> Tentang
                    </div>
                    <div className={styles.startMenuSeparator}></div>
                    <div className={styles.startMenuItem} onClick={handleShutdown}>
                      <span>⚡</span> Shutdown
                    </div>
                  </div>
                </div>
              )}
              
              {/* Cake Window */}
              {showCake && !minimized.cake && (
                <div 
                  className={`${styles.cakeWindow} ${activeWindow === 'cake' ? styles.activeWindow : ''}`}
                  style={{
                    top: `${windowPosition.cake.y}px`,
                    left: `${windowPosition.cake.x}px`
                  }}
                  onClick={() => setActiveWindow('cake')}
                >
                  <div
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDrag(e, 'cake')}
                  >
                    <div className={styles.cardTitle}>CAKE.EXE</div>
                    <div className={styles.cardControls}>
                      <span 
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('minimize', 'cake');
                        }}
                      >_</span>
                      <span 
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('maximize', 'cake');
                        }}
                      >□</span>
                      <span 
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('close', 'cake');
                        }}
                      >✕</span>
                    </div>
                  </div>
                  
                  <div className={styles.cardToolbar}>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Help</span>
                  </div>
                  
                  <div className={styles.cakeContent}>
                    <div className={styles.cakeTitle}>
                      {candleLit ? "AYO TIUP DULU!" : "YEAY!"}
                    </div>
                    
                    <div className={styles.cakeImage}>
                      {candleLit && <div className={styles.candleFlame}></div>}
                      {showBlowAnimation && <div className={`${styles.blowEffect} ${styles.active}`}></div>}
                    </div>
                    
                    <div className={styles.cakeMessage}>
                      {candleLit ? (
                        <p>jangan lupa berdoa duluuu...</p>
                      ) : (
                        <p>Happy Birthday!!✨<br/>NEXT BUKA GALLERY NYA YAA!</p>
                      )}
                    </div>
                    
                    <div className={styles.cakeButtons}>
                      {candleLit ? (
                        <button 
                          className={styles.blowButton}
                          onClick={handleBlowCandle}
                        >
                          <span>🌬️</span> Tiup Lilin
                        </button>
                      ) : (
                        <button 
                          className={styles.relightButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWindowControl('close', 'cake');
                          }}
                        >
                          <span>❌</span> Close
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Card Window */}
              {showCard && !minimized.card && (
                <div 
                  className={`${styles.birthdayCard} ${activeWindow === 'card' ? styles.activeWindow : ''}`}
                  style={{
                    top: `${windowPosition.card.y}px`,
                    left: `${windowPosition.card.x}px`
                  }}
                  onClick={() => setActiveWindow('card')}
                >
                  <div 
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDrag(e, 'card')}
                  >
                    <div className={styles.cardTitle}>HAPPY_BIRTHDAY.TXT</div>
                    <div className={styles.cardControls}>
                      <span 
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('minimize', 'card');
                        }}
                      >_</span>
                      <span 
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('maximize', 'card');
                        }}
                      >□</span>
                      <span 
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('close', 'card');
                        }}
                      >✕</span>
                    </div>
                  </div>
                  
                  <div className={styles.cardToolbar}>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Help</span>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.birthdayTitle}>
                      <div className={styles.retroBanner}>
                        <span>❤️</span> HAPPY BIRTHDAY <span>❤️</span>
                      </div>
                      <h1 className={styles.birthdayHeading}>
                        SELAMAT ULANG TAHUN KE-27
                      </h1>
                    </div>
                    
                    <div className={styles.messageBox}>
                      <div className={styles.messageBoxHeader}>
                        <span>MESSAGE.TXT</span>
                      </div>
                      <div className={styles.messageBoxContent}>
                        <p>{message}</p>
                        <div className={styles.retroNote}>
                          <p>╔═══════════════════════════════════════╗</p>
                          <p>║  next, kamu play lagu sama tiup lilin duluuu!  ║</p>
                          <p>╚═══════════════════════════════════════╝</p>
                        </div>
                      </div>
                      <div className={styles.messageBoxSender}>
                        <p>Dari: {senderName}</p>
                      </div>
                    </div>
                    
                    <div className={styles.pixelArt}>
                      <div className={styles.cake}></div>
                      <div className={styles.balloon1}></div>
                      <div className={styles.balloon2}></div>
                      <div className={styles.gift}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Music Player Window */}
              {showMusic && !minimized.music && (
                <div 
                  className={`${styles.musicPlayer} ${activeWindow === 'music' ? styles.activeWindow : ''}`}
                  style={{
                    top: `${windowPosition.music.y}px`,
                    left: `${windowPosition.music.x}px`
                  }}
                  onClick={() => setActiveWindow('music')}
                >
                  <div 
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDrag(e, 'music')}
                  >
                    <div className={styles.cardTitle}>MUSIC_PLAYER.EXE</div>
                    <div className={styles.cardControls}>
                      <span 
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('minimize', 'music');
                        }}
                      >_</span>
                      <span 
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('maximize', 'music');
                        }}
                      >□</span>
                      <span 
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('close', 'music');
                        }}
                      >✕</span>
                    </div>
                  </div>
                  
                  <div className={styles.playerContent}>
                    <div className={styles.trackInfo}>
                      <div className={styles.trackTitle}>Play ini yaa.mp3</div>
                      <div className={styles.trackArtist}>Classic Hits</div>
                    </div>
                    
                    <div className={styles.playerWrapper}>
                      <div className={styles.playerControls}>
                        <button 
                          className={styles.playerButton} 
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                        >
                          {isPlaying ? '⏸️' : '▶️'}
                        </button>
                      </div>
                      
                      <div className={styles.timeInfo}>
                        <span>{formatAudioTime(currentTime2)}</span>
                        <span>{formatAudioTime(duration)}</span>
                      </div>
                      
                      <div 
                        className={styles.progressBar}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProgressClick(e);
                        }}
                      >
                        <div 
                          className={styles.progress} 
                          style={{ 
                            width: duration > 0 ? `${(currentTime2 / duration) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={styles.volumeControl}>
                      <span>🔊</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume}
                        onChange={handleVolumeChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Photo Viewer Window */}
              {showPhoto && !minimized.photo && (
                <div 
                  className={`${styles.photoViewer} ${activeWindow === 'photo' ? styles.activeWindow : ''}`}
                  style={{
                    top: `${windowPosition.photo.y}px`,
                    left: `${windowPosition.photo.x}px`,
                    width: "480px",
                    height: "auto"
                  }}
                  onClick={() => setActiveWindow('photo')}
                >
                  <div 
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDrag(e, 'photo')}
                  >
                    <div className={styles.cardTitle}>GALLERY VIEWER</div>
                    <div className={styles.cardControls}>
                      <span 
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('minimize', 'photo');
                        }}
                      >_</span>
                      <span 
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('maximize', 'photo');
                        }}
                      >□</span>
                      <span 
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('close', 'photo');
                        }}
                      >✕</span>
                    </div>
                  </div>
                  
                  <div className={styles.photoContent}>
                    <div className={styles.photo}>
                      <div className={styles.gallerySlideshow} style={{ paddingTop: '25px' }}>
                        <div className={styles.slideCounter}>{currentSlide + 1}/{galleryItems.length}</div>
                        {isVideo ? (
                          <div 
                            className={`${styles.videoContainer} ${isVideoFullscreen ? styles.fullscreen : ''}`} 
                            key="video-container"
                          >
                            <button 
                              className={styles.closeFullscreenBtn}
                              onClick={toggleVideoFullscreen}
                            >
                              Tutup [X]
                            </button>
                            {isVideoFullscreen && (
                              <div className={styles.keyboardHint}>
                                Tekan ESC atau klik tombol Tutup untuk keluar dari mode fullscreen
                              </div>
                            )}
                            
                            <div className={styles.videoFallback} style={{
                              fontSize: '24px',
                              color: 'white',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                              backgroundColor: 'black',
                              padding: '0',
                              textAlign: 'center'
                            }}>
                              <iframe 
                                src="/gallery/video1.mp4" 
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  backgroundColor: '#000'
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.polaroid} key={`polaroid-${currentSlide}`}>
                            <div 
                              className={styles.slideImage}
                              style={{
                                backgroundImage: `url('${galleryItems[currentSlide].src}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                              onError={(e) => {
                                // Handle image load error
                                const target = e.target as HTMLDivElement;
                                target.style.backgroundImage = 'none';
                                target.innerText = galleryItems[currentSlide].fallback;
                                target.style.fontSize = '80px';
                                target.style.display = 'flex';
                                target.style.justifyContent = 'center';
                                target.style.alignItems = 'center';
                              }}
                            ></div>
                            <p>{galleryItems[currentSlide].caption}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.photoToolbar}>
                      <button 
                        className={styles.photoButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          prevSlide();
                        }}
                      >
                        &lt; Sebelumnya
                      </button>
                      <button 
                        className={styles.photoButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextSlide();
                        }}
                      >
                        Berikutnya &gt;
                      </button>
                      {currentSlide === galleryItems.length - 1 && (
                        <>
                          <button 
                            className={styles.photoButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Jika ini slide terakhir (video), kembali ke slide pertama (foto)
                              setCurrentSlide(0);
                              setIsVideo(false);
                              setIsVideoFullscreen(false); // Pastikan keluar dari mode fullscreen
                            }}
                          >
                            Lihat Foto
                          </button>
                          <button 
                            className={styles.photoButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Muat ulang iframe video dengan parameter autoplay
                              const iframe = document.querySelector('iframe');
                              if (iframe) {
                                // Tambahkan parameter timestamp untuk menghindari cache dan parameter autoplay
                                iframe.src = '/gallery/video1.mp4?t=' + new Date().getTime() + '&autoplay=1';
                              }
                            }}
                          >
                            Play Video
                          </button>
                        </>
                      )}
                      {currentSlide < galleryItems.length - 1 && (
                        <button 
                          className={styles.photoButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Langsung ke slide terakhir (video)
                            setCurrentSlide(galleryItems.length - 1);
                            setIsVideo(true);
                            // Sedikit penundaan untuk memberi waktu mengatur video
                            setTimeout(() => {
                              // Temukan elemen video dan coba putar ulang setelah perubahan slide
                              const videoElement = document.querySelector(`.${styles.slideVideo}`) as HTMLVideoElement;
                              if (videoElement) {
                                videoElement.load();
                                videoElement.play().catch(err => {
                                  console.error("Gagal memutar video:", err);
                                });
                              }
                            }, 300);
                          }}
                        >
                          Lihat Video
                        </button>
                      )}
                      <button 
                        className={styles.photoButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Fitur cetak tidak tersedia');
                        }}
                      >
                        Cetak
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notepad Window - Akan muncul jika diklik dari Start Menu */}
              {showNotepad && !minimized.notepad && (
                <div 
                  className={`${styles.notepad} ${activeWindow === 'notepad' ? styles.activeWindow : ''}`}
                  style={{
                    top: `${windowPosition.notepad.y}px`,
                    left: `${windowPosition.notepad.x}px`
                  }}
                  onClick={() => setActiveWindow('notepad')}
                >
                  <div 
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDrag(e, 'notepad')}
                  >
                    <div className={styles.cardTitle}>NOTEPAD.EXE</div>
                    <div className={styles.cardControls}>
                      <span 
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('minimize', 'notepad');
                        }}
                      >_</span>
                      <span 
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('maximize', 'notepad');
                        }}
                      >□</span>
                      <span 
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowControl('close', 'notepad');
                        }}
                      >✕</span>
                    </div>
                  </div>
                  
                  <div className={styles.cardToolbar}>
                    <span>File</span>
                    <span>Edit</span>
                    <span>Format</span>
                    <span>View</span>
                    <span>Help</span>
                  </div>
                  
                  <div className={styles.notepadContent}>
                    <textarea 
                      className={styles.notepadTextarea}
                      defaultValue={`Resolusi Tahun Baru:\n\n1. Bersyukur setiap hari\n2. Lebih banyak tersenyum\n3. Mencapai target-target baru\n4. Lebih sering berkumpul dengan keluarga\n5. Menjaga kesehatan dengan baik\n\nSemoga tahun ini menjadi tahun yang penuh berkah!`}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.taskbar}>
              <div 
                className={`${styles.startButton} ${showStartMenu ? styles.startActive : ''}`}
                onClick={handleStartClick}
              >
                <span className={styles.windowsIcon}>W</span>
                <span>Start</span>
              </div>
              
              <div className={styles.taskbarPrograms}>
                {showCard && (
                  <div 
                    className={`${styles.program} ${!minimized.card && activeWindow === 'card' ? styles.activeProgram : ''}`}
                    onClick={() => {
                      setMinimized({...minimized, card: !minimized.card});
                      if (minimized.card) setActiveWindow('card');
                    }}
                  >
                    🎂 Kartu Ucapan
                  </div>
                )}
                
                {showCake && (
                  <div 
                    className={`${styles.program} ${!minimized.cake && activeWindow === 'cake' ? styles.activeProgram : ''}`}
                    onClick={() => {
                      setMinimized({...minimized, cake: !minimized.cake});
                      if (minimized.cake) setActiveWindow('cake');
                    }}
                  >
                    🎂 Kue Ulang Tahun
                  </div>
                )}
                
                {showNotepad && (
                  <div 
                    className={`${styles.program} ${!minimized.notepad && activeWindow === 'notepad' ? styles.activeProgram : ''}`}
                    onClick={() => {
                      setMinimized({...minimized, notepad: !minimized.notepad});
                      if (minimized.notepad) setActiveWindow('notepad');
                    }}
                  >
                    📝 Notepad
                  </div>
                )}
                
                {showMusic && (
                  <div 
                    className={`${styles.program} ${!minimized.music && activeWindow === 'music' ? styles.activeProgram : ''}`}
                    onClick={() => {
                      setMinimized({...minimized, music: !minimized.music});
                      if (minimized.music) setActiveWindow('music');
                    }}
                  >
                    🎵 Music Player
                  </div>
                )}
                
                {showPhoto && (
                  <div 
                    className={`${styles.program} ${!minimized.photo && activeWindow === 'photo' ? styles.activeProgram : ''}`}
                    onClick={() => {
                      setMinimized({...minimized, photo: !minimized.photo});
                      if (minimized.photo) setActiveWindow('photo');
                    }}
                  >
                    📷 Gallery Viewer
                  </div>
                )}
                
                <div 
                  className={styles.program}
                  onClick={() => handleProgramClick('party')}
                >
                  🎉 Party.exe
                </div>
              </div>
              
              <div className={styles.taskbarTime}>
                <div className={styles.digitalClock}>
                  {formatTime(currentTime)}
                </div>
                <div className={styles.digitalDate}>
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}