'use client'

import { Input } from "@/components/ui/input"
import RenderSeries from "./RenderSeries"

interface SeriesRegisterProps {
    numDeSeries: number
}

export default function SeriesRegister({
    numDeSeries
}: SeriesRegisterProps) {
    return (
        <div className="mt-10">
            {[...Array(numDeSeries)].map((value, index) => (
                <RenderSeries key={index} numero={index + 1} />
            ))}
        </div>
    )
}