import React, { useRef } from 'react';

import LinkedIn from '../assets/linkedin.png'

import Github from '@/components/svgs/github';
import Instagram from '@/components/svgs/insta';
import Discord from '@/components/svgs/discord';

// COMPONENTES SHADCN
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Footer = () => {

    const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!ACCESS_KEY) {
        throw new Error("Chave de acesso não está definida nas variáveis de ambiente.");
    }

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", ACCESS_KEY);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);


        try {
            await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });
            formRef.current.reset();
        } catch (error) {
            console.log('deu ruim');
        }
    };

    return (
        <main className='bg-colorPrimary relative max-md:px-6 px-28 py-9'>
            <main className='w-full max-md:flex-col flex justify-between max-md:gap-8 mb-4'>
                <section className='flex flex-col gap-3 max-md:w-full'>
                    {/* INFORMACOES */}
                    <section className='flex flex-col gap-4'>
                        <Label className='text-slate-50' variant={'subtitle'}>Vamos nos conectar</Label>
                        <div className='flex items-center gap-3'>
                            <div className='rounded-full p-2 border-2 border-transparent bg-colorTertiary shadow-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-slate-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                            <p className='text-slate-50 text-base font-normal'>São José dos Campos,<br /> <span className='font-bold'>São Paulo - Brasil</span></p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='rounded-full p-2 border-2 border-transparent bg-colorTertiary shadow-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-slate-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                                </svg>
                            </div>
                            <a
                                href="mailto:eduardo.silvamachado07@gmail.com"
                                className='text-slate-50 text-base font-normal underline underline-offset-2'>
                                eduardo.silvamachado07@gmail.com
                            </a>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='rounded-full p-2 border-2 border-transparent bg-colorTertiary shadow-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-slate-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                </svg>
                            </div>
                            <p className='text-slate-50 text-base font-normal'>+55 (12) 98850-3575</p>
                        </div>
                    </section>

                    {/* CONTATOS */}
                    <Label className='mt-3 text-slate-50' variant={'normal'}>Acompanhe o meu trabalho</Label>
                    <section className='flex gap-5'>
                        <a
                            target='_blank'
                            href='https://www.instagram.com/du_machdo/'
                            className='w-10 h-10 flex justify-center items-center rounded-lg bg-colorTertiary shadow-xl cursor-pointer hover:scale-110 border-transparent border-2 hover:border-slate-50 transition-colors'>
                            <Instagram />
                        </a>
                        <a
                            target='_blank'
                            href='https://www.linkedin.com/in/eduardo-machado-dev/'
                            className='w-10 h-10 flex justify-center items-center rounded-lg bg-colorTertiary shadow-xl cursor-pointer hover:scale-110 border-transparent border-2 hover:border-slate-50 transition-colors'>
                            <img src={LinkedIn} alt="" />
                        </a>
                        <a
                            target='_blank'
                            href='https://github.com/EduMachado07'
                            className='w-10 h-10 flex justify-center items-center rounded-lg bg-colorTertiary shadow-xl cursor-pointer hover:scale-110 border-transparent border-2 hover:border-slate-50 transition-colors'
                        >
                            <Github />
                        </a>
                        <a
                            target='_blank'
                            href='https://discord.com/users/503552668304670730'
                            className='w-10 h-10 flex justify-center items-center rounded-lg bg-colorTertiary shadow-xl cursor-pointer hover:scale-110 border-transparent border-2 hover:border-slate-50 transition-colors'>
                            <Discord />
                        </a>
                    </section>
                </section>

                <hr className='border md:hidden' />

                {/* FORMULARIO EMAIL CONTATO */}
                <section className='flex flex-col gap-2 max-md:w-full w-2/4'>
                    <Label variant={'normal'} className='leading-6 text-slate-50 text-pretty max-md:text-justify'>
                        Encontrou algum problema ou melhoria, tem uma ideia para ser desenvolvida, envia uma mensagem para o meu email. Vamos construir algo juntos!!
                    </Label>

                    <form
                        ref={formRef}
                        className="w-full flex flex-col items-start gap-5 mt-2"
                        onSubmit={onSubmitForm}
                    >
                        <Input
                            className='bg-zinc-200'
                            type="text"
                            name='email'
                            placeholder='seu email'
                            required
                        />
                        <Input
                            className='bg-zinc-200'
                            type="text"
                            name='name'
                            placeholder='nome completo'
                            required
                        />
                        <Textarea
                            className='bg-zinc-200 h-24 max-h-24'
                            name='message'
                            placeholder='assunto'
                            required
                        />
                        <Button
                            className='text-slate-50'
                            variant={'outline'}
                            size={'lg'}
                            type='submit'
                        >
                            Enviar mensagem
                        </Button>
                    </form>

                </section>
            </main>

            <p className='absolute bottom-2 md:right-28 max-md:right-6 font-mono font-bold text-slate-50'>
                2025 - Made by Eduardo Machado
            </p>
        </main>
    )
}

export default Footer;