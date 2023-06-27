import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const mobileMenu = () => {
    document.querySelector("#mobile-menu").classList.toggle("hidden");
  };
  const mobileMenuClose = () => {
    document.querySelector("#mobile-menu").classList.add("hidden");
  };

  return (
    <header className="flex justify-between bg-slate-900 items-center p-5 px-4 md:px-40">
      <nav className="hidden md:flex md:items-center ">
        <ul className="flex text-sm md:text-xl">
          <li className="mx-3 border-b-2 border-white/[0] hover:border-white/[100] ">
            <NavLink
              to="/"
              className={(navData) =>
                navData.isActive ? "border-b-2  border-white" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li className="mx-3 border-b-2 border-white/[0] hover:border-white/[100] ">
            <NavLink
              to="/myprofile"
              className={(navData) =>
                navData.isActive ? "border-b-2  border-white" : ""
              }
            >
              Meu Perfil
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="md:hidden flex mr-2">
        <button onClick={mobileMenu} className=" md:hidden">
          <AiOutlineMenu className="text-3xl" />
        </button>
      </div>
      <ul
        id="mobile-menu"
        className="hidden absolute z-10 top-16 left-0 bg-slate-900 w-full flex flex-col items-center"
      >
        <li onClick={mobileMenuClose} className="p-3">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "border-b-2  border-white" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li onClick={mobileMenuClose} className="p-3">
          <NavLink
            to="/myprofile"
            className={(navData) =>
              navData.isActive ? "border-b-2  border-white" : ""
            }
          >
            Meu Perfil
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
