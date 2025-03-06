import { Entries } from "./types";


export const entriesToMarkdown = (entries: Entries[] | any, type: string) => {
    if (!entries?.length) return "";

    console.log(entries, type)

    return (
        `## <p style="font-size:21px;margin-bottom:2px">${type}\n</p>` +
        entries
            .map((entry: Entries | any) => {
                const dateRange = entry?.endDate
                    ? `${entry.startDate} - ${entry.endDate}`
                    : `${entry.startDate} - <span style="font-size:14px">Present</span>`;

                return `<p style="margin-top:-15px ; margin-left:10px ;">
                            <span style="font-size:16px;text:"bottom"><strong><span style="font-size:20px">${type === "Skills" || type === "Achievements" ? '•' : ''}</span> ${entry.title}${type === "Skills" || type === "Achievements" ? ':' : ''}</strong> <span style="font-size:16px">${type === "Skills" || type === "Achievements" ? entry.subTitle : ''} </span><span style="float: right; font-size:14px;margin-top:8px">${type === "Projects" ? `<span style="font-size:15px ;float: right">${entry?.visit ? `<a style="float: right"  href= "${entry?.visit}" target="_blank"> Visit </a>` : ""} ${entry?.git && entry.visit ? `<span style="margin-right:25px;float:right;opacity:0">.</span>` : ""} ${entry?.git ? `<a style="float: right" href= "${entry?.git}"  target="_blank"> Github </a>`:""} </br>${dateRange}</span>` : ""}</span></span>
                            <span style="float: right; font-size:16px;margin-top:5px">${entry?.location ? entry?.location : ""}</span><br>
                            <em style="font-size:16px; margin-left:15px"><span style="font-size:20px">${type === "Skills" || type === "Achievements" ? '' : '•'}</span>
                            </span>  ${type === "Skills" || type === "Achievements" ? '' : type === "Projects" ? entry.subTitle.split("_").join(`</br><span style="margin-bottom:2px;font-size:20px;margin-right:-2px; margin-left:15px">• </span>`) :entry.subTitle}</em> 
                            </span><span style="float:right; font-size:12px">${type === "Education" ? dateRange : type === "Work Experience" ? dateRange :""}</span>
                        </p>`;
            })
            .join("\n\n")
    );
};
//