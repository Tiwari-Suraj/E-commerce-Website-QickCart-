import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/Shopcontext";
import Title from "./Title";
import { Link } from "react-router-dom"; // ✅ Import Link

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setBestSeller(products.slice(0, 4));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Highlight the key features, benefits, and style of the items,
          encouraging customers to explore.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {bestSeller.map((item, index) => {
          const productId = item.id || item.productId || item._id; // ✅ Use correct ID field
          if (!productId) return null;

          return (
            <Link to={`/product/${productId}`} key={index}>
              <div className="cursor-pointer hover:shadow-lg p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto"
                />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
