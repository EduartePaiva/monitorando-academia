'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    description,
    isOpen,
    onClose,
    title,
    children,
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className="max-w-fit min-w-[95%] sm:min-w-[80%] md:min-w-[70%] lg:min-w-[60%] xl:min-w-[50%]">
                <DialogHeader>
                    <DialogTitle className="text-gray-800">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}