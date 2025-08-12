//auth types

//this is the user registration request
export interface UserRegistrationRequest{
    name: string;
    lastName: string;
    age: string;
    email: string;
    password: string;
}

//this is the user registration response
export interface UserRegistrationResponse{
    message: string;
    user:{
        name: string;
        lastName: string;
        age: string;
        email: string;
        walletAddress: string;
    };
}

//data form 
export interface UserRegistrationFormData {
    name: string;
    lastName: string;
    age: string;
    email: string;
    password: string;
    confirmPassword: string;
}

//mistake structure for API
export interface ApiError{
    error: string;
}

export type ApiResponse<T> = T | ApiError;

//validation errors
export const isApiError = (response: unknown): response is ApiError => {
    return response !== null && 
           typeof response === 'object' && 
           'error' in response && 
           typeof (response as ApiError).error === 'string';
};
