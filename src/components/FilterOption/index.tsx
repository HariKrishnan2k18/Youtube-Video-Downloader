import { BsCartCheck } from "react-icons/bs";
import { FilterBooks } from "../../pages/Dashboard/styled.components";

export default function FilterOption({
  handleChange,
  len
}: {
  handleChange: (value: string, type: string) => void;
  len: number;
}) {
  return (
    <>
      <FilterBooks>
        <div>
          Availability :
          <select
            onChange={(e) => handleChange(e.target.value, "availability")}
          >
            <option value="All"> All</option>
            <option value="In Stock"> In Stack</option>
            <option value="Out of Stock"> Out Of Stock</option>
            <option value="Limited Stock">Limited Stock</option>
          </select>
        </div>
        <div>
          Price :
          <select onChange={(e) => handleChange(e.target.value, "price")}>
            <option value="All"> All</option>
            <option value={10}> {`> 10`}</option>
            <option value={12}> {`> 12`}</option>
            <option value={14}> {`> 14`}</option>
          </select>
        </div>
        <div>{`Books Count : ${len}`}</div>
        <div>
          <BsCartCheck size={20} />
        </div>
      </FilterBooks>
    </>
  );
}
