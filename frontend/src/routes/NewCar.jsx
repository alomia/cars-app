import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";

const BASE_URL = "http://localhost:8080/car";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addCar(newCar);
  };

  const onChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    setNewCar(emptyCar);
  };

  const addCar = async (newCar) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    });

    const data = await response.json();

    if (!response.ok) {
      let errArray = data.detail.map((el) => {
        return `${el.loc[1]}`;
      });
      setError(errArray);
    } else {
      setError([]);
      navigate("/cars");
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-center text-lg my-2 font-bold">Insert a New Car</h1>
      </div>

      {error.length > 0 && (
        <ul className="flex flex-row mx-auto text-center">
          {error.map((el, index) => (
            <li
              key={index}
              className="my-2 ml-2 p-1 border-2 rounded-md border-red-700 max-w-md mx-auto bg-red-100 text-red-800"
            >
              {el}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-row align-middle justify-center">
        <form onSubmit={handleSubmit} className="max-w-lg w-full">
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              name={input.name}
              {...input}
              value={newCar[input.name]}
              onChange={onChange}
              required
            />
          ))}

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-yellow-500 mt-4 w-full text-white rounded-md py-2"
          >
            Insert
          </button>
          <button
            type="reset"
            onClick={handleReset}
            className="bg-black mt-2 mb-2 w-full text-white rounded-md py-2"
          >
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default NewCar;
