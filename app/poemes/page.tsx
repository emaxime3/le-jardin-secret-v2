"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Poeme = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
};

export default function Poemes() {
  const [poemes, setPoemes] = useState<Poeme[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPoeme, setSelectedPoeme] = useState<string | null>(null);

  useEffect(() => {
    async function loadPoemes() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("poemes")
        .select("id, title, content, published, created_at")
        .eq("published", true)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Erreur chargement des poèmes :", error);

        setErrorMessage(
          "Impossible de charger les poèmes pour le moment."
        );

        setLoading(false);
        return;
      }

      setPoemes(data ?? []);
      setLoading(false);
    }

    loadPoemes();
  }, []);

  return (
    <main className="serre">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="serre-header">

        <p className="serre-type">
          Les mots qui ont fleuri
        </p>

        <h1>
          La Bibliothèque des poèmes
        </h1>

        <p className="serre-intro">
          Quelques pages où les mots
          <br />
          ont choisi de rester.
        </p>

      </header>


      {/* ==========================================
          INTRODUCTION
      ========================================== */}

      <section className="poemes-intro">

        <p className="poemes-intro-label">
          Le Jardin Secret
        </p>

        <p className="poemes-intro-text">
          Quelques mots déposés ici,
          <br />
          pour ceux qui prennent le temps de les lire.
        </p>

      </section>


      {/* ==========================================
          CHARGEMENT
      ========================================== */}

      {loading && (
        <section className="serre-panel">

          <div className="serre-paper">

            <p className="serre-paper-label">
              Jardin Secret
            </p>

            <h2>
              Les mots prennent racine... 🌱
            </h2>

            <p className="serre-paper-intro">
              Un instant, nous préparons les poèmes.
            </p>

          </div>

        </section>
      )}


      {/* ==========================================
          ERREUR
      ========================================== */}

      {!loading && errorMessage && (
        <section className="serre-panel">

          <div className="serre-paper">

            <p className="serre-paper-label">
              Oups
            </p>

            <h2>
              Le jardin est momentanément inaccessible.
            </h2>

            <p className="serre-paper-intro">
              {errorMessage}
            </p>

          </div>

        </section>
      )}


      {/* ==========================================
          AUCUN POÈME
      ========================================== */}

      {!loading &&
        !errorMessage &&
        poemes.length === 0 && (
          <section className="serre-panel">

            <div className="serre-paper">

              <p className="serre-paper-label">
                Le carnet attend
              </p>

              <h2>
                Aucun poème n&apos;a encore fleuri.
              </h2>

              <p className="serre-paper-intro">
                Les premiers mots sont encore en train
                de prendre racine.
              </p>

            </div>

          </section>
        )}


      {/* ==========================================
          LISTE DES POÈMES
      ========================================== */}

      {!loading &&
        !errorMessage &&
        poemes.length > 0 && (

          <section className="poemes-list">

            {poemes.map((poeme, index) => {

              const isOpen = selectedPoeme === poeme.id;

              return (
                <div
                  key={poeme.id}
                  className="poeme-row"
                >

                  {/* --------------------------------
                      BOUTON DU POÈME
                  -------------------------------- */}

                  <button
                    type="button"
                    className="poeme-button"
                    onClick={() =>
                      setSelectedPoeme(
                        isOpen ? null : poeme.id
                      )
                    }
                  >

                    <span className="poeme-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="poeme-title">
                      {poeme.title}
                    </span>

                    <span className="poeme-arrow">
                      {isOpen ? "↑" : "→"}
                    </span>

                  </button>


                  {/* --------------------------------
                      POÈME OUVERT
                  -------------------------------- */}

                  {isOpen && (

                    <article className="poeme-content">

                      <p className="poeme-content-label">
                        Poème
                      </p>

                      <h2 className="poeme-content-title">
                        {poeme.title}
                      </h2>

                      <div className="poeme-content-line">
                        ✦
                      </div>

                      <p className="poeme-text">
                        {poeme.content}
                      </p>

                      <div className="poeme-decoration">
                        ✦
                      </div>

                    </article>

                  )}

                </div>
              );

            })}

          </section>

        )}


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

        <Link
          href="/jardin"
          className="serre-button"
        >
          ← Retourner dans le Jardin
        </Link>

      </footer>

    </main>
  );
}