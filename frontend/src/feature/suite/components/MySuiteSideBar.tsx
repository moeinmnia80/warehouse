import { Button } from "@/shared/index";
import { useAppSelector } from "@/store/redux/store";
import {
  BookIcon,
  InfoIcon,
  DeliveryIcon,
  CalculatorIcon,
} from "@/assets/index";

export const MySuiteSideBar = () => {
  const category = useAppSelector((state) => state.suite.category);

  return (
    <aside className="grid grid-cols-1 auto-rows-auto gap-5 w-full min-w-70 h-fit bg-b-primary p-6 rounded-2xl lg:grid-cols-2 xl:max-w-100 xl:grid-cols-1 border border-bo-primary shadow-2xs">
      <h4 className="text-center text-lg text-t-secondary font-medium col-span-2">
        All values are in United States dollars (USD).
      </h4>
      {category === "Ready to Send" && (
        <div className="border border-bo-primary rounded-xl text-t-primary col-span-2 lg:col-span-1 xl:col-span-2">
          <div className="p-5 border-b border-bo-primary">
            <h2 className="text-current font-bold text-2xl">
              Shipping Summary
            </h2>
          </div>
          <div className="p-5">
            <div className="flex flex-col gap-2 text-t-placeholder border-b border-bo-primary pb-4">
              <p className="flex-between text-xl text-current">
                Total Value
                <span className="text-t-primary text-2xl font-medium">
                  {/* {calculateData(sortedData).itemValues} */}
                </span>
              </p>
              <p className="flex-between text-xl text-current">
                Total Weight
                <span className="text-t-primary text-2xl font-medium">
                  {/* {calculateData(sortedData).totalWeight} */}
                </span>
              </p>
              <p className="flex-between text-xl text-current">
                Packages
                <span className="text-t-primary text-2xl font-medium">
                  {/* {sortedData.length} */}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <p className="flex-between font-light text-xl text-current">
                Subtotal
                <span className="text-t-primary text-2xl font-medium">
                  {/* {calculateData(sortedData).subTotal} */}
                </span>
              </p>
              <p className="flex-between font-light text-xl text-current">
                Estimated Shipping
                <span className="text-t-primary text-2xl font-bold">
                  {/* {calculateData(sortedData).subTotal} */}
                </span>
              </p>
              <p className="font-light text-lg text-current underline">
                How is this calculated?
              </p>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <Button className="btn btn--primary font-bold">
              <DeliveryIcon className="size-5 stroke-b-primary mr-2" />
              Create Ship Request
            </Button>
            <div className="flex gap-3 border border-bo-primary rounded-xl p-5">
              <InfoIcon className="size-5 shrink-0 stroke-t-placeholder" />
              <span className="text-t-placeholder text-lg">
                All items are subject to a customs duty upon receipt of package.
                Payment will be due when your package is delivered.
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-5 col-span-2 lg:col-span-1 lg:flex-col xl:col-span-2">
        <div className="flex-center flex-col w-full h-30.5 bg-b-secondary border border-bo-primary rounded-lg">
          <div className="flex-center size-14 bg-primary rounded-xl p-2">
            <CalculatorIcon className="size-9 stroke-t-primary" />
          </div>
          <h3 className="text-md text-lg xl:text-xl font-semibold text-t-primary mt-3">
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
          <h3 className="text-md text-lg xl:text-xl font-semibold text-t-primary mt-3">
            Address Book
          </h3>
        </div>
      </div>
    </aside>
  );
};
