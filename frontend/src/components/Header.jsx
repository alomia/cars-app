import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="flex justify-between relative items-center font-mono h-16 shadow-md">
        <Link to="/" className="pl-8 text-xl font-bold">
          Cars FARM
        </Link>
        <div className="pr-8 font-semibold">
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "p-4")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "p-4")}
            to="/cars"
          >
            Cars
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "p-4")}
            to="/new"
          >
            New Car
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
