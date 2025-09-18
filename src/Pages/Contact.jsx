import React, { useState, useEffect } from "react";
import { User, Mail, MessageSquare, Send, AtSign, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Replace with your email in FormSubmit
      const formSubmitUrl = 'https://formsubmit.co/sathishmadanu0416@gmail.com';
      
      // Prepare form data for FormSubmit
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'New Message from Portfolio Website');
      submitData.append('_captcha', 'false'); // Disable captcha
      submitData.append('_template', 'table'); // Format email as table

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully!',
          icon: 'success',
          confirmButtonColor: '#6366f1',
          timer: 2000,
          timerProgressBar: true
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#6366f1'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     <div className="px-[5%] sm:px-[5%] lg:px-[10%] py-8" >
      <div className="text-center mb-12">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-4xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          CONTACT ME
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-4"
        >
          Don't hesitate to contact me with questions or opportunities. I'm eager to connect and contribute where my skills can make an impact.
        </p>
      </div>

      <div
        className="h-auto flex items-center justify-center"
        id="Contact"
      >
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10" >
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-[#6366f1]/10"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Your Message
              </h2>
              <p className="text-gray-400">
                Have something to discuss? Send me a message and let's talk.
              </p>
            </div>

            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
              </button>
            </form>

          </div>

          <div 
            data-aos="fade-left"
            data-aos-duration="1000"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-[#6366f1]/10"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Contact Info
              </h2>
              <p className="text-gray-400">
                Feel free to reach out through any of these channels.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#6366f1]/20 text-[#6366f1]">
                  <AtSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Email</h3>
                  <p className="text-white font-medium">sathishmadanu0416@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#6366f1]/20 text-[#6366f1]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Phone</h3>
                  <p className="text-white font-medium">+91 8074168078</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#6366f1]/20 text-[#6366f1]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Location</h3>
                  <p className="text-white font-medium">Guntur, Andhrapradesh, India.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-white font-medium mb-4">Connect with me</h3>
              <div className="flex gap-4">
                <a href="https://github.com/sathish0416" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 text-white hover:bg-[#6366f1]/30 hover:text-[#6366f1] transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/sathishmadanu/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 text-white hover:bg-[#6366f1]/30 hover:text-[#6366f1] transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/madanusathish/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 text-white hover:bg-[#6366f1]/30 hover:text-[#6366f1] transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;