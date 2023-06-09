import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loading from "../components/Loading";

const BASE_URL = "http://localhost:8080/car"

function Cars() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [isPending, setIsPending] = useState(true);

  const handleChangeBrand = (e) => {
    setCars([]);
    setBrand(e.target.value);
    setIsPending(true);
  };

  const handleChangePage = (ev) => {
    setCars([]);
    setPage(ev.target.value);
    setIsPending(true);
  };

  useEffect(() => {
    async function fetchBrand(url) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCars(json);
        setIsPending(false);
      } catch (error) {
        console.log(`Error getting brand: ${error}`);
      }
    }

    fetchBrand(`${BASE_URL}/?brand=${brand}`);
  }, [brand]);

  return (
    <Layout>
      <h2 className="font-bold font-mono text-lg text-center my-4">
        Cars - {brand ? brand : "all brands"}
      </h2>
      <div className="mx-8">
        <label htmlFor="cars">Choose a brand: </label>
        <select name="cars" id="cars" onChange={handleChangeBrand}>
          <option value="">All cars</option>
          <option value="Fiat">Fiat</option>
          <option value="Citroen">Citroen</option>
          <option value="Renault">Renault</option>
          <option value="Opel">Opel</option>
        </select>
        <label htmlFor="cars">Choose a page: </label>
        <select name="page" id="page" onChange={handleChangePage}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="mx-8">
        {isPending && <Loading brand={brand} />}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cars &&
            cars.map((car) => {
              return <Card key={car._id} car={car} />;
            })}
        </div>
      </div>
    </Layout>
  );
}

export default Cars;
