import { useState } from "react";

function Car() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [isPending, setIsPending] = useState(true);

  return <div>Car</div>;
}

export default Car;
