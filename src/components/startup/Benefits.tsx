import React from "react";
import image01 from "../../assets/images/benefit01.png";
import image02 from "../../assets/images/benefit02.png";
import image03 from "../../assets/images/benefit03.png";
import image04 from "../../assets/images/benefit04.png";

const Benefits: React.FC = () => {
  const data = [
    {
      id: 1,
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family.",
      image: image01,
    },
    {
      id: 2,
      title: "Smart, Kind Colleagues",
      description: "Work with a team of talented and supportive professionals.",
      image: image02,
    },
    {
      id: 3,
      title: "Professional Development",
      description:
        "We invest in our people to ensure they can achieve their short, medium, and long term professional goals.",
      image: image03,
    },
    {
      id: 4,
      title: "Annual Leave",
      description:
        "All team members have up to 30 days of annual leave, and are warmly encouraged to use them.",
      image: image04,
    },
  ];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-10">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h1 className="font-clashDisplay text-[#0f04ff] text-3xl font-semibold">
          Benefits
        </h1>
        <p className="text-[#0A1017] font-poppins text-sm mt-1 max-w-lg mx-auto">
          In addition to a competitive salary, here are a few resources we offer
          to help our team excel.
        </p>
      </div>

      {/* Benefits Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-8 
          place-items-center
        "
      >
        {data.map((benefit) => (
          <div
            key={benefit.id}
            className="
              flex 
              flex-col 
              sm:flex-row 
              items-center 
              sm:items-start 
              bg-[#F9FAFB] 
              rounded-2xl 
              p-5 
              shadow-md 
              w-full 
              max-w-md
              hover:shadow-lg
              transition-all
              duration-300
            "
          >
            <img
              src={benefit.image}
              alt={benefit.title}
              className="w-16 h-16 object-contain mb-3 sm:mb-0 sm:mr-4"
            />
            <div className="text-center sm:text-left">
              <h2 className="font-clashDisplay text-[#0f04ff] font-semibold text-lg mb-1">
                {benefit.title}
              </h2>
              <p className="font-poppins text-[#0A1017] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
