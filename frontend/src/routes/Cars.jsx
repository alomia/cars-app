import Layout from "../components/Layout";
import { useEffect, useState } from "react";

function Cars() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    async function fetchBrand() {
      try {
        const response = await fetch(
          `http://localhost:8080/car/?brand=${brand}`
        );
        const json = await response.json();
        setCars(json)
        setIsPending(false)
        console.log("hola")
      } catch (error) {
        console.log(`Error getting brand: ${error}`);
      }
    }

    fetchBrand();
  }, [brand]);

  return (
    <Layout>
      <h1>Cars List:</h1>
    </Layout>
  )
}

export default Cars;
