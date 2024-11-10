"use client"
import * as React from "react"
import {Bar, BarChart, Cell} from "recharts"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"

import {Slider} from "@nextui-org/react";
import {Input} from "@/components/ui/input";
import {useEffect} from "react";

const chartData = [
    {priceValue: "20", quantity: 97},
    {priceValue: "40", quantity: 167},
    {priceValue: "60", quantity: 242},
    {priceValue: "80", quantity: 242},
    {priceValue: "100", quantity: 373},
    {priceValue: "120", quantity: 301},
    {priceValue: "140", quantity: 245},
    {priceValue: "160", quantity: 409},
    {priceValue: "180", quantity: 59},
    {priceValue: "200", quantity: 261},
    {priceValue: "220", quantity: 327},
    {priceValue: "240", quantity: 292},
    {priceValue: "260", quantity: 342},
    {priceValue: "280", quantity: 137},
    {priceValue: "300", quantity: 120},
    {priceValue: "320", quantity: 138},
    {priceValue: "340", quantity: 446},
    {priceValue: "360", quantity: 364},
    {priceValue: "380", quantity: 243},
    {priceValue: "400", quantity: 200},
    {priceValue: "420", quantity: 180},
    {priceValue: "440", quantity: 150},
    {priceValue: "460", quantity: 112},
    {priceValue: "480", quantity: 89},
    {priceValue: "500", quantity: 70},
    {priceValue: "520", quantity: 60},
    {priceValue: "540", quantity: 50},
]

const chartConfig = {
    views: {
        label: "Page Views",
    },
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface PriceRangeProps {
    priceRange: number[]
    onRangeChange: (range: number[]) => void; // Funció per passar el rang de preus a FiltersDialog
}

export const PriceRange: React.FC<PriceRangeProps> = ({priceRange, onRangeChange}) => {

    const [value, setValue] = React.useState(priceRange);

    useEffect(() => {
        setValue(priceRange);
    }, [priceRange]);

    const handleSliderChangeEnd = (newValue: number | number[]) => {
        console.log("Slider change end: " + newValue)
        onRangeChange(newValue);
    }

    const handleSliderChange = (newValue: any) => {
        console.log("Slider change: " + newValue)
        setValue(newValue);
    }

    const setMinValue = (event) => {
        const inputValue = event.target.value
        /*setValue([parseInt(inputValue) || 0, value[1]])*/
        onRangeChange(inputValue);
    }

    const setMaxValue = (event) => {
        const inputValue = event.target.value
        /*setValue([value[0], parseInt(inputValue) || 0])*/
        onRangeChange(inputValue);
    }

    const getBarColor = (dataValue) => {
        return dataValue >= value[0] && dataValue <= value[1]
            ? 'var(--color-desktop)' // Color si el valor està dins del rang
            : 'gray'; // Color gris si no
    };

    return (
        <div className="flex flex-col gap-6 w-full h-full max-w-md items-start justify-center">
            <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full relative"
            >
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <Bar
                        dataKey={"quantity"}
                        activeBar={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.priceValue)}/>
                        ))}
                    </Bar>
                </BarChart>
                <Slider
                    formatOptions={{style: "currency", currency: "EUR"}}
                    size={"sm"}
                    color={"foreground"}
                    aria-label={"Price Range"}
                    disableThumbScale={true}
                    step={20}
                    maxValue={540}
                    minValue={20}
                    value={value}
                    onChangeEnd={handleSliderChangeEnd}
                    onChange={handleSliderChange}
                    className="max-w-md absolute bottom-0 translate-y-1/2"
                />
            </ChartContainer>
            <div className={"flex flex-row justify-between w-full"}>
                <div className={"flex flex-col"}>
                    <p>Minimum</p>
                    <Input type="number" placeholder="Min value" onChange={setMinValue} value={value[0]}
                           className={"text-center w-24"}></Input>
                </div>
                <div className={"flex flex-col"}>
                    <p>Maximum</p>
                    <Input type="number" placeholder="Max value" onChange={setMaxValue} value={value[1]}
                           className={"text-center w-24"}></Input>
                </div>
            </div>
        </div>
    )
}