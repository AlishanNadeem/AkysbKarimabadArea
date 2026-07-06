import * as Yup from "yup"

export const participantDraftSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
        .required("Full name is required"),
    age: Yup.number()
        .transform((value, original) => (original === "" || original == null ? undefined : Number(original)))
        .typeError("Age is required")
        .min(0, "Age must be at least 0")
        .max(120, "Age cannot exceed 120")
        .required("Age is required"),
    phone: Yup.object({
        number: Yup.string()
            .min(7, "Phone number must be at least 7 digits")
            .required("Contact number is required"),
    }),
    jamatkhana: Yup.string()
        .max(100, "Jamatkhana cannot exceed 100 characters")
        .optional(),
    membership_id: Yup.string().optional(),
    whatsapp: Yup.object({
        number: Yup.string().optional(),
    }).optional(),
    emergency_contact: Yup.object({
        name: Yup.string().max(100).optional(),
        relation: Yup.string().max(50).optional(),
        phone: Yup.object({
            number: Yup.string().optional(),
        }).optional(),
    }).optional(),
})
