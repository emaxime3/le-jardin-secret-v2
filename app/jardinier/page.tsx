"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Creation = {
  id: string;
  type: "mot" | "poeme";
  content: string;
  author: string;
  anonymous: boolean;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function Jardinier() {
  const router = useRouter();

  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadCreations() {
    setErrorMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const { data, error } = await supabase
      .from("creations_site")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Erreur lors du chargement des créations :",
        error
      );

      setErrorMessage(
        "Impossible de charger les créations."
      );

      setLoading(false);
      return;
    }

    setCreations((data ?? []) as Creation[]);
    setLoading(false);
  }

  useEffect(() => {
    loadCreations();
  }, []);

  async function updateCreation(
    id: string,
    status: "approved" | "rejected"
  ) {
    if (actionId) {
      return;
    }

    setActionId(id);
    setErrorMessage("");

    const { error } = await supabase
      .from("creations_site")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {
      console.error(
        "Erreur lors de la modification :",
        error
      );

      setErrorMessage(
        "Impossible de modifier cette création."
      );

      setActionId(null);
      return;
    }

    setCreations((current) =>
      current.map((creation) =>
        creation.id === id
          ? {
              ...creation,
              status,
            }
          : creation
      )
    );

    setActionId(null);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const pending = creations.filter(
    (creation) => creation.status === "pending"
  );

  const approved = creations.filter(
    (creation) => creation.status === "approved"
  );

  if (loading) {
    return (
      <main className="jardinier">

        <p className="jardinier-loading">
          Le Jardinier ouvre ses carnets...
        </p>

      </main>
    );
  }

  return (
    <main className="jardinier">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="jardinier-header">

        <p className="jardinier-type">
          Espace privé
        </p>

        <h1>
          Le Jardinier
        </h1>

        <p>
          Ici reposent les mots qui attendent
          <br />
          de savoir s&apos;ils pourront fleurir.
        </p>

      </header>


      {/* ==========================================
          STATISTIQUES
      ========================================== */}

      <section className="jardinier-stats">

        <div className="jardinier-stat">

          <span>
            🌱
          </span>

          <strong>
            {pending.length}
          </strong>

          <p>
            en attente
          </p>

        </div>


        <div className="jardinier-stat">

          <span>
            🌸
          </span>

          <strong>
            {approved.length}
          </strong>

          <p>
            fleurs
          </p>

        </div>

      </section>


      {/* ==========================================
          ERREUR
      ========================================== */}

      {errorMessage && (
        <section
          style={{
            maxWidth: "700px",
            margin: "30px auto",
            padding: "18px 24px",
            textAlign: "center",
            color: "#8b3f3f",
            background: "rgba(255, 255, 255, 0.75)",
            borderRadius: "8px",
          }}
        >
          {errorMessage}
        </section>
      )}


      {/* ==========================================
          CRÉATIONS EN ATTENTE
      ========================================== */}

      <section className="jardinier-section">

        <div className="jardinier-section-title">

          <div>

            <p>
              À vous de choisir
            </p>

            <h2>
              Les graines
            </h2>

          </div>

          <span>
            {pending.length}
          </span>

        </div>


        {pending.length === 0 ? (

          <div className="jardinier-empty">

            <div>
              🌿
            </div>

            <h3>
              Le jardin est calme.
            </h3>

            <p>
              Aucune nouvelle graine n&apos;attend
              encore votre attention.
            </p>

          </div>

        ) : (

          <div className="jardinier-list">

            {pending.map((creation) => (

              <article
                key={creation.id}
                className="jardinier-card"
              >

                <div className="jardinier-card-top">

                  <span className="jardinier-card-type">

                    {creation.type === "mot"
                      ? "🌱 Une graine"
                      : "📖 Un poème"}

                  </span>

                  <span className="jardinier-date">

                    {new Date(
                      creation.created_at
                    ).toLocaleDateString("fr-FR")}

                  </span>

                </div>


                <div className="jardinier-content">

                  <p>
                    {creation.content}
                  </p>

                </div>


                <div className="jardinier-author">

                  {creation.anonymous
                    ? "Anonyme"
                    : creation.author || "Sans nom"}

                </div>


                <div className="jardinier-actions">

                  <button
                    type="button"
                    className="jardinier-approve"
                    disabled={actionId === creation.id}
                    onClick={() =>
                      updateCreation(
                        creation.id,
                        "approved"
                      )
                    }
                  >
                    {actionId === creation.id
                      ? "..."
                      : "🌸 Faire fleurir"}
                  </button>


                  <button
                    type="button"
                    className="jardinier-reject"
                    disabled={actionId === creation.id}
                    onClick={() =>
                      updateCreation(
                        creation.id,
                        "rejected"
                      )
                    }
                  >
                    Garder dans la terre
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* ==========================================
          CRÉATIONS QUI ONT FLEURI
      ========================================== */}

      <section className="jardinier-section">

        <div className="jardinier-section-title">

          <div>

            <p>
              Le jardin grandit
            </p>

            <h2>
              Les fleurs
            </h2>

          </div>

          <span>
            {approved.length}
          </span>

        </div>


        {approved.length === 0 ? (

          <div className="jardinier-empty">

            <div>
              🌱
            </div>

            <h3>
              Aucune fleur pour le moment.
            </h3>

            <p>
              Les premières apparaîtront ici
              lorsque vous aurez fait fleurir
              une création.
            </p>

          </div>

        ) : (

          <div className="jardinier-list">

            {approved.map((creation) => (

              <article
                key={creation.id}
                className="jardinier-card jardinier-card-approved"
              >

                <div className="jardinier-card-top">

                  <span className="jardinier-card-type">

                    🌸
                    {creation.type === "mot"
                      ? " Une graine devenue fleur"
                      : " Un poème fleuri"}

                  </span>

                </div>


                <div className="jardinier-content">

                  <p>
                    {creation.content}
                  </p>

                </div>


                <div className="jardinier-author">

                  {creation.anonymous
                    ? "Anonyme"
                    : creation.author || "Sans nom"}

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <footer className="jardinier-navigation">

  <button
    type="button"
    onClick={() => router.push("/jardin")}
  >
    ← Retour au Jardin
  </button>

  <button
    type="button"
    onClick={logout}
  >
    🔐 Se déconnecter
  </button>

</footer>

    </main>
  );
}