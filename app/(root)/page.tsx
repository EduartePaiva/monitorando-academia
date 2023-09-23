import { UserButton } from '@clerk/nextjs/app-beta'

export default function Home() {
    return (
        <main>
            <nav className='h-12 bg-gray-300 flex justify-between items-center shadow-lg shadow-gray-400'>
                <div className='flex justify-around w-full text-gray-700 font-semibold h-full'>
                    <button className='nav'>Exercícios</button>
                    <button className='nav'>Categorias</button>
                    <button className='nav'>Registre o dia</button>
                    <button className='nav'>Minhas estatísticas</button>
                    <button className='nav'>Configuração</button>
                </div>
                <div className='mr-8'>
                    <UserButton afterSignOutUrl='/' />

                </div>
            </nav>

        </main>
    )
}
