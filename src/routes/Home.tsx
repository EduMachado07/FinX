import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";

import { Link } from "react-router";
// COMPENENTES SHADCN
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useTransfersStore } from "@/context/transfers";
// PARA FORMULARIO
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaForm = z.object({
    description: z.string(),
    value: z.string(),
    date: z.date(),
    type: z.enum(["Receita", "Despesa"]),
    category: z.string(),
});

type TypeForms = z.infer<typeof schemaForm>

const Home = () => {

    const [date, setDate] = React.useState<Date>();
    const { transfers, addTransfer, } = useTransfersStore();

    const { register, handleSubmit, setValue, reset, } = useForm<TypeForms>({
        resolver: zodResolver(schemaForm)
    })

    const formatCurrency = (value: string) => {
        const numericValue = value.replace(/\D/g, "");

        const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        return formattedValue.replace("R$", "").trim();
    };

    const handleDateChange = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setValue("date", selectedDate || new Date());
    };

    const handleAddTransfer = (data: TypeForms) => {
        const parsedValue = parseFloat(data.value.replace(/\./g, "").replace(",", "."));

        const formattedDate = format(data.date, "yyyy-MM-dd", { locale: ptBR })

        const dataTrasnfer = {
            id: Date.now(),
            ...data,
            value: parsedValue,
            date: formattedDate
        }

        addTransfer(dataTrasnfer)

        reset({
            description: "",
            value: "",
            date: undefined,
            type: "Despesa",
        });
        setDate(undefined)
    };

    return (
        <main className="flex flex-col max-md:gap-8 gap-10">
            {/* CRIA TRANSFERENCIA */}
            <form
                onSubmit={handleSubmit(handleAddTransfer)}
                className='bg-colorSecondary max-md:px-3 px-10 max-md:py-3 py-5 rounded shadow-md flex flex-col gap-3'>
                <div className="w-full flex items-end justify-between">
                    <section className="max-md:w-full w-4/5 max-md:flex-wrap flex items-start gap-6">
                        {/* NOME PARA TRANSFERENCIA */}
                        <div className='flex-[2] min-w-[250px] max-md:min-w-full flex flex-col gap-0.5'>
                            <Label htmlFor="description" variant={'normal'}>Descrição</Label>
                            <Input
                                {...register('description')}
                                type="text"
                                id='description'
                                maxLength={25}
                            />
                        </div>

                        {/* VALOR TRANSFERENCIA */}
                        <div className='flex-[1] min-w-[120px] max-md:min-w-[130px] flex flex-col gap-0.5'>
                            <Label htmlFor="value" variant={'normal'}>Valor (R$)</Label>
                            <Input
                                {...register('value')}
                                type="text"
                                id='value'
                                maxLength={10}
                                placeholder="0,00"
                                onChange={(e) => {
                                    const formatted = formatCurrency(e.target.value);
                                    setValue("value", formatted);
                                }}
                            />
                        </div>

                        {/* DATA DA TRANSFERENCIA */}
                        <div className='flex-[2] max-md:min-w-[130px] flex flex-col gap-0.5'>
                            <Label variant={'normal'}>Data</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className="justify-start w-full"
                                    >
                                        {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Escolha a data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateChange}
                                        locale={ptBR}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* CATEGORIA TRANSFERENCIA */}
                        <Select onValueChange={(value) => setValue("category", value)}>
                            <section className="flex-[1] md:min-w-[160px] max-md:w-2/4 flex flex-col gap-0.5">
                                <Label variant={'normal'}>Categoria</Label>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Categoria" />
                                </SelectTrigger>
                            </section>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Salário">Salário</SelectItem>
                                    <SelectItem value="Extra">Ganho extra</SelectItem>
                                    <SelectItem value="Investimentos">Investimentos</SelectItem>
                                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                                    <SelectItem value="Moradia">Moradia</SelectItem>
                                    <SelectItem value="Transporte">Transporte</SelectItem>
                                    <SelectItem value="Saúde/Academia">Saúde/Academia</SelectItem>
                                    <SelectItem value="Compras">Compras</SelectItem>
                                    <SelectItem value="Entretenimento">Entreterimento</SelectItem>
                                    <SelectItem value="Viagem">Viagem</SelectItem>
                                    <SelectItem value="Outro">Outro</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* TIPO DE TRANSFERENCIA */}
                        <div className='flex-[1] max-md:min-w-2/4 flex flex-col gap-0.5'>
                            <RadioGroup
                                onValueChange={(value: "Receita" | "Despesa") => setValue("type", value)}
                                className="max-md:flex flex-col gap-3"
                            >
                                <Label className="" variant={"normal"}>Tipo:</Label>
                                <section className="w-full flex items-center justify-center gap-5">
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="Receita" id="r1" />
                                        <Label htmlFor="r1">Receita</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="Despesa" id="r2" />
                                        <Label htmlFor="r2">Despesa</Label>
                                    </div>
                                </section>
                            </RadioGroup>
                        </div>

                        <Button className="md:hidden" size={"lg"} type="submit">Adicionar</Button>
                    </section>
                    <Button className="max-md:hidden" size={"lg"} type="submit">Adicionar</Button>
                </div>
                {/* aviso */}
                <div className="flex gap-1 items-center text-colorGreen font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    <Label>Necessário preencher todos os campos</Label>
                </div>
            </form>

            <Label variant={"subtitle"} className="-mb-7 max-md:-mb-5">Últimas transações</Label>
            {/* HISTORICO */}
            <section className="bg-colorSecondary w-full rounded shadow-md p-3">
                <div className="w-full">
                    {transfers?.length === 0 ? (
                        <Label className="px-1 py-2" variant={"normal"}>
                            No momento você não possui nenhuma transação.
                        </Label>
                    ) : (
                        <table className="w-full table-auto border-separate border-spacing-y-1.5">
                            <thead>
                                <tr>
                                    {["Descrição", "Valor", "Tipo"].map((header, index) => (
                                        <th key={index} className="text-left border-b-2">
                                            <Label variant={"normal"}>{header}</Label>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {transfers.slice().reverse().slice(0, 3).map((item, index) => (
                                    <tr key={index} className={`hover:bg-colorShadow w-full`}>
                                        {/* DESCRIÇÃO */}
                                        <td
                                            className={`py-2 pl-2 rounded border-l-4 ${item.type === "Receita" ? "border-colorGreen" : "border-colorRed"
                                                }`}
                                        >
                                            <Label>{item.description}</Label>
                                        </td>
                                        {/* VALOR */}
                                        <td className="py-2">
                                            <Label className="font-bold">
                                                R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                            </Label>
                                        </td>
                                        {/* TIPO */}
                                        <td className="flex items-center gap-1 py-2">
                                            {item.type === "Despesa" ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-7 stroke-colorRed"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-7 stroke-colorGreen"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            )}
                                            <Label>{item.type}</Label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {
                    transfers.length > 3 &&
                    <Link to='historic' className="hover:bg-colorShadow transition-colors rounded py-1 flex justify-center items-center gap-1">
                        <Link to='historic' className="font-semibold">
                            Ver mais
                        </Link>
                    </Link>
                }
            </section>
        </main >
    )
}

export default Home;