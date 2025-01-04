import React from "react";
import { FaFacebookF, FaFacebookMessenger, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[ #FFFFFF] text-[ #D6C786] py-16 px-4 md:px-12 relative overflow-hidden rounded-t-3xl">
      {/* Curved Top Corners */}
      <div className="absolute top-0 left-0 w-full h-40 bg-[#6E7073] rounded-b-[50%] z-0"></div>

      <div className="relative z-10">
        {/* Main Content of the Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">About Us</h3>
            <p className="text-lg leading-relaxed text-[#bdbfc2]">
              We are a leading provider of innovative solutions, dedicated to helping businesses grow in the digital era.
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="#" className="hover:text-[#D4AF37] transition-all duration-300" aria-label="Facebook">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-all duration-300" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-all duration-300" aria-label="LinkedIn">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Quick Links</h3>
            <ul>
              <li className="mb-4 hover:text-[#760000] transition-all duration-300">
                <a href="#">Home</a>
              </li>
              <li className="mb-4 hover:text-[#760000] transition-all duration-300">
                <a href="#">Services</a>
              </li>
              <li className="mb-4 hover:text-[#760000] transition-all duration-300">
                <a href="#">Portfolio</a>
              </li>
              <li className="mb-4 hover:text-[#760000] transition-all duration-300">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Contact Info</h3>
            {/* <p className="text-[#bdbfc2] text-lg mb-4"><span className="text-[#D2C385]">Address:</span> Shop# 477, 3rd Floor, Police Plaza Concord Shopping Mall, Gulshan-1</p> */}
            <p className="text-[#bdbfc2] text-md mb-4"><span className="text-[#D2C385]">Phone:</span> (+880) 1732700800</p>
            <p className="text-[#bdbfc2] text-md mb-4"><span className="text-[#D2C385]">Emergency:</span> (+880) 9638756715</p>
            <p className="text-[#bdbfc2] text-md"><span className="text-[#D2C385]">Email:</span> aarshi.designs.bd@gmail.com</p>

          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Follow Us</h3>
            <p className="text-[#bdbfc2] text-lg mb-6">Connect with us on social media:</p>
            <div className="flex space-x-6 text-2xl">
              <a
                href="https://www.facebook.com/smsharfarraz.jhony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#4267B2] transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={32} />
              </a>
              <a
                href="https://messenger.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#00B2FF] transition-all duration-300"
                aria-label="Messenger"
              >
                <FaFacebookMessenger size={32} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#1DA1F2] transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={32} />
              </a>
              <a
                href="https://wa.me/8801714394330"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#25D366] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={32} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#C13584] transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={32} />
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="relative w-full h-[400px] bg-[#ceba98] rounded-xl mt-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45108.576678048914!2d90.35026603125!3d23.772882999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7351c5b1ba7%3A0x8564f7396612e528!2sAarshi%20Designs!5e1!3m2!1sen!2sbd!4v1735896481278!5m2!1sen!2sbd"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-[#6E7073] py-6 text-center rounded-md mt-16">
        <p className="text-lg text-[#D4AF37]">
          &copy; 2025 Aarshi Designs. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
