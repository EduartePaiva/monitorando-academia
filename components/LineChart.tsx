'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { ScoreReturn } from '@/types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Progressão do score ao longo do tempo',
        },
    },
};

export default function LineChart({ dados }: { dados: ScoreReturn[] }) {
    const data = {
        labels: dados.map((dado) => dado.label),
        datasets: [
            {
                label: 'Score',
                data: dados.map((dado) => dado.data),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };


    return <Line options={options} data={data} />;
}