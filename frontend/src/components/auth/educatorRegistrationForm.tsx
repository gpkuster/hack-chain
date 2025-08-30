import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Check } from "lucide-react";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";

import { educatorRegistrationSchema } from "../../lib/validations/auth";
import { useEducatorRegistration } from "../../hooks/useEducatorRegistration";
import type { EducatorRegistrationFormData } from "../../lib/validations/auth";
import "./autofill-fix.css";

export function EducatorRegistrationForm() {
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Track field interactions
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Registration hook
  const mutation = useEducatorRegistration();
  const { mutate: register, isPending: isLoading, isSuccess, isError, error } = mutation;

  // Form setup with React Hook Form + Zod
  const form = useForm<EducatorRegistrationFormData>({
    resolver: zodResolver(educatorRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch form values for real-time validation
  const watchedValues = form.watch();

  // Handle field touch
  const handleFieldTouch = (fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  // Check if field is valid
  const isFieldValid = (fieldName: keyof EducatorRegistrationFormData) => {
    const fieldErrors = form.formState.errors;
    return !fieldErrors[fieldName] && watchedValues[fieldName] && touchedFields[fieldName];
  };

  // Handle form submission
  const onSubmit = (data: EducatorRegistrationFormData) => {
    register(data);
  };

  // Reset form and mutation state
  const handleReset = () => {
    form.reset();
    mutation.reset();
    setTouchedFields({});
  };

  // Show success message if registration completed
  if (isSuccess) {
    return (
      <div className="space-y-6">
        <Alert className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <CheckCircle className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            Educator account created successfully! You can now log in.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full max-w-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          >
            Register Another Educator
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {isError && error && (
        <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Institution Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Institution Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Enter your institution or company name"
                      disabled={isLoading}
                      className={`input-autofill-dark educator-input ${isFieldValid('name') ? 'input-valid educator-input' : ''}`}
                      onFocus={() => handleFieldTouch('name')}
                      {...field} 
                    />
                    {isFieldValid('name') && (
                      <Check className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
                    )}
                  </div>
                </FormControl>
                {touchedFields.name && (
                  <FormDescription className="text-xs text-slate-400">
                    Enter the official name of your educational institution or company
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="email"
                      placeholder="Enter your institutional email address"
                      disabled={isLoading}
                      className={`input-autofill-dark educator-input ${isFieldValid('email') ? 'input-valid educator-input' : ''}`}
                      onFocus={() => handleFieldTouch('email')}
                      {...field} 
                    />
                    {isFieldValid('email') && (
                      <Check className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      disabled={isLoading}
                      className={`input-autofill-dark educator-input ${isFieldValid('password') ? 'input-valid educator-input' : ''}`}
                      onFocus={() => handleFieldTouch('password')}
                      {...field} 
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      {isFieldValid('password') && (
                        <Check className="h-4 w-4 text-blue-400" />
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </FormControl>
                {touchedFields.password && (
                  <FormDescription className="text-xs text-slate-400">
                    Must contain uppercase, lowercase, and a number (min 8 characters)
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                      className={`input-autofill-dark educator-input ${isFieldValid('confirmPassword') ? 'input-valid educator-input' : ''}`}
                      onFocus={() => handleFieldTouch('confirmPassword')}
                      {...field} 
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      {isFieldValid('confirmPassword') && (
                        <Check className="h-4 w-4 text-blue-400" />
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 mt-6 transition-all duration-300 hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Educator Account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
