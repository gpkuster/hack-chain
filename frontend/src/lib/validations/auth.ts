import { z } from "zod";

export const userRegistrationSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .min(2, "First name must be at least 2 characters long")
            .max(50, "First name must be at most 50 characters long")
            .regex(/^[a-zA-ZÀ-ÿ\s]*$/, "First name can only contain letters and spaces"),

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
            .min(1, "First name is required")
            .min(2, "First name must be at least 2 characters long")
            .max(50, "First name must be at most 50 characters long")
            .regex(/^[a-zA-ZÀ-ÿ\s]*$/, "First name can only contain letters and spaces"),

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

//recruiter registration schema - no age field needed
export const recruiterRegistrationSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .min(2, "First name must be at least 2 characters long")
            .max(50, "First name must be at most 50 characters long")
            .regex(/^[a-zA-ZÀ-ÿ\s]*$/, "First name can only contain letters and spaces"),

        lastName: z
            .string()
            .min(1, "Last name is required")
            .min(2, "Last name must be at least 2 characters long")
            .max(50, "Last name must be at most 50 characters long")
            .regex(
                /^[a-zA-ZÀ-ÿ\s]*$/,
                "Last name can only contain letters and spaces"
            ),

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
export const recruiterRegistrationRequestSchema = z.object({
    name: z
        .string()
        .min(1, "First name is required")
        .min(2, "First name must be at least 2 characters long")
        .max(50, "First name must be at most 50 characters long")
        .regex(/^[a-zA-ZÀ-ÿ\s]*$/, "First name can only contain letters and spaces"),

    lastName: z
        .string()
        .min(1, "Last name is required")
        .min(2, "Last name must be at least 2 characters long")
        .max(50, "Last name must be at most 50 characters long")
        .regex(
            /^[a-zA-ZÀ-ÿ\s]*$/,
            "Last name can only contain letters and spaces"
        ),

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

//educator registration schema - institution name field
export const educatorRegistrationSchema = z
    .object({
        name: z
            .string()
            .min(1, "Institution name is required")
            .min(2, "Institution name must be at least 2 characters long")
            .max(200, "Institution name must be at most 200 characters long")
            .trim(),

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

//schema for sending educator data to the backend (without confirmPassword)
export const educatorRegistrationRequestSchema = z.object({
    name: z
        .string()
        .min(1, "Institution name is required")
        .min(2, "Institution name must be at least 2 characters long")
        .max(200, "Institution name must be at most 200 characters long")
        .trim(),

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
export type RecruiterRegistrationFormData = z.infer<typeof recruiterRegistrationSchema>;
export type RecruiterRegistrationRequestData = z.infer<typeof recruiterRegistrationRequestSchema>;
export type EducatorRegistrationFormData = z.infer<typeof educatorRegistrationSchema>;
export type EducatorRegistrationRequestData = z.infer<typeof educatorRegistrationRequestSchema>;

//transform the response from the backend
export const transformFormDataToRequest = (
    formData: UserRegistrationFormData
): UserRegistrationRequestData => {
    const {confirmPassword, firstName, ...rest} = formData;
    return {
        ...rest,
        name: firstName,
    };
};

//transform recruiter form data for backend request
export const transformRecruiterFormDataToRequest = (
    formData: RecruiterRegistrationFormData
): RecruiterRegistrationRequestData => {
    const {confirmPassword, firstName, ...rest} = formData;
    return {
        ...rest,
        name: firstName,
    };
};

//transform educator form data for backend request
export const transformEducatorFormDataToRequest = (
    formData: EducatorRegistrationFormData
): EducatorRegistrationRequestData => {
    const {confirmPassword, ...requestData} = formData;
    return requestData;
};