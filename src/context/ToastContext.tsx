import React, { createContext, useContext, ReactNode } from "react";
import toast, { ToastPosition, ToastOptions } from "react-hot-toast";

// Define valid toast types
type ToastVariant = "success" | "error" | "loading" | "custom";

// Define the shape of the toast function
interface ShowToastOptions extends ToastOptions {
  position?: ToastPosition;
  duration?: number;
}

interface ToastContextType {
  showToast: (
    message: string,
    type: ToastVariant,
    options?: ShowToastOptions
  ) => void;
}

// Create the toast context
const ToastContext = createContext<ToastContextType | null>(null);

// ToastProvider component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Default toast options
  const defaultOptions: ShowToastOptions = {
    duration: 4000,
    position: "top-right",
  };

  const showToast = (
    message: string,
    type: ToastVariant,
    options: ShowToastOptions = {}
  ) => {
    const mergedOptions = { ...defaultOptions, ...options };

    if (!toast[type]) {
      console.warn(`Invalid toast type "${type}". Falling back to "success".`);
      type = "success";
    }

    toast[type](message, mergedOptions);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to access the toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
