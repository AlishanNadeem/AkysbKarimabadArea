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

export const ACTIVITY_LOGS = [
    {
        id: 1,
        type: "check_in",
        title: "Checked In – Feeling Good",
        timestamp: "2026-04-23T10:00:00",
    },
    {
        id: 2,
        type: "alert",
        title: "SOS Alert Triggered",
        timestamp: "2026-04-23T06:00:00",
    },
    {
        id: 3,
        type: "check_in",
        title: "Checked In – Need Help? No",
        timestamp: "2026-04-22T22:00:00",
    },
    {
        id: 4,
        type: "alert",
        title: "SOS Alert Triggered",
        timestamp: "2026-04-12T13:00:00",
        user: { id: 1, name: "Max", relation: "Son" },
    },
]

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

export const SUBSCRIPTION_PLANS = [
    {
        id: 1,
        trial: true,
        title: "14 Days Trial",
        price_label: "Free",
        plan_name: "Freemium Plan",
        price_update_note: "Will Update Verbiage Soon",
        features: [
            "AI Summary-level responses",
            "Group Chat (Limited)",
            "Max Group Size (5-7 users)",
            "Max active Collaborative trips (2)",
            "Smart Itinerary Builder (1 Itinerary)",
            "AI generated day-by-day itinerary",
            "Editable itinerary (manual edits only)",
            "Limited number of itinerary regenerations",
        ],
        modal_text: "You have continued with a Freemium plan for 14 Days free trial."
    },
    {
        id: 2,
        trial: false,
        title: "Monthly",
        price_label: "$20.00",
        plan_name: "Premium Plan",
        price_update_note: "Will Update Verbiage Soon",
        features: [
            "AI Summary-level responses",
            "Group Chat (Limited)",
            "Max Group Size (5-7 users)",
            "Max active Collaborative trips (2)",
            "Smart Itinerary Builder (1 Itinerary)",
            "AI generated day-by-day itinerary",
            "Editable itinerary (manual edits only)",
            "Limited number of itinerary regenerations",
        ],
        modal_text: "You have successfully paid for you premium subscription plan."
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

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."

export const RELATIONS = [
    { id: 1, name: "Father" },
    { id: 2, name: "Mother" },
    { id: 3, name: "Husband" },
    { id: 4, name: "Wife" },
    { id: 5, name: "Son" },
    { id: 6, name: "Daughter" },
    { id: 7, name: "Brother" },
    { id: 8, name: "Sister" },
    { id: 9, name: "Grandfather" },
    { id: 10, name: "Grandmother" },
    { id: 11, name: "Uncle" },
    { id: 12, name: "Aunt" },
    { id: 13, name: "Nephew" },
    { id: 14, name: "Niece" },
    { id: 15, name: "Cousin" },
    { id: 16, name: "Guardian" }
]