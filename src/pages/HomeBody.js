import { HomeMainCarousel } from "./Carousel";
import { BiWorld } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";

export const HomeBody = () => {
  return (
    <>
      <HomeMainCarousel />
      <div className="flex justify-between mx-3 my-6 text-lg font-bold">
        <p className="w-1/2 text-center flex justify-center items-center mr-2">
          <span>
            <TbTruckDelivery className="inline-block text-2xl" /> EASY WORLDWIDE
            DELIVERY
          </span>
        </p>
        <p className="w-1/2 flex justify-center items-center text-center ml-2">
          <span>
            <BiWorld className="inline-block text-2xl" /> UDOHS DESIGNS
          </span>
        </p>
      </div>
    </>
  );
};
