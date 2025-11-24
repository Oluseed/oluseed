// src/components/WhatsAppButton.tsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber?: string; 
  message?: string;     
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "234XXXXXXXXXX", // <-- Replace with your company's WhatsApp number
  message = "Hello! I would like to make an enquiry.",
}) => {
  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={openWhatsApp}
      className="
        fixed bottom-6 right-6 z-50
        hover:bg-[#25D366]
        bg-[#0f04ff]
        text-white shadow-xl
        rounded-full p-4 md:p-5
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110
      "
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl md:text-4xl" />
    </button>
  );
};

export default WhatsAppButton;
