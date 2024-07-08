export type Event = {
    id: number;
    title: string;
    details: string;
    slug: string;
    maxAttendees: number;
    attendeesCount?: number;
    date: string;
};
