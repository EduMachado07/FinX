import { create } from 'zustand';

type Transfer = {
    id: number;
    description: string;
    value: number;
    date: string;
    type: 'Receita' | 'Despesa';
    category: string;
};

type DataFormat = {
    name: string;
    receita: number;
    despesa: number;
};

type DataCategories = {
    name: string;
    total: number;
    fill: string;
}

type TransfersStore = {
    revenue: number;
    expense: number;

    transfers: Transfer[];
    monthlyData: DataFormat[];
    weekData: DataFormat[];
    currentMonthData: DataFormat[];
    categoriesData: DataCategories[];

    addTransfer: (transfer: Transfer) => void;
    removeTransfer: (id: number) => void;
    cleanTransfer: () => void;
};

const categoryColors: Record<
    "Salário" | "Extra" | "Investimentos" | "Alimentação" | "Moradia" | "Transporte" | "Saúde/Academia" | "Compras" | "Entretenimento" | "Viagem" | "Outro",
    string
> = {
    Salário: "#3D8B40", // Verde
    Extra: "#FF5733", // Laranja-avermelhado
    Investimentos: "#2980B9", // Azul escuro
    Alimentação: "#E67E22", // Laranja intenso
    Moradia: "#16A085", // Verde-azulado
    Transporte: "#5B2C6F", // Roxo escuro
    "Saúde/Academia": "#27AE60", // Verde médio
    Compras: "#D35400", // Laranja queimado
    Entretenimento: "#C0392B", // Vermelho intenso
    Viagem: "#7D3C98", // Roxo vibrante
    Outro: "#6C7A89", // Cinza médio
};

export const useTransfersStore = create<TransfersStore>((set) => {
    const calculateMonthlyData = (transfers: Transfer[]): DataFormat[] => {
        const meses = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ];

        const anoAtual = new Date().getFullYear();

        const totaisPorMes: Record<string, DataFormat> = {};

        // Inicializa com todos os meses
        meses.forEach((mes) => {
            totaisPorMes[mes] = { name: mes, receita: 0, despesa: 0 };
        });

        // Soma os valores das transferências
        transfers.forEach(({ date, type, value }) => {
            const dataObj = new Date(date);
            const mes = dataObj.getMonth();
            const ano = dataObj.getFullYear();

            if (ano === anoAtual) {
                const chaveMes = meses[mes];
                if (!totaisPorMes[chaveMes]) {
                    totaisPorMes[chaveMes] = { name: chaveMes, receita: 0, despesa: 0 };
                }
                if (type === "Receita") {
                    totaisPorMes[chaveMes].receita = (totaisPorMes[chaveMes].receita || 0) + value;
                } else {
                    totaisPorMes[chaveMes].despesa = (totaisPorMes[chaveMes].despesa || 0) + value;
                }
            }
        });

        return Object.values(totaisPorMes);
    };
    const calculateWeekData = (transfers: Transfer[]): DataFormat[] => {
        const daysWeek = [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
        ];

        const today = new Date(); // Data atual
        const totalDaysWeek: Record<string, DataFormat> = {};

        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const dayName = daysWeek[date.getDay()];
            const formattedDate = date.toISOString().split("T")[0];

            totalDaysWeek[formattedDate] = { name: dayName, receita: 0, despesa: 0 };
        }

        transfers.forEach(({ date, value, type }) => {
            const normalizedDate = new Date(date).toISOString().split("T")[0]; // Normaliza a data da transferência
            if (totalDaysWeek[normalizedDate]) {
                if (type === "Receita") {
                    totalDaysWeek[normalizedDate].receita = (totalDaysWeek[normalizedDate].receita || 0) + value;
                } else {
                    totalDaysWeek[normalizedDate].despesa = (totalDaysWeek[normalizedDate].despesa || 0) + value;
                }
            }
        });

        return Object.values(totalDaysWeek).reverse();
    }
    const getCurrentMonthTransfers = (transfers: Transfer[]): DataFormat[] => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const result: Record<string, DataFormat> = {};

        for (let days = 1; days <= daysInMonth; days++) {
            const date = new Date(currentYear, currentMonth, days)
                .toISOString()
                .split("T")[0];
            result[date] = { name: date, receita: 0, despesa: 0 };
        }

        transfers.forEach((element) => {
            const transactionDate = new Date(element.date);
            const transactionYear = transactionDate.getFullYear();
            const transactionMonth = transactionDate.getMonth();

            if (
                transactionYear === currentYear &&
                transactionMonth === currentMonth
            ) {
                const dateKey = element.date;
                if (element.type === "Receita") {
                    result[dateKey].receita = (result[dateKey].receita || 0) + element.value;
                } else {
                    result[dateKey].despesa = (result[dateKey].despesa || 0) + element.value;
                }
            }
        });

        return Object.values(result);
    };
    const calculateValueCategories = (transfers: Transfer[]): DataCategories[] => {
        const categories: (keyof typeof categoryColors)[] = [
            "Salário",
            "Extra",
            "Investimentos",
            "Alimentação",
            "Moradia",
            "Transporte",
            "Saúde/Academia",
            "Compras",
            "Entretenimento",
            "Viagem",
            "Outro",
        ];

        const result: Record<string, DataCategories> = {};

        categories.forEach((index) => {
            result[index] = { name: index, total: 0, fill: categoryColors[index] };
        });

        const dateObj = new Date();
        const currentMonth = dateObj.getMonth() + 1;
        const currentYear = dateObj.getFullYear();

        transfers.forEach((index) => {
            const [year, month] = index.date.split("-").map(Number);

            if (year === currentYear && month === currentMonth) {
                if (result[index.category]) {
                    result[index.category].total = (result[index.category].total || 0) + index.value;
                }
            }
        });

        return Object.values(result);
    };

    return {
        revenue: JSON.parse(localStorage.getItem("revenue") || "0.00"),
        expense: JSON.parse(localStorage.getItem("expense") || "0.00"),
        transfers: JSON.parse(localStorage.getItem("transfers") || "[]"),
        monthlyData: calculateMonthlyData(
            JSON.parse(localStorage.getItem("transfers") || "[]")
        ),
        weekData: calculateWeekData(
            JSON.parse(localStorage.getItem("transfers") || "[]")
        ),
        currentMonthData: getCurrentMonthTransfers(
            JSON.parse(localStorage.getItem("transfers") || "[]")
        ),
        categoriesData: calculateValueCategories(
            JSON.parse(localStorage.getItem("transfers") || "[]")
        ),

        addTransfer: (transfer) => {
            set((state) => {
                let newRevenue = state.revenue;
                let newExpense = state.expense;

                if (transfer.type === "Receita") {
                    newRevenue += transfer.value;
                    localStorage.setItem("revenue", JSON.stringify(newRevenue));
                } else {
                    newExpense += transfer.value;
                    localStorage.setItem("expense", JSON.stringify(newExpense));
                }

                const updatedTransfers = [...state.transfers, transfer];
                localStorage.setItem("transfers", JSON.stringify(updatedTransfers));

                return {
                    transfers: updatedTransfers,
                    revenue: newRevenue,
                    expense: newExpense,
                    monthlyData: calculateMonthlyData(updatedTransfers),
                    weekData: calculateWeekData(updatedTransfers),
                    currentMonthData: getCurrentMonthTransfers(updatedTransfers),
                    categoriesData: calculateValueCategories(updatedTransfers),
                };
            });
        },

        removeTransfer: (id) => {
            set((state) => {
                const transferRemove = state.transfers.find(
                    (transfer) => transfer.id === id
                );
                const updatedTransfers = state.transfers.filter(
                    (transfer) => transfer.id !== id
                );

                let newRevenue = state.revenue;
                let newExpense = state.expense;

                if (transferRemove) {
                    if (transferRemove.type === "Receita") {
                        newRevenue -= transferRemove.value;
                        localStorage.setItem("revenue", JSON.stringify(newRevenue));
                    } else {
                        newExpense -= transferRemove.value;
                        localStorage.setItem("expense", JSON.stringify(newExpense));
                    }
                }

                localStorage.setItem("transfers", JSON.stringify(updatedTransfers));

                return {
                    transfers: updatedTransfers,
                    revenue: newRevenue,
                    expense: newExpense,
                    monthlyData: calculateMonthlyData(updatedTransfers),
                    weekData: calculateWeekData(updatedTransfers),
                    currentMonthData: getCurrentMonthTransfers(updatedTransfers),
                    categoriesData: calculateValueCategories(updatedTransfers),
                };
            });
        },

        cleanTransfer: () => {
            localStorage.setItem("transfers", JSON.stringify([]));
            localStorage.setItem("revenue", JSON.stringify(0.0));
            localStorage.setItem("expense", JSON.stringify(0.0));
            set({
                transfers: [],
                revenue: 0.0,
                expense: 0.0,
                monthlyData: calculateMonthlyData([]),
                weekData: calculateWeekData([]),
                currentMonthData: getCurrentMonthTransfers([]),
                categoriesData: calculateValueCategories([]),
            });
        },
    };
});
