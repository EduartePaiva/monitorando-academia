import { Input } from "@/components/ui/input";

interface RenderSeriesProps {
    numero: number
}

export default function RenderSeries({
    numero
}: RenderSeriesProps) {
    return (
        <div className="animate-[fade-in_500ms_forwards]">
            <div className="text-lg font-semibold mb-2">
                {numero}ª Serie
            </div>
            <div className="flex items-start">
                <div className="flex flex-col gap-2">
                    <div className="ml-6 flex gap-4 items-center justify-between">
                        <span>Nº Repetições</span>
                        <Input
                            className="w-16 disable-input-arrow"
                            type="number"
                        />
                    </div>
                    <div className="ml-6 flex gap-4 items-center justify-between">
                        <span>Carga Kg</span>
                        <Input
                            className="w-16 disable-input-arrow"
                            type="number"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}