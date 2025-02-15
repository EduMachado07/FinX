import { useEffect, useState } from "react";
import { useTransfersStore } from "@/context/transfers";

import { Link } from "react-router";

// COMPONENTES SHADCN
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    // DialogFooter
} from "@/components/ui/dialog"

const Historic = () => {

    const { transfers, removeTransfer, cleanTransfer } = useTransfersStore();
    const [listTransfers, setListTransfers] = useState(transfers);

    useEffect(() => {
        setListTransfers([...transfers]);
    }, [transfers]);

    // FUNCAO PARA FILTRAR TRANSFERENCIA
    const filterTransfer = (name: string) => {
        const normalizeString = (str: string) =>
            str
                ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                : "";

        const updateTransfers = transfers.filter((transfer) =>
            normalizeString(transfer.description)
                .toLowerCase()
                .startsWith(normalizeString(name).toLowerCase())
        );

        setListTransfers(updateTransfers);
    };

    // FUNCAO PARA LIDAR COM CADA ORDENACAO
    const sortTransfers = (criteria: string) => {
        const sortedTransfers = [...listTransfers].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            switch (criteria) {
                case 'new':
                    return dateA.getTime() - dateB.getTime();
                case 'old':
                    return dateB.getTime() - dateA.getTime();
                case 'revenue':
                    return a.type === 'Receita' ? -1 : 1;
                case 'expense':
                    return a.type === 'Despesa' ? -1 : 1;
                default:
                    return 0;
            }
        });
        setListTransfers(sortedTransfers);
    };

    const formatDate = (dateString: string): string => {
        const [year, month, day] = dateString.split("-");

        const months = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];

        const monthName = months[parseInt(month, 10) - 1];

        return `${day} de ${monthName} de ${year}`;
    };

    return (
        <main className="flex flex-col gap-4">
            <section className="flex items-center justify-between max-md:gap-5">
                <div className="md:w-2/3 w-full flex items-center gap-6">
                    {/* CAMPO PESQUISA */}
                    <Input
                        className="border-slate-600"
                        placeholder="Pesquisar transferência"
                        onChange={(e) => filterTransfer(e.target.value)}
                    />
                    {/* ORDENAR */}
                    <Select
                        onValueChange={(value) => sortTransfers(value)}>
                        <SelectTrigger className="w-[190px] border-slate-600">
                            <SelectValue placeholder="Ordenar por..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="new">Mais novo</SelectItem>
                                <SelectItem value="old">Mais antigo</SelectItem>
                                <SelectItem value="revenue">Receita</SelectItem>
                                <SelectItem value="expense">Despesa</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </section>
            {/* HISTORICO */}
            <section className="bg-colorSecondary w-full rounded shadow-md p-3">
                <div className="overflow-x-auto overflow-y-hidden">
                    {listTransfers?.length === 0 ? (
                        <Label className="px-1 py-2" variant={"normal"}>
                            No momento você não possui nenhuma transação.{" "}
                            <Link to="/" className="underline underline-offset-2 text-colorPrimary">
                                Criar transação.
                            </Link>
                        </Label>
                    ) : (
                        <table className="w-full table-auto border-separate border-spacing-y-1.5 min-w-[700px]">
                            <thead>
                                <tr>
                                    {["Descrição", "Valor", "Data", "Categoria", "Tipo", ""].map((header, index) => (
                                        <th key={index} className="text-left border-b-2">
                                            <Label variant={"normal"}>{header}</Label>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {listTransfers.map((item, index) => (
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
                                        {/* DATA */}
                                        <td className="py-2">
                                            <Label>{formatDate(item.date)}</Label>
                                        </td>
                                        {/* CATEGORIA */}
                                        <td className="py-2">
                                            <Label className="capitalize">{item.category}</Label>
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
                                        {/* BOTÃO REMOVER */}
                                        <td className="rounded">
                                            <Button onClick={() => removeTransfer(item.id)} size={"icon"}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* BOTAO EXCLUIR TODAS TRANSFERENCIAS */}
            {transfers.length > 0 &&
                <div className="text-right">
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                <span>Excluir tudo</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="md:max-w-[450px] max-w-[400px] bg-colorBack rounded-md">
                            <DialogHeader>
                                <DialogTitle className="text-left font-bold">Deseja excluir tudo?</DialogTitle>
                                <DialogDescription className="text-justify">
                                    Essa ação é irreversível. Todas as transferências serão permanentemente apagadas.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-3">
                                <DialogClose asChild>
                                    <Button variant={"default"}>Cancelar</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant={"destructive"} onClick={cleanTransfer}>Excluir</Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            }

        </main>
    )
}

export default Historic