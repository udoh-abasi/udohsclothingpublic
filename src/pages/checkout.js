import { cartSelector } from "@/myReduxFiles/selectors";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  MdOutlineRadioButtonUnchecked,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { BsCheck2Circle, BsCheck2Square } from "react-icons/bs";
import { useSelector } from "react-redux";
import { CountryStateCity } from "./countryStateCity";
import Link from "next/link";

export const CheckOutPage = () => {
  // Get Items in cart
  const itemsInCart = useSelector(cartSelector);

  // Get the total Price
  const priceReducer = itemsInCart.reduce((accumulatedVal, currentVal) => {
    const thePrice = currentVal.price.slice(1);
    return accumulatedVal + Number(thePrice);
  }, 0);

  const [checkoutOption, setCheckoutOption] = useState("guest");
  const [keepMeUpToDate, setKeepMeUpToDate] = useState(true);

  return (
    <section className="p-4">
      <div className="flex text-xs">
        <p className="bg-green-500 text-white flex items-center justify-center font-bold p-2 rounded-2xl flex-[1_0_120px] mr-2">
          <span className="flex justify-center items-center mr-2 bg-white text-black rounded-full w-[23px] h-[23px] ">
            1
          </span>
          Shipping
        </p>

        <p className="bg-[gray] text-white flex items-center justify-center font-bold p-2 rounded-2xl flex-[1_0_120px]">
          <span className="flex justify-center items-center mr-2 bg-white text-black rounded-full w-[23px] h-[23px] ">
            2
          </span>
          <span className="whitespace-nowrap overflow-hidden text-clip">
            Review & Payment
          </span>
        </p>
      </div>

      <h2 className="text-center my-4 text-2xl font-bold">Shipping Address</h2>

      <div className="flex justify-between text-xl border-y-2 py-3 border-y-black dark:border-y-white">
        <div className="font-bold">
          <p>Estimated Total</p>
          <p className="text-[#af4261] dark:text-[#f3ec78]">
            $&nbsp;{priceReducer.toFixed(2)}
          </p>
        </div>

        <div>
          <button
            className="block p-3 relative"
            onClick={() => {
              const cartButton = document.querySelector("#CartButton");
              cartButton.click();
            }}
            title="View your shopping Cart"
          >
            <AiOutlineShoppingCart className="text-4xl" />
            <span className="absolute text-base bottom-9 left-8 bg-green-500 rounded-full w-6 h-6 text-center flex items-center justify-center z-[1] pointer-events-none">
              {itemsInCart.length}
            </span>
          </button>
        </div>
      </div>

      <form className="flex flex-col mb-2 mt-8 font-bold justify-between min-[580px]:flex-row min-[580px]:justify-around border-b-2 pb-6">
        <div className="relative mb-3">
          <div className="absolute left-0">
            {checkoutOption === "login" ? (
              <BsCheck2Circle className="text-2xl pointer-events-none font-bold" />
            ) : (
              <MdOutlineRadioButtonUnchecked className="text-2xl pointer-events-none" />
            )}
          </div>
          <input
            type="radio"
            id="checkoutOption1"
            name="checkoutOption"
            className="w-[20px] h-[20px] opacity-0"
            onChange={() => setCheckoutOption("login")}
          />
          <label htmlFor="checkoutOption1" className="ml-2">
            Login to Checkout.
            <small className="text-gray-400"> (This option is faster)</small>
          </label>
        </div>

        <div className="relative">
          <div className="absolute left-0 text-black dark:text-white">
            {checkoutOption === "guest" ? (
              <BsCheck2Circle className="text-2xl pointer-events-none font-bold" />
            ) : (
              <MdOutlineRadioButtonUnchecked className="text-2xl pointer-events-none " />
            )}
          </div>
          <input
            type="radio"
            id="checkoutOption2"
            name="checkoutOption"
            className="w-[20px] h-[20px] opacity-0"
            onChange={() => setCheckoutOption("guest")}
          />
          <label htmlFor="checkoutOption2" className="ml-2">
            Checkout as guest.
          </label>
        </div>
      </form>

      <section
        className={`${checkoutOption === "guest" && "flex"} justify-center`}
      >
        {checkoutOption === "guest" ? (
          <div className="max-w-[400px] min-[580px]:max-w-[90%]">
            <h3 className="text-center my-4 text-xl font-bold">
              Checkout as Guest
            </h3>

            <form onSubmit={(e) => e.preventDefault()} className="pb-6">
              <div className="flex flex-col-reverse pb-4">
                <input
                  type="email"
                  id="guestEmail"
                  required
                  placeholder=" "
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2"
                />
                <label htmlFor="guestEmail" className="block ">
                  Email
                </label>
              </div>

              <div className="pb-4 relative ">
                <div className="absolute text-xl top-1 text-black dark:text-white">
                  {keepMeUpToDate ? (
                    <BsCheck2Square />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </div>

                <input
                  type="checkbox"
                  id="keepMeUpToDate"
                  required
                  defaultChecked
                  className="w-[20px] h-[20px] opacity-0"
                  onChange={() => setKeepMeUpToDate(!keepMeUpToDate)}
                />

                <label htmlFor="keepMeUpToDate" className="text-sm ml-2">
                  Keep me up to date on new and exciting offers
                </label>
              </div>

              <button
                type="submit"
                className="relative flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-white dark:text-white border-2 rounded-full group w-full justify-center"
              >
                <span className="absolute left-0 block w-full transition-all bg-[#af4261] opacity-100 h-full top-0"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Verify Email</span>
              </button>
            </form>

            <form onSubmit={(e) => e.preventDefault()} className="pb-8 pt-3">
              <fieldset className="border-2 border-black dark:border-white p-6 rounded-3xl">
                <legend className="ml-3 px-1 font-bold">Verify Email</legend>

                <p className="pb-3">
                  To verify that this is your email, please enter the
                  verification code sent to{" "}
                  <span className="underline "> udoh@gmail.com</span>
                </p>

                <div className="flex flex-col-reverse">
                  <input
                    type="text"
                    id="verifiCationCode"
                    required
                    placeholder=" "
                    className="dark:text-black block w-full rounded-xl p-1 border-black border-2"
                  />

                  <label htmlFor="verifiCationCode" className="block">
                    Verification code
                  </label>
                </div>

                <button
                  type="submit"
                  className="my-6 text-center border-2 w-full py-2 rounded-full font-bold bg-green-500 text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms]"
                >
                  Submit Code
                </button>

                <button
                  type="submit"
                  className="text-center border-2 w-[150px] py-2 rounded-full font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms]"
                >
                  Resend Code
                </button>
              </fieldset>
            </form>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col-reverse mb-4">
                <input
                  type="text"
                  id="yourName"
                  required
                  placeholder=" "
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2"
                />
                <label htmlFor="yourName" className="block">
                  Name
                </label>
              </div>

              <div className="">
                <CountryStateCity />
              </div>

              <div className="flex flex-col-reverse mb-4">
                <input
                  type="text"
                  id="streetAddress"
                  required
                  placeholder=" "
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 "
                />
                <label htmlFor="streetAddress" className="block">
                  Street Address
                </label>
              </div>

              <div className="flex flex-col-reverse mb-8">
                <input
                  type="text"
                  id="phoneNumber"
                  required
                  placeholder=" "
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2"
                />
                <label htmlFor="phoneNumber" className="block">
                  Phone Number
                </label>
              </div>

              <button
                type="submit"
                className="mb-8 font-bold relative flex items-center px-12 py-2 overflow-hidden text-lg text-white dark:text-white border-2 rounded-full group w-full justify-center "
              >
                <span className="absolute left-0 block w-full transition-all bg-[#af4261] opacity-100 h-full top-0"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">NEXT</span>
              </button>
            </form>
          </div>
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-[#af4261] rounded-2xl shadow-[0px_5px_15px_rgba(0,0,0,0.35)] min-[650px]:m-8"
          >
            <h3 className="text-center my-4 text-2xl font-bold text-white pt-4">
              Login
            </h3>

            <div
              className="bg-white text-black py-16 rounded-2xl p-2 min-[490px]:px-8"
              id="loginWrapper"
            >
              <div className="mb-8 relative">
                <input
                  id="loginEmail"
                  type="email"
                  required
                  placeholder=" "
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                />
                <label
                  htmlFor="loginEmail"
                  className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                >
                  Email
                </label>
              </div>

              <div className="relative mb-4">
                <input
                  id="loginPassword"
                  type="password"
                  required
                  placeholder=" "
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                />
                <label
                  htmlFor="loginPassword"
                  className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                >
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="my-6 text-center border-2 w-full py-2 rounded-full font-bold bg-[#af4261] text-white hover:bg-black hover:text-white transition-all ease-linear duration-[300ms]"
              >
                Login
              </button>

              <Link href="#_" className="text-center block underline">
                Don&apos;t have an account&#x3f; Sign Up
              </Link>
            </div>
          </form>
        )}
      </section>
    </section>
  );
};

export default CheckOutPage;
