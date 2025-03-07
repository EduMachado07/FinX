import { Link } from "react-router";
import { useTransfersStore } from "@/context/transfers";

interface FilterProps {
  children: React.ReactNode;
}

import { Button } from "@/components/ui/button";

import { TrendingUp } from "lucide-react";
import {
  Label, PolarRadiusAxis, RadialBar, RadialBarChart,
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
const Filter: React.FC<FilterProps> = ({ children }) => {
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

const GraphicMonth = () => {

  const { monthlyData, transfers } = useTransfersStore();
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
    <Card className="bg-colorSecondary shadow-md border-none rounded-md w-full max-md:w-full relative">
      <CardHeader>
        <CardTitle>Transações de {currentMonthName}</CardTitle>
        <CardDescription className="text-pretty">
          Visor da proporção das receitas e despesas de{" "}
          <span className="capitalize">{currentMonthName}</span>
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
                    );
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
                <span className="text-colorGreen font-bold">Parabéns! </span>
                Suas finanças estão controladas.
              </span>
              <TrendingUp className="h-4 w-4 max-sm:hidden" />
            </>
          ) : (
            <>
              <span className="text-pretty text-sm/4">
                Cuidado, suas despesas estão altas!{" "}
                <span className="text-colorRed font-bold">
                  Controle seus gastos.
                </span>
              </span>
            </>
          )}
        </div>
      </CardFooter>
      {transfers.length === 0 ? (
        <Filter>Nenhuma transação foi realizada</Filter>
      ) : expenseMonthlyData.despesa === 0 &&
        expenseMonthlyData.receita === 0 ? (
        <Filter>
          Nenhuma transação foi realizada no mês de{" "}
          <span className="capitalize font-bold">{currentMonthName}</span>
        </Filter>
      ) : null}
    </Card>
  );
};

export default GraphicMonth;
