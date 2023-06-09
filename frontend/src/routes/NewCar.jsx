import { useState } from "react";
import FormInput from "../components/FormInput";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function NewCar() {
  const emptyCar = {
    brand: "",
    make: "",
    year: null,
    cm3: null,
    price: null,
  };

  const inputs = [
    {
      id: "brand",
      name: "brand",
      type: "text",
      placeholder: "Brand",
      label: "Brand",
    },
    {
      id: "make",
      name: "make",
      type: "text",
      placeholder: "Make",
      label: "Make",
    },
    {
      id: "year",
      name: "year",
      type: "number",
      placeholder: "Year",
      label: "Year",
    },
    {
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Price",
      label: "Price",
    },
    {
      id: "cm3",
      name: "cm3",
      type: "number",
      placeholder: "Cm3",
      label: "Cm3",
    },
    {
      id: "km",
      name: "km",
      type: "number",
      placeholder: "km",
      label: "km",
    },
  ];

  const [newCar, setNewCar] = useState(emptyCar);
  const [error, setError] = useState([]);

  const navigate = useNavigate();


  return <Layout></Layout>;
}

export default NewCar;
