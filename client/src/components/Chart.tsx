import {IChart, IChartData} from "../types/types.ts";
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts';
import {FC} from "react";

const COLORS = ['#55d278', '#ff5a5a'];

const Chart: FC<IChart> = ({totalIncome, totalExpense}) => {
    const data = new Array<IChartData>(
        {value: totalIncome, name: 'Income'},
        {value: totalExpense, name: 'Expense'}
    )


    return (
        <PieChart width={240} height={240}>
            <Pie
                data={data}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={2}
                dataKey='value'
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend/>
            <Tooltip/>
        </PieChart>
    );
};

export default Chart;