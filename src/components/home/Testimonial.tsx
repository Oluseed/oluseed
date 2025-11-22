import React, { useRef, useEffect, useState } from "react";

const Testimonial: React.FC = () => {
  const testimonials = [
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Job",
      name: 'Job Ghadzi',
      isCenter: false,
      role: 'CO-Founder DC agency',
      review: "The material is really updated, so I don't think I need to go to college, because here is enough"
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James1",
      name: 'James Son',
      isCenter: true,
      role: 'Senior Entrepreneur',
      review: "Very different from conventional agency, this one is easier, easier to learn and easy to remember"
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James2",
      name: 'James Son',
      isCenter: false,
      role: 'Senior Entrepreneur',
      review: "Again wfh like this it's not comfortable just learning via zoom at school"
    }
  ];

  // Triple the items for seamless infinite loop
  const sliderItems = [...testimonials, ...testimonials, ...testimonials];

  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const scrollSpeed = 0.5;
    let animationFrameId: number;

    const animate = () => {
      setOffset((prevOffset) => {
        const cardWidth = 350;
        const gap = 40;
        const itemWidth = cardWidth + gap;
        const resetPoint = -(itemWidth * testimonials.length);

        if (prevOffset <= resetPoint) {
          return 0;
        }
        return prevOffset - scrollSpeed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, testimonials.length, isVisible]);

  return (
    <section ref={sectionRef} className='pl-2 py-8 md:py-12 overflow-hidden'>
      <div>
        <h1 
          className={`font-clashDisplay font-bold text-3xl md:text-5xl mt-10 ml-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          What Our
          <br />
          <span className='text-[#0f04ff] font-bold'>Satisfied</span> Clients Say
        </h1>
      </div>

      {/* Desktop: Auto-scrolling slider */}
      <div 
        className='hidden md:block mt-10 relative overflow-hidden'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-10"
          style={{
            transform: `translateX(${offset}px)`,
            transition: isPaused ? 'transform 0.3s ease-out' : 'none',
          }}
        >
          {sliderItems.map((testimonial, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[350px] ${
                testimonial.isCenter ? 'bg-[#0f04ff] text-white' : 'bg-white'
              } shadow-2xl rounded-3xl p-6 flex flex-col justify-center transition-all duration-300 hover:scale-105`}
            >
              <div className='flex gap-3 items-center'>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-gray-100 p-1"
                />
                <div>
                  <h2 className='font-semibold text-[16px]'>{testimonial.name}</h2>
                  <p className={`font-normal text-[13px] ${testimonial.isCenter ? 'text-white/90' : 'text-gray-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className={`mt-5 text-[14px] leading-relaxed ${testimonial.isCenter ? 'text-white/95' : 'text-gray-700'}`}>
                {testimonial.review}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          Hover to pause
        </div>
      </div>

      {/* Mobile: Stacked cards with stagger animation */}
      <div className='md:hidden grid gap-5 m-5 mt-8'>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`${
              testimonial.isCenter ? 'bg-[#0f04ff] text-white' : 'bg-white'
            } shadow-2xl rounded-3xl p-6 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
            style={{
              transitionDelay: `${index * 200}ms`
            }}
          >
            <div className='flex gap-3 items-center'>
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full bg-gray-100 p-1"
              />
              <div>
                <h2 className='font-semibold text-[16px]'>{testimonial.name}</h2>
                <p className={`font-normal text-[13px] ${testimonial.isCenter ? 'text-white/90' : 'text-gray-600'}`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className={`mt-5 text-[14px] leading-relaxed ${testimonial.isCenter ? 'text-white/95' : 'text-gray-700'}`}>
              {testimonial.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;