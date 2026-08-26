import Link from "next/link";

export default function Sentier() {
  return (
    <>
      <div className="background"></div>
      <div className="overlay"></div>

      <main className="hero">

        <div className="book">

          <h1>Le Sentier</h1>

          <p className="subtitle">
            Le jardin s'ouvre lentement devant vous...
          </p>

          <p className="quote">
            Chaque pierre garde la mémoire d'un poème.
            Chaque souffle de vent transporte une mélodie.
            Ici, on avance doucement, comme on tourne les pages d'un carnet.
          </p>

          <Link href="/banc">
            <button>
              Continuer la promenade
            </button>
          </Link>

        </div>

      </main>
    </>
  );
}