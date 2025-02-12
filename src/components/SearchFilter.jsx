/* eslint-disable react/prop-types */
import "react";
import PriceRangeSelector from "./PriceRangerSelector";
import PropertyTypeFilter from "./PropertyTypeFilter";
import { useState} from "react";

const SearchFilter = ({ propertyTypeShow, setPropertyTypeShow , filterpropertyInput , setFilterPropertyInput}) => {
  const [show, setShow] = useState(false);
  const [closedSale , setClosedSale] = useState(true);
  const [closedSold , setClosedSold] = useState(true);
  const [closedPending , setClosedPending] = useState(true);
  const [closedProperty , setClosedProperty] = useState(true);
  

  

  const handleShow = () => {
    setShow(!show);
    setPropertyTypeShow(!propertyTypeShow);
    
  };
  return (
    <div className="  absolute left-0 transform -translate-x-[150px] top-14 z-10">
      <div className="p-3 pr-8 bg-white border shadow-xl w-72 ">
        <h1>Sale Status</h1>

        <div className="flex justify-between p-2 m-2 border border-gray-300 rounded-md shadow-md "onClick={() => { setClosedSale(!closedSale)}} >
          <input className="outline-none hover:cursor-pointer" type="text" name="Sale" id="Sale" placeholder="For Sale" readOnly />
          <img src="/LeftColumn/Closed.png" className={`${!closedSale && "rotate-180"} object-none`} alt=""  />
        </div>

        <div className="flex justify-evenly">
          <div className="flex items-center justify-center gap-2">
            <input
              className="accent-blue-800 hover:cursor-pointer"
              type="checkbox"
            />
            <h1 className="hover:cursor-default">Active</h1>
          </div>

          <div className="flex gap-2 justify-centeritems-center">
            <input
              className="accent-blue-800 hover:cursor-pointer"
              type="checkbox"
            />
            <h1 className="hover:cursor-default">Sold</h1>
          </div>

          <div className="flex items-center justify-center gap-2">
            <input
              className="accent-blue-800 hover:cursor-pointer"
              type="checkbox"
            />
            <h1 className="hover:cursor-default">For Lease</h1>
          </div>
        </div>

        <div className="flex justify-between p-2 m-2 border border-gray-300 rounded-md " onClick={() => { setClosedSold(!closedSold)}}  >
          <input className="outline-none hover:cursor-pointer"
            type="text"
            name="Sale"
            id="Sale"
            placeholder="Sold in the last"
            readOnly
          />
          <img src="/LeftColumn/Closed.png" className={`${!closedSold && "rotate-180"} object-none`} alt=""   />
        </div>

        <div className="flex justify-between p-2 m-2 border border-gray-300 rounded-md " onClick={() => { setClosedPending(!closedPending)}} >
          <input className="outline-none hover:cursor-pointer"
            type="text"
            name="Pending"
            id="Pending"
            placeholder="Pending"
            readOnly
          />
          <img src="/LeftColumn/Closed.png"  className={`${!closedPending && "rotate-180"} object-none`} alt=""  />
        </div>

        <h1 className="text-gray-600">Property type</h1>

        <div
         
          onClick={() => { handleShow(); setClosedProperty(!closedProperty); }}
          className="relative flex justify-between p-2 m-2 border border-gray-300 rounded-md hover:cursor-pointer" 
        >
          {show && <PropertyTypeFilter setFilterPropertyInput={setFilterPropertyInput} />}
          <input className="outline-none hover:cursor-pointer"
            type="text"
            name="For Sale"
            id="For Sale"
            placeholder="For Sale"
            value={filterpropertyInput}
            readOnly
          />
          <img src="/LeftColumn/Closed.png" className={`${!closedProperty && "rotate-180"} object-none`} alt=""  />
        </div>

        <h1 className="text-gray-600">Price Range</h1>

        <PriceRangeSelector />

        <h1 className="text-gray-600">Size</h1>

        <div className="flex justify-between">
          <div className="flex justify-between w-1/3 p-2 m-2 border border-gray-300 rounded-md ">
            <h3>Min</h3>
            <input
              type="text"
              name="Sale"
              id="Sale"
              placeholder="sq ft"
              className="w-1/2 outline-none"
            />
          </div>

          <div className="flex justify-between w-1/3 p-2 m-2 border border-gray-300 rounded-md">
            <h3>Max</h3>
            <input
              type="text"
              name="Sale"
              id="Sale"
              placeholder="sq ft"
              className="w-1/2 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
        <button className="py-3 text-sm font-medium text-white transition-all duration-200 bg-red-800 rounded-md px-9 hover:bg-red-700">
            Cancel
          </button>
          <button className="px-3 py-3 text-sm font-medium text-white transition-all duration-200 bg-blue-800 rounded-md hover:bg-blue-700">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
