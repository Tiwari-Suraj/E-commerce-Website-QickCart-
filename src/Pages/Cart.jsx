import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/Shopcontext";
import binIcon from "../assets/bin_icon.png"; // Make sure this is the correct path
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { products, rupees, cartItems, setCartItem, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    Object.entries(cartItems).forEach(([itemId, sizes]) => {
      Object.entries(sizes).forEach(([size, quantity]) => {
        if (quantity > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            tempData.push({
              ...product,
              size,
              quantity,
            });
          }
        }
      });
    });

    setCartData(tempData);
  }, [JSON.stringify(cartItems), products]); // Force update when cartItems structure changes

  const handleQuantityChange = (itemId, size, value) => {
    const updatedCart = { ...cartItems };
    const newQuantity = parseInt(value);

    if (isNaN(newQuantity) || newQuantity < 1) return;

    if (updatedCart[itemId] && updatedCart[itemId][size] !== undefined) {
      updatedCart[itemId][size] = newQuantity;
      setCartItem({ ...updatedCart });
    }
  };

  const handleDelete = (itemId, size) => {
    console.log("Deleting item:", itemId, size); // DEBUG
    const updatedCart = { ...cartItems };

    if (updatedCart[itemId]) {
      delete updatedCart[itemId][size];

      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }

      setCartItem({ ...updatedCart });
    }

    // Also update cartData immediately
    setCartData((prev) =>
      prev.filter((item) => !(item._id === itemId && item.size === size))
    );
  };

  return (
    <div className="border-t pt-14 px-4">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {cartData.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartData.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="border p-4 rounded flex gap-4 items-center justify-between"
            >
              <img
                src={item.image?.[0] || ""}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, item.size, e.target.value)
                    }
                    className="border px-2 py-1 w-16 text-center"
                  />
                </div>
                <p className="text-orange-600 font-semibold mt-2">
                  {rupees}
                  {item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item._id, item.size)}
                aria-label="Delete item"
                className="p-2 hover:bg-gray-100 rounded"
              >
                <img
                  src={binIcon}
                  alt="Delete"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-orange-600 text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
