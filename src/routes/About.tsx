import perfil from '../assets/perfil.jpg'
import wall from '../assets/wallProgrammer.jpg'

import { Label } from "@/components/ui/label";

const About = () => {
    return (
        <main className="flex flex-col w-full">
            {/* MEU PERFIL */}
            <section className="px-6 max-md:px-1 max-md:-mt-14 -mt-20 max-md:pb-12 pb-14 w-3/4 max-md:w-full flex max-md:flex-col gap-14 max-md:gap-8 items-center relative">
                <div className='w-full h-40 overflow-hidden rounded md:hidden shadow-lg'>
                    <img src={wall} alt="" className='w-full' />
                </div>
                <div className='h-48 w-48 max-md:w-28 max-md:h-28 rounded-full shadow-lg overflow-hidden max-md:absolute top-20 left-0 max-md:border-2'>
                    <img src={perfil} alt="" className='w-full' />
                </div>
                <div className='w-3/4 max-md:w-full flex flex-col gap-2'>
                    <h1 className='font-bold max-md:text-2xl text-3xl text-pretty'>
                        Olá, eu sou Eduardo Machado, {" "}
                        <span className='bg-gradient-to-r from-gradient_1 to-gradient_4 bg-clip-text text-transparent'>Desenvolvedor</span>
                        {" "}apaixonado pela tecnologia
                    </h1>
                    <p className='text-lg'>Desenvolvedor Front-end</p>
                    <p className='text-lg text-pretty'>
                        Técnico pela <span className='font-medium'>Etec</span>, e superior pela <span className='font-medium'>Fatec</span>
                    </p>
                </div>
            </section>
            {/* SOBRE O PROJETO */}
            <section className="pb-16 px-6 max-md:px-1 flex flex-col gap-12">
                <Label className="text-xl font-bold text-colorPrimary   ">Projeto</Label>
                <Label className="text-2xl -mt-8 font-semibold">Visão Geral</Label>
                <section className='flex flex-col -mt-8 md:w-4/5'>
                    <p className='text-justify'>
                        <span className="font-bold">Fin X</span> é um site de gestão financeira desenvolvido para pessoas comuns que desejam ter mais controle sobre suas finanças.
                        Oferece uma plataforma acessível e intuitiva para gerenciar suas transações financeiras, que se destaca por ser leve, simples e moderno.
                        Meu objetivo é facilitar o controle financeiro pessoal e, além disso, conscientizar os usuários sobre a importância da gestão e do planejamento do dinheiro para as suas vidas.
                    </p>
                </section>

                <Label className="text-2xl font-semibold">Como Posso...</Label>
                <section className='flex flex-col gap-4 -mt-8 md:w-2/4'>
                    <li className="flex max-md:items-start md:items-center">
                        <span className="font-semibold text-lg min-w-12">01</span>
                        <p className="text-balance">
                            Como posso <span className="font-semibold">facilitar o uso do Fin X</span> ?
                        </p>
                    </li>
                    <li className="flex max-md:items-start md:items-center">
                        <span className="font-semibold text-lg min-w-12">02</span>
                        <p className="text-balance">
                            Como posso <span className="font-semibold">conscientizar os usuários da importância do controle financeiro</span> ?
                        </p>
                    </li>
                    <li className="flex max-md:items-start md:items-center">
                        <span className="font-semibold text-lg min-w-12">03</span>
                        <p className="text-balance">
                            Como posso <span className="font-semibold">auxiliar o usuário a criar hábitos financeiros saudáveis</span> ?
                        </p>
                    </li>
                </section>

                <Label className="text-2xl font-sans font-semibold">Processo</Label>
                <section className='flex max-md:flex-col -mt-8 gap-6 items-center'>
                    <div className="bg-colorTertiary min-w-32 h-12 max-md:w-4/5 rounded-sm flex justify-center items-center shadow-md shadow-zinc-400 text-slate-100 font-medium">
                        Planejamento
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 max-md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                    </svg>
                    <div className="bg-colorTertiary min-w-32 h-12 max-md:w-4/5 rounded-sm flex justify-center items-center shadow-md shadow-zinc-400 text-slate-100 font-medium">
                        Análise
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 max-md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                    </svg>

                    <div className="bg-colorTertiary min-w-36 h-12 max-md:w-4/5 rounded-sm flex justify-center items-center shadow-md shadow-zinc-400 text-slate-100 font-medium">
                        Implementação
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 max-md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                    </svg>

                    <div className="bg-colorTertiary min-w-32 h-12 max-md:w-4/5 rounded-sm flex justify-center items-center shadow-md shadow-zinc-400 text-slate-100 font-medium">
                        Testes
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 max-md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                    </svg>

                    <div className="bg-colorTertiary min-w-32 h-12 max-md:w-4/5 rounded-sm flex justify-center items-center shadow-md shadow-zinc-400 text-slate-100 font-medium">
                        Deploy
                    </div>
                </section>

                <Label className="text-2xl font-semibold">Funcionalidades</Label>
                <section className='flex flex-col gap-4 -mt-8 md:w-2/4'>
                    <li className="flex max-md:items-start md:items-center">
                        <span className="font-semibold text-lg min-w-12">01</span>
                        <p className="text-balance">
                            Cadastro de receitas e despesas;
                        </p>
                    </li>
                    <li className="flex max-md:items-start md:items-center">
                        <span className="font-semibold text-lg min-w-12">02</span>
                        <p className="text-balance">
                            Categorização das transações;
                        </p>
                    </li>
                    <li className="flex max-md:items-start md:items-center">
                        <span className="font-semibold text-lg min-w-12">03</span>
                        <p className="text-balance">
                            Histórico das transações cadastradas;
                        </p>
                    </li>
                    <li className="flex max-md:items-start md:items-center">
                        <span className="font-semibold text-lg min-w-12">04</span>
                        <p className="text-balance">
                            Gráficos e estatíscas (anual, mensal e semanal).
                        </p>
                    </li>
                </section>

                <Label className="text-2xl font-semibold">Tecnlogias Utilizadas</Label>
                <section className='flex flex-col -mt-8 md:w-424/'>
                    <p>
                        React, Vite, TypeScrypt, Tailwind, Shadcn/ui, Vercel.{" "}
                        {/* <a href="https://www.youtube.com/" target="_blank" className="underline underline-offset-2 text-colorPrimary font-light">Saber mais</a> */}
                    </p>
                </section>
            </section>
        </main >
    )
}

export default About;