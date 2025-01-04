import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Navbar from "../Navigations/Navbar";
import Footer from "../Footer/Footer";
import Loading from '../Loading/Loading';

const Success = () => {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("orderSuccess"));

  const [expectedDelivery, setExpectedDelivery] = useState(null);

  useEffect(() => {
    if (order) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      setExpectedDelivery(currentDate);

      generateInvoice(order, currentDate);
    } else {
      navigate("/"); // Redirect to home if no order data
    }
  }, []); // Run only once on component mount

  const generateInvoice = (order, deliveryDate) => {
    const doc = new jsPDF("portrait", "px", "a4");
  
    // Page Dimensions
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    // Set Background Color
    doc.setFillColor("#efeab3");
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  
    // Add Images
    const addImages = () => {
      const topLeftImage = "Invoice/Top-Left-Corner.png";
      const topRightImage = "Invoice/T-Logo.png";
      const topCenterImage = "Invoice/Top-Center.png";
      const centerImage = "Invoice/Center.png";
  
      doc.addImage(topLeftImage, "PNG", -30, -30, 160, 160); // Top-left corner
      doc.addImage(topRightImage, "PNG", pageWidth - 100, 20, 80, 80); // Top-right logo
      doc.addImage(topCenterImage, "PNG", 100, -80, 350, 250); // Center-top design
      doc.addImage(centerImage, "PNG", (pageWidth - 300) / 2, (pageHeight - 300) / 2, 300, 300); // Central decoration
    };
    addImages();
  
    // Add Header
    const addHeader = () => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor("#D4AF37"); // Parent color for the main header
      doc.text(`INVOICE`, pageWidth / 2, 120, { align: "center" });
  
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
  
      // Text contents
      const invoiceNo = `Invoice No: ${Math.floor(100000 + Math.random() * 900000)}`;
      const invoiceDate = `Invoice Date: ${new Date().toLocaleDateString()}`;
      const deliveryDateText = `Delivery Date: ${deliveryDate.toDateString()}`;
  
      // Set the x position to align the text to the right
      const invoiceNoWidth = doc.getTextWidth(invoiceNo);
      const invoiceDateWidth = doc.getTextWidth(invoiceDate);
      const deliveryDateWidth = doc.getTextWidth(deliveryDateText);
  
      const rightMargin = 20; // Adjust the margin for right alignment
  
      // Split the text for styling (parent and child)
      const invoiceNoParts = invoiceNo.split(':');
      const invoiceDateParts = invoiceDate.split(':');
      const deliveryDateParts = deliveryDateText.split(':');
  
      // Apply the styles
      doc.setTextColor("#D4AF37"); // Parent color for the label (before colon)
      doc.text(invoiceNoParts[0] + ":", pageWidth - Math.max(invoiceNoWidth, invoiceDateWidth, deliveryDateWidth) - rightMargin, 150);
  
      doc.setTextColor("#D2C385"); // Child color for the value (after colon)
      doc.setFont("helvetica", "normal");
      doc.text(invoiceNoParts[1], pageWidth - Math.max(invoiceNoWidth, invoiceDateWidth, deliveryDateWidth) - rightMargin + doc.getTextWidth(invoiceNoParts[0] + ":"), 150);
  
      doc.setTextColor("#D4AF37"); // Parent color for the label (before colon)
      doc.text(invoiceDateParts[0] + ":", pageWidth - Math.max(invoiceNoWidth, invoiceDateWidth, deliveryDateWidth) - rightMargin, 170);
  
      doc.setTextColor("#D2C385"); // Child color for the value (after colon)
      doc.setFont("helvetica", "normal");
      doc.text(invoiceDateParts[1], pageWidth - Math.max(invoiceNoWidth, invoiceDateWidth, deliveryDateWidth) - rightMargin + doc.getTextWidth(invoiceDateParts[0] + ":"), 170);
  
      doc.setTextColor("#D4AF37"); // Parent color for the label (before colon)
      doc.text(deliveryDateParts[0] + ":", pageWidth - Math.max(invoiceNoWidth, invoiceDateWidth, deliveryDateWidth) - rightMargin, 190);
  
      doc.setTextColor("#D2C385"); // Child color for the value (after colon)
      doc.setFont("helvetica", "normal");
      doc.text(deliveryDateParts[1], pageWidth - Math.max(invoiceNoWidth, invoiceDateWidth, deliveryDateWidth) - rightMargin + doc.getTextWidth(deliveryDateParts[0] + ":"), 190);
    };
  
    addHeader();
  
    // Add Customer Details
    const addCustomerDetails = () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor("#8B4513");
  
      doc.text("Invoice To:", 20, 220);
  
      doc.setTextColor("#708238");
      doc.text(`${order.name}`, 100, 220);
  
      doc.setTextColor("#8B4513");
      doc.text("Phone:", 20, 240);
      doc.setTextColor("#708238");
      doc.text(`${order.phone}`, 100, 240);
  
      doc.setTextColor("#8B4513");
      doc.text("Email:", 20, 260);
      doc.setTextColor("#708238");
      doc.text(`${order.email}`, 100, 260);
  
      doc.setTextColor("#8B4513");
      doc.text("Address:", 20, 280);
      doc.setTextColor("#708238");
      doc.text(`${order.address}`, 100, 280);
    };
    addCustomerDetails();
  
    // Add Order Table
    const addOrderTable = () => {
      let yOffset = 320;
  
      // Table Header
      doc.setFont("helvetica", "bold");
      doc.setFillColor("#D2C385"); // Child color for the header background
      doc.setDrawColor("#D4AF37"); // Parent color for the border
      doc.rect(20, yOffset, pageWidth - 40, 20, "F");
      doc.setTextColor("#D4AF37"); // Parent color for the text
      doc.text("No.", 30, yOffset + 15);
      doc.text("Description", 80, yOffset + 15);
      doc.text("Quantity", pageWidth - 170, yOffset + 15, { align: "right" });
      doc.text("Amount", pageWidth - 50, yOffset + 15, { align: "right" });
  
      // Table Content
      yOffset += 30;
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#6b8e23"); // Olive green color for the content text
      order.items.forEach((item, index) => {
        doc.text(`${index + 1}`, 30, yOffset);
        doc.text(item.productName, 80, yOffset);
        doc.text(`${item.quantity}`, pageWidth - 170, yOffset, { align: "right" });
        doc.text(`Tk. ${item.quantity * item.price}`, pageWidth - 50, yOffset, { align: "right" });
        yOffset += 20;
      });
  
      // Total Section
      yOffset += 10;
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#8b4513"); // Olive brown color for total section text
      doc.text(`Delivery Charge: Tk. ${order.deliveryCharge}`, 20, yOffset);
      yOffset += 20;
  
      // Calculate the discount if applicable
      const discountAmount = order.discount ? order.totalAmount * (order.discount / 100) : 0;
      const finalAmount = order.totalAmount - discountAmount;
  
      // Total Amount after discount
      doc.text(`Total Amount (after discount): Tk. ${finalAmount}`, 20, yOffset);
    };
  
    addOrderTable();
  
    // Footer
    const addFooter = () => {
      const footerText = "Thank you for shopping with Aarshi Designs! Payment must be made immediately.";
      const footerY = pageHeight - 50;
  
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor("#ceba98");
      doc.text(footerText, pageWidth / 2, footerY, { align: "center" });
  
      // Draw the line
      doc.setDrawColor("#D4AF37"); // Parent color for the line
      doc.setLineWidth(2);
      doc.line(20, footerY + 10, pageWidth - 20, footerY + 10);
  
      // Add the copyright text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor("#ceba98");
      doc.text("@copyright 2025 reserved by Aarshi Designs", pageWidth / 2, footerY + 25, { align: "center" });
    };
  
    addFooter();
  
    // Save PDF
    doc.save("invoice.pdf");
  };
  
  

  
    
  
  
  
  

  if (!expectedDelivery) return <Loading/>;

  const formattedDelivery = expectedDelivery.toDateString();

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Order Successful!</h2>
        <p className="mb-6">Your invoice has been downloaded successfully.</p>
        <div className="border p-4 rounded mb-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Expected Delivery:</strong> {formattedDelivery}</p>
          <p><strong>Total:</strong> Tk. {order.totalAmount}</p>
        </div>
        <button
          className="px-6 py-3 bg-[#8d5c51] text-white rounded hover:bg-[#7d835f] transition w-full"
          onClick={() => {
            localStorage.removeItem("orderSuccess");
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
