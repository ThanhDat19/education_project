import React, { useState } from "react";

const ProductFilter = ({ options, onFilterChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (optionValue) => {
    const isSelected = selectedOptions.includes(optionValue);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((option) => option !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };

  const handleApplyFilter = () => {
    onFilterChange(selectedOptions);
  };

  return (
    <div>
      <h2>Product Filter</h2>
      <div>
        <h3>Options:</h3>
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleOptionChange(option.value)}
            />
            <label>{option.label}</label>
          </div>
        ))}
      </div>
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default ProductFilter