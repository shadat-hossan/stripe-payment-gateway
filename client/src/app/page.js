import Image from "next/image";
import styles from "./page.module.css";
import NaveBar from "./components/naveBar/NaveBar";
import Products from "./components/products/Products";

export default function Home() {
  return (
    <>
      <header>
        <NaveBar />
      </header>
      <main>
        <Products />
      </main>

    </>
  );
}
