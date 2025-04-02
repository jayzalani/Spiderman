/*
THIS IS THE TRIAL CODE FOR ANIMATEDSPIDERMAN COMPONENT HERE THERE THE CODE SNIPPETS ARE REJECTED ONES IF WANTED CHECK THE COMMENT SYMBOLS PROPERLY THIS ARE WORKING COMPONENTS MEANS THERE IS NOT A SINGLE ERROR!
*/







/*import React, { useState, useEffect } from 'react';

const SpidermanBanner = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full  py-10 overflow-hidden flex justify-center items-center">
      <div 
        className="special-font text-black uppercase text-[6rem] sm:text-[10rem] md:text-[16rem] font-black p-5 left-5 select-none"
        style={{
          WebkitTextStroke: '1px #000000',
          transform: `skew(${position.x * 45}deg, ${position.y * 30}deg) rotate(${position.x * 15}deg)`,
          transition: 'transform 0.01s ease-out',
        }}
      >
        <b>SPIDERMAN</b>
      </div>
      
    </div>
  );
};

export default SpidermanBanner;
*/



/*
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SpidermanBanner = () => {
  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const manRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Initialize GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create entrance animation
      const tl = gsap.timeline();
      
      tl.fromTo(
        textRef.current,
        { 
          opacity: 0,
          y: 50,
          skewX: 20,
          letterSpacing: "-20px"
        },
        { 
          opacity: 1,
          y: 0,
          skewX: 0,
          letterSpacing: "-2px",
          duration: 1.2,
          ease: "power3.out"
        }
      );
      
      // Special animation for "MAN" part
      tl.fromTo(
        manRef.current,
        {
          scale: 0.9
        },
        {
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        },
        "-=0.5" // Overlap with previous animation
      );
      
      // Create a subtle pulsing effect for the "MAN" text
      gsap.to(manRef.current, {
        textShadow: "0 0 10px rgba(230,57,70,0.7)",
        scale: 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Remove the floating animation that was causing the annoying up/down motion
      
      // Modify scroll trigger to be more subtle
      ScrollTrigger.create({
        trigger: bannerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing effect
        onUpdate: (self) => {
          // Very subtle rotation based on scroll position - no vertical movement
          gsap.to(textRef.current, {
            rotationZ: self.progress * 2 - 1, // Just -1 to 1 degree rotation
            duration: 0.5,
            ease: "power1.out"
          });
        }
      });
    }, bannerRef);
    
    return () => ctx.revert(); // Clean up animations
  }, []);

  // Track mouse movement with constrained sensitivity
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 0.7, // Reduce sensitivity by 30%
        y: (e.clientY / window.innerHeight - 0.5) * 0.7 // Reduce sensitivity by 30%
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // GSAP animation for mouse movement with more constraints
  useEffect(() => {
    gsap.to(textRef.current, {
      skewX: position.x * 20, // Reduced from 45
      rotationZ: position.x * 5, // Reduced from 15
      x: position.x * 10, // Reduced from 20
      y: position.y * 5, // Reduced significantly from 20
      duration: 0.2,
      ease: "power2.out"
    });
    
    // Add controlled effect to the "MAN" part
    gsap.to(manRef.current, {
      skewX: position.x * 25, // Reduced from 60
      textShadow: `${position.x * 5}px ${position.y * 5}px 10px rgba(230,57,70,0.6)`,
      duration: 0.2
    });
  }, [position]);

  return (
    <div 
      ref={bannerRef} 
      className="w-full bg-[#5542ff] py-16 overflow-hidden flex justify-center items-center"
    >
      <div className="relative px-4"> // Added padding to prevent text from getting cut off 
        <div 
          ref={textRef}
          className="special-font uppercase text-[5rem] sm:text-[8rem] md:text-[12rem] font-black select-none text-center"
          style={{
            WebkitTextStroke: '1px #000000',
            color: '#f1faee', // Using the off-white color you specified
          }}
        >
          <b>SPIDER<span 
            ref={manRef} 
            className="relative inline-block"
            style={{
              color: '#e63946', // Using the red color you specified
            }}
          >MAN</span></b>
        </div>
        
        // Web-like SVG background elements 
        <svg className="absolute top-0 left-0 w-full h-full -z-10 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,100" stroke="black" strokeWidth="0.5" />
          <path d="M100,0 L0,100" stroke="black" strokeWidth="0.5" />
          <path d="M50,0 L50,100" stroke="black" strokeWidth="0.5" />
          <path d="M0,50 L100,50" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};

export default SpidermanBanner;
*/






/*
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SpidermanBanner = () => {
  const containerRef = useRef(null);
  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const manRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Initialize GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create entrance animation
      const tl = gsap.timeline();
      
      tl.fromTo(
        textRef.current,
        { 
          opacity: 0,
          y: 50,
          skewX: 20,
          letterSpacing: "-20px"
        },
        { 
          opacity: 1,
          y: 0,
          skewX: 0,
          letterSpacing: "-2px",
          duration: 1.2,
          ease: "power3.out"
        }
      );
      
      // Special animation for "MAN" part
      tl.fromTo(
        manRef.current,
        {
          scale: 0.9
        },
        {
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        },
        "-=0.5" // Overlap with previous animation
      );
      
      // Create a subtle pulsing effect for the "MAN" text
      gsap.to(manRef.current, {
        textShadow: "0 0 10px rgba(230,57,70,0.7)",
        scale: 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Setup horizontal scroll animation
      const horizontalScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Extend scrolling distance
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });
      
      // Animation for horizontal movement
      horizontalScroll.to(textRef.current, {
        x: "80vw", // Move text across the screen
        ease: "none"
      });
    }, containerRef);
    
    return () => ctx.revert(); // Clean up animations
  }, []);

  // Track mouse movement with constrained sensitivity
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 0.7,
        y: (e.clientY / window.innerHeight - 0.5) * 0.7
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Mouse movement animation with more constraints
  useEffect(() => {
    gsap.to(textRef.current, {
      skewX: position.x * 20,
      rotationZ: position.x * 5,
      y: position.y * 5,
      duration: 0.2,
      ease: "power2.out"
    });
    
    gsap.to(manRef.current, {
      skewX: position.x * 25,
      textShadow: `${position.x * 5}px ${position.y * 5}px 10px rgba(230,57,70,0.6)`,
      duration: 0.2
    });
  }, [position]);

  // Determine which filter to apply based on scroll progress
  const getFilterClasses = () => {
    // We'll divide the scroll range into 5 segments for different filters
    if (scrollProgress < 0.2) {
      return "filter blur-none contrast-100 brightness-100";
    } else if (scrollProgress < 0.4) {
      return "filter blur-sm contrast-125 brightness-110 hue-rotate-15";
    } else if (scrollProgress < 0.6) {
      return "filter blur-none contrast-150 brightness-125 saturate-150";
    } else if (scrollProgress < 0.8) {
      return "filter blur-none contrast-125 drop-shadow-xl hue-rotate-30 saturate-200";
    } else {
      return "filter blur-none contrast-200 brightness-150 saturate-200 drop-shadow-2xl";
    }
  };

  // Function to get additional transform effects based on scroll
  const getTextStyle = () => {
    return {
      WebkitTextStroke: scrollProgress < 0.5 ? '1px #000000' : '2px #000000',
      color: '#f1faee', // Base color
      filter: `hue-rotate(${scrollProgress * 30}deg)`,
      transform: `perspective(1000px) rotateY(${scrollProgress * 180}deg)`,
      transition: 'transform 0.3s ease-out',
    };
  };
  
  // Get man text style
  const getManStyle = () => {
    return {
      color: '#e63946',
      filter: `hue-rotate(${scrollProgress * 60}deg)`,
      textShadow: `0 0 ${10 + scrollProgress * 20}px rgba(230,57,70,${0.6 + scrollProgress * 0.4})`,
    };
  };

  // Calculate background color based on scroll progress
  const getBgColor = () => {
    // Transition from blue to purple to red as user scrolls
    const r = Math.floor(85 + (scrollProgress * 170));
    const g = Math.floor(66 - (scrollProgress * 66));
    const b = Math.floor(255 - (scrollProgress * 100));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full"
    >
      <div 
        ref={bannerRef} 
        className="w-full h-full flex justify-start items-center overflow-hidden"
        style={{ 
          backgroundColor: getBgColor(),
          transition: 'background-color 0.3s ease'
        }}
      >
        <div className="relative px-8"> 
          <div 
            ref={textRef}
            className={`special-font uppercase text-[5rem] sm:text-[8rem] md:text-[12rem] font-black select-none ${getFilterClasses()}`}
            style={getTextStyle()}
          >
            <b>SPIDER
              <span 
                ref={manRef} 
                className="relative inline-block"
                style={getManStyle()}
              >MAN</span>
            </b>
          </div>
          
          // Web-like SVG background elements 
          <svg className="absolute top-0 left-0 w-full h-full -z-10 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,100" stroke="black" strokeWidth="0.5" />
            <path d="M100,0 L0,100" stroke="black" strokeWidth="0.5" />
            <path d="M50,0 L50,100" stroke="black" strokeWidth="0.5" />
            <path d="M0,50 L100,50" stroke="black" strokeWidth="0.5" />
          </svg>
        </div>
        
        //* Optional scroll indicator 
        <div className="fixed bottom-5 left-0 right-0 text-center text-white text-lg font-bold opacity-80">
          <p>Scroll to transform</p>
          <div className="w-32 h-2 bg-white mx-auto mt-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full" 
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpidermanBanner;

*/


/*
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SpidermanBanner = () => {
  // Color palette from your specifications
  const colors = {
    blue50: "#DFDFF0",
    blue75: "#DFDFF2",
    blue100: "#F0F2FA",
    blue200: "#010101",  // This is black
    blue300: "#4FB7DD",
    violet300: "#5724FF",
    yellow100: "#8E983F",
    yellow300: "#EDFF66"
  };

  const containerRef = useRef(null);
  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const manRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Initialize animations with better performance
  useEffect(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // Initial appearance
        gsap.set(textRef.current, { 
          opacity: 0,
          x: "-5vw",
          letterSpacing: "-10px"
        });
        
        gsap.set(manRef.current, { 
          color: colors.violet300
        });
        
        // Entrance animation - runs once
        const entranceTl = gsap.timeline();
        entranceTl.to(textRef.current, { 
          opacity: 1,
          x: 0,
          letterSpacing: "-2px",
          duration: 1,
          ease: "power2.out"
        });
        
        // Create main scroll-driven animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%", // Reduced from 300% for smoother experience
            pin: true,
            scrub: 0.5, // Lower value for smoother scrubbing
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            }
          },
          defaults: {
            ease: "power1.inOut", // Smoother easing
            duration: 1
          }
        });
        
        // Make horizontal movement smoother by breaking into segments
        scrollTl
          .to(textRef.current, {
            x: "10vw",
            scale: 1.1,
            ease: "none"
          }, 0)
          .to(textRef.current, {
            x: "30vw",
            scale: 1.05,
            ease: "none"
          }, 0.25)
          .to(textRef.current, {
            x: "50vw",
            scale: 1,
            ease: "none"
          }, 0.5)
          .to(textRef.current, {
            x: "60vw",
            scale: 1.05,
            ease: "none" 
          }, 0.75);
      }, containerRef);
      
      return () => ctx.revert();
    });
    
    return () => mm.revert();
  }, [colors.violet300]);

  // More efficient mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Throttle updates by only capturing significant changes
      const newX = (e.clientX / window.innerWidth - 0.5) * 0.5; // Reduced sensitivity
      const newY = (e.clientY / window.innerHeight - 0.5) * 0.5; // Reduced sensitivity
      
      // Only update if change is significant
      if (Math.abs(newX - position.x) > 0.01 || Math.abs(newY - position.y) > 0.01) {
        setPosition({ x: newX, y: newY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  // Optimize mouse movement animation
  useEffect(() => {
    gsap.to(textRef.current, {
      skewX: position.x * 10, // Reduced from 20
      rotationZ: position.x * 3, // Reduced from 5
      y: position.y * 3, // Reduced from 5
      duration: 0.3, // Slightly increased for smoother transitions
      ease: "power2.out",
      overwrite: "auto" // Prevents animation buildup
    });
    
    if (manRef.current) {
      gsap.to(manRef.current, {
        skewX: position.x * 15, // Reduced from 25
        textShadow: `${position.x * 3}px ${position.y * 3}px 8px rgba(87,36,255,0.6)`,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  }, [position]);

  // Apply filters based on scroll position - using your color palette
  const getFilterStyle = () => {
    // Instead of using Tailwind's filter classes, use inline styles for more precision
    let filterStyle = {};
    
    if (scrollProgress < 0.25) {
      filterStyle = {
        filter: "none",
        textShadow: `0 0 15px ${colors.blue300}`,
        color: colors.blue100
      };
    } else if (scrollProgress < 0.5) {
      filterStyle = {
        filter: `contrast(120%) brightness(110%) saturate(110%)`,
        textShadow: `0 0 15px ${colors.violet300}`,
        color: colors.blue75
      };
    } else if (scrollProgress < 0.75) {
      filterStyle = {
        filter: `contrast(140%) brightness(120%) saturate(130%)`,
        textShadow: `0 0 20px ${colors.yellow100}`,
        color: colors.blue50
      };
    } else {
      filterStyle = {
        filter: `contrast(150%) brightness(130%) saturate(150%)`,
        textShadow: `0 0 25px ${colors.yellow300}`,
        color: colors.blue100
      };
    }
    
    return {
      ...filterStyle,
      WebkitTextStroke: scrollProgress < 0.5 ? `1px ${colors.blue200}` : `2px ${colors.blue200}`,
      transition: 'color 0.3s ease, text-shadow 0.3s ease, filter 0.3s ease'
    };
  };
  
  // Style for the "MAN" part
  const getManStyle = () => {
    // Choose colors from your palette based on scroll position
    let color;
    if (scrollProgress < 0.25) {
      color = colors.violet300;
    } else if (scrollProgress < 0.5) {
      color = colors.blue300;
    } else if (scrollProgress < 0.75) {
      color = colors.yellow100;
    } else {
      color = colors.yellow300;
    }
    
    return {
      color: color,
      textShadow: `0 0 ${8 + scrollProgress * 15}px ${color}`,
      transition: 'color 0.3s ease, text-shadow 0.3s ease'
    };
  };

  // Calculate background transition based on scroll progress
  const getBgStyle = () => {
    let bgColor;
    
    if (scrollProgress < 0.33) {
      bgColor = colors.blue50;
    } else if (scrollProgress < 0.66) {
      bgColor = colors.violet300;
    } else {
      bgColor = colors.blue200;
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
        <div className="relative"> 
          <div 
            ref={textRef}
            className="special-font uppercase text-[5rem] sm:text-[7rem] md:text-[10rem] font-black select-none will-change-transform"
            style={{
              ...getFilterStyle(),
              willChange: "transform, filter", // Performance optimization hint
            }}
          >
            <b>SPIDER
              <span 
                ref={manRef} 
                className="relative inline-block will-change-transform"
                style={{
                  ...getManStyle(),
                  willChange: "transform, text-shadow", // Performance optimization
                }}
              >MAN</span>
            </b>
          </div>
          
          // Web-like SVG background elements with updated styling 
          <svg className="absolute top-0 left-0 w-full h-full -z-10 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,100" stroke={colors.blue100} strokeWidth="0.5" />
            <path d="M100,0 L0,100" stroke={colors.blue100} strokeWidth="0.5" />
            <path d="M50,0 L50,100" stroke={colors.blue100} strokeWidth="0.5" />
            <path d="M0,50 L100,50" stroke={colors.blue100} strokeWidth="0.5" />
          </svg>
        </div>
        
        // Scroll indicator 
        <div className="fixed bottom-5 left-0 right-0 text-center text-white opacity-70 pointer-events-none z-10">
          <p className="font-medium mb-1">Scroll to transform</p>
          <div className="w-32 h-2 bg-white/30 mx-auto rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: `${scrollProgress * 100}%`,
                backgroundColor: scrollProgress < 0.5 ? colors.violet300 : colors.yellow300,
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
*/