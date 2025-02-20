import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useTransfersStore } from '@/context/transfers';

import Logo from '/iconFin_X.png'

// COMPONENTES SHADCN
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const location = useLocation();
    const Rotas = [
        { path: '/', name: 'Visão Geral' },
        { path: '/historic', name: 'Histórico' },
        { path: '/statistics', name: 'Estatíscas' },
        // { path: '/budget', name: 'Orçamento' },
        // { path: '/education', name: 'Educação Financeira' },
        { path: '/about', name: 'Sobre' },
    ];

    const [btnEye, setBtnEye] = useState(true);

    const { expense, revenue } = useTransfersStore();
    const displayValue = btnEye ? "-" : (revenue - expense);

    return (
        <main className={`
        bg-colorPrimary max-md:px-4 px-24 pt-5 flex flex-col gap-6 transition-all duration-300
        ${location.pathname === "/about" ? "h-20" : "h-64 max-md:h-52"}
        `}
        >
            {/* NAVBAR */}
            <section className="flex items-end justify-between">
                <Link to='/' className="text-2xl font-semibold text-slate-50 md:mr-32 flex gap-3 items-end">
                    <img src={Logo} alt="logo" className='w-8 h-8' />
                    Fin X
                </Link>
                {/* LINK PAGINAS */}
                <div className='flex'>
                    {Rotas.map((rota, index) => (
                        <div className='flex items-center gap-5 ml-5 max-md:hidden' key={index}>
                            <Link
                                to={rota.path}
                                className={`text-base font-medium underline-offset-2 transition-colors 
                                ${location.pathname === rota.path ? "text-white underline" : "text-zinc-300 hover:underline  hover:text-white"}
                                `}
                            >
                                {rota.name}
                            </Link>
                            {
                                index < Rotas.length - 1 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-slate-50">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                )
                            }
                        </div>
                    ))
                    }
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='md:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 stroke-slate-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-3 border-none bg-colorTertiary">
                        {Rotas.map((rota, index) => (
                            <Link
                                key={index}
                                to={rota.path}
                                className={`text-2xl font-medium underline-offset-2 transition-colors 
                                ${location.pathname === rota.path ? "text-white underline" : "text-zinc-300"}
                                `}
                            >
                                <DropdownMenuItem>
                                    {rota.name}
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>

            <section className={`
            flex flex-col gap-6 transition-opacity duration-500 delay-200
            ${location.pathname === "/about" ? "hidden" : ""}
            `}>
                {/* VALOR TOTAL CONTA */}
                <div className='flex flex-col gap-0.5'>
                    <div className='flex items-center gap-4'>
                        <h1 className="text-slate-50 text-4xl font-semibold">
                            R$ {displayValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </h1>
                        <button onClick={() => setBtnEye(!btnEye)}>
                            {
                                btnEye ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-slate-50 mt-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-slate-50 mt-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                            }
                        </button>
                    </div>
                    <Link to='historic' className="text-zinc-200 hover:text-white text-base underline underline-offset-2">
                        Ver histórico
                    </Link>
                </div>

                {/* INDICADORES RECEITAS E DESPESAS */}
                <div className='flex max-md:gap-4 gap-20'>
                    {/* RECEITAS */}
                    <div className='bg-colorSecondary w-2/4 max-md:h-24 h-40 max-md:px-2 px-20 flex flex-col justify-center gap-1 rounded shadow-md'>
                        <h1 className='max-md:text-lg text-2xl font-semibold'>Receitas</h1>
                        <div className='flex items-center max-md:gap-2 gap-3'>
                            <h1 className='max-md:text-2xl text-5xl font-bold text-colorGreen'>
                                R$ {revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="max-md:hidden size-14 stroke-colorGreen">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                            </svg>
                        </div>
                    </div>

                    {/* DESPESAS */}
                    <div className='bg-colorSecondary w-2/4 max-md:h-24 h-40 max-md:px-3 px-20 flex flex-col justify-center gap-1 rounded shadow-md'>
                        <h1 className='max-md:text-lg text-2xl font-semibold'>Despesas</h1>
                        <div className='flex items-center max-md:gap-2 gap-3'>
                            <h1 className='max-md:text-2xl text-5xl font-bold text-colorRed'>
                                R$ {expense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="max-md:hidden size-14 stroke-colorRed">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    )
}

export default Navbar;