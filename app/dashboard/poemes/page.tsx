"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Poeme = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
};

export default function PoemesAdmin() {
  const router = useRouter();

  const [poemes, setPoemes] = useState<Poeme[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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

  async function loadPoemes() {
    const isLoggedIn = await checkUser();

    if (!isLoggedIn) {
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("poemes")
      .select("id, title, content, published, created_at")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Erreur chargement poèmes :", error);
      setMessage("Impossible de charger les poèmes.");
      setLoading(false);
      return;
    }

    setPoemes(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadPoemes();
  }, []);

  function resetForm() {
    setTitle("");
    setContent("");
    setPublished(false);
    setEditingId(null);
    setMessage("");
  }

  function editPoeme(poeme: Poeme) {
    setEditingId(poeme.id);
    setTitle(poeme.title);
    setContent(poeme.content);
    setPublished(poeme.published);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function savePoeme(event: React.FormEvent) {
    event.preventDefault();

    const isLoggedIn = await checkUser();

    if (!isLoggedIn) {
      return;
    }

    if (!title.trim() || !content.trim()) {
      setMessage("Le titre et le texte sont obligatoires.");
      return;
    }

    setSaving(true);
    setMessage("");

    if (editingId) {
      const { error } = await supabase
        .from("poemes")
        .update({
          title: title.trim(),
          content: content.trim(),
          published,
        })
        .eq("id", editingId);

      if (error) {
        console.error("Erreur modification poème :", error);
        setMessage("Impossible de modifier le poème.");
        setSaving(false);
        return;
      }

      setMessage("🌸 Le poème a été modifié.");
    } else {
      const { error } = await supabase
        .from("poemes")
        .insert({
          title: title.trim(),
          content: content.trim(),
          published,
        });

      if (error) {
        console.error("Erreur création poème :", error);
        setMessage("Impossible d'enregistrer le poème.");
        setSaving(false);
        return;
      }

      setMessage("🌸 Le poème a été ajouté au jardin.");
    }

    resetForm();
    await loadPoemes();

    setSaving(false);
  }

  async function deletePoeme(id: string) {
    const isLoggedIn = await checkUser();

    if (!isLoggedIn) {
      return;
    }

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce poème ?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("poemes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erreur suppression poème :", error);
      setMessage("Impossible de supprimer le poème.");
      return;
    }

    setPoemes((current) =>
      current.filter((poeme) => poeme.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }

    setMessage("🗑️ Le poème a été supprimé.");
  }

  async function togglePublished(poeme: Poeme) {
    const isLoggedIn = await checkUser();

    if (!isLoggedIn) {
      return;
    }

    const { error } = await supabase
      .from("poemes")
      .update({
        published: !poeme.published,
      })
      .eq("id", poeme.id);

    if (error) {
      console.error(
        "Erreur publication poème :",
        error
      );
      setMessage("Impossible de modifier la publication.");
      return;
    }

    setPoemes((current) =>
      current.map((item) =>
        item.id === poeme.id
          ? {
              ...item,
              published: !item.published,
            }
          : item
      )
    );

    setMessage(
      !poeme.published
        ? "🌸 Le poème est maintenant publié."
        : "🌱 Le poème est maintenant privé."
    );
  }

  if (loading) {
    return (
      <main className="serre">

        <header className="serre-header">
          <p className="serre-type">
            Le jardinier
          </p>

          <h1>
            Mes Poèmes
          </h1>

          <p className="serre-intro">
            Ouverture de ton carnet...
            <br />
            📝
          </p>
        </header>

      </main>
    );
  }

  return (
    <main className="serre">

      <header className="serre-header">

        <p className="serre-type">
          Tes écrits
        </p>

        <h1>
          Mes Poèmes
        </h1>

        <p className="serre-intro">
          Ici reposent les mots que tu as choisi
          <br />
          de faire pousser dans ton Jardin Secret.
        </p>

      </header>


      {/* ==========================================
          FORMULAIRE
      ========================================== */}

      <section className="serre-panel">

        <div className="serre-paper">

          <p className="serre-paper-label">
            {editingId
              ? "Modifier un poème"
              : "Nouveau poème"}
          </p>

          <h2>
            {editingId
              ? "Faire évoluer tes mots"
              : "Planter un nouveau poème"}
          </h2>

          <form onSubmit={savePoeme}>

            <div className="serre-author">

              <label
                htmlFor="title"
                className="serre-label"
              >
                Titre
              </label>

              <input
                id="title"
                type="text"
                className="serre-input"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Le titre de ton poème"
                required
              />

            </div>


            <div className="serre-author">

              <label
                htmlFor="content"
                className="serre-label"
              >
                Poème
              </label>

              <textarea
                id="content"
                className="serre-input"
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
                placeholder="Écris ton poème ici..."
                required
                rows={12}
                style={{
                  resize: "vertical",
                  minHeight: "220px",
                }}
              />

            </div>


            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            >

              <input
                type="checkbox"
                checked={published}
                onChange={(event) =>
                  setPublished(event.target.checked)
                }
              />

              <span>
                Publier ce poème sur le Jardin
              </span>

            </label>


            {message && (
              <p
                role="status"
                style={{
                  marginTop: "18px",
                }}
              >
                {message}
              </p>
            )}


            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "24px",
              }}
            >

              <button
                type="submit"
                className="serre-submit"
                disabled={saving}
              >
                {saving
                  ? "Le jardin travaille..."
                  : editingId
                    ? "Enregistrer les modifications"
                    : "Ajouter le poème 🌸"}
              </button>


              {editingId && (
                <button
                  type="button"
                  className="serre-button"
                  onClick={resetForm}
                >
                  Annuler
                </button>
              )}

            </div>

          </form>

        </div>

      </section>


      {/* ==========================================
          LISTE DES POÈMES
      ========================================== */}

      <section className="serre-spaces">

        {poemes.length === 0 ? (

          <article className="serre-space">

            <div className="serre-icon">
              🌱
            </div>

            <p className="serre-space-type">
              Ton carnet est vide
            </p>

            <h2>
              Aucun poème pour le moment.
            </h2>

            <p>
              Écris ton premier poème ci-dessus
              et laisse-le prendre racine.
            </p>

          </article>

        ) : (

          poemes.map((poeme) => (

            <article
              key={poeme.id}
              className="serre-space"
            >

              <div className="serre-icon">
                {poeme.published
                  ? "🌸"
                  : "🌱"}
              </div>

              <p className="serre-space-type">
                {poeme.published
                  ? "Publié"
                  : "Privé"}
              </p>

              <h2>
                {poeme.title}
              </h2>

              <p
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {poeme.content}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >

                <button
                  type="button"
                  className="serre-button"
                  onClick={() =>
                    editPoeme(poeme)
                  }
                >
                  ✏️ Modifier
                </button>

                <button
                  type="button"
                  className="serre-button"
                  onClick={() =>
                    togglePublished(poeme)
                  }
                >
                  {poeme.published
                    ? "🌱 Rendre privé"
                    : "🌸 Publier"}
                </button>

                <button
                  type="button"
                  className="serre-button"
                  onClick={() =>
                    deletePoeme(poeme.id)
                  }
                >
                  🗑️ Supprimer
                </button>

              </div>

            </article>

          ))

        )}

      </section>


      {/* ==========================================
          RETOUR
      ========================================== */}

      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >

        <button
          type="button"
          className="serre-button"
          onClick={() =>
            router.push("/dashboard")
          }
        >
          ← Retour au Jardinier
        </button>

      </footer>

    </main>
  );
}