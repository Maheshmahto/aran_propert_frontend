/* eslint-disable react/prop-types */
const PropertyTypeFilter = ({ setFilterPropertyInput }) => {
  const AddInput = (value) => {
    setFilterPropertyInput(value);
  };

  return (
    <div className=" w-full border border-gray-300 rounded-md flex justify-between  top-9 left-0 absolute bg-white z-10">
      <ul className="flex flex-col gap-3 w-full">
        <div
          className="hover:cursor-pointer hover:bg-blue-500 p-1"
          onClick={() => AddInput("Commercial")}
        >
          <li>Commercial</li>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-blue-500 p-1"
          onClick={() => {
            AddInput("Office Space");
          }}
        >
          <li>Office Space</li>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-blue-500 p-1"
          onClick={() => {
            AddInput("Industrial Building");
          }}
        >
          <li>Industrial Building</li>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-blue-500 p-1"
          onClick={() => {
            AddInput("Goddown/Warehouse");
          }}
        >
          <li>Gowdown/Warehouse</li>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-blue-500 p-1"
          onClick={() => {
            AddInput("Showroom");
          }}
        >
          <li>Showroom</li>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-blue-500 p-1"
          onClick={() => {
            AddInput("Other Business");
          }}
        >
          <li>Other Business</li>
        </div>
      </ul>
    </div>
  );
};

export default PropertyTypeFilter;
