"use client";

type BookProps = {
  title: string;
  content: string;
  onClose: () => void;
};

export default function Book({
  title,
  content,
  onClose,
}: BookProps) {
  return (
    <div className="book-overlay" onClick={onClose}>
      <div
        className="book"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="book-header">
          <h2>{title}</h2>
        </header>

        <div className="book-content">
          {content.split("\n").map((line, index) => (
            <p key={index}>{line || "\u00A0"}</p>
          ))}
        </div>

        <footer className="book-footer">

          <button
            className="book-navigation disabled"
            disabled
          >
            ← Précédent
          </button>

          <span className="book-page">
            1 / 1
          </span>

          <button
            className="book-navigation disabled"
            disabled
          >
            Suivant →
          </button>

          <button
            className="book-close"
            onClick={onClose}
          >
            Retour au Banc
          </button>

        </footer>
      </div>
    </div>
  );
}