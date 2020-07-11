import React, { useState } from "react";
import "./v7Select.module.scss";
import Select from "react-select";

interface v7SelectProps {}

interface ISelectOption {
  value: string;
  label: string;
}

const options: ISelectOption[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const V7Select: React.SFC<v7SelectProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
};

export default V7Select;
