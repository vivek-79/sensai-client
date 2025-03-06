


const Card = ({title,info,subtitle}:{title:string,info:string,subtitle:string}) => {
  return (
      <div className="w-full flex flex-col border-[1px] border-white/40 p-2 gap-2 rounded-md shadow-md shadow-white/30">
        <p className="text-white/80 tracking-tight text-sm md:text-base">{title}</p>
        <p className="text-white text-lg font-semibold">{info}</p>
        <p className="text-white/50 text-xs md:text-sm tracking-tight -mt-2">{subtitle}</p>
    </div>
  )
}

export default Card