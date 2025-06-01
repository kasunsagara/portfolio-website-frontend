import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextFieldRef?.current?.focus();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`, formData);
      setFormData({ name: '', phone: '', email: '', message: '' });
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl sm:text-5xl font-bold text-[#00ffff] mb-12">Contact Me</h2>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-2/3 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 p-6 sm:p-10 rounded-lg shadow-lg space-y-6"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={e => handleKeyDown(e, phoneRef)}
              required
              className="w-full p-4 text-white bg-[#192230] rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00ffff]"
            />
            <input
              ref={phoneRef}
              name="phone"
              type="number"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={e => handleKeyDown(e, emailRef)}
              required
              className="w-full p-4 text-white bg-[#192230] rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00ffff]"
            />            
            <input
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={e => handleKeyDown(e, messageRef)}
              required
              className="w-full p-4 text-white bg-[#192230] rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00ffff]"
            />
            <textarea
              ref={messageRef}
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 text-white bg-[#192230] rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00ffff]"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#00ffff] text-[#192230] hover:bg-[#192230] hover:text-[#00ffff] hover:border-2 border-[#00ffff] transition-transform transform'
              }`}
            >
              Send Message
            </button>
          </form>

          {/* Contact Info Boxes */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 p-6 sm:p-8 rounded-lg shadow-lg text-center hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <FaEnvelope className="text-[30px] sm:text-[35px] text-[#00ffff]" />
              </div>
              <h3 className="font-semibold text-xl sm:text-2xl text-[#00ffff]">Email</h3>
              <p className="text-white mt-2 text-sm sm:text-base">kasunsagara689@gmail.com</p>
            </div>
            <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 p-6 sm:p-8 rounded-lg shadow-lg text-center hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <FaPhoneAlt className="text-[30px] sm:text-[35px] text-[#00ffff]" />
              </div>
              <h3 className="font-semibold text-xl sm:text-2xl text-[#00ffff]">Phone</h3>
              <p className="text-white mt-2 text-sm sm:text-base">0771670585</p>
            </div>
            <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 p-6 sm:p-8 rounded-lg shadow-lg text-center hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="text-[30px] sm:text-[35px] text-[#00ffff]" />
              </div>
              <h3 className="font-semibold text-xl sm:text-2xl text-[#00ffff]">Location</h3>
              <p className="text-white mt-2 text-sm sm:text-base">Rathnapura, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
