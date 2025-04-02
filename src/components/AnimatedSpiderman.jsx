


import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SpidermanBanner = () => {
  
  const colors = {
    primary: "#E11D48", // Premium vibrant red
    blue50:"A91101",
  };

  const teaserLines = [
    "With great power comes great responsibility",
    "I’m just your friendly neighborhood Spider-Man.",
    "The city needs me, and I’ll never back down.",
    "Every swing is a fight for what’s right.",
    "No matter the challenge, I rise, I fight, I protect."
  ];

  const containerRef = useRef(null);
  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const manRef = useRef(null);
  const teaserRefs = useRef([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    teaserRefs.current = teaserRefs.current.slice(0, teaserLines.length);
  }, [teaserLines.length]);
  
  useEffect(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(textRef.current, { 
          opacity: 0,
          x: "-5vw",
          letterSpacing: "-10px"
        });
        
        gsap.set(manRef.current, { 
          color: colors.violet300
        });
        
        teaserRefs.current.forEach((ref, index) => {
          gsap.set(ref, {
            opacity: 0,
            y: 20
          });
        });
        
        const entranceTl = gsap.timeline();
        entranceTl.to(textRef.current, { 
          opacity: 1,
          x: 0,
          letterSpacing: "-2px",
          duration: 1,
          ease: "power2.out"
        });
        
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            }
          },
          defaults: {
            ease: "power1.inOut",
            duration: 1
          }
        });
        
        
        scrollTl
          .to(textRef.current, {
            x: "20vw",
            scale: 1.1,
            ease: "power1.inOut"
          }, 0)
          .to(textRef.current, {
            x: "40vw",
            scale: 1,
            ease: "power1.inOut"
          }, 0.5);
        
        teaserRefs.current.forEach((ref, index) => {
          const startPoint = index * 0.2; 
          scrollTl
            .to(ref, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            }, startPoint)
            .to(ref, {
              opacity: 0,
              y: -20,
              duration: 0.3,
              ease: "power2.in"
            }, startPoint + 0.2);
        });
      }, containerRef);
      
      return () => ctx.revert();
    });
    
    return () => mm.revert();
  }, [colors.violet300]);


  useEffect(() => {
    const handleMouseMove = (e) => {
      
      const newX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      const newY = (e.clientY / window.innerHeight - 0.5) * 0.5;
      
      if (Math.abs(newX - position.x) > 0.01 || Math.abs(newY - position.y) > 0.01) {
        setPosition({ x: newX, y: newY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  useEffect(() => {
    gsap.to(textRef.current, {
      skewX: position.x * 5,
      rotationZ: position.x * 2,
      y: position.y * 3,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
    
    if (manRef.current) {
      gsap.to(manRef.current, {
        skewX: position.x * 8,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  }, [position]);


  const getTextStyle = () => {
    let style = {
      WebkitTextStroke: `1px ${colors.blue200}`,
      transition: 'color 0.3s ease, transform 0.3s ease',
    };
    
    if (scrollProgress < 0.33) {
      style.color = "#FFFFFF";
    } else if (scrollProgress < 0.66) {
      style.color = "#000000";
    } else {
      style.color = colors.blue50;
    }
    
    return style;
  };
  
  const getManStyle = () => {
    let color;
    if (scrollProgress < 0.33) {
      color = "#FFFFFF"; 
    } else if (scrollProgress < 0.66) {
      color = "#e63946";
    } else {
      color = "#e63946";
    }
    
    return {
      color: color,
      transition: 'color 0.3s ease',
      fontWeight: 900
    };
  };

  
  const getBgStyle = () => {
    let bgColor;
    
    if (scrollProgress < 0.33) {
      bgColor = "#FFFFFF"; 
    } else if (scrollProgress < 0.66) {
      bgColor = "#FFFFFF";
    } else {
      bgColor = "#FFFFFF";
    }
    
    return {
      backgroundColor: bgColor,
      transition: 'background-color 0.5s ease'
    };
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden"
    >
      <div 
        ref={bannerRef} 
        className="w-full h-full flex justify-start items-center px-4 md:px-12 overflow-hidden"
        style={getBgStyle()}
      >
        <div className="relative w-full"> 
  
          <div 
            ref={textRef}
            className="special-font uppercase text-[5rem] sm:text-[7rem] md:text-[10rem] font-black select-none will-change-transform"
            style={{
              ...getTextStyle(),
              willChange: "transform",
            }}
          >
            <b>SPIDER
              <span 
                ref={manRef} 
                className="relative inline-block will-change-transform"
                style={getManStyle()}
              >MAN</span>
            </b>
          </div>
          
          <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center">
            {teaserLines.map((line, index) => (
              <div
                key={index}
                ref={el => teaserRefs.current[index] = el}
                className="absolute  font-general text-center font-bold text-lg sm:text-xl md:text-3xl tracking-widest opacity-0"
                style={{
                  color: colors.blue100,
                  top: `${20 + (index * 15)}%`,
                  right: `${10 + (index * 5)}%`,
                  transform: 'translateY(20px)',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
                }}
              > 
                {line}
                
              </div>
            ))}
          </div>
          
          <svg className="absolute top-0 left-0 w-full h-full -z-10 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,100" stroke={colors.blue100} strokeWidth="0.5" />
            <path d="M100,0 L0,100" stroke={colors.blue100} strokeWidth="0.5" />
            <path d="M50,0 L50,100" stroke={colors.blue100} strokeWidth="0.5" />
            <path d="M0,50 L100,50" stroke={colors.blue100} strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="fixed bottom-5 left-0 right-0 text-center opacity-70 pointer-events-none z-10">
          <p className="font-medium mb-1" style={{ color: colors.blue100 }}></p>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: `${scrollProgress * 100}%`,
                backgroundColor: scrollProgress < 0.5 ? colors.blue100 : colors.violet300,
                transition: 'width 0.1s ease, background-color 0.3s ease'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpidermanBanner;


