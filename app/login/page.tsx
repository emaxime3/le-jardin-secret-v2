"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    setErrorMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erreur de connexion :", error);
      setErrorMessage("Adresse e-mail ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="serre">

      <header className="serre-header">

        <p className="serre-type">
          Le jardinier
        </p>

        <h1>
          Connexion
        </h1>

        <p className="serre-intro">
          Entrez dans l&apos;espace réservé
          <br />
          au jardinier du Jardin Secret.
        </p>

      </header>

      <section className="serre-panel">

        <div className="serre-paper">

          <p className="serre-paper-label">
            Jardin Secret
          </p>

          <h2>
            Bienvenue, jardinier 🌱
          </h2>

          <form onSubmit={handleLogin}>

            <div className="serre-author">

              <label
                htmlFor="email"
                className="serre-label"
              >
                Adresse e-mail
              </label>

              <input
                id="email"
                type="email"
                className="serre-input"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                autoComplete="email"
              />

            </div>

            <div className="serre-author">

              <label
                htmlFor="password"
                className="serre-label"
              >
                Mot de passe
              </label>

              <input
                id="password"
                type="password"
                className="serre-input"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                autoComplete="current-password"
              />

            </div>

            {errorMessage && (
              <p
                role="alert"
                style={{
                  marginTop: "16px",
                }}
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="serre-submit"
              disabled={loading}
            >
              {loading
                ? "Connexion..."
                : "Entrer dans le jardinier 🌿"}
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}