import { FaArrowTrendDown, FaArrowTrendUp, FaRegChessKing } from "react-icons/fa6";
import { Insights } from "../helpers/types";
import { SalaryChart } from "./SalaryChart"
import { MdCompareArrows } from "react-icons/md";


interface Data {
    message: string;
    success: boolean;

    insights: Insights
}

const outLookIcon = (outlook: string) => {

    switch (true) {
        case outlook == "Positive" || outlook == "High":
            return <FaArrowTrendUp className="text-green-400" />
            break;
        case outlook == "Negative" || outlook == "Low":
            return <FaArrowTrendDown className="bg-red-400" />
            break;

        default:
            return <MdCompareArrows className="text-white/50" />
            break;
    }
}

const growthRate = (growth: number) => {


    switch (true) {
        case growth >= 0 && growth <= 10:

            return "text-green-50"
        case growth > 10 && growth <= 20:

            return "text-green-100"
        case growth > 20 && growth <= 40:

            return "text-green-200"
        case growth > 40 && growth <= 60:

            return "text-green-300"
        case growth > 60 && growth <= 80:
            return "text-green-400"

        default:
            return "text-green-500"
            break;
    }
}

const IndustryInsights = ({ data }: { data: Data }) => {


    if (!data) {
        return <p>Loading...</p>
    }
    if (!data.success) {
        return <p>{data.message}</p>
    }

    const insight = data.insights;
    console.log(insight)
    return (
        <div className="w-full">
            <div className=" w-full md:ml-4 px-2">
                <h2 className=" heading mt-8">Industry Insights</h2>
                <p className="text-sm tracking-tight text-white/50">Last updated  {insight.lastUpdated.slice(0, 10)}</p>


                <div className="mt-4 w-full flex flex-col sm:flex-row gap-2">
                    <div className="md:w-1/2 w-full h-28 flex gap-2">
                        <div className="insightCard">
                            <p className="w-full text-sm flex relative fade">Market Outlook <span className="absolute right-2">{outLookIcon(insight.marketOutLook)}</span></p>
                            <p className="text-xl font-medium mt-2">{insight.marketOutLook}</p>
                            <p className="text-sm text-white/70 mt-2">Next update In {insight.nextUpdated.slice(8, 10) - new Date(Date.now()).getDate()} days</p>
                        </div>

                        <div className="insightCard">
                            <p className="w-full text-sm flex relative fade">Industry Growth <span className='absolute right-2 text-red'>{<FaArrowTrendUp className={`${growthRate(insight.growthRate)}`} />}</span></p>
                            <p className="text-xl font-medium mt-2">{insight.growthRate}%</p>
                            <div className="w-full h-2 mt-4 bg-white/20 rounded-md overflow-clip relative">
                                <div className={`absolute bg-white/80 h-full rounded-md ${insight?.growthRate < 11 ? "w-[10%] " : insight?.growthRate < 30 ? "w-[30%] " : insight?.growthRate < 51 ? "w-[50%]" : insight?.growthRate < 81 ? "w-[80%]" : "w-[100%]"}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full h-28 flex gap-2">
                        <div className="insightCard w-1/2">
                            <p className="w-full text-sm flex relative fade">Demand Level <span className="absolute right-2">{outLookIcon(insight.demandLevel)}</span></p>
                            <p className="text-xl font-medium mt-2">{insight.demandLevel}</p>
                            <div className="w-full h-2 mt-4 bg-white/20 rounded-md overflow-clip relative">
                                <div className={`absolute h-full bg-green-400 rounded-md ${insight.demandLevel === "High" ? "w-[100%] " : insight.demandLevel === "Low" ? "w-[10%] " : "w-[50%] "}]`}></div>
                            </div>
                        </div>

                        <div className="insightCard overflow-clip w-1/2">
                            <p className="w-full text-sm flex relative fade">Top Skills<span className='absolute right-2 text-red'><FaRegChessKing /></span></p>
                            <div className="w-full mt-1 text-xs tracking-tight flex gap-1 flex-wrap">
                                {insight?.topSkills && insight.topSkills.map((skil) => (
                                    <span className="bg-white/30 p-[1px] px-[3px] rounded-md" key={skil}>{skil}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="md:w-full flex flex-col mt-6 border-[1px] border-white/20 md:ml-4 p-2 mx-auto w-[97%] rounded-md">
                <p className="text-xl font-medium">Salary Range by Role</p>
                <p className="fade tracking-tighter text-sm">Displaying minimum, median, and maximum salaries (in rupees)</p>
                <SalaryChart data={insight.salaryRange} />
            </div>

            <div className="py-6 flex flex-col md:flex-row w-[97%] md:w-full md:ml-4 mx-auto gap-8">
                <ul className="box flex flex-col">
                    <p className=" font-medium">Key industry Trends</p>
                    <p className="mb-4 fade text-sm tracking-tight mt-1">Current trends shaping the industry</p>
                    {insight?.keyTrends.map((trend)=>(
                        <li className="text-white/90 list-disc list-inside leading-8" key={trend}>{trend}</li>
                    )) }
                </ul>
                    <ul className="box flex flex-col">
                        <p className=" font-medium">Recommended Skills</p>
                        <p className="mb-4 fade text-sm tracking-tight mt-1">Skills to consider develloping</p>
                       
                       <ul className="w-full flex gap-2 flex-wrap">
                        {insight?.recommendedSkills.map((skill) => (
                            <li className="text-white/90 bg-white/20 px-1 rounded-md" key={skill}>{skill}</li>
                        ))}
                       </ul>
                    </ul>
            </div>
        </div>
    )
}

export default IndustryInsights