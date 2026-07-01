import BookIcon from "../../assets/icons/BookIcon";
import CalculatorIcon from "../../assets/icons/CalculatorIcon";

const SideBar = () => {
  return (
    <div
      className="flex flex-col gap-5 
      w-100 bg-b-primary p-6 rounded-2xl"
    >
      <h4 className="text-md text-t-secondary font-medium">
        All values are in United States dollars (USD).
      </h4>
      <div
        className="flex-center flex-col w-full h-30.5 
      bg-b-secondary border border-bo-primary rounded-lg"
      >
        <div className="flex-center size-14 bg-primary rounded-xl p-2">
          <CalculatorIcon className="size-9 stroke-t-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-t-primary mt-3">
          Shipping Calculator
        </h3>
      </div>
      <div
        className="flex-center flex-col w-full h-30.5 
       bg-b-secondary border border-bo-primary rounded-lg"
      >
        <div className="flex-center size-14 bg-primary rounded-xl p-2">
          <BookIcon className="size-9 stroke-t-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-t-primary mt-3">
          Address Book
        </h3>
      </div>
    </div>
  );
};

export default SideBar;
