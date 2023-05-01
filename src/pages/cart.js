import { useSelector } from "react-redux";
import { cartSelector } from "@/myReduxFiles/selectors";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { addOrRemoveClassToBody } from "@/util/addOrRemoveClassToBody";

export const Cart = ({ setOverLayForCart, setOverLayForCartOnBigScreen }) => {
  const currentCartInRedux = useSelector(cartSelector);
  const [quantityToPurchase, setQuantityToPurchase] = useState(1);

  return (
    <section
      id="shopping-cart"
      className="fixed top-1 right-1 min-[520px]:z-[3] bg-white dark:bg-black w-[85vw] h-[100vh] overflow-auto z-[2] translate-x-[300%] hidden"
    >
      <h3 className="text-xl text-center mt-5  font-bold">
        Shopping Cart ({currentCartInRedux.length})
      </h3>

      <figure className="flex justify-between p-4 items-center">
        <Link href="#_" className="flex-[0_0_30%] max-w-[120px]">
          <picture>
            <source srcSet="/men 1.webp" />
            <img alt="" src="/men 1.webp" />
          </picture>
        </Link>

        <figcaption className="flex-[0_0_55%] text-base">
          <Link href="#_">
            <p className="h-[44px] overflow-hidden">
              This classic crew neck patterned polo is made with high quality
              cotton that would last for years and give you a comfortable feel
              with double stiche at the bottom and hems for added durablity
            </p>
          </Link>
          <p className="py-2 font-bold text-center text-[#af4261] dark:text-[#f3ec78]">
            $23.4
          </p>

          <form
            className="flex justify-center"
            onSubmit={(e) => e.preventDefault()}
            id="numberToPurchaseForm"
          >
            <button
              type="button"
              className="bg-[#af4261] w-[25px] flex justify-center items-center rounded-md"
              onClick={() => {
                quantityToPurchase > 1 &&
                  setQuantityToPurchase(Number(quantityToPurchase) - 1);
              }}
            >
              <FaMinus />
            </button>

            <input
              onChange={(e) => {
                if (e.target.value === "0") {
                  setQuantityToPurchase(1);
                } else {
                  setQuantityToPurchase(e.target.value);
                }
              }}
              type="number"
              value={quantityToPurchase}
              max="50"
              min="1"
              required
              aria-label="Enter the number you want to purchase"
              className="mx-1 w-10 bg-[#af4261] text-xl text-center rounded-md"
            />

            <button
              type="button"
              className="bg-[#af4261] w-[25px] flex justify-center items-center rounded-md"
              onClick={() => {
                quantityToPurchase < 50 &&
                  setQuantityToPurchase(Number(quantityToPurchase) + 1);
              }}
            >
              <FaPlus />
            </button>
          </form>
        </figcaption>

        <button
          className="flex-[0_0_5%] text-xl"
          aria-label="Delete Item from Cart"
          title="Delete Item from Cart"
        >
          <AiOutlineClose />
        </button>
      </figure>
      <hr className="bg-black h-[2px] dark:bg-white" />
      <p className="text-xl text-center flex justify-between p-4">
        Cart SubTotal:{" "}
        <span className="text-[#af4261] dark:text-[#f3ec78] font-bold">
          $200
        </span>
      </p>

      <div className="flex justify-center">
        <button
          type="submit"
          form="numberToPurchaseForm"
          disabled={!currentCartInRedux.length}
          className={`py-2 text-base w-[80%]  rounded-md font-bold disabled:text-gray-400 disabled:cursor-not-allowed bg-green-500`}
        >
          Proceed to checkout
        </button>
      </div>

      <button
        className="absolute top-0 right-0"
        aria-label="Close Cart"
        title="Close Cart"
        onClick={() => {
          const theCart = document.querySelector("#shopping-cart");
          theCart.classList.toggle("translate-x-[300%]");
          theCart.classList.toggle("translate-x-[0%]");

          setOverLayForCart(false);
          setOverLayForCartOnBigScreen(false);
          addOrRemoveClassToBody();

          setTimeout(() => {
            theCart.classList.toggle("hidden");
          }, 1000);
        }}
      >
        <FaWindowClose />
      </button>
    </section>
  );
};
