import Link from "next/link";

export default function Atelier() {
  return (
    <main className="atelier">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="atelier-header">

        <p>
          Carnets, pensées & créations
        </p>

        <h1>
          L&apos;Atelier
        </h1>

        <p
          style={{
            maxWidth: "620px",
            margin: "25px auto 0",
            fontStyle: "italic",
            lineHeight: 1.7,
          }}
        >
          L&apos;endroit où les pensées deviennent des mots,
          <br />
          et où les mots peuvent rester un peu.
        </p>

      </header>


      {/* ==========================================
          CARNET
      ========================================== */}

      <section className="atelier-journal">


        {/* ========================================
            NAVIGATION
        ======================================== */}

        <nav
          className="atelier-navigation"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
            marginBottom: "50px",
          }}
        >

          <a
            href="#journal"
            style={{
              color: "#d9b66d",
              textDecoration: "none",
              fontSize: "1.1rem",
              fontFamily: '"Cormorant Garamond", serif',
              cursor: "pointer",
            }}
          >
            ✒ Le Journal
          </a>

          <a
            href="#fragments"
            style={{
              color: "#d9b66d",
              textDecoration: "none",
              fontSize: "1.1rem",
              fontFamily: '"Cormorant Garamond", serif',
              cursor: "pointer",
            }}
          >
            ❧ Le Coin des Fragments
          </a>

          <a
            href="#esquisses"
            style={{
              color: "#d9b66d",
              textDecoration: "none",
              fontSize: "1.1rem",
              fontFamily: '"Cormorant Garamond", serif',
              cursor: "pointer",
            }}
          >
            ✎ Les Esquisses
          </a>

          <a
            href="#apropos"
            style={{
              color: "#d9b66d",
              textDecoration: "none",
              fontSize: "1.1rem",
              fontFamily: '"Cormorant Garamond", serif',
              cursor: "pointer",
            }}
          >
            ♧ À propos
          </a>

        </nav>


        {/* ========================================
            CITATION
        ======================================== */}

        <div className="atelier-quote">

          <p>
            « Les mots qui nous habitent
            <br />
            sont parfois ceux que l&apos;on n&apos;ose
            pas encore écrire. »
          </p>

          <span>
            ❧
          </span>

        </div>


        {/* ========================================
            JOURNAL
        ======================================== */}

        <article
          id="journal"
          className="atelier-entry"
        >

          <p className="atelier-entry-label">
            Le Journal
          </p>

          <h2>
            Une page parmi d&apos;autres
          </h2>

          <p className="atelier-entry-date">
            Là où tout commence
          </p>


          {/* PHOTO */}

          <div className="atelier-photo">

            <img
              src="/images/atelier.png"
              alt="Une page du carnet de l'Atelier"
            />

          </div>


          {/* TEXTE */}

          <div className="atelier-text">

            <p>
              Il y a des choses que l&apos;on écrit
              sans savoir exactement pourquoi.
            </p>

            <p>
              Des pensées qui arrivent sans prévenir,
              des phrases griffonnées quelque part,
              des émotions que l&apos;on ne sait pas toujours
              comment expliquer.
            </p>

            <p>
              Alors on les écrit.
            </p>

            <p>
              Pas forcément pour être lu.
              Pas forcément pour être compris.
              Parfois simplement pour leur donner
              un endroit où exister.
            </p>

            <p>
              L&apos;Atelier est cet endroit.
            </p>

            <p>
              Ici, les idées peuvent rester inachevées,
              les phrases peuvent changer,
              et les pensées peuvent prendre leur temps.
            </p>

            <p>
              Certaines deviendront des poèmes.
              <br />
              D&apos;autres deviendront des chansons.
              <br />
              Et certaines resteront simplement
              quelques mots dans un carnet.
            </p>

          </div>


          {/* DÉCORATION */}

          <div className="atelier-decoration">
            ❧ · ✦ · ❧
          </div>

        </article>


        {/* ========================================
            LE COIN DES FRAGMENTS
        ======================================== */}

        <section
          id="fragments"
          style={{
            marginTop: "90px",
            textAlign: "center",
            scrollMarginTop: "40px",
          }}
        >

          <p className="atelier-entry-label">
            Le Coin des Fragments
          </p>

          <h2>
            Quelques morceaux restés en chemin
          </h2>

          <p
            style={{
              maxWidth: "620px",
              margin: "20px auto 0",
              lineHeight: 1.8,
            }}
          >
            Des phrases abandonnées en chemin,
            des pensées trop courtes pour devenir des poèmes,
            des mots écrits sans savoir où ils mèneraient.
          </p>

          <p
            style={{
              maxWidth: "620px",
              margin: "20px auto 0",
              lineHeight: 1.8,
            }}
          >
            Certains fragments restent inachevés.
            <br />
            D&apos;autres deviennent autre chose.
          </p>

          <p
            style={{
              marginTop: "20px",
              fontStyle: "italic",
              opacity: 0.8,
            }}
          >
            Mais tous méritaient peut-être
            <br />
            de rester quelque part.
          </p>


          {/* FRAGMENTS */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "25px",
              marginTop: "45px",
            }}
          >

            <div
              style={{
                maxWidth: "260px",
                padding: "28px 24px",
                fontStyle: "italic",
              }}
            >
              <p>
                « Certaines choses n&apos;ont pas besoin
                d&apos;être expliquées. »
              </p>
            </div>


            <div
              style={{
                maxWidth: "260px",
                padding: "28px 24px",
                fontStyle: "italic",
              }}
            >
              <p>
                « On écrit parfois
                ce qu&apos;on n&apos;arrive pas à dire. »
              </p>
            </div>


            <div
              style={{
                maxWidth: "260px",
                padding: "28px 24px",
                fontStyle: "italic",
              }}
            >
              <p>
                « Certaines choses restent,
                même lorsqu&apos;on ne les regarde plus. »
              </p>
            </div>


            <div
              style={{
                maxWidth: "260px",
                padding: "28px 24px",
                fontStyle: "italic",
              }}
            >
              <p>
                « Peut-être que les mots savent
                mieux que nous où ils doivent aller. »
              </p>
            </div>

          </div>

        </section>


        {/* ========================================
            LES ESQUISSES
        ======================================== */}

        <section
          id="esquisses"
          style={{
            marginTop: "90px",
            textAlign: "center",
            scrollMarginTop: "40px",
          }}
        >

          <p className="atelier-entry-label">
            Les Esquisses
          </p>

          <h2>
            Avant que les mots deviennent quelque chose
          </h2>

          <p
            style={{
              maxWidth: "600px",
              margin: "20px auto 0",
              lineHeight: 1.8,
            }}
          >
            Des idées, des débuts de textes,
            des phrases isolées, des morceaux de chansons
            et toutes ces choses qui ne savent pas encore
            ce qu&apos;elles deviendront.
          </p>

        </section>


        {/* ========================================
            À PROPOS
        ======================================== */}

        <section
          id="apropos"
          style={{
            marginTop: "90px",
            textAlign: "center",
            scrollMarginTop: "40px",
          }}
        >

          <p className="atelier-entry-label">
            À propos
          </p>

          <h2>
            Pourquoi écrire ?
          </h2>

          <p
            style={{
              maxWidth: "620px",
              margin: "20px auto 0",
              lineHeight: 1.8,
            }}
          >
            Peut-être pour garder une trace.
            <br />
            Peut-être pour comprendre.
            <br />
            Peut-être simplement parce que certaines choses
            ont besoin de devenir des mots avant de pouvoir
            trouver leur place.
          </p>

          <p
            style={{
              maxWidth: "620px",
              margin: "20px auto 0",
              lineHeight: 1.8,
              fontStyle: "italic",
            }}
          >
            Ici, aucune page n&apos;a besoin d&apos;être parfaite.
            <br />
            Elle a seulement besoin d&apos;être vraie.
          </p>

        </section>

      </section>


      {/* ==========================================
          FIN
      ========================================== */}

      <footer className="atelier-footer">

        <p>
          « Certains mots attendent simplement
          le bon moment pour être écrits. »
        </p>

        <Link
          href="/jardin"
          style={{
            display: "inline-block",
            marginTop: "25px",
            color: "#d9b66d",
            textDecoration: "none",
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: "1.05rem",
          }}
        >
          ← Retour au Jardin
        </Link>

      </footer>

    </main>
  );
}