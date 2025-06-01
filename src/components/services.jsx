import React, { useState, useEffect } from "react";
import axios from "axios";

// Import icon libraries
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Helper to get icon component
  const getIconComponent = (iconName) => {
    const iconLibraries = {
      ...FaIcons,
      ...SiIcons,
      ...DiIcons,
      ...AiIcons,
      ...BsIcons,
    };
    const Icon = iconLibraries[iconName];
    return Icon ? <Icon className="text-4xl text-[#00ffff] mb-4" /> : null;
  };

  return (
    <section 
      id="services"
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-24"
    >
      <div className="max-w-6xl mx-auto md:px-24">
        <h2 className="text-5xl font-bold text-center text-[#00ffff] mb-10">
          My Services
        </h2>
        {services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-lg rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300 text-white"
              >
                {/* Render Icon */}
                {getIconComponent(service.icon)}
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-base text-white">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
