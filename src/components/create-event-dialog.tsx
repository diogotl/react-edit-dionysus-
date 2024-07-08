import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Event } from "../@types/Event";
import { Loading } from "./loading";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { z } from "zod";

type CreateEventDialogProps = {
    events: Event[];
    setEvents: (events: Event[]) => void;
};

const createEventSchema = z.object({
    title: z.string().min(6).max(30),
    details: z.string().optional(),
    maxAttendees: z.number().positive().max(50),
    date: z.string(),
});

export function CreateEventDialog(props: CreateEventDialogProps) {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [maxAttendees, setMaxAttendees] = useState(0);
    const [date, setDate] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    async function handleCreateNewEvent(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setIsLoading(true);
        setErrors({});

        const createEventData = createEventSchema.safeParse({
            title,
            details,
            maxAttendees,
            date,
        });

        if (!createEventData.success) {
            const fieldErrors = createEventData.error.flatten().fieldErrors;
            setErrors(fieldErrors as Record<string, string>);
            setIsLoading(false);
            return;
        }

        await fetch("http://localhost:3333/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createEventData.data),
        })
            .then(async (response) => await response.json())
            .then((data) => {
                if (!data.error) {
                    props.setEvents([
                        {
                            id: data.id,
                            title: data.title,
                            details: data.details,
                            slug: data.slug,
                            date: data.date,
                            maxAttendees: data.maxAttendees,
                            attendeesCount: 0,
                        },
                        ...props.events,
                    ]);

                    setTimeout(() => {
                        setIsOpen(false);
                    }, 1500);
                } else {
                    setErrors({ error: data.error });
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger asChild>
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-white bg-purple-400 hover:bg-purple-400/80 transition-colors border-2 rounded-lg inline-flex h-[35px] items-center justify-center rounded-xs px-4 font-medium leading-none focus:outline-none"
                >
                    Create Event
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 focus:outline-none">
                    <Dialog.Title className="text-black m-0 text-xl font-medium">
                        Create Event
                    </Dialog.Title>
                    <Dialog.Description className="text-black mt-3 mb-5 text-md leading-normal">
                        Fill in the fields below to create a new event.
                    </Dialog.Description>
                    <form
                        onSubmit={handleCreateNewEvent}
                        className="flex flex-col gap-3"
                    >
                        <fieldset className="flex flex-col">
                            <div className="mb-2 flex items-center gap-5">
                                <label
                                    className="text-black w-[90px] text-right text-[15px]"
                                    htmlFor="username"
                                >
                                    Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-black focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                />
                            </div>
                            <span className="text-sm text-red-500 self-end h-3">
                                {errors.title}
                            </span>
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <div className="mb-2 flex items-center gap-5">
                                <label
                                    className="text-black w-[90px] text-right text-[15px]"
                                    htmlFor="name"
                                >
                                    Details
                                </label>
                                <textarea
                                    value={details}
                                    rows={3}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="text-black border border-black resize-none inline-flex w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] outline-none"
                                />
                            </div>
                            <span className="text-sm self-end h-3">
                                {errors.details}
                            </span>
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <div className="mb-2 flex items-center gap-5">
                                <label
                                    className="text-violet11 w-[90px] text-right text-[15px]"
                                    htmlFor="name"
                                >
                                    Max Attendees
                                </label>
                                <input
                                    value={maxAttendees}
                                    onChange={(e) =>
                                        setMaxAttendees(Number(e.target.value))
                                    }
                                    type="number"
                                    min={0}
                                    className="text-violet11 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                />
                            </div>
                            <span className="text-sm self-end h-3">
                                {errors.maxAttendees}
                            </span>
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <div className="mb-2 flex items-center gap-5">
                                <label
                                    className="black w-[90px] text-right text-[15px]"
                                    htmlFor="name"
                                >
                                    Date
                                </label>
                                <input
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    type="date"
                                    className="text-black focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                />
                            </div>
                            <span className="text-sm self-end h-3">
                                {errors.date}
                            </span>
                        </fieldset>
                        <p className="text-red-500 h-6 text-sm">
                            {errors.error}
                        </p>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="submit"
                                className="bg-green-400 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                            >
                                {isLoading ? <Loading /> : <h1>Save</h1>}
                            </button>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <XMarkIcon />
                            </button>
                        </Dialog.Close>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
