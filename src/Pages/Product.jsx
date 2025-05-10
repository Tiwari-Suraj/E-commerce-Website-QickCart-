import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/Shopcontext";
import { assets } from "../assets/assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { productId } = useParams();
  const { products, rupees, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      const item = products.find((item) => item._id === productId);
      if (item) {
        setProductData(item);
        setImage(item.image?.[0] || "");
      } else {
        console.warn("Product not found for ID:", productId);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="border-t pt-10 px-4 sm:px-10">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Image Section */}
        <div className="flex flex-col sm:flex-row flex-1 gap-5">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] gap-2">
            {(productData.image || []).map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setImage(imgUrl)}
                className={`cursor-pointer rounded-sm w-20 sm:w-full ${
                  image === imgUrl ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%] flex items-center justify-center">
            <img
              src={image}
              alt={productData.name}
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="sm:w-1/2 flex flex-col gap-6">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4" alt="star" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" alt="star" />
            <p className="pl-2 text-sm text-gray-500">(122)</p>
          </div>

          {/* Price */}
          <p className="text-3xl font-medium">
            {rupees}
            {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600">{productData.description}</p>

          {/* Size Selector */}
          {Array.isArray(productData.sizes) && productData.sizes.length > 0 ? (
            <div className="flex flex-col gap-2 mt-4">
              <p className="font-medium">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-1 rounded text-sm ${
                      selectedSize === size
                        ? "bg-orange-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No sizes available</p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (!selectedSize) {
                toast.error("Please select a size before adding to cart.");
                return;
              }
              addToCart(productData._id, selectedSize);
            }}
            className="bg-orange-600 text-white px-5 py-2 text-sm rounded hover:bg-orange-800 mt-4 w-max"
          >
            Add to Cart
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product. </p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm"> Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
