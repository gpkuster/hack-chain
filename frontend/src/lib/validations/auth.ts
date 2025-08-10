import { z } from "zod";

export const userRegistrationSchema = z
    .object({
        name: z
            .string()
            .min(1, "Name is required")
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must be at most 50 characters long")
            .regex(/^[a-zA-ZÀ-ÿ\s]*$/, "Name can only contain letters and spaces"),

        lastName: z
            .string()
            .min(1, "Last name is required")
            .min(2, "Last name must be at least 2 characters long")
            .max(50, "Last name must be at most 50 characters long")
            .regex(
                /^[a-zA-ZÀ-ÿ\s]*$/,
                "Last name can only contain letters and spaces"
            ),

        age: z
            .string()
            .min(1, "Age is required")
            .regex(/^[0-9]+$/, "Age must be a valid number")
            .refine((val) => {
                const age = parseInt(val);
                return age >= 18 && age <= 100;
            }, "Age must be between 18 and 100"),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address")
            .max(100, "Email must be at most 100 characters long"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password must be at most 100 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),

        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });


    //schema for sending data to the backend (without confirmPassword)
    export const userRegistrationRequestSchema = z.object({
        name: z
            .string()
            .min(1, "Name is required")
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must be at most 50 characters long")
            .regex(/^[a-zA-ZÀ-ÿ\s]*$/, "Name can only contain letters and spaces"),

        lastName: z
            .string()
            .min(1, "Last name is required")
            .min(2, "Last name must be at least 2 characters long")
            .max(50, "Last name must be at most 50 characters long")
            .regex(
                /^[a-zA-ZÀ-ÿ\s]*$/,
                "Last name can only contain letters and spaces"
            ),

        age: z
            .string()
            .min(1, "Age is required")
            .regex(/^[0-9]+$/, "Age must be a valid number")
            .refine((val) => {
                const age = parseInt(val);
                return age >= 18 && age <= 100;
            }, "Age must be between 18 and 100"),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address")
            .max(100, "Email must be at most 100 characters long"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password must be at most 100 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
    });

export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;
export type UserRegistrationRequestData = z.infer<typeof userRegistrationRequestSchema>;

//transform the response from the backend
export const transformFormDataToRequest = (
    formData: UserRegistrationFormData
): UserRegistrationRequestData => {
    const {confirmPassword, ...requestData} = formData;
    return requestData;
};
