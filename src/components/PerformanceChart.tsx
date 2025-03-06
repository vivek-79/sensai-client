
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const PerformanceChart = ({data}:{data:[] | null}) => {

  if(data===null){
    return;
  }
  const chartData = data?.map((item)=>{
    return {
      //@ts-ignore
      date: new Date(item.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric'}),
      //@ts-ignore
      score:(item.quizScore)*10
    }
  })

  //@ts-ignore
  const ToolTipComp = ({ active, payload })=>{
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-2  border-[1px] border-white/20 rounded-md">
          <p className="text-sm tracking-tight font-medium text-white">Scores</p>
          <p className="text-xs tracking-tight fade">{`Score: ${payload[1].value}%`}</p>
          <p className="text-xs tracking-tight fade">{`Date : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="w-full py-5 pr-2 mt-6 flex flex-col border-[1px] border-white/40 rounded-md">

      <p className='ml-2 text-2xl md:text-3xl text-white/70 font-semibold'>Performance Trend</p>
      <p className='ml-2 text-white/40 mb-6'>Your quiz score over time</p>
      <div className='w-full h-80'>
        <ResponsiveContainer className="w-full" height="100%">
          <LineChart
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="score" />
            <Tooltip content={<ToolTipComp active payload />} />
            <Line type="monotone" dataKey="date" stroke="#ffffdd" strokeWidth="2px" activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="score" stroke="#ffffdd" strokeWidth="2px" activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
     </div>
    </div>
  )
}

export default PerformanceChart