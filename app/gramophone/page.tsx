"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Song = {
  title: string;
  file: string;
  lyrics: string[];
};

const songs: Song[] = [
  {
    title: "Les choses simples",
    file: "/music/les-choses-simples.mp3",
    lyrics: [],
  },

  {
    title: "Intro",
    file: "/music/intro.mp3",
    lyrics: [],
  },

  {
    title: "Elle",
    file: "/music/elle.mp3",
    lyrics: [],
  },

  {
    title: "Le soleil",
    file: "/music/le-soleil.mp3",
    lyrics: [],
  },

  {
    title: "Chaleur tapie",
    file: "/music/intro-chaleur-tapie.mp3",
    lyrics: [],
  },

  {
    title: "La flamme",
    file: "/music/la-flamme.mp3",
    lyrics: [],
  },

  {
    title: "Love don't wait",
    file: "/music/love-don-t-wait.mp3",
    lyrics: [],
  },

  {
    title: "J'ai choisi l'amour",
    file: "/music/jai-choisi-l-amour.mp3",
    lyrics: [],
  },

  {
    title: "Pense à moi",
    file: "/music/pense-a-moi.mp3",
    lyrics: [],
  },

  {
    title: "Leurs guerres",
    file: "/music/leur-guerre.mp3",
    lyrics: [],
  },
];

export default function Gramophone() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const song = songs[currentSong];


  /* ==========================================
     CHANGEMENT DE CHANSON
  ========================================== */

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [currentSong]);


  /* ==========================================
     LECTURE / PAUSE
  ========================================== */

  function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }


  /* ==========================================
     CHANSON PRÉCÉDENTE
  ========================================== */

  function previousSong() {
    setCurrentSong((current) =>
      current === 0 ? songs.length - 1 : current - 1
    );
  }


  /* ==========================================
     CHANSON SUIVANTE
  ========================================== */

  function nextSong() {
    setCurrentSong((current) =>
      current === songs.length - 1 ? 0 : current + 1
    );
  }


  /* ==========================================
     PROGRESSION
  ========================================== */

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  }


  function handleLoadedMetadata() {
    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);
  }


  /* ==========================================
     FIN DE LA CHANSON
  ========================================== */

  function handleEnded() {
    nextSong();
  }


  /* ==========================================
     BARRE DE PROGRESSION
  ========================================== */

  function handleProgressChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;

    setCurrentTime(newTime);
  }


  /* ==========================================
     FORMAT DU TEMPS
  ========================================== */

  function formatTime(time: number) {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }


  return (
    <main className="gramophone">


      {/* ==========================================
          HERO
      ========================================== */}

      <section className="gramophone-hero">

        <img
          src="/images/gramophone.png"
          alt="Le Gramophone"
          className="gramophone-hero-image"
        />

        <div className="gramophone-hero-content">

          <p className="gramophone-type">
            Là où les chansons prennent vie.
          </p>

          <h1>
            Le Gramophone
          </h1>

          <span className="gramophone-discover">
            Découvrir →
          </span>

        </div>

      </section>


      {/* ==========================================
          ESPACE MUSICAL
      ========================================== */}

      <section className="music-room">


        {/* ==========================================
            LECTEUR
        ========================================== */}

        <div className="music-player">


          {/* EN-TÊTE */}

          <header className="player-header">

            <Link
              href="/jardin"
              className="player-back"
              aria-label="Retour au Jardin"
            >
              ←
            </Link>


            <div>

              <p>
                Les Chansons
              </p>

              <h2>
                {song.title}
              </h2>

            </div>


            <button
              type="button"
              className="player-favorite"
              aria-label="Ajouter aux favoris"
            >
              ♡
            </button>

          </header>


          {/* ==========================================
              POCHETTE + VINYLE
          ========================================== */}

          <div className="album-area">

            <div className="album-art">

              <div className="album-picture">

                <img
                  src="/images/hero.jpg"
                  alt={`Pochette de ${song.title}`}
                />

              </div>


              <div
                className={`vinyl ${
                  isPlaying ? "vinyl-playing" : ""
                }`}
              >

                <div className="vinyl-center"></div>

              </div>

            </div>

          </div>


          {/* ==========================================
              INFORMATIONS
          ========================================== */}

          <div className="player-info">

            <p className="now-playing">
              En écoute
            </p>

            <h3>
              {song.title}
            </h3>

          </div>


          {/* ==========================================
              AUDIO
          ========================================== */}

          <audio
            ref={audioRef}
            src={song.file}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            preload="metadata"
          />


          {/* ==========================================
              CONTROLES
          ========================================== */}

          <div className="custom-player">


            <div className="progress-row">

              <span>
                {formatTime(currentTime)}
              </span>


              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="progress-bar"
                aria-label="Progression de la chanson"
              />


              <span>
                {formatTime(duration)}
              </span>

            </div>


            <div className="player-controls">


              <button
                type="button"
                onClick={previousSong}
                className="control-button"
                aria-label="Chanson précédente"
              >
                ↶
              </button>


              <button
                type="button"
                onClick={togglePlay}
                className="play-button"
                aria-label={
                  isPlaying
                    ? "Mettre en pause"
                    : "Lire"
                }
              >
                {isPlaying ? "Ⅱ" : "▶"}
              </button>


              <button
                type="button"
                onClick={nextSong}
                className="control-button"
                aria-label="Chanson suivante"
              >
                ↷
              </button>

            </div>

          </div>


          {/* ==========================================
              PAROLES
          ========================================== */}

          <div className="lyrics-box">

            {song.lyrics.length > 0 ? (

              song.lyrics.map((line, index) => (
                <p key={index}>
                  {line}
                </p>
              ))

            ) : (

              <p className="lyrics-empty">
                Les paroles de cette chanson
                arriveront bientôt...
              </p>

            )}

          </div>

        </div>


        {/* ==========================================
            CARNET DE CHANSONS
        ========================================== */}

        <aside className="song-book">

          <header className="song-book-header">

            <h2>
              Le carnet de chansons
            </h2>

            <div className="ornament">
              ─── ❧ ───
            </div>

          </header>


          <div className="song-list">

            {songs.map((item, index) => (

              <button
                key={item.file}
                type="button"
                className={`song-item ${
                  index === currentSong
                    ? "active"
                    : ""
                }`}
                onClick={() => setCurrentSong(index)}
              >

                <span className="song-number">
                  {String(index + 1).padStart(2, "0")}
                </span>


                <span className="song-title">
                  {item.title}
                </span>


                <span className="song-icon">
                  {index === currentSong
                    ? "♫"
                    : "→"}
                </span>

              </button>

            ))}

          </div>

        </aside>


      </section>

    </main>
  );
}