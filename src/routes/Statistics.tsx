import { Link } from "react-router";
import { useTransfersStore } from "@/context/transfers";

import { Button } from "@/components/ui/button";

import { TrendingUp, TrendingDown } from "lucide-react";
import {
    CartesianGrid, Line, LineChart, XAxis, YAxis,
    Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart,
    Bar, BarChart,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// COMPONENTE SOBREPOSICAO
const Filter = ({ children }) => {
    return (
        <main className="w-full h-full rounded-md bg-zinc-950/85 absolute top-0 flex flex-col justify-center items-center gap-5 px-6">
            <div className="text-slate-50 text-pretty">
                {children}
            </div>
            <Link to='/'>
                <Button variant={"secondary"} className="">Adicionar transação</Button>
            </Link>
        </main>
    )
}

const chartConfig = {
    receita: {
        label: "receita",
        color: "#3D8B40",
    },
    despesa: {
        label: "despesa",
        color: "#E74C3C",
    },
} satisfies ChartConfig;

const Statistics = () => {
    const { monthlyData, weekData, currentMonthData, categoriesData, transfers } = useTransfersStore();
    const currentMonthName = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ][new Date().getMonth()]

    const expenseMonthly = () => {
        const atualMonth = new Date().getMonth();
        const despesa = monthlyData[atualMonth]?.despesa || 0;
        const receita = monthlyData[atualMonth]?.receita || 0;
        const totalTransacoes = despesa + receita;

        return {
            month: currentMonthName,
            despesa,
            receita,
            totalTransacoes,
            despesaPercentual: ((despesa / totalTransacoes) * 100).toFixed(2),
        };
    }
    const expenseMonthlyData = expenseMonthly();

    return (
        <main className="flex flex-col gap-10 max-md:gap-8">
            {/* COMPONENTE LINE CHART */}
            {/* --- receitas e despesas do ano --- */}
            <Card className="bg-colorSecondary shadow-md border-none rounded-md relative">
                <CardHeader>
                    <CardTitle>Receitas e Despesas</CardTitle>
                    <CardDescription>
                        Representa o total das suas transações de cada mês no ano de {new Date().getFullYear()}
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-72 max-md:h-60 px-3 max-md:overflow-x-scroll overflow-y-hidden">
                    <ChartContainer className="h-72 max-md:h-60 w-full pb-2 min-w-[700px]" config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={monthlyData} // DADOS
                            margin={{
                                left: 14,
                                right: 14,
                            }}
                        >
                            <CartesianGrid
                                vertical={false}
                                horizontal={true}
                            />
                            {/* MESES DO ANO */}
                            <XAxis
                                dataKey="name"
                                tickLine={true}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            {/* INFORMACOES CADA MES */}
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            {/* SEGMENTOS DE CADA TIPO TRANSACAO */}
                            <Line
                                dataKey="receita"
                                type="bump"
                                stroke="#3D8B40"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="despesa"
                                type="bump"
                                stroke="#E74C3C"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
                {/* SOBREPOSIÇÃO */}
                {
                    monthlyData.every((item) => item.despesa === 0 && item.receita === 0) &&
                    <Filter>
                        Nenhuma transação foi realizada.
                    </Filter>
                }
            </Card>

            <h1 className="-mb-7 max-md:-mb-5 font-semibold text-xl">
                Mês de <span className="capitalize">{currentMonthName}</span>
            </h1>

            <section className="w-full flex gap-10 max-md:flex-col max-md:gap-8">
                {/* COMPONENTE LINE CHART */}
                {/* --- receitas e despesas do mes --- */}
                <Card className="bg-colorSecondary shadow-md border-none rounded-md relative md:w-3/4">
                    <CardHeader>
                        <CardTitle>Receitas e Despesas</CardTitle>
                        <CardDescription>
                            Suas transações de cada dia de <span className="capitalize">{currentMonthName}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-72 max-md:h-60 px-3 max-md:overflow-x-scroll overflow-y-hidden">
                        <ChartContainer className="h-72 max-md:h-60 w-full min-w-[600px] pb-2" config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={currentMonthData}
                                margin={{
                                    left: 16,
                                    right: 16,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value, index) => {
                                        const dateObj = new Date(`${value}T00:00:00Z`);
                                        const day = dateObj.getUTCDate();

                                        const intervalo = Math.ceil(currentMonthData.length / 7);

                                        // Garante que o primeiro e o último dia sempre apareçam
                                        if (index === 0 || index === currentMonthData.length - 1 || index % intervalo === 0) {
                                            return `${day} ${currentMonthName.slice(0, 3)}`;
                                        }

                                        return "";
                                    }}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                // Garantir que a data seja tratada corretamente
                                                const dateObj = new Date(value);

                                                const day = dateObj.getUTCDate();
                                                const month = dateObj.toLocaleString("pt-BR", { month: "long" });

                                                // Montar a data formatada manualmente
                                                return `${day} de ${month}`;
                                            }}
                                            indicator="line"
                                        />
                                    }
                                    cursor={false}
                                />
                                <Line
                                    dataKey="receita"
                                    type="bump"
                                    stroke="#3D8B40"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    dataKey="despesa"
                                    type="bump"
                                    stroke="#E74C3C"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                    {/* SOBREPOSIÇÃO */}
                    {
                        transfers.length === 0 ? (
                            <Filter>
                                Nenhuma transação foi realizada
                            </Filter>
                        ) : currentMonthData.reduce((acc, day) => acc + day.receita + day.despesa, 0) === 0 ? (
                            <Filter>
                                Nenhuma transação foi realizada no mês de {" "}
                                <span className="capitalize font-bold">{currentMonthName}</span>
                            </Filter>
                        ) : null
                    }
                </Card>

                {/* COMPONENTE DONUT ACTIVE */}
                {/* --- soma de todas as despesas do mes --- */}
                <Card className="bg-colorSecondary shadow-md border-none rounded-md w-1/4 max-md:w-full relative">
                    <CardHeader>
                        <CardTitle>Despesas do mês</CardTitle>
                        <CardDescription className="text-pretty">
                            Soma de todas as despesas de <span className="capitalize">{currentMonthName}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-52 max-md:h-48">
                        <ChartContainer className="h-52 max-md:h-48 w-full" config={chartConfig}>
                            <RadialBarChart
                                data={[expenseMonthly()]}
                                startAngle={0}
                                endAngle={120}
                                innerRadius={80}
                                outerRadius={140}
                            >
                                <PolarGrid
                                    gridType="circle"
                                    radialLines={false}
                                    stroke="none"
                                    className="first:fill-colorShadow last:fill-colorSecondary"
                                    polarRadius={[86, 74]}
                                />
                                <RadialBar dataKey="despesa" background fill="#E74C3C" />

                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {expenseMonthlyData.despesa}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Reais em despesas
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </PolarRadiusAxis>
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Representa {expenseMonthlyData.despesaPercentual}% das transações <TrendingDown className="size-4" />
                        </div>
                    </CardFooter>
                    {
                        expenseMonthlyData.despesa === 0 && expenseMonthlyData.receita === 0 ? (
                            <Filter>
                                Nenhuma transação foi realizada no mês de {" "}
                                <span className="capitalize font-bold">{currentMonthName}</span>
                            </Filter>
                        ) : expenseMonthlyData.despesa === 0 ? (
                            <Filter>
                                Nenhuma despesa foi adicionada no mês de{" "}
                                <span className="capitalize font-bold">{currentMonthName}</span>
                            </Filter>
                        ) : null
                    }
                </Card>
            </section>

            <section className="w-full flex gap-10 max-md:flex-col max-md:gap-8">
                {/* COMPONENTE RADIAL CHART - STACKED */}
                {/* --- proporcao das despesas e receitas do mes atual--- */}
                <Card className="bg-colorSecondary shadow-md border-none rounded-md w-full max-md:w-full relative">
                    <CardHeader>
                        <CardTitle>Transações do mês</CardTitle>
                        <CardDescription className="text-pretty">
                            Visor da proporção das receitas e despesas de <span className="capitalize">{currentMonthName}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 max-md:h-48">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square w-full h-64"
                        >
                            <RadialBarChart
                                data={[expenseMonthly()]}
                                startAngle={-15}
                                endAngle={195}
                                innerRadius={110}
                                outerRadius={170}
                                className="max-md:mt-3 mt-7"
                            >
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel indicator="line" />}
                                />
                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) - 4}
                                                            className="fill-foreground max-md:text-2xl text-3xl font-bold"
                                                        >
                                                            {expenseMonthlyData.totalTransacoes}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 20}
                                                            className="fill-muted-foreground text-sm"
                                                        >
                                                            Reais em transações
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </PolarRadiusAxis>
                                <RadialBar
                                    dataKey="receita"
                                    stackId="a"
                                    cornerRadius={5}
                                    fill="#3D8B40"
                                    className="stroke-transparent stroke-2"
                                />
                                <RadialBar
                                    dataKey="despesa"
                                    fill="#E74C3C"
                                    stackId="a"
                                    cornerRadius={5}
                                    className="stroke-transparent stroke-2"
                                />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {expenseMonthlyData.receita >= expenseMonthlyData.despesa ? (
                                <>
                                    <span>
                                        <span className="text-colorGreen font-bold">Parabéns!{" "}</span>
                                        Suas finanças estão controladas este mês.</span>
                                    <TrendingUp className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    <span className="text-pretty text-sm/4">
                                        Cuidado, suas despesas estão altas!{" "}
                                        <span className="text-colorRed font-bold">Controle seus gastos.</span>
                                    </span>
                                </>
                            )}
                        </div>
                    </CardFooter>
                    {
                        transfers.length === 0 ? (
                            <Filter>
                                Nenhuma transação foi realizada
                            </Filter>
                        ) : expenseMonthlyData.despesa === 0 && expenseMonthlyData.receita === 0 ? (
                            <Filter>
                                Nenhuma transação foi realizada no mês de {" "}
                                <span className="capitalize font-bold">{currentMonthName}</span>
                            </Filter>
                        ) : null
                    }
                </Card>

                {/* COMPONENTE BAR CHART - MULTIPLE */}
                {/* --- receitas e despesas de sete dias atras --- */}
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="font-semibold text-xl">
                        Nesta semana
                    </h1>
                    <Card className="bg-colorSecondary shadow-md border-none rounded-md w-full max-md:w-full relative">
                        <CardHeader>
                            <CardTitle>Receitas e despesas</CardTitle>
                            <CardDescription className="text-pretty">
                                Suas receitas e despesas dos últimos 7 dias
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-64 max-md:h-48">
                            <ChartContainer className="h-64 max-md:h-48 w-full" config={chartConfig}>
                                <BarChart accessibilityLayer data={weekData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <Bar dataKey="receita" fill="#3D8B40" radius={4} />
                                    <Bar dataKey="despesa" fill="#E74C3C" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        {/* SOBREPOSIÇÃO */}
                        {
                            transfers.length === 0 ? (
                                <Filter>
                                    Nenhuma transação foi realizada
                                </Filter>
                            ) : weekData.reduce((acc, day) => acc + day.receita + day.despesa, 0) === 0 ? (
                                <Filter>
                                    Nenhuma transação realizada nesta semana
                                </Filter>
                            ) : null
                        }
                    </Card>
                </div>
            </section>

            {/* COMPONENTE BAR CHART MIXED */}
            {/* --- total valor de cada categoria --- */}
            <Card className="bg-colorSecondary shadow-md border-none rounded-md relative">
                <CardHeader>
                    <CardTitle>Categorias</CardTitle>
                    <CardDescription>Suas transações de <span className="capitalize">{currentMonthName}</span> por categoria </CardDescription>
                </CardHeader>
                <CardContent className="h-[470px] max-md:h-80 max-md:overflow-x-scroll overflow-y-hidden">
                    <ChartContainer config={chartConfig} className="h-[470px] max-md:h-80 w-full min-w-[900px] md:px-6">
                        <BarChart accessibilityLayer data={categoriesData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={7}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel indicator="line" />}
                            />
                            <Bar dataKey="total" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                {/* SOBREPOSIÇÃO */}
                {
                    transfers.length === 0 && (
                        <Filter>
                            Nenhuma transação foi realizada
                        </Filter>
                    )
                }
            </Card>

        </main>
    );
};

export default Statistics;
