
import Faq from "../../components/Faq";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import Testimonials from "../../components/Testimonials";



const Home = () => {


  return (
    <section className="relative">
      <HeroSection />
      <Features/>
      <Testimonials/>
      <Faq/>
      <Footer/>
    </section>
  )
}

export default Home