import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

type Event = {
    id: number;
    title: string;
    details: string;
    maxAttendees: number;
    slug: string;
    date: string;
    attendeesCount: number;
};

type TableRowProps = {
    event: Event;
};

export function TableRow(props: TableRowProps) {
    function howManyTicketsLeftInPercentage() {
        const percentage =
            (props.event.attendeesCount / props.event.maxAttendees) * 100;
        const roundedPercentage = Number(percentage.toFixed(0));

        console.log(roundedPercentage);

        if (roundedPercentage >= 100) {
            return "soldOut";
        } else if (roundedPercentage >= 80) {
            return "high";
        } else {
            return "low";
        }
    }

    const available = howManyTicketsLeftInPercentage();

    const availableMap = {
        soldOut: {
            title: "Esgotado",
            color: "bg-gray-500",
            text: "text-gray-500",
        },
        high: {
            title: "Últimas vagas",
            color: "bg-green-500",
            text: "text-green-500",
        },
        low: {
            title: "Muitas vagas",
            color: "bg-red-500",
            text: "text-red-500",
        },
    };

    return (
        <tr
            key={props.event.id}
            className="border-b border-black/10 hover:bg-black/5"
        >
            {/* <td className="py-3 px-4 text-sm text-zinc-300">
                <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-black/10"
                />
            </td> */}
            {/* <td className="py-3 px-4 text-sm text-zinc-300">
                {props.event.id}
            </td> */}
            <td className="py-3 px-4 text-sm text-zinc-300">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-black">
                        {props.event.title}
                    </span>
                    <span>{props.event.details}</span>
                </div>
            </td>
            <td className="py-3 px-4 text-sm text-zinc-300">
                {props.event.date
                    ? new Date(props.event.date).toLocaleDateString("pt-PT", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                      })
                    : "A definir"}
            </td>
            <td className="py-3 px-4 text-sm text-zinc-300">
                {availableMap[available].title}
            </td>
            <td className="py-3 px-4 text-sm text-zinc-300">
                <Link to={`/events/${props.event.slug}/attendees`}>
                    <button
                        // disabled={available === "soldOut"}
                        className="bg-blue-600 text-white border border-black/10 rounded-md p-1.5 disabled:bg-black/10 disabled:text-gray-500"
                    >
                        <UserGroupIcon className="size-4" />
                    </button>
                </Link>
            </td>
        </tr>
    );
}
