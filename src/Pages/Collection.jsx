import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/Shopcontext";
import Title from "../Components/Title";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    if (!products || products.length === 0) return;

    let filtered = [...products];

    // Filter by search keyword
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by subcategory
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubCategories.includes(product.subCategory)
      );
    }

    // Sort the filtered products
    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [
    products,
    selectedCategories,
    selectedSubCategories,
    sortType,
    search,
    showSearch,
  ]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategories((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="ALL" text2="COLLECTION" />
      </div>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
        {/* Filter Sidebar */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
          </p>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Men", "Women", "Kids"].map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    value={category}
                    className="w-3"
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(category)}
                  />{" "}
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    className="w-3"
                    onChange={handleSubCategoryChange}
                    checked={selectedSubCategories.includes(type)}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1="ALL" text2="COLLECTION" />
            <select
              onChange={handleSortChange}
              className="border-2 border-gray-300 text-sm px-2"
              value={sortType}
            >
              <option value="relevant">Sort by Relevant</option>
              <option value="low-high">Sort by Low to High</option>
              <option value="high-low">Sort by High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No products match the selected filters.
              </p>
            ) : (
              filteredProducts.map((item) => {
                const productId = item._id || item.id;
                return (
                  <Link to={`/product/${productId}`} key={productId}>
                    <div className="cursor-pointer hover:shadow-lg p-2">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-full h-auto"
                      />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
