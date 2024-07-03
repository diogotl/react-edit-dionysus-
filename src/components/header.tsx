import { Link, useLocation } from "react-router-dom";

export function Header() {
    const location = useLocation();
    const isEventSelected = location.pathname.includes("/events");
    const isParticipantSelected = location.pathname.includes("/attendees");

    return (
        <header className="flex items-center gap-5">
            <nav className="flex items-center gap-5">
                <Link to="/events" className="text-black">
                    <div
                        className={
                            "font-medium text-sm" &&
                            isEventSelected &&
                            !isParticipantSelected
                                ? "underline-offset-8 underline"
                                : ""
                        }
                    >
                        Eventos
                    </div>
                </Link>

                <div
                    className={
                        isParticipantSelected
                            ? "underline-offset-8 underline"
                            : ""
                    }
                >
                    Participantes
                </div>
            </nav>
        </header>
    );
}
