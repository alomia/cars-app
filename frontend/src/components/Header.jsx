import { Link, NavLink } from "react-router-dom"

function Header() {
  return (
    <header>
      <nav className="flex justify-between relative items-center font-mono h-16">
        <Link to={"/"} className="pl-8 text-xl font-bold">Cars FARM</Link>
        <div className="pr-8 font-semibold">
          <NavLink className={({ isActive }) =>
            isActive ? "active-link": p-4
          }>Home</NavLink>
          <NavLink className={({ isActive }) =>
            isActive ? "active-link": p-4
          }>Cars</NavLink>
          <NavLink className={({ isActive }) =>
            isActive ? "active-link": p-4
          }>New Cars</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
