import Select from "react-select";
import { products } from "../utils/products";
import { getAllProducts } from "../app/features/products/productsSlice";
import { findAllCategories } from "../api/service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const options = [{ value: "All", label: "All" }];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#0f3460",
    color: "white",
    borderRadius: "5px",
    border: "none",
    boxShadow: "none",
    width: "200px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const FilterSelect = ({ setFilterList }) => {
  const dispatch = useDispatch();
  const handleChange = (selectedOption) => {
    // set products to selected filter.
    if (selectedOption.value === "All") {
      setFilterList(dispatch(getAllProducts()));
    }
    else {
        const selectedCategoryId = selectedOption.value;
        
    }
  };

  async function initCategories() {
    const categoriesAndProducts = await findAllCategories();
    categoriesAndProducts.forEach((cp) => {
      options.push({ value: cp.categoryID, label: cp.categoryName });
    });
  }

  useEffect(() => {
    initCategories();
  }, []);

  console.log(options);

  return (
    <Select
      options={options}
      defaultValue={{ value: "", label: "Filter By Category" }}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
