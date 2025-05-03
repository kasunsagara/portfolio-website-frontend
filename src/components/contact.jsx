import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_BASE}/api/contact`, formData)
      .then(() => {
        alert('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => alert('Error sending message'));
  };

  return (
    <section id="contact" className="py-16 bg-primary text-white px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-secondary mb-8">Contact Me</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 text-primary bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 text-primary bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary transition"
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 text-primary bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary transition"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-secondary text-primary rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
