'use client'

import RenderSeries from "./RenderSeries"

interface SeriesRegisterProps {
    numDeSeries: number
}

export default function SeriesRegister({
    numDeSeries
}: SeriesRegisterProps) {
    return (
        <div className="flex gap-10 flex-wrap">
            {[...Array(numDeSeries)].map((value, index) => (
                <RenderSeries key={index} numero={index + 1} />
            ))}
        </div>
    )
}