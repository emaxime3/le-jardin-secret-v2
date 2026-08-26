"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    }

    checkSession();
  }, [router]);

  async function logout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erreur de déconnexion :", error);
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
            Le Jardinier
          </h1>

          <p className="serre-intro">
            Ouverture du jardin...
            <br />
            🌿
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
          Espace privé
        </p>

        <h1>
          Le Jardinier
        </h1>

        <p className="serre-intro">
          Bienvenue dans ton Jardin Secret.
          <br />
          Ici, tu peux prendre soin de tout ce qui y pousse.
        </p>

        {email && (
          <p
            style={{
              marginTop: "12px",
              opacity: 0.6,
              fontSize: "14px",
            }}
          >
            {email}
          </p>
        )}

      </header>


      {/* ==========================================
          ESPACES DU JARDINIER
      ========================================== */}

      <section className="serre-spaces">


        {/* ========================================
            GRAINES DES VISITEURS
        ======================================== */}

        <article className="serre-space">

          <div className="serre-icon">
            🌱
          </div>

          <p className="serre-space-type">
            Les visiteurs
          </p>

          <h2>
            Les Graines
          </h2>

          <p>
            Consulte les mots et les poèmes déposés
            par les visiteurs et décide lesquels
            peuvent fleurir.
          </p>

          <Link
            href="/admin"
            className="serre-button"
          >
            Gérer les graines →
          </Link>

        </article>


        {/* ========================================
            TES POÈMES
        ======================================== */}

        <article className="serre-space">

          <div className="serre-icon">
            📝
          </div>

          <p className="serre-space-type">
            Tes écrits
          </p>

          <h2>
            Mes Poèmes
          </h2>

          <p>
            Ajoute, modifie et organise tes propres
            poèmes dans ton Jardin Secret.
          </p>

          <Link
            href="/dashboard/poemes"
            className="serre-button"
          >
            Gérer mes poèmes →
          </Link>

        </article>


        {/* ========================================
            TES MUSIQUES
        ======================================== */}

        <article className="serre-space">

          <div className="serre-icon">
            🎵
          </div>

          <p className="serre-space-type">
            Tes créations musicales
          </p>

          <h2>
            Mes Musiques
          </h2>

          <p>
            Gère tes morceaux, leurs titres,
            leurs descriptions et leur univers.
          </p>

          <Link
            href="/dashboard/musiques"
            className="serre-button"
          >
            Gérer mes musiques →
          </Link>

        </article>


        {/* ========================================
            LA SERRE
        ======================================== */}

        <article className="serre-space">

          <div className="serre-icon">
            🌸
          </div>

          <p className="serre-space-type">
            Ce qui a fleuri
          </p>

          <h2>
            La Serre
          </h2>

          <p>
            Regarde les créations des visiteurs
            que tu as choisi de faire fleurir.
          </p>

          <Link
            href="/serre"
            className="serre-button"
          >
            Voir la Serre →
          </Link>

        </article>


        {/* ========================================
            LE JARDINIER
        ======================================== */}

        <article className="serre-space">

          <div className="serre-icon">
            🌿
          </div>

          <p className="serre-space-type">
            Espace de gestion
          </p>

          <h2>
            Le Jardinier
          </h2>

          <p>
            Découvre les graines déposées par
            les visiteurs et choisis celles qui
            pourront fleurir dans le Jardin.
          </p>

          <Link
            href="/jardinier"
            className="serre-button"
          >
            Entrer dans le Jardinier →
          </Link>

        </article>


      </section>


      {/* ==========================================
          RETOUR AU JARDIN
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
          style={{
            display: "inline-block",
            marginBottom: "20px",
          }}
        >
          ← Retour au Jardin
        </Link>


        {/* ========================================
            DÉCONNEXION
        ======================================== */}

        <div>

          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            style={{
              padding: "12px 24px",
              border: "1px solid #777",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#333333",
              cursor: loggingOut
                ? "default"
                : "pointer",
              fontSize: "15px",
              opacity: loggingOut ? 0.6 : 1,
            }}
          >
            {loggingOut
              ? "Déconnexion..."
              : "🔐 Se déconnecter"}
          </button>

        </div>

      </footer>

    </main>
  );
}