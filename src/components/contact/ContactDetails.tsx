import React from 'react'

const ContactDetails: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mx-5 md:mx-16 lg:mx-24 py-10">
      {/* Phone */}
      <div className="bg-[#FFF8EF] flex-1 grid gap-2 place-content-center p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
        <h1 className="text-[#0071E3] font-clashDisplay font-semibold text-xl text-center">
          Phone
        </h1>
        <p className="text-[#5B5B5B] font-poppins text-sm text-center">
          We’re interested in working together
        </p>
        <div className="bg-[#FFFFFF] text-[#05131D] font-poppins mt-5 grid place-content-center gap-2 p-5 rounded-xl">
          <p>+78 100 2356 123 </p>
          <p>+78 200 2356 123</p>
          <p>+78 100 2356 123</p>
        </div>
      </div>

      {/* Location */}
      <div className="bg-[#FFF8EF] flex-[1.3] grid gap-2 place-content-center p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 md:scale-105">
        <h1 className="text-[#0071E3] font-clashDisplay font-semibold text-xl text-center">
          Location
        </h1>
        <p className="text-[#5B5B5B] font-poppins text-sm text-center">
          Visit our headquarters around the world.
        </p>
        <div className="bg-[#FFFFFF] text-[#05131D] font-poppins mt-5 grid place-content-center gap-3 p-5 rounded-xl">
          <div className="text-center">
            260 Springs Crossing, <br /> Canton, Georgia, USA
          </div>
          <div className="text-center">
            260 Springs Crossing, <br /> Canton, Georgia, USA
          </div>
          <div className="text-center">
            260 Springs Crossing, <br /> Canton, Georgia, USA
          </div>
          <div className="text-center">
            260 Springs Crossing, <br /> Canton, Georgia, USA
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="bg-[#FFF8EF] flex-1 grid gap-2 place-content-center p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
        <h1 className="text-[#0071E3] font-clashDisplay font-semibold text-xl text-center">
          Email
        </h1>
        <p className="text-[#5B5B5B] font-poppins text-sm text-center">
          Have a project in mind? Send a message.
        </p>
        <div className="bg-[#FFFFFF] text-[#05131D] font-poppins mt-5 grid place-content-center p-5 rounded-xl">
          <p>Company@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
