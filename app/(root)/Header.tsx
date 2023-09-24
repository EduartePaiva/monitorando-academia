'use client'

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function Header() {
    const pathName = usePathname()

    const routes = [
        {
            href: '/exercicios',
            label: 'Exercícios',
            active: pathName === '/exercicios'
        },
        {
            href: '/categorias',
            label: 'Categorias',
            active: pathName === '/categorias'
        },
        {
            href: '/registre-o-dia',
            label: 'Registre o dia',
            active: pathName === '/registre-o-dia'
        },
        {
            href: '/estatisticas',
            label: 'Minhas estatísticas',
            active: pathName === '/estatisticas'
        },
        {
            href: '/configuracao',
            label: 'Configuração',
            active: pathName === '/configuracao'
        },
    ]


    return (
        <header className="bg-gray-300 shadow-lg shadow-gray-400">
            <nav className='h-12 flex justify-between items-center'>
                <div className='flex justify-around w-full font-semibold h-full'>
                    {routes.map((route, index) => (
                        <Link href={route.href} key={index}>
                            <div className={`${route.active ? "nav-clicked" : 'nav'} h-full flex items-center`}>
                                {route.label}

                            </div>
                        </Link>
                    ))}

                </div>
                <div className='mr-8'>
                    <UserButton afterSignOutUrl='/' />

                </div>
            </nav>
        </header>
    )
}