"use client";

import { useState } from "react";
import Book from "./Book";

type CarnetProps = {
  titre: string;
  description: string;
};

export default function Carnet({
  titre,
  description,
}: CarnetProps) {
  const [ouvert, setOuvert] = useState(false);

  const poeme = `On ne voit bien qu’avec le cœur…

Je l’ai longtemps trouvée jolie, cette phrase,
sans comprendre qu’elle était un avertissement.

Parce qu’on regarde les visages,
mais rarement les âmes.

On entend les mots,
mais pas les silences
qui demandent à être compris.

Je pensais connaître ton histoire,
parce que je connaissais tes jours.
Mais je n’avais pas vu
les nuits que tu traversais seul.

Je n’avais pas vu les tempêtes
derrière ton calme.

on ne connaît jamais vraiment quelqu’un
tant qu’on n’a pas regardé
derrière ses blessures.

J’ai entendu tes mots,
mais pas tout ce que tu n’arrivais pas à dire.

J’ai tenu ta main,
sans toujours sentir
le poids qu’elle portait.

Aujourd’hui, mes yeux cherchent encore ton visage,
mon cœur cherche celui
que je n’ai pas pris assez de temps à connaître.

Peut-être qu’on ne perd pas toujours les gens
parce qu’ils cessent de nous aimer…

Parfois, on les perd
parce qu’on n’a pas su les voir
avant qu’ils disparaissent.`;

  return (
    <>
      <div
        className="carnet-card"
        onClick={() => setOuvert(true)}
      >
        <div className="carnet-icon">
          📖
        </div>

        <h2>{titre}</h2>

        <p className="carnet-text">
          {description}
        </p>

        <span className="open-carnet">
          Ouvrir le carnet →
        </span>
      </div>

      {ouvert && (
        <Book
          title="L’âme"
          content={poeme}
          onClose={() => setOuvert(false)}
        />
      )}
    </>
  );
}