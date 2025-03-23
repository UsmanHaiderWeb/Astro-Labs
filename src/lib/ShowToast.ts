import { toast } from "sonner";

export const showToast = (message: string) => toast(message || "Something went wrong.", {
    style: {
        backgroundColor: '#333',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        color: 'white',
        fontFamily: 'sans-serif',
    },
    action: {
        label: "Close",
        onClick: () => { },
    },
})