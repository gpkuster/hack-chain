import { useMutation } from "@tanstack/react-query";
import { 
    UserRegistrationFormData, 
    UserRegistrationRequestData,
    transformFormDataToRequest
} from '../lib/validations/auth';
import { 
    UserRegistrationResponse,
    ApiError,
    isApiError
} from '../types/auth';

//API base URL --> adjust according to your configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

//API function register a new user
const registerUser = async(userData: UserRegistrationRequestData): Promise<UserRegistrationResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(userData),
    });


    const data= await response.json();

    //handle http erros
    if (!response.ok) {
        if(isApiError(data)){
            throw new Error(data.error);
        }
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    if(!data.message || !data.user){
        throw new Error("Invalid response structure");
    }

    return data as UserRegistrationResponse;

};


//custom hook for user Registration
export const useUserRegistration = () => {
    return useMutation({
        mutationFn: (formData:UserRegistrationFormData) => {
            //tranform data for backend request
            const requestData = transformFormDataToRequest(formData);
            return registerUser(requestData);
        },
        onSuccess: (data:UserRegistrationResponse) => {
            console.log("User registered successfully:", data.user.email);
        },
        onError: (error: Error) => {
            console.error("User registration failed:", error.message);
        },
    });
};

//Helper hook to manage registration state
export const useRegistrationState = () => {
  const mutation = useUserRegistration();

  return {
    // Loading states
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    
    // Data
    data: mutation.data,
    error: mutation.error,
    
    // Actions
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    reset: mutation.reset,
    
    // Utilities
    canSubmit: !mutation.isPending,
    errorMessage: mutation.error?.message || null,
    successMessage: mutation.data?.message || null,
  };
};