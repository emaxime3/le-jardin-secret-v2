"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Creation = {
  id: string;
  type: "mot" | "poeme";
  content: string;
  author: string;
  anonymous: boolean;
  status: "approved";
  created_at: string;
};

export default function Serre() {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    async function loadCreations() {
      setLoading(true);
      setErrorMessage(false);

      const { data, error } = await supabase
        .from("creations_site")
        .select(
          "id, type, content, author, anonymous, status, created_at"
        )
        .eq("status", "approved")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Erreur lors du chargement des créations :",
          error
        );

        setErrorMessage(true);
        setLoading(false);
        return;
      }

      setCreations(data ?? []);
      setLoading(false);
    }

    loadCreations();
  }, []);

  return (
    <main className="serre">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="serre-header">

        <p className="serre-type">
          Ce qui a fleuri
        </p>

        <h1>
          La Serre
        </h1>

        <p className="serre-intro">
          Ici reposent les mots qui ont trouvé leur place
          <br />
          dans le Jardin Secret.
        </p>

      </header>


      {/* ==========================================
          CHARGEMENT
      ========================================== */}

      {loading && (
        <section className="serre-panel">

          <div className="serre-paper">

            <p className="serre-paper-label">
              Le jardin
            </p>

            <h2>
              Les fleurs prennent vie... 🌱
            </h2>

            <p className="serre-paper-intro">
              Un instant, nous préparons la serre.
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
              Impossible de récupérer les créations
              pour le moment. Vous pouvez réessayer
              plus tard.
            </p>

            <button
              type="button"
              className="serre-submit"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </button>

          </div>

        </section>
      )}


      {/* ==========================================
          AUCUNE CRÉATION
      ========================================== */}

      {!loading &&
        !errorMessage &&
        creations.length === 0 && (
          <section className="serre-panel">

            <div className="serre-paper">

              <p className="serre-paper-label">
                Le jardin attend
              </p>

              <h2>
                Aucune création n&apos;a encore fleuri.
              </h2>

              <p className="serre-paper-intro">
                Les premières graines sont encore en train
                de prendre racine.
              </p>

              <Link
                href="/fleur"
                className="serre-submit"
              >
                Déposer une graine 🌸
              </Link>

            </div>

          </section>
        )}


      {/* ==========================================
          CRÉATIONS QUI ONT FLEURI
      ========================================== */}

      {!loading &&
        !errorMessage &&
        creations.length > 0 && (
          <section className="serre-spaces">

            {creations.map((creation) => (
              <article
                key={creation.id}
                className="serre-space"
              >

                <div className="serre-icon">
                  {creation.type === "mot"
                    ? "🌱"
                    : "🌸"}
                </div>

                <p className="serre-space-type">
                  {creation.type === "mot"
                    ? "Une graine devenue fleur"
                    : "Un poème fleuri"}
                </p>


                {creation.type === "mot" ? (
                  <h2>
                    {creation.content}
                  </h2>
                ) : (
                  <>
                    <h2>
                      Un poème
                    </h2>

                    <p
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {creation.content}
                    </p>
                  </>
                )}


                <p>
                  {creation.anonymous
                    ? "Anonyme"
                    : creation.author || "Sans nom"}
                </p>

              </article>
            ))}

          </section>
        )}


      {/* ==========================================
          RETOUR
      ========================================== */}

      <footer className="serre-footer">

        <Link
          href="/jardin"
          className="serre-button"
        >
          ← Retour au Jardin
        </Link>

        <p>
          « Une graine peut être minuscule,
          et pourtant porter toute une forêt. »
        </p>

      </footer>

    </main>
  );
}