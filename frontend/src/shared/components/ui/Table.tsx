import { CheckBox } from "./CheckBox";

const Table = () => {
  return (
    <div className="p-6 text-t-primary">
      <div className="w-full rounded-xl overflow-hidden border border-bo-primary">
        <div className="flex justify-around items-center bg-b-secondary  border-b border-bo-primary h-11">
          <div className="flex px-10">
            <CheckBox labelClass="text-md font-normal">Form</CheckBox>
          </div>
          <div className="text-md px-10">PackageId</div>
          <div className="text-md px-10">Data Received</div>
          <div className="text-md px-10">Item Values</div>
          <div className="text-md px-10">Weight</div>
          <div className="text-md px-10">Status</div>
          <div className="text-md px-10">Action</div>
        </div>
        <div className="grid auto-rows-18">
          <div className="flex items-center px-10 border-b border-bo-primary">
            <CheckBox labelClass="text-md font-normal"></CheckBox>
            <div>
              <h3 className="text-md text-t-primary">Amazon</h3>
              <p className="text-md text-t-secondary">IZ6A9426897731887</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Table;
