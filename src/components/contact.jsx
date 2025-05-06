import { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState({ type: '', text: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResponseMsg({ type: '', text: '' }); // Clear message on input change
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg({ type: '', text: '' });

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`, formData);
      setResponseMsg({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setResponseMsg({ type: 'error', text: 'Error sending message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-primary px-4 py-24"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-accent mb-12">Contact Me</h2>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 bg-trinity p-10 rounded-lg shadow-lg space-y-6"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 text-white bg-primary rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 text-white bg-primary rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 text-white bg-primary rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-accent"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-accent text-black hover:bg-gray-700 hover:text-white'
              }`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {responseMsg.text && (
              <p
                className={`text-sm mt-2 ${
                  responseMsg.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {responseMsg.text}
              </p>
            )}
          </form>

          {/* Contact Info Boxes */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-trinity p-5 rounded-lg shadow-lg text-center hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <FaEnvelope className="text-[32px] text-accent" />
              </div>
              <h3 className="font-semibold text-2xl text-accent">Email</h3>
              <p className="text-white mt-2">kasunsagara689@gmail.com</p>
            </div>
            <div className="bg-trinity p-5 rounded-lg shadow-lg text-center hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <FaPhoneAlt className="text-[32px] text-accent" />
              </div>
              <h3 className="font-semibold text-2xl text-accent">Phone</h3>
              <p className="text-white mt-2">0771670585</p>
            </div>
            <div className="bg-trinity p-5 rounded-lg shadow-lg text-center hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="text-[32px] text-accent" />
              </div>
              <h3 className="font-semibold text-2xl text-accent">Location</h3>
              <p className="text-white mt-2">Rathnapura, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


