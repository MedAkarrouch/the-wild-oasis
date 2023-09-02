import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || options.at(0).value;

  const handleClick = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select value={sortBy} onChange={handleClick} options={options}></Select>
  );
}

export default SortBy;
