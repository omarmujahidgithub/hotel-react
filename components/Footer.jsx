const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Column 1: About */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-sm text-gray-400">
                Revolutionizing hotel stays with smart and hassle-free check-in and check-out solutions. Our platform ensures convenience, security, and personalized experiences for every guest.
              </p>
            </div>
  
            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:underline">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:underline">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:underline">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
  
            {/* Column 3: Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">123 Hotel Lane, City Center, 56789</p>
              <p className="text-sm text-gray-400">Phone: (123) 456-7890</p>
              <p className="text-sm text-gray-400">Email: support@hotelcheckin.com</p>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Automated Hotel System. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  