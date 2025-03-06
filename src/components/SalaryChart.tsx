
import { BarChart, Bar, Rectangle, Tooltip, ResponsiveContainer, YAxis, XAxis, CartesianGrid } from 'recharts';

export const SalaryChart = ({data}:{data:any}) => {

 
    //@ts-ignore
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black p-2  border-[1px] border-white/20 rounded-md">
                    <p className="text-sm tracking-tight font-medium">{label}</p>
                    <p className="text-xs tracking-tight fade">{`max : ${payload[2].value}`}</p>
                    <p className="text-xs tracking-tight fade">{`Median: ${payload[1].value}`}</p>
                    <p className="text-xs tracking-tight fade">{`Min : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };


    return (
        <ResponsiveContainer width="100%" height={200} className="mt-8">
            <BarChart
                data={data}
            >
               <YAxis />
                <CartesianGrid stroke='#313131' strokeDasharray='4 5'/>
               <XAxis dataKey="role" className='text-xs tracking-tight'/>
                <Tooltip content={<CustomTooltip active payload label/>}/>
                <Bar dataKey="min" fill="#002233" activeBar={<Rectangle fill="#a3eca0" stroke="black" />} />
                <Bar dataKey="median" fill="#002233" activeBar={<Rectangle fill="#66e661" stroke="black" />} />
                <Bar dataKey="max" fill="#002233" activeBar={<Rectangle fill="#11f709" stroke="black" />} />
            </BarChart>
        </ResponsiveContainer>
    );
}
