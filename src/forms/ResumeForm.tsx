import { zodResolver } from "@hookform/resolvers/zod";
import { useForm ,useFieldArray} from "react-hook-form"
import { resumeSchema } from "../helpers/types";
import { useFetch } from "../services/useFetch";
import FormChild from "../components/atoms/FormChild";
import Button from "../components/atoms/Button";
import { useEffect, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { entriesToMarkdown } from "../helpers/Resume";
import { IoSaveOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
// @ts-ignore
import html2pdf from "html2pdf.js";


const ResumeForm = ({initialData}:{initialData:{id:number | undefined,content:string | undefined} | null}) => {


    const [showForm, setShowForm] = useState<boolean>()
    const [currentEducation,setCurrentEducation] = useState<{index:number}>({index:-1})
    const [currentProject, setCurrentProject] = useState<{index:number}>({index:-1})
    const [currentJob, setCurrentJob] = useState<{index:number}>({index:-1})
    const [experienced, setExperienced] = useState<boolean>(false);
    const [showSummery, setShowSummery] = useState<boolean>(false);
    const [previewContent, setPreviewContent] = useState<any>();
    const [isGenerating,setIsGenerating] = useState<boolean>()
    const [showWarning, setShowWarning] = useState<boolean>()
    const [server, setServer] = useState<{ api: string; method: "" | "get" | "post",info?:any }>({ api: '', method: "" ,info:""})

    const {control,register,handleSubmit,watch,formState:{errors}} = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues:{
            contactInfo: { name: '', phone: '', email: '', linkedin: '', gitHub :''},
            summery:'',
            skills: [{ title: "", subTitle: "" }],
            experience: [{ title: "", subTitle:  "", startDate: "", location: "", endDate: "", current: false }],
            education: [{ title: "", subTitle: "", startDate: "", location: "", endDate: "", current :false}],
            projects: [{ title: "", subTitle: "", startDate: "", location: "", endDate: "",git:"",visit:"", current: false }],
            achievements: [{ title: "", subTitle:"" }],
        }
    });

    const {fields:skills,append:addSkill,remove:removeSkill} = useFieldArray({
        control,
        name:"skills"
    })
    const { fields: education, append: addEducation, remove: removeEducation } = useFieldArray({
        control,
        name:"education"
    })
    const { fields: projects, append: addProject, remove: removeProject } = useFieldArray({
        control,
        name:"projects"
    })
    const { fields: achievements, append: addAchievements, remove: removeAchievements } = useFieldArray({
        control,
        name:"achievements"
    })
    const { fields: experience, append: addExperience, remove: removeExperience } = useFieldArray({
        control,
        name:"experience"
    })

    const {response:saveResult,error:saveError,loading:saveLoading} = useFetch({api:server.api,method:server.method,info:server.info});

    const formValues = watch();

    //Submit

    const Submit = ()=>{
        setServer({api:'/v1/resume/save',method:'post',info:{previewContent}})
    }


    useEffect(()=>{

        if (saveResult?.success){
            setServer({api:'',method:'',info:''})
        }
    },[saveResult])


    // Resume MarkDown Functions

    useEffect(()=>{

        if(!showForm){

            const newContent = getCombinedContent();

            setPreviewContent(initialData?.content ? initialData?.content : newContent)
        }
    },[formValues,showForm]);

    useEffect(() => {

        if (initialData?.content) {
            setPreviewContent(initialData.content)
            setShowForm(false)
        }
    }, [initialData,server])

    const getContactMarkdown=()=>{
        const { contactInfo } = formValues;

        const parts =[];
        
        if (contactInfo.name) parts.push(contactInfo.name);
        if (contactInfo.phone) parts.push(contactInfo.phone);
        if (contactInfo.email) parts.push(`<a href="mailto:${contactInfo.email}" style="color: black; text-decoration: none;">${contactInfo.email}</a>`);
        if (contactInfo.gitHub) parts.push(`<a href="${contactInfo.gitHub}" target="_blank" style="color: black; text-decoration: none;">Github - ${contactInfo.gitHub}</a>`);
        if (contactInfo.linkedin) parts.push(`<a href="${contactInfo.linkedin}" target="_blank" style="color: black; text-decoration: none;">Linkedin - ${contactInfo.linkedin}</a>`);

        return parts.length > 0 ? `<p align="center" style="font-size:30px; margin-top:5px"><strong>${parts[0]}</strong></p>
           <p align="center" style="margin-top:-20px">${parts.slice(1).join(" | ")}</p>`
            : ""  
    };


    const getCombinedContent = ()=>{

        const { summery,skills,experience,education,projects,achievements } = formValues;

        return [
            getContactMarkdown(),
            entriesToMarkdown(education, "Education"),
            entriesToMarkdown(projects, "Projects"),
            entriesToMarkdown(achievements, "Achievements"),
            skills && entriesToMarkdown(skills, 'Skills'),
            experienced && entriesToMarkdown(experience, "Work Experience"),
            showSummery && `## Professional Summary\n\n${ summery }`,
           
        ].filter(Boolean)
        .join('\n\n')
    }


    const generatePdf=async()=>{

        setIsGenerating(true);

        try {
            const element = document.getElementById('resume-pdf');

            if (!element) {
                console.error("Element not found!");
                return;
            }
            element.style.display = "block";
            await new Promise((resolve) => setTimeout(resolve, 500));
            const opt={
                margin:[5,15],
                filename:"resume.pdf",
                image:{type:"jpeg",quality:0.98},
                html2canvas:{scale:2},
                jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},
            }
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("PDF Generation Error",error)
        }finally{
            setIsGenerating(false);
        }
    }

    const newResume= ()=>{
        setServer({ api: '/v1/resume/delete', method: 'get'})
        window.location.reload();
        setShowWarning(false);
    }
   
    return (

        <>
            <form onSubmit={handleSubmit(Submit)} className="w-full max-w-[700px] mx-auto relative mt-4">
            <div className="flex gap-2 mt-2 md:mt-0">
                
                <Button type="submit" onClick={() => Submit()} title={` ${saveLoading ? "Saving..." : "Save"}`} containerClass="bg-red-800 text-white " leftIcon={<IoSaveOutline />} />
                
                <Button type="button" title={` ${isGenerating ? "Generting":"Generate PDF"}`} onClick={generatePdf} containerClass="bg-blue-800 text-white " leftIcon={<FaRegFilePdf />} />
            
            </div>
                {saveError && <p className="text-red-500/60">{saveError}</p>}
            <div className="flex gap-2  bg-white/10 w-fit h-10 mt-4 rounded-md">
               {initialData?.content ? (
                    <Button type="button" onClick={() => { setShowWarning(true) ;setShowForm(true) }} title= 'New' containerClass={`text-white/50 ${showForm ? "bg-white/10" : ""}`} />
               ):(
                    <Button type="button" onClick={() => { setShowForm(true) }} title='Form' containerClass={`text-white/50 ${showForm ? "bg-white/10" : ""}`} />
               )}
                <Button type="button" onClick={() => setShowForm(false)} title="Preview" containerClass={`text-white/50 ${showForm ? "" : "bg-white/10"}`} />
            </div>
           
                {showForm ? showWarning ? ( 
                    <div className="w-64 bg-white/40 mx-auto p-4 rounded-md mt-10 flex flex-col items-center justify-center gap-4">
                        <p className="text-center">By Confirming Older Resume will be deleted</p>
                        <Button title="Confirm" type="button" onClick={newResume} containerClass="bg-red-700"/>
                    </div> 
                ):(

                <div>

                    {/* Personal Info */}
                    <div className="w-full flex flex-col mt-4 border">
                        <h2 className="sub-heading mb-2">Contact Information</h2>
                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <FormChild label="Name" id="contactInfo.name" type="text" register={register} placeHolder="John" error={errors.contactInfo?.name?.message} />
                            <FormChild label="Email" id="contactInfo.email" type="email" register={register} placeHolder="Doe" error={errors.contactInfo?.email?.message} />
                        </div>
                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <FormChild label="Linkedin" id="contactInfo.linkedin" type="text" register={register} placeHolder="john15@linkedin.in" error={errors.contactInfo?.linkedin?.message} />
                            <FormChild label="Mobile Number" id="contactInfo.phone" type="phone" register={register} placeHolder="123-456-89" error={errors.contactInfo?.phone?.message} />
                        </div>
                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <FormChild label="Github" id="contactInfo.gitHub" type="text" register={register} placeHolder="John@github.in" error={errors.contactInfo?.gitHub?.message} />
                        </div>
                    </div>

                    {/* Education */}
                    <div className="w-full flex flex-col mt-4 border">
                        <h2 className="sub-heading mb-2">Education</h2>

                        {education.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-2 mt-6">
                                <FormChild label="Organization" id={`education.${index}.title`} type="text" register={register} placeHolder="S.L.I.E.T" error={errors.education?.[index]?.title?.message} />
                                <FormChild label="Course" id={`education.${index}.subTitle`} type="text" register={register} placeHolder="B.tech" error={errors.education?.[index]?.subTitle?.message} />
                                <FormChild label="Start Date" id={`education.${index}.startDate`} type="date" register={register} placeHolder="2024-02-13" error={errors.education?.[index]?.startDate?.message} />

                                {currentEducation.index !== index && (
                                    <FormChild label="End Date" id={`education.${index}.endDate`} type="date" register={register} placeHolder="2024-02-13" error={errors.education?.[index]?.endDate?.message} />
                                )}
                                <FormChild label="Location" id={`education.${index}.location`} type="text" register={register} placeHolder="Sangrur Punjab" error={errors.education?.[index]?.location?.message} />
                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        onClick={() => { setCurrentEducation({ index: currentEducation.index === index ? -1 : index }) }}
                                        containerClass={` font-semibold ${currentEducation.index === index ? 'bg-white/20 text-white/60' : 'bg-white/40 text-black'}`}
                                        title={currentEducation.index === index ? 'Set as Not Current' : 'Set as Current'}
                                    />
                                    <Button title="Remove" type="button" containerClass="bg-red-500/40" onClick={() => removeEducation(index)} />
                                </div>
                            </div>
                        ))}

                        <Button title="Add" type="button" containerClass="bg-blue-500/40 mt-4" onClick={() => addEducation({ title: "", subTitle: "", startDate: "", location: "", endDate: "", current: false })} />
                    </div>


                    {/* Projects */}
                    <div className="w-full flex flex-col mt-4 border">
                        <h2 className="sub-heading mb-2">Projects</h2>

                        {projects.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-2 mt-8">
                                <FormChild label="Title" id={`projects.${index}.title`} type="text" register={register} placeHolder="Chat App" error={errors.projects?.[index]?.title?.message} />
                                <FormChild label={`Additional Info (use "_" to get new sub-heading)`} id={`projects.${index}.subTitle`} type="text" register={register} placeHolder="Developed using socket.io" error={errors.projects?.[index]?.subTitle?.message} />
                                <FormChild label="Start Date" id={`projects.${index}.startDate`} type="date" register={register} placeHolder="2024-02-13" error={errors.projects?.[index]?.startDate?.message} />

                                <FormChild label="Github Link" id={`projects.${index}.git`} type="url" register={register} placeHolder="myapp.git" error={errors.projects?.[index]?.git?.message} />

                                {currentProject.index !== index && (
                                    <FormChild label="Visit Link" id={`projects.${index}.visit`} type="url" register={register} placeHolder="myapp.com" error={errors.projects?.[index]?.visit?.message} />
                                )}
                                {currentProject.index !== index && (
                                    <FormChild label="End Date" id={`projects.${index}.endDate`} type="date" register={register} placeHolder="2024-02-13" error={errors.projects?.[index]?.endDate?.message} />
                                )}
                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        onClick={() => { setCurrentProject({ index: currentProject.index === index ? -1 : index }) }}
                                        containerClass={` font-semibold ${currentProject.index === index ? 'bg-white/20 text-white/60' : 'bg-white/40 text-black'}`}
                                        title={currentProject.index === index ? 'Set as Not Current' : 'Set as Current'}
                                    />
                                    <Button title="Remove" type="button" containerClass="bg-red-500/40" onClick={() => removeProject(index)} />
                                </div>
                            </div>
                        ))}

                        <Button title="Add" type="button" containerClass="bg-blue-500/40 mt-4" onClick={() => addProject({ title: "", subTitle: "", startDate: "", location: "", endDate: "",git:"",visit:"" ,current: false })} />
                    </div>


                    {/* Achievements */}
                    <div className="w-full flex flex-col mt-4 border">
                        <h2 className="sub-heading mb-2">Achievements</h2>

                        {achievements.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-2 mt-6">
                                <FormChild label="Title" id={`achievements.${index}.title`} type="text" register={register} placeHolder="Leetcode" error={errors.achievements?.[index]?.title?.message} />
                                <FormChild label="Subtitle" id={`achievements.${index}.subTitle`} type="text" register={register} placeHolder="200+ questions" error={errors.achievements?.[index]?.subTitle?.message} />
                                <Button title="Remove" containerClass="bg-red-500/40" type="button" onClick={() => removeAchievements(index)} />
                            </div>
                        ))}
                        <Button title="Add" type="button" containerClass="bg-blue-500/40 mt-4" onClick={() => addAchievements({ title: "", subTitle: "" })} />
                    </div>


                    {/* Skills */}
                    <div className="w-full flex flex-col mt-4 border">
                        <h2 className="sub-heading mb-2">Skills</h2>

                        {skills.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-2 mt-6">
                                <FormChild label="Title" id={`skills.${index}.title`} type="text" register={register} placeHolder="Languages" error={errors.skills?.[index]?.title?.message} />
                                <FormChild label="Subtitle" id={`skills.${index}.subTitle`} type="text" register={register} placeHolder="HTML-CSS-React" error={errors.skills?.[index]?.subTitle?.message} />
                                <Button title="Remove" type="button" containerClass="bg-red-500/40" onClick={() => removeSkill(index)} />
                            </div>
                        ))}

                        <Button title="Add" type="button" containerClass="bg-blue-500/40 mt-4" onClick={() => addSkill({ title: "", subTitle: "" })} />
                    </div>


                    {/* Experience */}
                    <div className="w-full flex flex-col mt-4 border">
                        <p>Are you Experienced ?</p>
                        <Button
                            type="button"
                            onClick={() => setExperienced(!experienced)}
                            containerClass={`my-4 ${experienced ? 'bg-red-500/40' : 'bg-blue-500/40'}`}
                            title={experienced ? 'No' : 'Yes'}
                        />

                        {experienced && (
                            <>
                                <h2 className="sub-heading mb-2">Experience</h2>

                                {experience.map((field, index) => (
                                    <div key={field.id} className="flex flex-col gap-2 mt-6">
                                        <FormChild label="Organization" id={`experience.${index}.title`} type="text" register={register} placeHolder="Infosys" error={errors.experience?.[index]?.title?.message} />
                                        <FormChild label="Role" id={`experience.${index}.subTitle`} type="text" register={register} placeHolder="Software Developer" error={errors.experience?.[index]?.subTitle?.message} />
                                        <FormChild label="Start Date" id={`experience.${index}.startDate`} type="date" register={register} placeHolder="2024-02-13" error={errors.experience?.[index]?.startDate?.message} />

                                        {currentJob.index !== index && (
                                            <FormChild label="End Date" id={`experience.${index}.endDate`} type="date" register={register} placeHolder="2024-02-13" error={errors.experience?.[index]?.endDate?.message} />
                                        )}
                                        <FormChild label="Location" id={`experience.${index}.location`} type="text" register={register} placeHolder="Bangalore, India" error={errors.experience?.[index]?.location?.message} />
                                        <div className="flex justify-between">
                                            <Button
                                                type="button"
                                                onClick={() => { setCurrentJob({ index: currentJob.index === index ? -1 : index }) }}
                                                containerClass={` font-semibold ${currentJob.index === index ? 'bg-white/20 text-white/60' : 'bg-white/40 text-black'}`}
                                                title={currentJob.index === index ? 'Set as Not Current' : 'Set as Current'}
                                            />
                                            <Button title="Remove" type="button" containerClass="bg-red-500/40" onClick={() => removeExperience(index)} />
                                        </div>
                                    </div>
                                ))}

                                <Button title="Add" type="button" containerClass="bg-blue-500/40 mt-4" onClick={() => addExperience({ title: "", subTitle: "", startDate: "", location: "", endDate: "", current: false })} />
                            </>
                        )}
                    </div>



                    {/* Add Summery */}

                    <div className="w-full flex flex-col mt-4 border">
                        <p className="font-semibold mt-4">Want to Add a Summery ?</p>
                        <Button
                            type="button"
                            onClick={() => setShowSummery(!showSummery)}
                            containerClass={`my-4 ${showSummery ? 'bg-red-500/40' : 'bg-blue-500/40'}`}
                            title={showSummery ? 'No' : 'Yes'}
                        />
                        {showSummery && (
                            <>
                                <label className="sub-heading mb-2" htmlFor='summery'>Summery</label>
                                <textarea id="summery" className="inpt h-24!" {...register('summery')}></textarea>
                                {errors.summery && <p className="text-red-500/60 -mt-3">{errors.summery.message}</p>}
                            </>
                        )}
                    </div>
                </div>
                
           ):"" }
            {/* MARKDOWN COMPONENT */}


            {! showForm && (
                    <div className="absolute -z-10  top-0 left-0 right-0 p-2">
                    <MDEditor
                        value={previewContent}
                        onChange={setPreviewContent}
                        height={400}
                    />
                </div>
            )}

            {! showForm && (
                   <div className="bg-white z-10 px-10 py-10">
                        <div id="resume-pdf" className="">
                            <MDEditor.Markdown source={previewContent} />
                        </div>
                        <div className="absolute top-0 left-0 right-0 bg-black"></div>
                   </div>
            )}
        </form>
            </>
    )
}

export default ResumeForm