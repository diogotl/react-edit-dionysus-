import { AtendeeList } from "./components/atendee-list";
import { Header } from "./components/header";

export function App() {
    return (
        <div className="flex max-w-[1280px] mx-auto py-5 flex-col gap-5">
            <Header />
            <AtendeeList />
        </div>
    );
}
