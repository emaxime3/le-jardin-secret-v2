import Link from "next/link";

export default function Belvedere() {
  return (
    <main className="belvedere">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="belvedere-header">

        <p className="belvedere-type">
          Le dernier arrêt
        </p>

        <h1>
          Le Belvédère
        </h1>

        <p className="belvedere-intro">
          Prenez un instant.
          <br />
          Regardez le chemin parcouru.
        </p>

      </header>


      {/* ==========================================
          CHEMIN PARCOURU
      ========================================== */}

      <section className="belvedere-journey">

        <p className="belvedere-label">
          Le chemin parcouru
        </p>

        <div className="belvedere-line">

          <div className="journey-place">
            <span className="journey-icon">
              🌳
            </span>

            <span className="journey-name">
              Le Jardin
            </span>
          </div>

          <span className="journey-arrow">
            →
          </span>


          {/* L'ATELIER */}

          <div className="journey-place">
            <span className="journey-icon">
              ✍️
            </span>

            <span className="journey-name">
              L&apos;Atelier
            </span>
          </div>

          <span className="journey-arrow">
            →
          </span>


          {/* LE BANC */}

          <div className="journey-place">
            <span className="journey-icon">
              🪑
            </span>

            <span className="journey-name">
              Le Banc
            </span>
          </div>

          <span className="journey-arrow">
            →
          </span>


          {/* LE GRAMOPHONE */}

          <div className="journey-place">
            <span className="journey-icon">
              🎵
            </span>

            <span className="journey-name">
              Le Gramophone
            </span>
          </div>

          <span className="journey-arrow">
            →
          </span>


          {/* LA FLEUR */}

          <div className="journey-place">
            <span className="journey-icon">
              🌸
            </span>

            <span className="journey-name">
              La Fleur
            </span>
          </div>

          <span className="journey-arrow">
            →
          </span>


          {/* LA SERRE */}

          <div className="journey-place">
            <span className="journey-icon">
              🌱
            </span>

            <span className="journey-name">
              La Serre
            </span>
          </div>

          <span className="journey-arrow">
            →
          </span>


          {/* LE BELVÉDÈRE */}

          <div className="journey-place current">
            <span className="journey-icon">
              🌅
            </span>

            <span className="journey-name">
              Le Belvédère
            </span>
          </div>

        </div>

      </section>


      {/* ==========================================
          QUELQUES MOTS SUR LE JARDIN
      ========================================== */}

      <section className="belvedere-story">

        <div className="story-decoration">
          ❧
        </div>

        <p className="belvedere-label">
          Pourquoi ce jardin existe
        </p>

        <p>
          Ce Jardin Secret est né d&apos;une envie simple :
          garder une place pour les choses que l&apos;on
          ressent, que l&apos;on écrit, que l&apos;on chante
          ou que l&apos;on n&apos;arrive parfois pas à dire.
        </p>

        <p>
          J&apos;y ai déposé une partie de mon univers :
          des mots, des poèmes, des chansons,
          des souvenirs et quelques morceaux de moi.
        </p>

        <p>
          J&apos;ai imaginé cet endroit comme une parenthèse.
          Un lieu où l&apos;on peut entrer sans avoir besoin
          de se presser.
        </p>

        <p>
          Lire quelques lignes.
          <br />
          Écouter une chanson.
          <br />
          S&apos;asseoir quelques instants.
          <br />
          Ou simplement regarder les fleurs pousser.
        </p>

        <p>
          Et si, quelque part dans ce jardin,
          vous avez trouvé un mot qui vous ressemblait,
          alors peut-être qu&apos;il a trouvé exactement
          l&apos;endroit où il devait être.
        </p>

        <div className="story-decoration">
          ✦
        </div>

      </section>


      {/* ==========================================
          MOT DE FIN
      ========================================== */}

      <section className="belvedere-goodbye">

        <p className="goodbye-small">
          Avant de repartir...
        </p>

        <h2>
          Merci d&apos;être venu jusqu&apos;ici.
        </h2>

        <p>
          Merci d&apos;avoir pris le temps de parcourir
          ce petit monde.
        </p>

        <p>
          Merci d&apos;avoir lu mes mots,
          écouté mes chansons,
          découvert mes fragments
          et laissé quelques instants de votre temps
          dans ce jardin.
        </p>

        <p>
          Un jardin n&apos;existe vraiment
          que lorsqu&apos;il est parcouru.
          <br />
          Alors merci d&apos;avoir fait quelques pas
          dans le mien.
        </p>

        <p>
          Peut-être qu&apos;un jour,
          vos pas vous ramèneront ici.
          <br />
          Le Jardin, lui, restera ouvert.
        </p>

        <div className="story-decoration">
          ❧
        </div>

      </section>


      {/* ==========================================
          RETOUR
      ========================================== */}

      <footer className="belvedere-footer">

        <Link href="/jardin">
          ← Retour au Jardin
        </Link>

      </footer>

    </main>
  );
}