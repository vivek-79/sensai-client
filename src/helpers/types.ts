


import { z } from "zod";

export const onBoardingZod = z.object({
    industry: z.string().nonempty({message:'Please select a industry'}),
    specialization: z.string().nonempty({ message: 'Please select a specialization' }),
    experiance: z.string().transform((value)=>parseInt(value,10)).pipe(z.number().min(0,"Experience must be at least 0").max(50,"Experience cannot exceed 50 years")),
    skills: z.string().transform((value)=>value? value.split(',').map((skill)=>skill.trim()).filter(Boolean):undefined),
    professionalBio: z.string().nonempty({ message: 'Please enter bio' }),
})

export type OnBoardingType = z.infer<typeof onBoardingZod>;


export interface SalaryRange {
    location: string;
    max: number;
    median: number;
    min: number;
    role: string;

}

export interface Insights {
    demandLevel: string
    growthRate: number
    id: number;
    industry: string;
    keyTrends: string[];
    lastUpdated: any;

    marketOutLook: string;
    nextUpdated:any;
    recommendedSkills: string[]
    topSkills: string[];
    salaryRange: SalaryRange[]

}

export interface User {
    name:string,
    email:string,
    avatar?:string;
}

export interface QuizState {

    quizData: {
        correctAnswer: string,
        explanation: string,
        options: string[],
        question: string
    }[];
};

export const contactSchema = z.object({

    name:z.string().min(3,"Minimum 3 characters required"),
    phone:z.string().min(10,"Enter a valid phone number"),
    email:z.string().email({message:'Enter a valid email'}),
    linkedin:z.string().nonempty({message:'Enter a linkedin url'}),
    gitHub:z.string().optional()
})
export type UserInfo = z.infer<typeof contactSchema>;


export const entrySchema = z.object({
    title:z.string().min(1,"Title is required"),
    subTitle: z.string().min(1, "SubTitle is required"),
    startDate: z.string().min(1, "StartDate is required"),
    location:z.string().optional(),
    visit: z.string().optional().nullable(),
    git: z.string().optional().nullable(),
    endDate: z.string().optional().nullable(),
    current: z.boolean().default(false),
}).refine((data)=>{
    if(!data.current && !data.endDate){
        return false;
    }
    return true;
},{
    message:"End date is required unless this is your currrent position",
    path:["endDate"]
})

export type Entries = z.infer<typeof entrySchema>

export const achievementSchema = z.object({
    title: z.string().min(1, "Skills is required"),
    subTitle:z.string().min(1, "SubTitle is required"),
})
export type Achievement = z.infer<typeof achievementSchema>
export const resumeSchema = z.object({
    contactInfo:contactSchema,
    skills: z.array(achievementSchema),
    achievements:z.array(achievementSchema),
    projects: z.array(entrySchema),
    education:z.array(entrySchema),
    experience:z.array(entrySchema).optional(),
    summery:z.string().optional()
})

export type ResumeType = z.infer<typeof resumeSchema>