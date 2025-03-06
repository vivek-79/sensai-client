



interface feedback{
    quote:string;
    author:string;
    image:string;
    role:string;
    company:string;
}
export const testimonial: feedback[] = [
    {
        quote:
            "The AI-powered interview prep was a game-changer. Landed my dream job at a top tech company!",
        author: "Sarah Chen",
        image: "https://randomuser.me/api/portraits/women/75.jpg",
        role: "Software Engineer",
        company: "Tech Giant Co.",
    },
    {
        quote:
            "The industry insights helped me pivot my career successfully. The salary data was spot-on!",
        author: "Michael Rodriguez",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        role: "Product Manager",
        company: "StartUp Inc.",
    },
    {
        quote:
            "My resume's ATS score improved significantly. Got more interviews in two weeks than in six months!",
        author: "Priya Patel",
        image: "https://randomuser.me/api/portraits/women/74.jpg",
        role: "Marketing Director",
        company: "Global Corp",
    },
];



const Testimonials = () => {
  return (
      <section className="bg-[#1d1c1c]">
          <h2 className="pt-18 text-white text-center text-4xl md:text-5xl font-bold">What Our Users Say</h2>
      <div className=" w-full py-12 px-4 flex gap-4 items-center justify-center flex-wrap">
        {testimonial.map((item,indx)=>(

            <div key={indx} className="bg-black flex flex-col  justify-center gap-4 p-4 w-full md:w-1/5 md:min-h-50 shadow-md shadow-white/20 rounded-md">

                <div className="flex gap-4">
                    <img src={item.image} alt="Users Image" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col text-white text-xs ">
                        <p>{item.author}</p>
                        <p className="text-white/30">{item.company}</p>
                        <p>{item.role}</p>
                    </div>
                </div>

                <p className="text-white/60 leading-4 "><span className="text-2xl text-white">``</span>{item.quote}<span className="text-2xl text-white">,,</span></p>
            </div>
        ))}
    </div>
      </section>
  )
}

export default Testimonials