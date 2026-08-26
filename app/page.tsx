import Link from "next/link";

export default function Home() {
  return (
    <main className="home">

      {/* ==========================================
          ACCÈS DISCRET AU JARDINIER
      ========================================== */}

      <Link
  href="/login"
  aria-label="Accès Jardinier"
  title="Jardinier"
  style={{
    position: "fixed",
    top: "18px",
    right: "20px",
    zIndex: 999999,
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    textDecoration: "none",
    background: "rgba(16, 28, 24, 0.55)",
    border: "1px solid rgba(217, 182, 109, 0.25)",
    borderRadius: "50%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.18)",
  }}
>
  🌿
</Link>


      {/* ==========================================
          PAGE D'ACCUEIL
      ========================================== */}

      <section className="home-hero">

        <div className="home-content">

          <p className="home-type">
            Bienvenue
          </p>

          <h1>
            Le Jardin Secret
          </h1>

          <p className="home-intro">
            Là où les mots prennent racine.
          </p>

          <div className="home-line"></div>

          <p className="home-text">
            Un endroit à part, entre les souvenirs,
            les mots, les chansons et les choses
            que l&apos;on garde un peu pour soi.
          </p>

          <Link
            href="/jardin"
            className="home-button"
          >
            Entrer →
          </Link>

        </div>

      </section>

    </main>
  );
}