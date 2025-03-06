
import ResumeForm from "../forms/ResumeForm"


const ResumeBuilder = ({ data }: { data:{id:number | undefined,content:string | undefined} | null }) => {


    return (
        <div className="text-white w-full">

            <div className="flex md:flex-row flex-col md:items-center md:justify-between">
                <h1 className="heading">
                    Resume Builder
                </h1>
            </div>
                <div className="w-full py-6">
                    <ResumeForm initialData={data} />
                </div>
        </div>
    )
}

export default ResumeBuilder