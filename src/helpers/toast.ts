import toast, { ToastOptions, ToastPosition } from "react-hot-toast";

// Centralized default options for consistency
const defaultOptions: ToastOptions = {
  duration: 4000,
  position: "top-right" as ToastPosition,
};

// Success Toast
export const showSuccessToast = (
  message: string,
  duration = defaultOptions.duration
) => {
  toast.success(message, {
    ...defaultOptions,
    duration,
  });
};

// Error Toast
export const showErrorToast = (
  message: string,
  duration = defaultOptions.duration
) => {
  toast.error(message, {
    ...defaultOptions,
    duration,
  });
};

// Loading Toast
export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    ...defaultOptions,
  });
};

// Dismiss a specific toast by ID
export const dismissToast = (toastId?: string) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};
