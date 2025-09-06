import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./Hero";
import About from "./About/about";
import Images from './picture/image'

export default function Home() {
  const imagesData = [{
    imgSrc:"backgroundimg1.jpg",
    imgText: "student learning in the classroom"
  },
{
  imgSrc: "backgroundimg2.jpg",
  imgText: "Happy Students"

},{
  imgSrc: "backgroundimg3.jpg",
  imgText: "we provide a conducive enviroments for your kids"
},{
  imgSrc: "schoolsiteimg.png",
  imgText: "Condusive Learnig enviroment"
},{
  imgSrc: "schoolsiteimg1.png",
  imgText: "neat uniforms"
, },{
  imgSrc: "schoolsiteimg2.png",
  imgText: "socal activies "
}]
  return (
    <main>
  <Navbar/>
  <Hero/>
  <About/>
  <Images imgData={imagesData}/>

  </main>
  );
}
