import { Link } from "react-router-dom";

function Card({ car }) {
  const { brand, price, make, year, km, cm3, _id } = car;

  return (
    <Link to={`/car/${_id}`}>
      <article className="shadow-lg p-5 flex flex-col bg-FarmWhite rounded-lg transition ease-in-out hover:scale-105 duration-300 font-mono">
        <h2 className="font-bold text-center text-lg text-FarmNavy">
          <span className="text-FarmLime">{brand}</span> {make}
        </h2>
        <p>Year: {year}</p>
        <p>Price: <span className="text-red-500">{price}</span></p>
        <p>Km: {km}</p>
        <p>Engine: {cm3}cm3</p>
      </article>
    </Link>
  );
}

export default Card;
