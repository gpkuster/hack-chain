import { useMutation } from "@tanstack/react-query";
import { 
    EducatorRegistrationFormData, 
    EducatorRegistrationRequestData,
    transformEducatorFormDataToRequest
} from '../lib/validations/auth';
import { 
    EducatorRegistrationResponse,
    ApiError,
    isApiError
} from '../types/auth';

//API base URL --> adjust according to your configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

//API function register a new educator
const registerEducator = async(educatorData: EducatorRegistrationRequestData): Promise<EducatorRegistrationResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/issuer/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(educatorData),
    });

    const data= await response.json();

    //handle http errors
    if (!response.ok) {
        if(isApiError(data)){
            throw new Error(data.error);
        }
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    if(!data.message || !data.issuer){
        throw new Error("Invalid response structure");
    }

    return data as EducatorRegistrationResponse;
};

//custom hook for educator Registration
export const useEducatorRegistration = () => {
    return useMutation({
        mutationFn: (formData: EducatorRegistrationFormData) => {
            //transform data for backend request
            const requestData = transformEducatorFormDataToRequest(formData);
            return registerEducator(requestData);
        },
        onSuccess: (data: EducatorRegistrationResponse) => {
            console.log("Educator registered successfully:", data.issuer.email);
        },
        onError: (error: Error) => {
            console.error("Educator registration failed:", error.message);
        },
    });
};

//Helper hook to manage educator registration state
export const useEducatorRegistrationState = () => {
  const mutation = useEducatorRegistration();

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
