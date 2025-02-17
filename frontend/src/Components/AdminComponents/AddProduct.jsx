import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [sizes, setSizes] = useState([{ size: '', sizePrice: 0 }]);
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    images: [''],
    sizeChart: '',
    availableColors: [],
    availableSizes: [],
    stock: 0,
    price: 0,
    discount: 0,
    productCode: '',
    category: '',
    subCategory: '',
    isBestSeller: false,
  });

  // Helper function to capitalize first letter and format array
  const formatTags = (input) => {
    return input
      .split(',')
      .map((item) => item.trim())  // Remove extra spaces
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()); // Capitalize
  };

  // Handler for text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handler for dynamic images
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    if (formData.images.length < 5) {
      setFormData({ ...formData, images: [...formData.images, ''] });
    } else {
      toast.error('You can add a maximum of 5 images.');
    }
  };

  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  // Handle the colors and sizes inputs
  const handleColorsChange = (e) => {
    const formattedColors = formatTags(e.target.value);
    setFormData({ ...formData, availableColors: formattedColors });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = field === 'sizePrice' ? Number(value) : value;
    setSizes(updatedSizes);
  };
  
  const addSizeField = () => {
    setSizes([...sizes, { size: '', sizePrice: 0 }]);
  };
  
  const removeSizeField = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      availableSizes: sizes, // Correctly assigning `sizes` to `availableSizes`
    };
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://aarshi.onrender.com/api/products/add', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      setFormData({
        productName: '',
        description: '',
        images: [''],
        sizeChart: '',
        availableColors: [],
        availableSizes: [],
        stock: 0,
        price: 0,
        discount: 0,
        productCode: '',
        category: '',
        subCategory: '',
        videoUrl: '',
        isBestSeller: false,
      });
      setSizes([{ size: '', sizePrice: 0 }]);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      toast.error('Something went wrong.');
    }
  };
  
  
  

  return (
    <div className="p-8 bg-[#ffdf99] min-h-screen">
      <h2 className="text-3xl font-bold text-[#D4AF37] mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="bg-[#FFF8E7] p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
  <div className="grid grid-cols-2 gap-6">
    <input
      type="text"
      name="productName"
      placeholder="Product Name"
      value={formData.productName}
      onChange={handleChange}
      className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      required
    />
    <input
      type="text"
      name="productCode"
      placeholder="Product Code"
      value={formData.productCode}
      onChange={handleChange}
      className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      required
    />
    <textarea
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      className="p-3 border rounded-lg w-full col-span-2 text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      rows="3"
      required
    />
    <div className="grid grid-cols-2 gap-6">
  <input
    type="number"
    name="price"
    placeholder="Price"
    value={formData.price}
    onChange={handleChange}
    className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
    required
  />
  <input
    type="number"
    name="discount"
    placeholder="Discount (%)"
    value={formData.discount}
    onChange={handleChange}
    className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
  />
</div>
<div className="mt-4 text-lg font-semibold text-[#D2C385] ">
  Discounted Price: {formData.price - (formData.price * formData.discount) / 100 || 0} TK
</div>

    <input
      type="number"
      name="stock"
      placeholder="Stock"
    //   value={formData.stock}
      onChange={handleChange}
      className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      required
    />
    <input
      type="text"
      name="category"
      placeholder="Category"
      value={formData.category}
      onChange={handleChange}
      className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      required
    />
    <input
      type="text"
      name="subCategory"
      placeholder="Sub-Category"
      value={formData.subCategory}
      onChange={handleChange}
      className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
    />
    <input
      type="text"
      name="sizeChart"
      placeholder="Size Chart URL (optional)"
      value={formData.sizeChart}
      onChange={handleChange}
      className="p-3 border rounded-lg w-full col-span-2 text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
    />
    <input
  type="text"
  name="videoUrl"
  placeholder="Video URL"
  value={formData.videoUrl || ''}
  onChange={handleChange}
  className="p-3 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
/>

  </div>

  {/* Dynamic Image URLs */}
  <div className="mt-4">
    <label className="font-semibold block mb-2 text-[#D4AF37]">Product Images (1-5)</label>
    {formData.images.map((image, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="url"
          placeholder={`Image URL ${index + 1}`}
          value={image}
          onChange={(e) => handleImageChange(index, e.target.value)}
          className="p-2 border rounded-lg flex-1 text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
        />
        {formData.images.length > 1 && (
          <button
            type="button"
            onClick={() => removeImageField(index)}
            className="bg-[#D2C385] text-white px-3 py-1 rounded-lg"
          >
            Remove
          </button>
        )}
      </div>
    ))}
    {formData.images.length < 5 && (
      <button
        type="button"
        onClick={addImageField}
        className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg"
      >
        Add Image
      </button>
    )}
  </div>

  {/* Color and Size Input */}
  <div className="mt-4 grid grid-cols-2 gap-6">
    <div>
      <label className="font-semibold block mb-2 text-[#D4AF37]">Available Colors</label>
      <input
        type="text"
        placeholder="Enter colors (comma separated)"
        value={formData.availableColors.join(', ')}
        onChange={handleColorsChange}
        className="p-2 border rounded-lg w-full text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      />
    </div>
    {/* <div>
      <label className="font-semibold block mb-2 text-[#8d5c51]">Available Sizes</label>
      <input
        type="text"
        placeholder="Enter sizes (comma separated)"
        value={formData.availableSizes.join(', ')}
        onChange={handleSizesChange}
        className="p-2 border rounded-lg w-full text-[#7b7c4d] bg-[#faeed5] placeholder:text-[#7b7c4d] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      />
    </div> */}
  </div>

  <div className="mt-4">
  <label className="font-semibold block mb-2 text-[#D4AF37]">Available Sizes & Prices</label>
  {sizes.map((sizeEntry, index) => (
    <div key={index} className="flex gap-4 mb-2">
      <input
        type="text"
        placeholder="Size"
        value={sizeEntry.size}
        onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
        className="p-3 border rounded-lg w-1/2 text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      />
      <input
        type="number"
        placeholder="Price"
        // value={sizeEntry.sizePrice}
        onChange={(e) => handleSizeChange(index, 'sizePrice', e.target.value)}
        className="p-3 border rounded-lg w-1/2 text-[#D2C385] bg-[#FFF8E7] placeholder:text-[#D2C385] focus:outline-none focus:ring-2 focus:ring-[#a0926c]"
      />
      {sizes.length > 1 && (
        <button
          type="button"
          onClick={() => removeSizeField(index)}
          className="text-[#D2C385] font-semibold"
        >
          Remove
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={addSizeField}
    className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg"
  >
    Add Size
  </button>
</div>




  {/* Best Seller */}
  <div className="mt-4 flex items-center gap-2">
    <input
      type="checkbox"
      name="isBestSeller"
      checked={formData.isBestSeller}
      onChange={handleChange}
      className="h-5 w-5"
    />
    <label htmlFor="isBestSeller" className="text-[#D4AF37]">Best Seller</label>
  </div>

  <div className="mt-6">
    <button type="submit" className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg hover:bg-[#D2C385]">
      Add Product
    </button>
  </div>
</form>

    </div>
  );
};

export default AddProduct;
