"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Creation = {
  type: "mot" | "poeme";
  content: string;
  author: string;
  anonymous: boolean;
  status: "pending";
};

export default function Fleur() {
  const [activePanel, setActivePanel] = useState<
    "none" | "mot" | "poeme"
  >("none");

  const [anonymous, setAnonymous] = useState(true);

  const [mot, setMot] = useState("");
  const [poeme, setPoeme] = useState("");
  const [author, setAuthor] = useState("");

  const [message, setMessage] = useState<
    "none" | "mot" | "poeme"
  >("none");

  const [errorMessage, setErrorMessage] = useState(false);
  const [sending, setSending] = useState(false);

  function closePanel() {
    setActivePanel("none");
  }

  async function saveCreation(creation: Creation) {
    const { error } = await supabase
      .from("creations_site")
      .insert({
        type: creation.type,
        content: creation.content,
        author: creation.author,
        anonymous: creation.anonymous,
        status: creation.status,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error("ERREUR SUPABASE :", error);
      return false;
    }

    return true;
  }

  async function submitMot() {
    if (!mot.trim() || sending) {
      return;
    }

    setSending(true);
    setErrorMessage(false);

    const creation: Creation = {
      type: "mot",
      content: mot.trim(),
      author: "",
      anonymous: true,
      status: "pending",
    };

    const saved = await saveCreation(creation);

    setSending(false);

    if (!saved) {
      setErrorMessage(true);
      return;
    }

    setMessage("mot");
    setMot("");
    setActivePanel("none");
  }

  async function submitPoeme() {
    if (!poeme.trim() || sending) {
      return;
    }

    setSending(true);
    setErrorMessage(false);

    const creation: Creation = {
      type: "poeme",
      content: poeme.trim(),
      author: anonymous ? "" : author.trim(),
      anonymous,
      status: "pending",
    };

    const saved = await saveCreation(creation);

    setSending(false);

    if (!saved) {
      setErrorMessage(true);
      return;
    }

    setMessage("poeme");
    setPoeme("");
    setAuthor("");
    setAnonymous(true);
    setActivePanel("none");
  }

  return (
    <main className="serre">

      {/* ==========================================
          EN-TÊTE
      ========================================== */}

      <header className="serre-header">

        <p className="serre-type">
          Une petite part de vous
        </p>

        <h1>
          La Fleur
        </h1>

        <p className="serre-intro">
          Ici, chacun peut laisser une petite trace
          <br />
          de son passage dans le Jardin.
        </p>

      </header>


      {/* ==========================================
          CHOIX
      ========================================== */}

      {message === "none" &&
        !errorMessage &&
        activePanel === "none" && (
          <>
<section
  style={{
    width: "min(680px, 94vw)",
    margin: "0 auto 35px",
    padding: "35px 40px",
    textAlign: "center",
    background:
      "rgba(245, 239, 222, 0.07)",
    border:
      "1px solid rgba(217, 182, 109, 0.14)",
    borderRadius: "5px",
  }}
>

  <p className="serre-paper-label">
    Prenez votre temps
  </p>

  <h2
    style={{
      margin: "0 0 15px",
      color: "#eee7d8",
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: "2.4rem",
      fontWeight: 500,
    }}
  >
    Qu&apos;aimeriez-vous laisser ici ?
  </h2>

  <p
    style={{
      margin: 0,
      color: "#b8b8a9",
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: "1.1rem",
      fontStyle: "italic",
      lineHeight: 1.7,
    }}
  >
    Une pensée, quelques mots,
    <br />
    ou peut-être un poème.
  </p>

</section>


            <section className="serre-spaces">

              {/* ========================================
                  MOT
              ======================================== */}

              <article className="serre-space">

                <div className="serre-icon">
                  🌱
                </div>

                <p className="serre-space-type">
                  Une petite graine
                </p>

                <h2>
                  Déposer un mot
                </h2>

                <p>
                  Une phrase, quelques mots doux,
                  une pensée ou simplement quelque chose
                  que vous aviez envie de dire.
                </p>

                <button
                  type="button"
                  className="serre-button"
                  onClick={() => setActivePanel("mot")}
                >
                  Laisser un mot →
                </button>

              </article>


              {/* ========================================
                  POÈME
              ======================================== */}

              <article className="serre-space">

                <div className="serre-icon">
                  🌸
                </div>

                <p className="serre-space-type">
                  Une création
                </p>

                <h2>
                  Déposer un poème
                </h2>

                <p>
                  Quelques vers à partager,
                  quelques lignes à faire fleurir.
                  Signé ou anonyme.
                </p>

                <button
                  type="button"
                  className="serre-button"
                  onClick={() => setActivePanel("poeme")}
                >
                  Déposer mon poème →
                </button>

              </article>

            </section>

          </>
        )}


      {/* ==========================================
          ERREUR
      ========================================== */}

      {errorMessage && (
        <section className="serre-panel">

          <div className="serre-paper">

            <button
              type="button"
              className="serre-close"
              onClick={() => setErrorMessage(false)}
              aria-label="Fermer"
            >
              ×
            </button>

            <p className="serre-paper-label">
              Oups
            </p>

            <h2>
              La graine n&apos;a pas pu être déposée.
            </h2>

            <p className="serre-paper-intro">
              Une petite erreur est survenue.
              <br />
              Vos mots sont toujours là.
            </p>

            <button
              type="button"
              className="serre-submit"
              onClick={() => setErrorMessage(false)}
            >
              Réessayer
            </button>

          </div>

        </section>
      )}


      {/* ==========================================
          MESSAGE APRÈS ENVOI
      ========================================== */}

      {message !== "none" && (
        <section className="serre-panel">

          <div className="serre-paper">

            <p className="serre-paper-label">
              Merci
            </p>

            {message === "mot" ? (
              <>
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "10px",
                  }}
                >
                  🌱
                </div>

                <h2>
                  Votre graine a été plantée.
                </h2>

                <p className="serre-paper-intro">
                  Votre mot repose maintenant
                  quelque part dans le Jardin Secret.
                </p>

                <p className="serre-paper-intro">
                  Peut-être qu&apos;un jour,
                  il rencontrera quelqu&apos;un
                  qui avait besoin de le lire.
                </p>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "10px",
                  }}
                >
                  🌸
                </div>

                <h2>
                  Votre poème a trouvé sa place.
                </h2>

                <p className="serre-paper-intro">
                  Merci d&apos;avoir laissé une part
                  de vos mots dans le Jardin Secret.
                </p>

                <p className="serre-paper-intro">
                  Il sera lu avec attention avant
                  de peut-être fleurir dans la Serre.
                </p>
              </>
            )}

            <button
              type="button"
              className="serre-submit"
              onClick={() => setMessage("none")}
            >
              Continuer la promenade
            </button>

          </div>

        </section>
      )}


      {/* ==========================================
          FORMULAIRE — MOT
      ========================================== */}

      {activePanel === "mot" && (
        <section className="serre-panel">

          <div className="serre-paper">

            <button
              type="button"
              className="serre-close"
              onClick={closePanel}
              aria-label="Fermer"
            >
              ×
            </button>

            <p className="serre-paper-label">
              Planter une graine
            </p>

            <h2>
              Quel mot voulez-vous laisser ici ?
            </h2>

            <p className="serre-paper-intro">
              Écrivez simplement ce qui vous vient.
            </p>

            <textarea
              className="serre-textarea"
              placeholder="Écrivez votre graine..."
              rows={5}
              value={mot}
              onChange={(event) =>
                setMot(event.target.value)
              }
            />

            <button
              type="button"
              className="serre-submit"
              onClick={submitMot}
              disabled={sending}
            >
              {sending
                ? "La graine prend racine..."
                : "Planter ma graine 🌱"}
            </button>

          </div>

        </section>
      )}


      {/* ==========================================
          FORMULAIRE — POÈME
      ========================================== */}

      {activePanel === "poeme" && (
        <section className="serre-panel">

          <div className="serre-paper">

            <button
              type="button"
              className="serre-close"
              onClick={closePanel}
              aria-label="Fermer"
            >
              ×
            </button>

            <p className="serre-paper-label">
              Déposer une création
            </p>

            <h2>
              Votre poème
            </h2>

            <p className="serre-paper-intro">
              Quelques lignes à partager
              avec les visiteurs du Jardin.
            </p>

            <textarea
              className="serre-textarea"
              placeholder="Écrivez votre poème..."
              rows={10}
              value={poeme}
              onChange={(event) =>
                setPoeme(event.target.value)
              }
            />

            <div className="serre-author">

              <label
                htmlFor="author"
                className="serre-label"
              >
                Votre nom ou pseudo
              </label>

              <input
                id="author"
                type="text"
                className="serre-input"
                placeholder="Facultatif"
                value={author}
                disabled={anonymous}
                onChange={(event) =>
                  setAuthor(event.target.value)
                }
              />

              <label className="serre-checkbox">

                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(event) =>
                    setAnonymous(event.target.checked)
                  }
                />

                <span>
                  Je souhaite rester anonyme
                </span>

              </label>

            </div>

            <button
              type="button"
              className="serre-submit"
              onClick={submitPoeme}
              disabled={sending}
            >
              {sending
                ? "Le poème prend racine..."
                : "Déposer mon poème 🌸"}
            </button>

          </div>

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
          « Toute fleur commence par une graine. »
        </p>

      </footer>

    </main>
  );
}