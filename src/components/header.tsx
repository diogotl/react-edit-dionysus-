import { NavLink } from "./nav-link";

export function Header() {
    return (
        <header className="flex items-center gap-5">
            {/* <img>eu sou o componente header</img> */}

            <nav className="flex items-center gap-5 ">
                <NavLink>Home</NavLink>
                <a className="font-medium text-sm" href="#">
                    Sobre
                </a>
            </nav>
        </header>
    );
}
