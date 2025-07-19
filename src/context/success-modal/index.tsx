"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Icon from "@/icon";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

// Types
type ConfirmDialogOptions = Partial<Omit<ConfirmDialogState, "open" | "resolve">>;

interface ConfirmDialogState {
    open: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    resolve?: (value: boolean) => void;
}

interface ConfirmDialogContextType {
    confirm: (options?: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

interface ConfirmDialogProviderProps {
    children: ReactNode;
}

export const SuccessDialogProvider = ({ children }: ConfirmDialogProviderProps) => {
    const [dialogState, setDialogState] = useState<ConfirmDialogState>({
        open: false,
        title: "Are you sure to delete this video ?",
        description: "Users can't find your video anymore.",
        confirmText: "Yes, Delete",
        cancelText: "Cancel",
        onConfirm: undefined,
        onCancel: undefined,
        resolve: undefined,
    });

    const confirm = (options: ConfirmDialogOptions = {}): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogState((prev) => ({
                ...prev,
                ...options,
                open: true,
                resolve,
            }));
        });
    };

    const handleConfirm = () => {
        dialogState.resolve?.(true);
        closeDialog();
        dialogState.onConfirm?.();
    };

    const handleCancel = () => {
        dialogState.resolve?.(false);
        closeDialog();
        dialogState.onCancel?.();
    };

    const closeDialog = () => {
        setDialogState((prev) => ({ ...prev, open: false }));
    };

    return (
        <ConfirmDialogContext.Provider value={{ confirm }}>
            {children}
            <AlertDialog open={dialogState.open} onOpenChange={closeDialog}>
                <AlertDialogContent className="rounded-md w-[420px] px-20">
                    <AlertDialogHeader>
                        <AlertDialogTitle >
                            <ul>
                                <li className="flex justify-center"><Icon name="alertRed" width={50} height={50}/></li>
                                <li className="text-center text-reds text-2xl">{dialogState.title || "Are you sure to delete this video ?"}</li>

                            </ul>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-grays">
                            {dialogState.description || "Users can't find your video anymore."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center mt-3">
                        <AlertDialogCancel onClick={handleCancel} className="cursor-pointer rounded-full py-6 px-8">
                            {dialogState.cancelText || "Cancel"}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            className="bg-reds hover:bg-reds cursor-pointer rounded-full py-6 px-5"
                        >
                            {dialogState.confirmText || "Confirm"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ConfirmDialogContext.Provider>
    );
};

// Hook
export default function useConfirmation(): ConfirmDialogContextType {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error("useConfirmation must be used within a ConfirmDialogProvider");
    }
    return context;
}
