'use client'

import { Serie } from "@/types"
import RenderSeries from "./RenderSeries"
import { Dispatch, SetStateAction, useState } from "react"

interface SeriesRegisterProps {
    numDeSeries: number,
    setArraySeries: Dispatch<SetStateAction<Serie[]>>
}


export default function SeriesRegister({
    numDeSeries,
    setArraySeries
}: SeriesRegisterProps) {

    return (
        <div className="flex gap-10 flex-wrap">
            {[...Array(numDeSeries)].map((value, index) => (
                <RenderSeries
                    key={index}
                    numero={index + 1}
                    setArraySerie={setArraySeries}
                />
            ))}
        </div>
    )
}