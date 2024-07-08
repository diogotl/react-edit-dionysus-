import {
    MagnifyingGlassIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";
import { ChangeEvent, useEffect, useState } from "react";
import { TableRow } from "./table-row";
import { CreateEventDialog } from "./create-event-dialog";

export function EventsList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10);

    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString());

        if (url.searchParams.has("search")) {
            return url.searchParams.get("search") ?? "";
        }

        return "";
    });

    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString());

        if (url.searchParams.has("page")) {
            return Number(url.searchParams.get("page"));
        }

        return 1;
    });

    useEffect(() => {
        const url = new URL("http://localhost:3333/events");

        url.searchParams.set("pageIndex", String(page - 1));
        if (search.length > 1) {
            url.searchParams.set("query", search);
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.events);
                setTotal(data.total);
            });
    }, [page, search]);

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());

        url.searchParams.set("page", String(page));

        window.history.pushState({}, "", url);

        setPage(page);
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        const url = new URL(window.location.toString());

        url.searchParams.set("search", search);

        window.history.pushState({}, "", url);

        setSearch(event.target.value);
        setCurrentPage(1);
    }

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToLastPage() {
        setCurrentPage(totalPages);
    }

    function goToPreviousPage() {
        setCurrentPage(page - 1);
    }

    function goToNextPage() {
        setCurrentPage(page + 1);
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3 flex-col items-center">
                <h1>Lista de Eventos</h1>
                <div className="w-full mt-4 justify-between flex">
                    <div className="px-3 w-[288px] py-1.5 border border-black/10 flex gap-1 items-center bg-transparent rounded-lg text-sm">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                        <input
                            className="bg-transparent w-full flex-1 outline-none gap-3"
                            placeholder="Pesquisar por evento"
                            value={search}
                            onChange={onSearchInputChanged}
                        />
                    </div>

                    <CreateEventDialog events={events} setEvents={setEvents} />
                </div>
            </div>
            <div className="border border-black/10 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-black/10">
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                Evento
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                Dia
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                Quantidade de Participantes
                            </th>
                            <th
                                style={{ width: 64 }}
                                className="py-3 px-4 text-sm font-semibold text-left"
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => {
                            return (
                                // <tr
                                //     key={event.id}
                                //     className="border-b border-black/10 hover:bg-black/5"
                                // >
                                //     <td className="py-3 px-4 text-sm text-zinc-300">
                                //         <input
                                //             type="checkbox"
                                //             className="size-4 bg-black/20 rounded border border-black/10"
                                //         />
                                //     </td>
                                //     <td className="py-3 px-4 text-sm text-zinc-300">
                                //         {event.id}
                                //     </td>
                                //     <td className="py-3 px-4 text-sm text-zinc-300">
                                //         <div className="flex flex-col gap-1">
                                //             <span className="font-semibold text-black">
                                //                 {event.title}
                                //             </span>
                                //             <span>{event.details}</span>
                                //         </div>
                                //     </td>
                                //     <td className="py-3 px-4 text-sm text-zinc-300">
                                //         2024
                                //     </td>
                                //     <td className="py-3 px-4 text-sm text-zinc-300">
                                //         {

                                //         }
                                //     </td>
                                //     <td className="py-3 px-4 text-sm text-zinc-300">
                                //         <button className="bg-black/20 border border-black/10 rounded-md p-1.5">
                                //             <EllipsisVerticalIcon className="size-4" />
                                //         </button>
                                //     </td>
                                // </tr>

                                <TableRow event={event} />
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                className="py-3 px-4 text-sm text-zinc-300"
                                colSpan={3}
                            >
                                10 de {events.length} participantes.
                            </td>
                            <td
                                className="py-3 px-4 text-sm text-zinc-300 text-right"
                                colSpan={3}
                            >
                                <div className="inline-flex items-center gap-8">
                                    <span>
                                        Página {page} de {totalPages}
                                    </span>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={goToFirstPage}
                                            disabled={page === 1}
                                            className="bg-black/10 border border-black/10 rounded-md p-1.5"
                                        >
                                            <ChevronDoubleLeftIcon className="size-4" />
                                        </button>
                                        <button
                                            onClick={goToPreviousPage}
                                            disabled={page === 1}
                                            className="bg-black/10 border border-black/10 rounded-md p-1.5"
                                        >
                                            <ChevronLeftIcon className="size-4" />
                                        </button>
                                        <button
                                            onClick={goToNextPage}
                                            disabled={page === totalPages}
                                            className="bg-black/10 border border-black/10 rounded-md p-1.5"
                                        >
                                            <ChevronRightIcon className="size-4" />
                                        </button>
                                        <button
                                            onClick={goToLastPage}
                                            disabled={page === totalPages}
                                            className="bg-black/10 border border-black/10 rounded-md p-1.5"
                                        >
                                            <ChevronDoubleRightIcon className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
