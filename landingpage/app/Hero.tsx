"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const slides = [
  {
    image: "/schoolsiteimg1.png",
    title: " Discover a community where your child can grow, thrive, and excel.",
    subtitle:
      "Nested within the serene and intellectually vibrant environment of our school, we provide world-class education that prepares students for success in a rapidly changing world.",
      button1: "Parent Login",
    button2: "Student Login"
  },
  {
    image: "/schoolsiteimg2.png",
    title: "Your Child's Journey to Success",
    subtitle:" A school community where your child can grow, thrive, and excel. Our world-class education prepares students for success in achanging world",
    button1: "Parent Login",
    button2: "Student Login"
  },
  {
    image: "/backgroundimg3.jpg",
    title: " Perfect Learned For your Children",
    subtitle:
      "Discover a school that nurtures talent, builds character, and creates opportunities for success.",
    button1: "Parent Login",
    button2: "Student Login",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      
  }, [current]); 

  return (
    <section className="relative h-screen overflow-hidden mt-11 ">
    
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        
        >
          <Image src={slide.image}
          alt="navbarimg"
          fill></Image>
          </div>
      ))}

    
      <div className="absolute inset-0 bg-black/60" />


      <div className="relative z-10 flex h-full flex-col justify-center items-center text-center px-6">
        <h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-lg max-w-4xl"
        >
          {slides[current].title}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-2xl text-gray-200 max-w-2xl"
        >
          {slides[current].subtitle}
        </p>
        <div className="flex flex-row gap-4">
        <a
          ref={buttonRef}
          href="/Login"
          className="mt-10 inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
          text-white px-10 py-4 rounded-full shadow-2xl font-semibold text-lg transition-transform transform hover:scale-105"
        >
          {slides[current].button1} 
        </a>
          <a
          ref={buttonRef}
          href="#courses"
          className="mt-10 inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
          text-white px-10 py-4 rounded-full shadow-2xl font-semibold text-lg transition-transform transform hover:scale-105"
        >
          {slides[current].button2} 
        </a>
        </div>
      </div>

            <div className="absolute bottom-6 flex w-full justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
