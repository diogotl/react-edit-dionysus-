import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Loading } from "./loading";
import { z } from "zod";
import { XMarkIcon } from "@heroicons/react/16/solid";

type CreateAttendeeDialogProps = {
    attendeesCount: number;
    maxAttendees: number;
};

export function CreateAttendeeDialog({
    attendeesCount = 0,
    maxAttendees = 0,
}: CreateAttendeeDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [errors, setErrors] = useState({});

    function handleCreateNewAttendee(event) {
        event.preventDefault();

        if (!name) {
            setErrors({ title: "Name is required" });
            return;
        }

        const createAttendeeSchema = z.object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email().min(1, "Email is required"),
        });

        const createAttendeeData = createAttendeeSchema.safeParse({
            name,
            email,
        });

        if (!createAttendeeData.success) {
            const fieldErrors = createAttendeeData.error.flatten().fieldErrors;
            setErrors(fieldErrors as Record<string, string>);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        console.log("Creating new attendee");
        setIsLoading(false);
    }

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger asChild>
                <button
                    disabled={attendeesCount >= maxAttendees}
                    onClick={() => setIsOpen(true)}
                    className="text-white disabled:bg-neutral-400 bg-purple-400 hover:bg-purple-400/80 transition-colors border-2 rounded-lg inline-flex h-[35px] items-center justify-center rounded-xs px-4 font-medium leading-none focus:outline-none"
                >
                    Sign Up for Event
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
                        onSubmit={handleCreateNewAttendee}
                        className="flex flex-col gap-3"
                    >
                        <fieldset className="flex flex-col">
                            <div className="mb-2 flex items-center gap-5">
                                <label
                                    className="text-black w-[90px] text-right text-[15px]"
                                    htmlFor="username"
                                >
                                    Name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="text-black focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                />
                            </div>
                            <span className="text-sm text-red-500 self-end h-3">
                                {errors.name}
                            </span>
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <div className="mb-2 flex items-center gap-5">
                                <label
                                    className="text-black w-[90px] text-right text-[15px]"
                                    htmlFor="username"
                                >
                                    E-Mail
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-black focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                />
                            </div>
                            <span className="text-sm text-red-500 self-end h-3">
                                {errors.email}
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
