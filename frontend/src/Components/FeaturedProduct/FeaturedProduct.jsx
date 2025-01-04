import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import featured from '/Featured/Featured.jpg'
const FeaturedProduct = () => {
  return (
    <section
      className="py-16"
      style={{ backgroundColor: "#FFFFFF" }} // Background color
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src="/Featured/Featured.jpg" // Replace with product image URL
              alt="Featured Product"
              className="rounded-lg shadow-lg"
              style={{
                border: "4px solid #ceba98", // Border styling
                backgroundColor: "#f4ebb4", // Matches palette
              }}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#D4AF37" }} // Title color
            >
              Elegant White Kurta with Black Floral Accents
            </h2>
            <p
              className="text-md mb-6"
              style={{ color: "#D2C385" }} // Subtitle color
            >
              A premium white kurta featuring sophisticated black floral accents on the collar and pocket. Crafted from high-quality fabric, this kurta is perfect for formal gatherings and festive occasions. Its modern design ensures comfort and style, making it a versatile choice for your wardrobe.
            </p>
            <div className="flex items-center mb-6">
              <p
                className="text-3xl font-bold mr-4"
                style={{ color: "#D4AF37" }} // Price color
              >
                ৳1250.00
              </p>
              <span
                className="text-sm line-through"
                style={{ color: "#D2C385" }} // Discount color
              >
                ৳2000.00
              </span>
            </div>
            {/* Add to Cart Button */}
            <button
              className="flex items-center px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
              style={{
                backgroundColor: "#D2C385", // Button background
                color: "#fff", // Button text
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", // Button shadow
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(223, 211, 162)")
              } // Hover effect
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = " #D2C385")
              }
            >
              <FaShoppingCart className="mr-2" />
              View Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
