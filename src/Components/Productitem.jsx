import React, { useContext } from "react";
import { ShopContext } from "../Context/Shopcontext";
import { Link } from "react-router-dom";

const Productitem = (id, image, name, price) => {
  const { rupees } = useContext(ShopContext);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/products/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {rupees}
        {price}
      </p>
    </Link>
  );
};

export default Productitem;
