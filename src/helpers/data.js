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
    { value: "pending", label: "Unpaid" },
    { value: "paid", label: "Paid" },
]

export const MOCK_PARTICIPANTS = [
    {
        _id: "p1",
        id: "p1",
        name: "Ahmed Khan",
        age: 22,
        membership_id: "AK-1024",
        jamatkhana: "Karimabad Jamatkhana",
        phone: {
            country_code: "PK",
            dialing_code: "+92",
            number: "3001234567",
        },
        whatsapp: {
            country_code: "PK",
            dialing_code: "+92",
            number: "3001234567",
        },
        emergency_contact: {
            name: "Fatima Khan",
            relation: "Mother",
            phone: {
                country_code: "PK",
                dialing_code: "+92",
                number: "3009876543",
            },
        },
    },
    {
        _id: "p2",
        id: "p2",
        name: "Sara Ali",
        age: 18,
        membership_id: "AK-2048",
        jamatkhana: "Garden East Jamatkhana",
        phone: {
            country_code: "PK",
            dialing_code: "+92",
            number: "3215551234",
        },
        whatsapp: {
            country_code: "PK",
            dialing_code: "+92",
            number: "3215551234",
        },
        emergency_contact: {
            name: "Ali Raza",
            relation: "Father",
            phone: {
                country_code: "PK",
                dialing_code: "+92",
                number: "3215559876",
            },
        },
    },
    {
        _id: "p3",
        id: "p3",
        name: "Hassan Malik",
        age: 25,
        membership_id: "AK-3072",
        jamatkhana: "Karimabad Jamatkhana",
        phone: {
            country_code: "US",
            dialing_code: "+1",
            number: "6468980885",
        },
        whatsapp: {
            country_code: "US",
            dialing_code: "+1",
            number: "6468980885",
        },
        emergency_contact: {
            name: "Amina Malik",
            relation: "Sister",
            phone: {
                country_code: "US",
                dialing_code: "+1",
                number: "6468980999",
            },
        },
    },
    {
        _id: "p4",
        id: "p4",
        name: "Omar Khan",
        age: 19,
        membership_id: "AK-1025",
        jamatkhana: "Karimabad Jamatkhana",
        phone: {
            country_code: "PK",
            dialing_code: "+92",
            number: "3001234567",
        },
        whatsapp: {
            country_code: "PK",
            dialing_code: "+92",
            number: "3001234567",
        },
        emergency_contact: {
            name: "Fatima Khan",
            relation: "Mother",
            phone: {
                country_code: "PK",
                dialing_code: "+92",
                number: "3009876543",
            },
        },
    },
]

export const MOCK_REGISTRATIONS = [
    {
        _id: "reg1",
        id: "reg1",
        event: "1",
        status: "active",
        created_at: "2026-06-20T10:30:00",
        participants: [
            {
                participant: "p1",
                is_existing: true,
                participant_data: {
                    name: "Ahmed Khan",
                    age: 22,
                    membership_id: "AK-1024",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3001234567" },
                },
            },
            {
                participant: "p4",
                is_existing: true,
                participant_data: {
                    name: "Omar Khan",
                    age: 19,
                    membership_id: "AK-1025",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3001234567" },
                },
            },
        ],
        amount_paid: 1000,
        payment: {
            status: "pending",
            method: "",
            notes: "",
            amount_paid: 1000,
        },
    },
    {
        _id: "reg2",
        id: "reg2",
        event: "1",
        status: "active",
        created_at: "2026-06-22T14:15:00",
        participants: [
            {
                participant: "p2",
                is_existing: true,
                participant_data: {
                    name: "Sara Ali",
                    age: 18,
                    membership_id: "AK-2048",
                    jamatkhana: "Garden East Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3215551234" },
                },
            },
        ],
        amount_paid: 500,
        payment: {
            status: "paid",
            method: "cash",
            notes: "",
            amount_paid: 500,
        },
    },
    {
        _id: "reg3",
        id: "reg3",
        event: "1",
        status: "cancelled",
        created_at: "2026-06-18T09:00:00",
        participants: [
            {
                participant: "p3",
                is_existing: true,
                participant_data: {
                    name: "Hassan Malik",
                    age: 25,
                    membership_id: "AK-3072",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "US", dialing_code: "+1", number: "6468980885" },
                },
            },
        ],
        amount_paid: 500,
        payment: {
            status: "paid",
            method: "cash",
            notes: "Cancelled after payment",
            amount_paid: 500,
        },
    },
    {
        _id: "reg4",
        id: "reg4",
        event: "2",
        status: "active",
        created_at: "2026-07-01T11:00:00",
        participants: [
            {
                participant: "p1",
                is_existing: true,
                participant_data: {
                    name: "Ahmed Khan",
                    age: 22,
                    membership_id: "AK-1024",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3001234567" },
                },
            },
        ],
        amount_paid: 0,
        payment: {
            status: "paid",
            method: "",
            notes: "",
            amount_paid: 0,
        },
    },
    {
        _id: "reg5",
        id: "reg5",
        event: "2",
        status: "active",
        created_at: "2026-07-02T16:45:00",
        participants: [
            {
                participant: "p2",
                is_existing: true,
                participant_data: {
                    name: "Sara Ali",
                    age: 18,
                    membership_id: "AK-2048",
                    jamatkhana: "Garden East Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3215551234" },
                },
            },
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Zainab Hussain",
                    age: 20,
                    membership_id: "",
                    jamatkhana: "Garden East Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3334445566" },
                },
            },
        ],
        amount_paid: 0,
        payment: {
            status: "paid",
            method: "",
            notes: "",
            amount_paid: 0,
        },
    },
    {
        _id: "reg6",
        id: "reg6",
        event: "3",
        status: "active",
        created_at: "2026-06-25T08:30:00",
        participants: [
            {
                participant: "p1",
                is_existing: true,
                participant_data: {
                    name: "Ahmed Khan",
                    age: 22,
                    membership_id: "AK-1024",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3001234567" },
                },
            },
        ],
        amount_paid: 300,
        payment: {
            status: "pending",
            method: "",
            notes: "Will pay at venue",
            amount_paid: 300,
        },
    },
    {
        _id: "reg7",
        id: "reg7",
        event: "3",
        status: "active",
        created_at: "2026-06-28T13:20:00",
        participants: [
            {
                participant: "p3",
                is_existing: true,
                participant_data: {
                    name: "Hassan Malik",
                    age: 25,
                    membership_id: "AK-3072",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "US", dialing_code: "+1", number: "6468980885" },
                },
            },
            {
                participant: "p4",
                is_existing: true,
                participant_data: {
                    name: "Omar Khan",
                    age: 19,
                    membership_id: "AK-1025",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3001234567" },
                },
            },
        ],
        amount_paid: 600,
        payment: {
            status: "paid",
            method: "online_transfer",
            notes: "",
            amount_paid: 600,
        },
    },
    {
        _id: "reg8",
        id: "reg8",
        event: "3",
        status: "active",
        created_at: "2026-06-30T17:00:00",
        participants: [
            {
                participant: "p2",
                is_existing: true,
                participant_data: {
                    name: "Sara Ali",
                    age: 18,
                    membership_id: "AK-2048",
                    jamatkhana: "Garden East Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3215551234" },
                },
            },
        ],
        amount_paid: 300,
        payment: {
            status: "pending",
            method: "",
            notes: "",
            amount_paid: 300,
        },
    },
    {
        _id: "reg9",
        id: "reg9",
        event: "1",
        status: "active",
        created_at: "2026-06-24T09:15:00",
        participants: [
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Bilal Raza",
                    age: 21,
                    membership_id: "AK-4096",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3123456789" },
                },
            },
        ],
        amount_paid: 500,
        payment: {
            status: "pending",
            method: "",
            notes: "",
            amount_paid: 500,
        },
    },
    {
        _id: "reg10",
        id: "reg10",
        event: "1",
        status: "active",
        created_at: "2026-06-26T11:30:00",
        participants: [
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Ayesha Noor",
                    age: 17,
                    membership_id: "AK-5120",
                    jamatkhana: "Garden East Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3223344556" },
                },
            },
        ],
        amount_paid: 500,
        payment: {
            status: "paid",
            method: "online_transfer",
            notes: "",
            amount_paid: 500,
        },
    },
    {
        _id: "reg11",
        id: "reg11",
        event: "2",
        status: "active",
        created_at: "2026-07-03T10:00:00",
        participants: [
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Kamran Siddiqui",
                    age: 24,
                    membership_id: "AK-6144",
                    jamatkhana: "AKYSB Community Hall",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3331122334" },
                },
            },
        ],
        amount_paid: 0,
        payment: {
            status: "paid",
            method: "",
            notes: "",
            amount_paid: 0,
        },
    },
    {
        _id: "reg12",
        id: "reg12",
        event: "2",
        status: "active",
        created_at: "2026-07-04T14:20:00",
        participants: [
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Fatima Tariq",
                    age: 19,
                    membership_id: "AK-7168",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3445566778" },
                },
            },
        ],
        amount_paid: 0,
        payment: {
            status: "pending",
            method: "",
            notes: "Payment pending confirmation",
            amount_paid: 0,
        },
    },
    {
        _id: "reg13",
        id: "reg13",
        event: "3",
        status: "cancelled",
        created_at: "2026-06-27T16:00:00",
        participants: [
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Usman Farooq",
                    age: 20,
                    membership_id: "AK-8192",
                    jamatkhana: "City Sports Complex",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3556677889" },
                },
            },
        ],
        amount_paid: 300,
        payment: {
            status: "paid",
            method: "cash",
            notes: "Refunded after cancellation",
            amount_paid: 300,
        },
    },
    {
        _id: "reg14",
        id: "reg14",
        event: "3",
        status: "active",
        created_at: "2026-07-01T12:45:00",
        participants: [
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Nadia Iqbal",
                    age: 16,
                    membership_id: "AK-9216",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3667788990" },
                },
            },
            {
                participant: null,
                is_existing: false,
                participant_data: {
                    name: "Ali Iqbal",
                    age: 14,
                    membership_id: "AK-9217",
                    jamatkhana: "Karimabad Jamatkhana",
                    phone: { country_code: "PK", dialing_code: "+92", number: "3667788991" },
                },
            },
        ],
        amount_paid: 600,
        payment: {
            status: "pending",
            method: "",
            notes: "",
            amount_paid: 600,
        },
    },
]