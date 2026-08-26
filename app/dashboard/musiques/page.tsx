"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Song = {
  title: string;
  file: string;
};

type NewSong = {
  id: string;
  titre: string;
  fichier: string;
  description: string | null;
  ordre: number;
  publie: boolean;
};

 
const existingSongs: Song[] = [
  {
    title: "Les choses simples",
    file: "/music/les-choses-simples.mp3",
  },
  {
    title: "Intro",
    file: "/music/intro.mp3",
  },
  {
    title: "Elle",
    file: "/music/elle.mp3",
  },
  {
    title: "Le soleil",
    file: "/music/le-soleil.mp3",
  },
  {
    title: "Chaleur tapie",
    file: "/music/intro-chaleur-tapie.mp3",
  },
  {
    title: "La flamme",
    file: "/music/la-flamme.mp3",
  },
  {
    title: "Love don't wait",
    file: "/music/love-don-t-wait.mp3",
  },
  {
    title: "J'ai choisi l'amour",
    file: "/music/jai-choisi-l-amour.mp3",
  },
  {
    title: "Pense à moi",
    file: "/music/pense-a-moi.mp3",
  },
  {
    title: "Leurs guerres",
    file: "/music/leur-guerre.mp3",
  },
];

export default function Musiques() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [newSongs, setNewSongs] = useState<NewSong[]>([]);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [fichier, setFichier] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function initialise() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      await loadNewSongs();

      setLoading(false);
    }

    initialise();
  }, [router]);

  async function loadNewSongs() {
    const { data, error } = await supabase
      .from("musiques")
      .select(
        "id, titre, fichier, description, ordre, publie"
      )
      .order("ordre", {
        ascending: true,
      })
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Erreur chargement des musiques :",
        error
      );
      return;
    }

    setNewSongs(data ?? []);
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0] ?? null;

    setFichier(selectedFile);
    setErrorMessage("");
    setMessage("");
  }

  async function ajouterMusique(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!titre.trim()) {
      setErrorMessage(
        "Donne un titre à ta musique."
      );
      return;
    }

    if (!fichier) {
      setErrorMessage(
        "Choisis un fichier audio."
      );
      return;
    }

    if (!fichier.type.startsWith("audio/")) {
      setErrorMessage(
        "Le fichier choisi n'est pas un fichier audio."
      );
      return;
    }

    setUploading(true);

    try {
      /*
       * On crée un nom de fichier unique.
       * Cela évite les problèmes avec les accents,
       * apostrophes ou espaces dans les noms de fichiers.
       */

const extension =
  fichier.name.split(".").pop() || "mp3";

const nomFichier =
  `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

const chemin =
  `musiques/${nomFichier}`;
      /*
       * ==========================================
       * ENVOI DU FICHIER DANS SUPABASE STORAGE
       * ==========================================
       */

      const { error: uploadError } =
        await supabase.storage
          .from("Musique")
          .upload(chemin, fichier, {
            cacheControl: "3600",
            upsert: false,
            contentType: fichier.type,
          });

      if (uploadError) {
        console.error(
          "Erreur upload musique :",
          uploadError
        );

        setErrorMessage(
          "Impossible d'envoyer le fichier audio."
        );

        setUploading(false);
        return;
      }

      /*
       * ==========================================
       * URL PUBLIQUE DU MORCEAU
       * ==========================================
       */

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("Musique")
        .getPublicUrl(chemin);

      const publicUrl =
        publicUrlData.publicUrl;

      /*
       * ==========================================
       * PROCHAIN ORDRE
       * ==========================================
       */

      const prochainOrdre =
        newSongs.length > 0
          ? Math.max(
              ...newSongs.map(
                (song) => song.ordre
              )
            ) + 1
          : existingSongs.length + 1;

      /*
       * ==========================================
       * ENREGISTREMENT DANS LA TABLE
       * ==========================================
       */

      const { data, error: insertError } =
        await supabase
          .from("musiques")
          .insert({
            titre: titre.trim(),
            fichier: publicUrl,
            description:
              description.trim() || null,
            ordre: prochainOrdre,
            publie: true,
          })
          .select(
            "id, titre, fichier, description, ordre, publie"
          )
          .single();

      if (insertError) {
        console.error(
          "Erreur enregistrement musique :",
          insertError
        );

        /*
         * Si l'enregistrement dans la table échoue,
         * on essaie de supprimer le fichier envoyé
         * pour éviter de laisser un fichier inutile
         * dans le Storage.
         */

        await supabase.storage
          .from("Musique")
          .remove([chemin]);

        setErrorMessage(
          "Le fichier a été envoyé mais impossible d'enregistrer la musique."
        );

        setUploading(false);
        return;
      }

      /*
       * ==========================================
       * MISE À JOUR DE L'AFFICHAGE
       * ==========================================
       */

      if (data) {
        setNewSongs((current) => [
          ...current,
          data,
        ]);
      }

      setTitre("");
      setDescription("");
      setFichier(null);

      /*
       * Réinitialise le champ fichier.
       */

      const fileInput =
        document.getElementById(
          "music-file"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      setMessage(
        "🎵 Ta nouvelle musique a bien été ajoutée au Jardin."
      );
    } catch (error) {
      console.error(
        "Erreur inattendue :",
        error
      );

      setErrorMessage(
        "Une erreur inattendue est survenue."
      );
    }

    setUploading(false);
  }

  if (loading) {
    return (
      <main className="serre">

        <header className="serre-header">

          <p className="serre-type">
            Le jardinier
          </p>

          <h1>
            Mes Musiques
          </h1>

          <p className="serre-intro">
            Ouverture du Gramophone...
            <br />
            🎵
          </p>

        </header>

      </main>
    );
  }

  return (
    <main className="serre">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="serre-header">

        <p className="serre-type">
          Tes créations musicales
        </p>

        <h1>
          Mes Musiques
        </h1>

        <p className="serre-intro">
          Ici reposent les chansons
          <br />
          qui font vivre le Gramophone.
        </p>

      </header>


      {/* ==========================================
          AJOUTER UNE MUSIQUE
      ========================================== */}

      <section className="serre-panel">

        <div className="serre-paper">

          <p className="serre-paper-label">
            Le Gramophone
          </p>

          <h2>
            Planter une nouvelle chanson
          </h2>

          <p className="serre-paper-intro">
            Une nouvelle musique vient rejoindre
            les chansons du Jardin.
          </p>


          <form
            onSubmit={ajouterMusique}
            style={{
              marginTop: "30px",
            }}
          >

            {/* TITRE */}

            <div className="serre-author">

              <label
                htmlFor="music-title"
                className="serre-label"
              >
                Titre
              </label>

              <input
                id="music-title"
                type="text"
                className="serre-input"
                value={titre}
                onChange={(event) =>
                  setTitre(event.target.value)
                }
                placeholder="Ex. Une nouvelle chanson"
                disabled={uploading}
              />

            </div>


            {/* DESCRIPTION */}

            <div
              className="serre-author"
              style={{
                marginTop: "20px",
              }}
            >

              <label
                htmlFor="music-description"
                className="serre-label"
              >
                Description
              </label>

              <textarea
                id="music-description"
                className="serre-input"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder="Quelques mots sur cette chanson..."
                rows={4}
                disabled={uploading}
              />

            </div>


            {/* FICHIER */}

            <div
              className="serre-author"
              style={{
                marginTop: "20px",
              }}
            >

              <label
                htmlFor="music-file"
                className="serre-label"
              >
                Fichier audio
              </label>

              <input
                id="music-file"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                disabled={uploading}
                style={{
                  width: "100%",
                  marginTop: "8px",
                }}
              />

              {fichier && (
                <p
                  style={{
                    marginTop: "10px",
                    opacity: 0.7,
                    fontSize: "14px",
                  }}
                >
                  Fichier choisi :{" "}
                  {fichier.name}
                </p>
              )}

            </div>


            {/* MESSAGE */}

            {message && (
              <p
                style={{
                  marginTop: "20px",
                  color: "#526b52",
                }}
              >
                {message}
              </p>
            )}

            {errorMessage && (
              <p
                style={{
                  marginTop: "20px",
                  color: "#8a4d4d",
                }}
              >
                {errorMessage}
              </p>
            )}


            {/* BOUTON */}

            <button
              type="submit"
              className="serre-submit"
              disabled={uploading}
              style={{
                marginTop: "25px",
                opacity: uploading ? 0.6 : 1,
              }}
            >
              {uploading
                ? "🌿 La chanson prend racine..."
                : "🎵 Ajouter la musique"}
            </button>

          </form>

        </div>

      </section>


      {/* ==========================================
          TES MORCEAUX EXISTANTS
      ========================================== */}

      <section className="serre-spaces">

        {existingSongs.map(
          (song, index) => (

            <article
              key={song.file}
              className="serre-space"
            >

              <div className="serre-icon">
                🎵
              </div>

              <p className="serre-space-type">
                Morceau {index + 1}
              </p>

              <h2>
                {song.title}
              </h2>

              <audio
                controls
                preload="metadata"
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >

                <source
                  src={song.file}
                  type="audio/mpeg"
                />

                Ton navigateur ne peut pas lire
                ce morceau.

              </audio>

            </article>

          )
        )}


        {/* ========================================
            NOUVELLES MUSIQUES
        ======================================== */}

        {newSongs.map(
          (song) => (

            <article
              key={song.id}
              className="serre-space"
            >

              <div className="serre-icon">
                🎵
              </div>

              <p className="serre-space-type">
                Nouvelle chanson
              </p>

              <h2>
                {song.titre}
              </h2>

              {song.description && (
                <p>
                  {song.description}
                </p>
              )}

              <audio
                controls
                preload="metadata"
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >

                <source
                  src={song.fichier}
                  type="audio/mpeg"
                />

                Ton navigateur ne peut pas lire
                ce morceau.

              </audio>

            </article>

          )
        )}

      </section>


      {/* ==========================================
          RETOUR
      ========================================== */}

      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >

        <button
          type="button"
          className="serre-button"
          onClick={() =>
            router.push("/dashboard")
          }
        >
          ← Retour au Jardinier
        </button>

      </footer>

    </main>
  );
}