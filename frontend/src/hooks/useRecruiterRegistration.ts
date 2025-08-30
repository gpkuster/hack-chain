import { useMutation } from "@tanstack/react-query";
import { 
    RecruiterRegistrationFormData, 
    RecruiterRegistrationRequestData,
    transformRecruiterFormDataToRequest
} from '../lib/validations/auth';
import { 
    RecruiterRegistrationResponse,
    ApiError,
    isApiError
} from '../types/auth';

//API base URL --> adjust according to your configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

//API function register a new recruiter
const registerRecruiter = async(recruiterData: RecruiterRegistrationRequestData): Promise<RecruiterRegistrationResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/recruiter/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(recruiterData),
    });

    const data= await response.json();

    //handle http errors
    if (!response.ok) {
        if(isApiError(data)){
            throw new Error(data.error);
        }
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    if(!data.message || !data.recruiter){
        throw new Error("Invalid response structure");
    }

    return data as RecruiterRegistrationResponse;
};

//custom hook for recruiter Registration
export const useRecruiterRegistration = () => {
    return useMutation({
        mutationFn: (formData: RecruiterRegistrationFormData) => {
            //transform data for backend request
            const requestData = transformRecruiterFormDataToRequest(formData);
            return registerRecruiter(requestData);
        },
        onSuccess: (data: RecruiterRegistrationResponse) => {
            console.log("Recruiter registered successfully:", data.recruiter.email);
        },
        onError: (error: Error) => {
            console.error("Recruiter registration failed:", error.message);
        },
    });
};

//Helper hook to manage recruiter registration state
export const useRecruiterRegistrationState = () => {
  const mutation = useRecruiterRegistration();

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
