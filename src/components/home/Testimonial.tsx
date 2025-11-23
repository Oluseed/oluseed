import React, { useRef, useEffect, useState } from "react";

interface TestimonialType {
  image: string;
  name: string;
  role: string;
  review: string;
  isCenter: boolean;
}

const Testimonial: React.FC = () => {
  const testimonials: TestimonialType[] = [
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SpeakAfricans",
      name: "Samuel Adekunle",
      role: "Founder – SpeakAfricans",
      isCenter: false,
      review:
        "Our entire African language learning system was only an idea until it was transformed into a fully functional platform. Clean UI, fast performance, and a well-structured backend. Exceptional work!"
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=EkoGlass",
      name: "Derrick White",
      role: "Operations Lead – Eko Glass Canada",
      isCenter: true,
      review:
        "The custom office management system built for our company simplified operations massively. Staff onboarding, workflow tracking, and reporting have never been easier. Absolutely world-class execution."
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NursingSpectrum",
      name: "Chloe Mendez",
      role: "CEO – Nursing Spectrum",
      isCenter: false,
      review:
        "The job-booking system exceeded our expectations. Its usability, speed, and reliability significantly improved how nurses find international opportunities. Highly recommended!"
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=OshusFreight",
      name: "Tebogo Mahlangu",
      role: "Founder – Oshus Freight Services",
      isCenter: false,
      review:
        "Our logistics and parcel management platform became far more efficient and automated. The attention to detail and problem-solving ability was outstanding. A solid developer with real expertise."
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NBAOsogbo",
      name: "Barr. Ajibola Akin",
      role: "Coordinator – NBA Osogbo",
      isCenter: false,
      review:
        "The e-voting system delivered was secure, reliable, and professionally built. It handled high traffic smoothly during elections. Fantastic job on both performance and security."
    }
  ];

  // Create infinite loop items
  const sliderItems = [...testimonials, ...testimonials, ...testimonials];

  const [offset, setOffset] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const scrollSpeed = 0.5;
    let animationFrameId: number;

    const animate = () => {
      setOffset(prev => {
        const cardWidth = 350;
        const gap = 40;
        const itemWidth = cardWidth + gap;
        const resetPoint = -(itemWidth * testimonials.length);

        return prev <= resetPoint ? 0 : prev - scrollSpeed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isVisible, testimonials.length]);

  return (
    <section ref={sectionRef} className="pl-2 py-8 md:py-12 overflow-hidden">
      <div>
        <h1
          className={`font-clashDisplay font-bold text-3xl md:text-5xl mt-10 ml-2 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          What Our
          <br />
          <span className="text-[#0f04ff] font-bold">Satisfied</span> Clients Say
        </h1>
      </div>

      {/* Desktop auto-scrolling slider */}
      <div
        className="hidden md:block mt-10 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-10"
          style={{
            transform: `translateX(${offset}px)`,
            transition: isPaused ? "transform 0.3s ease-out" : "none"
          }}
        >
          {sliderItems.map((testimonial, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[350px] ${
                testimonial.isCenter ? "bg-[#0f04ff] text-white" : "bg-white"
              } shadow-2xl rounded-3xl p-6 flex flex-col justify-center transition-all duration-300 hover:scale-105`}
            >
              <div className="flex gap-3 items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-gray-100 p-1"
                />
                <div>
                  <h2 className="font-semibold text-[16px]">
                    {testimonial.name}
                  </h2>
                  <p
                    className={`font-normal text-[13px] ${
                      testimonial.isCenter ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p
                className={`mt-5 text-[14px] leading-relaxed ${
                  testimonial.isCenter ? "text-white/95" : "text-gray-700"
                }`}
              >
                {testimonial.review}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">Hover to pause</div>
      </div>

      {/* Mobile stacked testimonials */}
      <div className="md:hidden grid gap-5 m-5 mt-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`${
              testimonial.isCenter ? "bg-[#0f04ff] text-white" : "bg-white"
            } shadow-2xl rounded-3xl p-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="flex gap-3 items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full bg-gray-100 p-1"
              />
              <div>
                <h2 className="font-semibold text-[16px]">{testimonial.name}</h2>
                <p
                  className={`font-normal text-[13px] ${
                    testimonial.isCenter ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p
              className={`mt-5 text-[14px] leading-relaxed ${
                testimonial.isCenter ? "text-white/95" : "text-gray-700"
              }`}
            >
              {testimonial.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
