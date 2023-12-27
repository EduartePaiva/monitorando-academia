import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-gray-500" size={50}></Loader2>
        </div>
    )
}
