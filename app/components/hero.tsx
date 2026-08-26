import Link from "next/link";
import Fireflies from "./Fireflies";
export default function Hero() {
  return (
 <section className="hero">

    <Fireflies />

    <p className="intro"> 
        Bienvenue
      </p>

      <h1>
        Le Jardin Secret
      </h1>

      <p className="subtitle">
        Là où les mots prennent racine,
        les silences deviennent des chansons,
        et chaque sentier raconte une partie de mon âme.
      </p>

    
      
      <Link href="/jardin" className="enter">
  Entrer dans le jardin
</Link>

    </section>
  );
}