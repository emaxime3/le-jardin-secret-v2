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

export default function Admin() {
  const router = useRouter();

  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return false;
    }

    return true;
  }

  async function loadCreations() {
    const isLoggedIn = await checkUser();

    if (!isLoggedIn) {
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("creations_site")
      .select(
        "id, type, content, author, anonymous, status, created_at"
      )
      .eq("status", "pending")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Erreur chargement admin :", error);
      setMessage("Impossible de charger les graines.");
      setLoading(false);
      return;
    }

    setCreations(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadCreations();
  }, []);

  async function updateStatus(
    id: string,
    status: "approved" | "rejected"
  ) {
    const isLoggedIn = await checkUser();

    if (!isLoggedIn) {
      return;
    }

    const { error } = await supabase
      .from("creations_site")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Erreur modification :", error);
      setMessage("Impossible de modifier cette création.");
      return;
    }

    setCreations((current) =>
      current.filter((creation) => creation.id !== id)
    );

    setMessage(
      status === "approved"
        ? "🌸 La graine a fleuri !"
        : "🗑️ La graine a été refusée."
    );
  }

  async function logout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erreur de déconnexion :", error);
      setMessage("Impossible de se déconnecter.");
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="serre">

        <header className="serre-header">

          <p className="serre-type">
            Le jardinier
          </p>

          <h1>
            Administration
          </h1>

          <p className="serre-intro">
            Vérification de votre accès...
          </p>

        </header>

        <section className="serre-panel">

          <div className="serre-paper">

            <p className="serre-paper-label">
              Jardin Secret
            </p>

            <h2>
              On ouvre la porte... 🔐
            </h2>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="serre">

      {/* BOUTON DE DÉCONNEXION */}
      <button
        type="button"
        onClick={logout}
        disabled={loggingOut}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 99999,
          padding: "12px 20px",
          border: "1px solid #777",
          borderRadius: "8px",
          background: "#ffffff",
          color: "#333333",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        {loggingOut
          ? "Déconnexion..."
          : "🔐 Se déconnecter"}
      </button>

      <header className="serre-header">

        <p className="serre-type">
          Le jardinier
        </p>

        <h1>
          Administration
        </h1>

        <p className="serre-intro">
          Ici reposent les graines qui attendent
          <br />
          de savoir si elles peuvent fleurir.
        </p>

      </header>

      {message && (
        <section className="serre-panel">

          <div className="serre-paper">

            <p className="serre-paper-intro">
              {message}
            </p>

          </div>

        </section>
      )}

      {creations.length === 0 && (
        <section className="serre-panel">

          <div className="serre-paper">

            <p className="serre-paper-label">
              Tout est calme
            </p>

            <h2>
              Aucune graine n&apos;attend actuellement. 🌿
            </h2>

            <p className="serre-paper-intro">
              Lorsqu&apos;une nouvelle création sera déposée,
              elle apparaîtra ici.
            </p>

          </div>

        </section>
      )}

      {creations.length > 0 && (
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
                  ? "Une graine"
                  : "Un poème"}
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

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >

                <button
                  type="button"
                  className="serre-submit"
                  onClick={() =>
                    updateStatus(
                      creation.id,
                      "approved"
                    )
                  }
                >
                  🌸 Faire fleurir
                </button>

                <button
                  type="button"
                  className="serre-button"
                  onClick={() =>
                    updateStatus(
                      creation.id,
                      "rejected"
                    )
                  }
                >
                  Refuser
                </button>

              </div>

            </article>
          ))}

        </section>
      )}

    </main>
  );
}