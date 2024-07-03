import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function AppLayout() {
    return (
        <div className="flex max-w-[1280px] mx-auto py-5 flex-col gap-5">
            <Header />
            <Outlet />
        </div>
    );
}
