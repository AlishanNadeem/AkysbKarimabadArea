import images from "../assets/images"

export const DEFAULT_COUNTRY = {
    code: "US",
    calling_code: "+1",
}

export const USER = {
    name: "Lewis Hilton",
    email: "hilton.lewis@gmail.com",
    phone: "+1 646 898-0885",
    image: images.avatar_one,
    date_of_birth: "11/15/1966",
    emergency_notes: "I have diabetes and keep insulin in the fridge."
}

export const CONTACTS = [
    {
        id: "1",
        name: "Sarah Doe",
        relation: "Daughter",
        phone: "555-0101"
    },
    {
        id: "2",
        name: "Michael Doe",
        relation: "Son",
        phone: "555-0102"
    },
    {
        id: "3",
        name: "Emma Doe",
        relation: "Wife",
        phone: "555-0103"
    },
    {
        id: "4",
        name: "Robert Doe",
        relation: "Father",
        phone: "555-0104"
    },
    {
        id: "5",
        name: "Linda Doe",
        relation: "Mother",
        phone: "555-0105"
    },
]

export const NOTIFICATIONS = [
    {
        id: 1,
        read: false,
        title: "New Message",
        description: "You have received a new message from John.",
        date: "2026-04-13",
        time: "08:30 PM"
    },
    {
        id: 2,
        read: true,
        title: "Order Confirmed",
        description: "Your order #12345 has been successfully placed.",
        date: "2026-04-12",
        time: "06:15 PM"
    },
    {
        id: 3,
        read: false,
        title: "Password Changed",
        description: "Your password was updated successfully.",
        date: "2026-04-11",
        time: "02:45 PM"
    },
    {
        id: 4,
        read: true,
        title: "New Offer",
        description: "Get 20% off on your next purchase.",
        date: "2026-04-10",
        time: "11:00 AM"
    },
    {
        id: 5,
        read: false,
        title: "Account Alert",
        description: "Suspicious login detected. Please verify your account.",
        date: "2026-04-09",
        time: "09:20 PM"
    }
]

export const EVENT_TYPES = [
    { value: "area", label: "Area" },
    { value: "local", label: "Local" },
    { value: "regional", label: "Regional" },
]

export const EVENTS = [
    {
        id: "1",
        _id: "1",
        name: "Karimabad Sports Day",
        description: "Annual sports event for youth members across the jamat.",
        type: "local",
        status: "published",
        date: {
            from: "2026-07-15T00:00:00",
            to: "2026-07-15T00:00:00",
        },
        time: {
            from: "09:00",
            to: "17:00",
        },
        venue: "Karimabad Ground",
        fees: 500,
        is_free: false,
        age: {
            from: 12,
            to: 25,
        },
        max_registrations: {
            enabled: true,
            limit: 100,
        },
        registration_deadline: "2026-07-10T00:00:00",
        image: images.dummy,
    },
    {
        id: "2",
        _id: "2",
        name: "Youth Leadership Workshop",
        description: "Interactive sessions on leadership and community service.",
        type: "local",
        status: "published",
        date: {
            from: "2026-08-02T00:00:00",
            to: "2026-08-02T00:00:00",
        },
        time: {
            from: "10:00",
            to: "14:00",
        },
        venue: "AKYSB Community Hall",
        fees: 0,
        is_free: true,
        age: {
            from: 16,
            to: 30,
        },
        max_registrations: {
            enabled: true,
            limit: 50,
        },
        registration_deadline: "2026-07-28T00:00:00",
        image: images.dummy,
    },
    {
        id: "3",
        _id: "3",
        name: "Regional Football Tournament",
        description: "Inter-jamat football competition for regional teams.",
        type: "regional",
        status: "published",
        date: {
            from: "2026-09-10T00:00:00",
            to: "2026-09-12T00:00:00",
        },
        time: {
            from: "08:00",
            to: "18:00",
        },
        venue: "City Sports Complex",
        fees: 300,
        is_free: false,
        age: {
            from: 14,
            to: 22,
        },
        max_registrations: {
            enabled: true,
            limit: 200,
        },
        registration_deadline: "2026-09-01T00:00:00",
        image: images.dummy,
    },
]

export const HOME_STATS = [
    { id: "1", label: "Upcoming", value: "5", icon: images.calendar },
    { id: "2", label: "Registered", value: "2", icon: images.check_badge },
    { id: "3", label: "This Month", value: "8", icon: images.clock },
]

export const HOME_UPCOMING_EVENTS = EVENTS

export const PAYMENT_METHODS = [
    { value: "cash", label: "Cash" },
    { value: "online_transfer", label: "Online Transfer" },
]

export const REGISTRATION_STATUSES = [
    { value: "active", label: "Active" },
    { value: "cancelled", label: "Cancelled" },
]

export const PAYMENT_STATUSES = [
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
]