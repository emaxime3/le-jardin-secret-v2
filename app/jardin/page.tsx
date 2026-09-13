
import Link from "next/link";
import NotificationButton from "../components/NotificationButton";

export default function Jardin() {
  return (
    <main className="garden">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="garden-header">

        {/* ==========================================
            NOTIFICATIONS
        ========================================== */}

        <NotificationButton />

        <p
          style={{
            marginBottom: "12px",
            fontStyle: "italic",
          }}
        >
          Bienvenue quelque part entre les mots
        </p>

        <h1>
          Le Jardin Secret
        </h1>

        <p>
          Entrez doucement.
          <br />
          Ici, rien ne presse.
        </p>

      </header>


      {/* ==========================================
          INTRODUCTION AU JARDIN
      ========================================== */}

      <section className="featured-place">

        <div className="featured-card">

          <img
            src="/images/hero.jpg"
            alt="Le Jardin Secret"
          />

          <div className="featured-content">

            <p className="place-type">
              Une promenade à votre rythme
            </p>

            <h2>
              Entrez dans mon Jardin
            </h2>

            <p className="place-description">
              J&apos;ai imaginé cet endroit comme une petite
              parenthèse hors du temps.
              <br />
              <br />
              Vous pouvez vous asseoir sur un banc,
              écouter quelques chansons, lire quelques poèmes,
              laisser un mot ou simplement vous promener.
            </p>

            <div className="line"></div>

            <p
              style={{
                marginTop: "20px",
                fontStyle: "italic",
              }}
            >
              Prenez le chemin qui vous ressemble.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          TITRE DES LIEUX
      ========================================== */}

      <div className="chapter-title">

        <span>
          Les chemins du Jardin
        </span>

      </div>


      <section className="places-grid">


        {/* ==========================================
            L&apos;ATELIER — PREMIER
        ========================================== */}

        <Link
          href="/atelier"
          className="place-card"
        >

          <img
            src="/images/atelier.png"
            alt="L'Atelier"
          />

          <div className="card-text">

            <p>
              Là où les pensées deviennent des mots
              <br />
              et les idées prennent forme.
            </p>

            <h3>
              L&apos;Atelier
            </h3>

            <span className="mini-link">
              Ouvrir l&apos;Atelier →
            </span>

          </div>

        </Link>


        {/* ==========================================
            LE BANC
        ========================================== */}

        <Link
          href="/banc"
          className="place-card"
        >

          <img
            src="/images/banc.jpg"
            alt="Le Banc des confidences"
          />

          <div className="card-text">

            <p>
              Asseyez-vous un instant.
              <br />
              Quelques mots vous attendent peut-être.
            </p>

            <h3>
              Le Banc des confidences
            </h3>

            <span className="mini-link">
              S&apos;asseoir un instant →
            </span>

          </div>

        </Link>


        {/* ==========================================
            LE GRAMOPHONE
        ========================================== */}

        <Link
          href="/gramophone"
          className="place-card"
        >

          <img
            src="/images/gramophone.png"
            alt="Le Gramophone"
          />

          <div className="card-text">

            <p>
              Des mots devenus mélodies,
              <br />
              des histoires à écouter.
            </p>

            <h3>
              Le Gramophone
            </h3>

            <span className="mini-link">
              Écouter →
            </span>

          </div>

        </Link>


        {/* ==========================================
            LA BIBLIOTHÈQUE DES POÈMES
        ========================================== */}

        <Link
          href="/poemes"
          className="place-card"
        >

          <img
            src="/images/poeme.png"
            alt="La Bibliothèque des poèmes"
          />

          <div className="card-text">

            <p>
              Quelques pages où les mots
              <br />
              ont choisi de rester.
            </p>

            <h3>
              La Bibliothèque des poèmes
            </h3>

            <span className="mini-link">
              Lire les poèmes →
            </span>

          </div>

        </Link>


        {/* ==========================================
            LA FLEUR
        ========================================== */}

        <Link
          href="/fleur"
          className="place-card"
        >

          <img
            src="/images/fleur.png"
            alt="La Fleur"
            style={{
              width: "100%",
              height: "275px",
              objectFit: "cover",
              display: "block",
            }}
          />

          <div className="card-text">

            <p>
              Une pensée, un mot,
              <br />
              ou quelques vers à laisser ici.
            </p>

            <h3>
              La Fleur
            </h3>

            <span className="mini-link">
              Planter quelque chose →
            </span>

          </div>

        </Link>


        {/* ==========================================
            LA SERRE
        ========================================== */}

        <Link
          href="/serre"
          className="place-card"
        >

          <img
            src="/images/serre.png"
            alt="La Serre"
          />

          <div className="card-text">

            <p>
              Les mots des visiteurs
              <br />
              qui ont commencé à fleurir.
            </p>

            <h3>
              La Serre
            </h3>

            <span className="mini-link">
              Voir ce qui a fleuri →
            </span>

          </div>

        </Link>


        {/* ==========================================
            LE BELVÉDÈRE
        ========================================== */}

        <Link
          href="/belvedere"
          className="place-card"
        >

          <img
            src="/images/belvedere.png"
            alt="Le Belvédère"
          />

          <div className="card-text">

            <p>
              Le dernier arrêt.
              <br />
              Prenez un peu de hauteur.
            </p>

            <h3>
              Le Belvédère
            </h3>

            <span className="mini-link">
              Monter jusqu&apos;au Belvédère →
            </span>

          </div>

        </Link>


      </section>


      {/* ==========================================
          FIN DE LA PROMENADE
      ========================================== */}

      <footer className="garden-quote">

        <p>
          « Certains jardins fleurissent avec des fleurs.
          <br />
          Celui-ci fleurit avec des mots. »
        </p>

        <span
          style={{
            display: "block",
            marginTop: "20px",
            opacity: 0.7,
          }}
        >
          Prenez le temps. Le Jardin restera ouvert.
        </span>

      </footer>

    </main>
  );
}

