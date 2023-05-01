import { useMatchMedia } from "@/customHooks/useMatchMedia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addOrRemoveClassToBody } from "@/util/addOrRemoveClassToBody";
import {
  CartOverLayforBlurringScreen,
  OverLayforBlurringScreen,
} from "@/util/OverLayforBluringScreen";
import Link from "next/link";
import { cartSelector } from "@/myReduxFiles/selectors";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/myReduxFiles/actions";
import { Cart } from "./cart";

export const Header = () => {
  const [mobileScreenMenu, setMobileScreenMenu] = useState(false);
  const [overLayForCart, setOverLayForCart] = useState(false);

  const mediumScreenAndAbove = useMatchMedia("(min-width:520px)");

  const dispatch = useDispatch();

  useEffect(() => {
    const retrievedCart = JSON.parse(localStorage.getItem("myCart")) || [];
    dispatch(cartAction(retrievedCart));
  }, []);

  const noOfItemsInCart = useSelector(cartSelector);

  return (
    <>
      {/* NOTE: FOR BIGGER SCREENS */}

      {mediumScreenAndAbove ? (
        <header
          className="left-0 right-0 bg-white dark:bg-black"
          id="headerWrapper"
        >
          <div className="p-7">
            <div className=" flex text-3xl items-center justify-between relative">
              <Link
                href="/"
                className="pr-4 font-bold tracking-[-0.12em] text-4xl"
                id="logo"
              >
                udohs
              </Link>

              <Link
                href="#"
                className="absolute left-[100px] bottom-0 font-bold border border-r-emerald-700 bg-emerald-700 box rounded-md p-1 text-xs opacity-0 w-0 overflow-hidden h-0 focus:opacity-100 focus:w-auto focus:h-auto"
              >
                Skip Navigation
              </Link>
              <nav>
                <ul className="flex items-center">
                  <div className="hidden md:flex items-center text-sm justify-between font-bold pr-8">
                    <li className="border-[3px] w-28 dark:border-white border-black ">
                      <Link
                        href="/ProductDisplayPage/men"
                        className="dark:hover:bg-[#695b09] hover:bg-[#e2cc50] w-[100%] px-4 py-2  flex justify-center "
                      >
                        MEN
                      </Link>
                    </li>
                    <li className="border-[3px] w-28 dark:border-white border-black mx-5">
                      <Link
                        href="/ProductDisplayPage/women"
                        className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]"
                      >
                        WOMEN
                      </Link>
                    </li>
                    <li className=" border-[3px] w-28 dark:border-white border-black">
                      <Link
                        href="/ProductDisplayPage/children"
                        className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]"
                      >
                        CHILDREN
                      </Link>
                    </li>
                  </div>

                  <li className="px-4 group relative">
                    <span className="absolute text-base bottom-6 left-8 bg-green-500 rounded-full w-6 h-6 text-center flex items-center justify-center">
                      {noOfItemsInCart.length}
                    </span>
                    <button>
                      <AiOutlineShoppingCart className="group-hover:text-[#e2cc50]" />
                    </button>
                  </li>
                  <li className="px-4 group">
                    <button>
                      <FaUser className="group-hover:text-[#e2cc50]" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <ul className="flex items-center pt-5 text-sm justify-between font-bold">
              <li className="pr-4 w-[250px] ">
                <Link
                  href="/AboutUs"
                  className=" bg-black text-white rounded-[27px] border-[2px] px-4 py-3 border-black dark:border-white hover:text-[#af4261]"
                >
                  ABOUT US
                </Link>
              </li>
              <li className=" relative w-[70%] rounded-3xl border-[3px] border-black">
                <input
                  type="search"
                  placeholder="search..."
                  className="dark:text-black rounded-3xl w-[100%]"
                />
                <button
                  type="button"
                  className="absolute text-2xl top-0 right-0 bottom-0"
                >
                  <FaSearch color="black" />
                </button>
              </li>
              <li className="pl-4 w-[250px] flex justify-end ">
                <Link
                  href="/Contact"
                  className="bg-black text-white rounded-[27px] border-[2px] px-4 py-3 border-black dark:border-white hover:text-[#af4261]"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>

            <ul className="md:hidden flex items-center text-sm justify-between font-bold pt-5">
              <li className="border-[3px] w-36 dark:border-white border-black ">
                <Link
                  href="/ProductDisplayPage/men"
                  className="dark:hover:bg-[#695b09] hover:bg-[#e2cc50] w-[100%] px-4 py-2  flex justify-center "
                >
                  MEN
                </Link>
              </li>
              <li className="border-[3px] w-36 dark:border-white border-black">
                <Link
                  href="/ProductDisplayPage/women"
                  className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]"
                >
                  WOMEN
                </Link>
              </li>
              <li className=" border-[3px] w-36 dark:border-white border-black">
                <Link
                  href="/ProductDisplayPage/children"
                  className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]"
                >
                  CHILDREN
                </Link>
              </li>
            </ul>
          </div>
          <hr className="bg-black h-[7px] dark:bg-white" />
        </header>
      ) : (
        // {/* NOTE: FOR SMALLER SCREENS */}
        <header
          className="bg-white dark:bg-black relative z-10"
          id="headerWrapper"
        >
          <div className="flex justify-between p-4 items-center text-3xl relative">
            <div className="flex items-center">
              <button
                className="block pr-3 text-4xl "
                onClick={() => {
                  setMobileScreenMenu(true);
                  addOrRemoveClassToBody();
                }}
              >
                <GiHamburgerMenu />
              </button>
              <Link
                href="/"
                className="pr-4 font-bold tracking-[-0.12em] text-4xl"
                id="logo"
              >
                udohs
              </Link>
            </div>

            <>
              {mobileScreenMenu && (
                <nav>
                  <OverLayforBlurringScreen
                    stateToLinkWithOverlay={mobileScreenMenu}
                    setStateToLinkWithOverlay={setMobileScreenMenu}
                  />

                  <ul className="fixed left-0 top-0 bg-white dark:bg-black w-[90%] p-5 text-sm h-[100vh] flex flex-col overflow-auto z-10">
                    <li className=" border-2 rounded-2xl w-[90%]  mb-8">
                      <Link
                        href="/ProductDisplayPage/men"
                        onClick={() => {
                          setMobileScreenMenu(false);
                          addOrRemoveClassToBody();
                        }}
                        className=" py-4 flex justify-center"
                      >
                        SHOP MEN
                      </Link>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <Link
                        href="/ProductDisplayPage/women"
                        onClick={() => {
                          setMobileScreenMenu(false);
                          addOrRemoveClassToBody();
                        }}
                        className=" py-4 flex justify-center"
                      >
                        SHOP WOMEN
                      </Link>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <Link
                        href="/ProductDisplayPage/children"
                        onClick={() => {
                          setMobileScreenMenu(false);
                          addOrRemoveClassToBody();
                        }}
                        className=" py-4 flex justify-center"
                      >
                        SHOP CHILDREN
                      </Link>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <Link
                        href="/AboutUs"
                        onClick={() => {
                          setMobileScreenMenu(false);
                          addOrRemoveClassToBody();
                        }}
                        className=" py-4 flex justify-center"
                      >
                        ABOUT US
                      </Link>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <Link
                        href="/Contact"
                        onClick={() => {
                          setMobileScreenMenu(false);
                          addOrRemoveClassToBody();
                        }}
                        className=" py-4 flex justify-center"
                      >
                        CONTACT US
                      </Link>
                    </li>
                    <button
                      className=" absolute top-0 right-0 text-[2.7rem]"
                      onClick={() => {
                        setMobileScreenMenu(false);
                        addOrRemoveClassToBody();
                      }}
                    >
                      <FaWindowClose />
                    </button>
                  </ul>
                </nav>
              )}
            </>

            {overLayForCart && (
              <div
                onClick={() => {
                  const theCart = document.querySelector("#shopping-cart");
                  theCart.classList.toggle("translate-x-[300%]");
                  theCart.classList.toggle("translate-x-[0%]");

                  setTimeout(() => {
                    theCart.classList.toggle("hidden");
                  }, 1000);
                }}
              >
                <OverLayforBlurringScreen
                  stateToLinkWithOverlay={overLayForCart}
                  setStateToLinkWithOverlay={setOverLayForCart}
                />
              </div>
            )}

            <ul className="flex items-center">
              <button type="button" className="block py-3">
                <FaSearch />
              </button>
              <li className="relative">
                <span className="absolute text-base bottom-6 left-8 bg-green-500 rounded-full w-6 h-6 text-center flex items-center justify-center z-[1] pointer-events-none">
                  {noOfItemsInCart.length}
                </span>

                <button
                  className="block p-3 relative"
                  onClick={() => {
                    const theCart = document.querySelector("#shopping-cart");
                    theCart.classList.toggle("hidden");

                    setTimeout(() => {
                      theCart.classList.toggle("translate-x-[300%]");
                      theCart.classList.toggle("translate-x-[0%]");
                    }, 0.005);

                    setTimeout(() => {
                      setOverLayForCart(true);
                      addOrRemoveClassToBody();
                    }, 500);
                  }}
                >
                  <AiOutlineShoppingCart />
                </button>

                <Cart setOverLayForCart={setOverLayForCart} />
              </li>
              <li>
                <button className="block py-3">
                  <FaUser />
                </button>
              </li>
            </ul>
          </div>
          <hr className="bg-black h-[7px] dark:bg-white" />
        </header>
      )}
    </>
  );
};
