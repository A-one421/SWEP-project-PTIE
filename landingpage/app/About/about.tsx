"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const missionCardRef = useRef<HTMLDivElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);
  const locationCardRef = useRef<HTMLDivElement>(null);

  const statsRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    
    const topTimeline = gsap.timeline();
    topTimeline
      .from(titleRef.current, { x: -50, opacity: 0, duration: 1 })
      .from(paragraphRef.current, { x: -50, opacity: 0, duration: 1 }, "-=0.5")
      .from(imgRef.current, { x: 50, opacity: 0, duration: 1 }, "-=0.8");

    
    [missionCardRef, statsCardRef, locationCardRef].forEach((ref) => {
      if (ref.current) {
        gsap.from(ref.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        });
      }
    });

  
    const statsElements = statsRefs.current;
    gsap.fromTo(
      statsElements,
      { innerText: 0, opacity: 0 },
      {
        innerText: (i: any) => parseInt(statsElements[i].dataset.value || "0"),
        opacity: 1,
        duration: 2,
        snap: { innerText: 1 },
        stagger: 0.3,
        ease: "power1.out",
        scrollTrigger: {
          trigger: statsCardRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="w-full bg-blue-50 py-16">
    
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10 items-center mb-16">
      
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 ref={titleRef} className="font-bold text-3xl md:text-4xl text-gray-800">
            Welcome To Faith Life International School
          </h2>
          <p ref={paragraphRef} className="leading-relaxed text-gray-600">
            Our goal is to provide a learning environment where knowledge is
            pursued with passion, character is built with integrity, and dreams
            are shaped with purpose. From the Primary to the Secondary levels,
            we inspire excellence and prepare students to thrive in a changing
            world.
          </p>
        </div>

        
        <div
          ref={imgRef}
          className="md:w-1/2 flex justify-center relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/schoolsiteimg.png"
            alt="aboutimage"
            fill
            className="object-cover"
          />
        </div>
      </div>

   
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      
        <div
          ref={missionCardRef}
          className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We nurture talent, inspire curiosity, and build strong character. Our mission is to provide students with the knowledge, skills, and values they need to succeed and make a positive impact in the world.
          </p>
          <a
            href="#enroll"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg font-semibold transition-transform transform hover:scale-105"
          >
            Enroll Now
          </a>
        </div>

       
        <div
          ref={statsCardRef}
          className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Our Impact
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Students", value: 500, color: "text-blue-500" },
              { label: "Teachers", value: 50, color: "text-purple-500" },
              { label: "Graduation Rate", value: 100, color: "text-green-500" },
              { label: "Years of Excellence", value: 20, color: "text-yellow-500" },
            ].map((stat, i) => (
              <div className="text-center" key={i}>
                <p
                  ref={(el) => {
                    if (el) statsRefs.current[i] = el;
                  }}
                  data-value={stat.value}
                  className={`text-4xl font-extrabold ${stat.color}`}
                >
                  0+
                </p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      
        <div
          ref={locationCardRef}
          className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Our Location</h3>
          <p className="text-gray-600 mb-4">
            Faith Life International School, Lagos, Nigeria
          </p>
          <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/schoolsiteimg.png"
              alt="School Location"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
