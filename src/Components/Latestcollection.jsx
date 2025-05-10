import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/Shopcontext";
import Title from "./Title";
import { Link } from "react-router-dom";

const Latestcollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProduct(products.slice(0, 12));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Highlight the key features, benefits, and style of the items,
          encouraging customers to explore.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {latestProduct.map((item, index) => {
          const productId = item.id || item._id || item.productId;
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

export default Latestcollection;
