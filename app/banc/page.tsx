"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const confidences = [
  `Il y a des mots que l'on garde longtemps en soi,
simplement parce que l'on n'a jamais trouvé
l'endroit où les déposer.`,

  `Certaines personnes passent dans nos vies
et y laissent quelque chose
qui reste bien après leur départ.`,

  `Parfois, un simple mot suffit
à rendre une journée
un peu plus douce.`,

  `On ne sait jamais vraiment
ce que quelqu'un traverse.
Soyons doux, même lorsque personne ne regarde.`,

  `Certaines rencontres ressemblent à des parenthèses
que l'on aurait aimé
ne jamais refermer.`,

  `Il existe des souvenirs
qui ne demandent pas à revenir,
seulement à être gardés quelque part.`,

  `Il y a des silences qui disent davantage
que toutes les phrases
que l'on aurait pu prononcer.`,

  `On oublie parfois les mots que l'on a dits,
mais rarement la manière
dont quelqu'un nous a fait sentir.`,

  `Certaines choses n'ont pas besoin
d'être expliquées.
Elles ont simplement besoin d'être ressenties.`,

  `Il y a des personnes que l'on rencontre
sans savoir qu'elles deviendront
un morceau de notre histoire.`,

  `Un petit geste peut sembler insignifiant
à celui qui le donne
et devenir immense pour celui qui le reçoit.`,

  `Tout ce qui est fragile
ne mérite pas d'être caché.
Certaines fragilités sont simplement
des preuves que l'on a aimé.`,

  `Parfois, avancer ne signifie pas oublier.
C'est simplement apprendre
à porter le souvenir autrement.`,

  `Il y a des mots que l'on aurait aimé entendre
au bon moment.
Alors, peut-être qu'il est encore temps
de les offrir à quelqu'un d'autre.`,

  `Certaines histoires ne se terminent pas vraiment.
Elles changent simplement de place
dans notre cœur.`,

  `On ne mesure pas toujours
la lumière que l'on apporte
dans la vie de quelqu'un.`,

  `Si personne ne te l'a dit aujourd'hui :
tu as le droit d'être fatigué,
de ralentir,
et de prendre ton temps.`,

  `Il y aura toujours quelque part
une personne heureuse
que tu aies simplement existé
sur son chemin.`,

  `Les plus belles choses
ne font parfois presque aucun bruit.
Elles arrivent doucement
et restent longtemps.`,

  `Peut-être que certaines personnes
ne sont pas faites pour rester.
Mais cela ne rend pas
leur passage moins précieux.`,
];

export default function Banc() {

  /* ==========================================
      CONFIDENCE
  ========================================== */

  // On commence avec la première confidence
  // afin d'éviter Math.random() pendant le rendu serveur.
  const [confidenceIndex, setConfidenceIndex] = useState(0);

  // Une fois la page chargée dans le navigateur,
  // on choisit une confidence au hasard.
  useEffect(() => {
    setConfidenceIndex(
      Math.floor(Math.random() * confidences.length)
    );
  }, []);

  function nouvelleConfidence() {
    setConfidenceIndex((current) => {
      if (confidences.length <= 1) {
        return current;
      }

      let next = current;

      while (next === current) {
        next = Math.floor(
          Math.random() * confidences.length
        );
      }

      return next;
    });
  }

  return (
    <main className="banc">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="banc-header">

        <p className="banc-type">
          Quelques mots laissés là
        </p>

        <h1>
          Le Banc des confidences
        </h1>

        <p className="banc-intro">
          Asseyez-vous un instant.
          <br />
          Ici, les mots peuvent rester un peu.
        </p>

      </header>


      {/* ==========================================
          CONFIDENCE DU MOMENT
      ========================================== */}

      <section className="banc-carnet">

        <div className="carnet-page">

          <div className="carnet-page-decoration top">
            ❦
          </div>

          <p className="carnet-page-type">
            Une confidence
          </p>

          <h2>
            Pour vous, aujourd'hui
          </h2>

          <div className="carnet-page-line">
            ───── ✦ ─────
          </div>

          <p className="carnet-page-intro">
            Peut-être aviez-vous besoin
            <br />
            de lire ces quelques mots.
          </p>

          <div className="carnet-botanical">
            ❧
          </div>


          {/* ========================================
              PHRASE
          ======================================== */}

          <div className="carnet-excerpt">

            <span>
              «
            </span>

            <p key={confidenceIndex}>
              {confidences[confidenceIndex]}
            </p>

            <span>
              »
            </span>

          </div>


          {/* ========================================
              AUTRE CONFIDENCE
          ======================================== */}

          <button
            type="button"
            className="serre-button"
            onClick={nouvelleConfidence}
            style={{
              marginTop: "30px",
              position: "relative",
              zIndex: 10,
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Une autre confidence →
          </button>


          <div className="carnet-page-note">

            <p>
              Revenez quand vous le souhaitez.
              <br />
              Le banc aura peut-être
              quelques nouveaux mots pour vous.
            </p>

          </div>


          <div className="carnet-page-decoration bottom">
            ❦
          </div>

        </div>

      </section>


      {/* ==========================================
          LAISSER UN MOT
      ========================================== */}

      <section
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >

        <p>
          Vous avez peut-être, vous aussi,
          <br />
          quelques mots à déposer.
        </p>

        <Link
          href="/serre"
          className="serre-button"
          style={{
            display: "inline-block",
            marginTop: "15px",
          }}
        >
          Déposer quelques mots →
        </Link>

      </section>


      {/* ==========================================
          PHRASE FINALE
      ========================================== */}

      <footer className="banc-footer">

        <p>
          « Certains mots ont simplement besoin
          d'un endroit où être déposés. »
        </p>

      </footer>

    </main>
  );
}