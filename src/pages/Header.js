import { useMatchMedia } from "@/customHooks/useMatchMedia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaChild, FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addOrRemoveClassToBody } from "@/util/addOrRemoveClassToBody";
import { OverLayforBlurringScreen } from "@/util/OverLayforBluringScreen";
import Link from "next/link";
import { cartSelector, emailSelector } from "@/myReduxFiles/selectors";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/myReduxFiles/actions";
import { Cart } from "./cart";
import { getNumberOfEachItemInCart } from "@/util/getNumberOfEachItemInCart";
import { IoIosMan, IoIosWoman } from "react-icons/io";

import { useRouter } from "next/router";
import { signOut } from "@/util/awsFuntions";
import { useUser } from "@/customHooks/useUser";

export const Header = () => {
  const [mobileScreenMenu, setMobileScreenMenu] = useState(false);
  const [overLayForCart, setOverLayForCart] = useState(false);
  const [overLayForCartOnBigScreen, setOverLayForCartOnBigScreen] =
    useState(false);

  const [numberOfEachItemInCart, setNumberOfEachItemInCart] = useState(null);

  const mediumScreenAndAbove = useMatchMedia("(min-width:520px)");

  const dispatch = useDispatch();

  const [searchForBigScreen, setSearchForBigScreen] = useState("");

  const [searchForSmallScreen, setSearchForSmallScreen] = useState("");

  const [showSearchOnSmallScreen, setShowSearchOnSmallScreen] = useState(false);

  const itemsInCart = useSelector(cartSelector);

  // On first load, this useEffect checks the localStorage and populates our redux store with the items in cart
  useEffect(() => {
    const retrievedCart = JSON.parse(localStorage.getItem("myCart")) || [];
    dispatch(cartAction(retrievedCart));
  }, [dispatch]);

  // This useEffect imports and runs a helper function which checks the occurrence of each items, in the cart, and returns a Map(), containing an item and how many of it was added to cart
  useEffect(() => {
    const result = getNumberOfEachItemInCart(itemsInCart);
    setNumberOfEachItemInCart(result);
  }, [itemsInCart]);

  // This useEffect below Listens to when either the mobile's <nav> or the desktop's <nav> is returned, then it executes.
  // It uses the 'useMatchMedia' useEffect above, to know when to execute
  // I used it to fix the issue of the cart's overlay still displaying, when you switch from either mobile's <nav> to desktop's <nav> or the other way round

  const listenToWhenNewNavIsReturned = () => {
    setOverLayForCart(false);
    setOverLayForCartOnBigScreen(false);

    const theCart = document.querySelector("#shopping-cart");
    theCart.classList.add("hidden");

    theCart.classList.add("translate-x-[300%]");
    theCart.classList.remove("translate-x-[0%]");

    document.querySelector("body").classList.remove("menuOpen");

    setMobileScreenMenu(false); // Incase the menu for mobile was open when a new <nav> was returned, this will close it
  };

  useEffect(() => {
    listenToWhenNewNavIsReturned();
  }, [mediumScreenAndAbove]);

  // This useEffect adds an event listener that closes the <nav> (for mobile device), and the cart, when the 'esc' key on keyboard is pressed
  useEffect(() => {
    const closeNavAndCartOnEscapeKeyPress = () => {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          listenToWhenNewNavIsReturned();

          document.activeElement.blur(); // This was added especially, to make the search box for mobile lose focus. It just makes the currently active element on the screen to lose focus
        }
      });

      return document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          listenToWhenNewNavIsReturned();
        }
      });
    };

    closeNavAndCartOnEscapeKeyPress();
  }, []);

  const router = useRouter();

  const user = useUser();

  const email = useSelector(emailSelector);

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

              <a
                href="#hr"
                className="absolute left-[100px] bottom-0 font-bold border border-r-emerald-700 bg-emerald-700 box rounded-md p-1 text-xs opacity-0 w-0 overflow-hidden h-0 focus:opacity-100 focus:w-auto focus:h-auto"
              >
                Skip Navigation
              </a>
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
                    <span className="absolute text-base bottom-6 left-8 bg-green-500 rounded-full w-6 h-6 text-center flex items-center justify-center z-[1] pointer-events-none">
                      {itemsInCart.length}
                    </span>

                    {overLayForCartOnBigScreen && (
                      <div
                        className="relative z-[3]"
                        onClick={() => {
                          const theCart =
                            document.querySelector("#shopping-cart");

                          theCart.classList.toggle("translate-x-[300%]");
                          theCart.classList.toggle("translate-x-[0%]");

                          setTimeout(() => {
                            theCart.classList.toggle("hidden");
                          }, 1000);
                        }}
                      >
                        <OverLayforBlurringScreen
                          stateToLinkWithOverlay={overLayForCartOnBigScreen}
                          setStateToLinkWithOverlay={
                            setOverLayForCartOnBigScreen
                          }
                        />
                      </div>
                    )}

                    <button
                      className="relative group-hover:text-[#e2cc50]"
                      id="CartButton"
                      onClick={() => {
                        const theCart =
                          document.querySelector("#shopping-cart");
                        theCart.classList.toggle("hidden");

                        setTimeout(() => {
                          theCart.classList.toggle("translate-x-[300%]");
                          theCart.classList.toggle("translate-x-[0%]");
                        }, 0.005);

                        setTimeout(() => {
                          setOverLayForCartOnBigScreen(true);
                          addOrRemoveClassToBody();
                        }, 500);
                      }}
                    >
                      <AiOutlineShoppingCart />
                    </button>
                  </li>
                  <Cart
                    setOverLayForCart={setOverLayForCart}
                    setOverLayForCartOnBigScreen={setOverLayForCartOnBigScreen}
                    numberOfEachItemInCart={numberOfEachItemInCart}
                  />

                  <li className="px-4 relative group" tabIndex={0}>
                    <div className="hidden group-hover:block group-focus-within:block absolute p-1 rounded-xl bg-white text-black border-black dark:border-white top-9 right-0">
                      {email ? (
                        <>
                          <p className="text-xs break-words w-[60px] mb-2">
                            {email}
                          </p>
                          <button
                            type="button"
                            onClick={() => signOut(router)}
                            className="block border-2 w-[60px] rounded-xl leading-5 font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] text-[0.7rem]"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="block border-2 w-[60px] rounded-xl leading-5 font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] text-[0.7rem]"
                          onClick={() => {
                            router.push("/checkout");
                          }}
                        >
                          Login
                        </button>
                      )}
                    </div>
                    <button type="button" tabIndex={1}>
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/search?searchTerm=${searchForBigScreen}`);
                    setSearchForBigScreen("");
                  }}
                >
                  <input
                    type="search"
                    placeholder="search..."
                    required
                    className="dark:text-black rounded-3xl w-[100%]"
                    value={searchForBigScreen}
                    onChange={(e) => setSearchForBigScreen(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute text-2xl top-0 right-0 bottom-0"
                  >
                    <FaSearch color="black" />
                  </button>
                </form>
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
          <hr className="bg-black h-[7px] dark:bg-white" id="hr" />
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
                        className=" py-4 flex justify-center items-center"
                      >
                        <IoIosMan className="text-xl" /> SHOP MEN
                      </Link>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <Link
                        href="/ProductDisplayPage/women"
                        onClick={() => {
                          setMobileScreenMenu(false);
                          addOrRemoveClassToBody();
                        }}
                        className=" py-4 flex justify-center items-center"
                      >
                        <IoIosWoman className="text-xl" /> SHOP WOMEN
                      </Link>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <Link
                        href="/ProductDisplayPage/children"
                        onClick={() => {
                          setMobileScreenMenu(false);
                          addOrRemoveClassToBody();
                        }}
                        className=" py-4 flex justify-center items-center"
                      >
                        <FaChild className="text-lg" /> SHOP CHILDREN
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

            <ul className="flex items-center">
              <div
                onFocus={() => {
                  setShowSearchOnSmallScreen(true);
                }}
                onBlur={() => {
                  setShowSearchOnSmallScreen(false);
                }}
              >
                <button type="button" className="block py-3">
                  <FaSearch />
                </button>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/search?searchTerm=${searchForSmallScreen}`);
                    setSearchForSmallScreen("");
                    document.activeElement.blur();
                  }}
                  className={`fixed w-full left-0 ${
                    showSearchOnSmallScreen ? "top-4" : "top-[-100px] "
                  } z-[100] transition-all ease-linear duration-[300ms]`}
                >
                  <input
                    type="search"
                    placeholder="search..."
                    required
                    className="dark:text-black rounded-3xl w-[100%] text-sm h-[40px]"
                    value={searchForSmallScreen}
                    onChange={(e) => setSearchForSmallScreen(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute text-2xl top-0 right-0 bottom-0"
                  >
                    <FaSearch color="black" />
                  </button>

                  <button
                    className=" absolute top-[-15px] right-2 text-xl"
                    type="button"
                    onClick={() => {
                      setShowSearchOnSmallScreen(false);
                    }}
                  >
                    <FaWindowClose />
                  </button>
                </form>
              </div>

              <li className="relative">
                <span className="absolute text-base bottom-6 left-8 bg-green-500 rounded-full w-6 h-6 text-center flex items-center justify-center z-[1] pointer-events-none">
                  {itemsInCart.length}
                </span>

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
                <button
                  className="block p-3 relative"
                  id="CartButton"
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

                <Cart
                  setOverLayForCart={setOverLayForCart}
                  setOverLayForCartOnBigScreen={setOverLayForCartOnBigScreen}
                  numberOfEachItemInCart={numberOfEachItemInCart}
                />
              </li>
              <li className="relative group" tabIndex={0}>
                <div className="hidden group-hover:block group-focus-within:block absolute p-1 rounded-xl bg-white text-black border-black dark:border-white top-12 right-0">
                  {email ? (
                    <>
                      <p className="text-xs break-words w-[60px] mb-2">
                        {email}
                      </p>
                      <button
                        type="button"
                        onClick={() => signOut(router)}
                        className="block border-2 w-[60px] rounded-xl leading-5 font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] text-[0.7rem]"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="block border-2 w-[60px] rounded-xl leading-5 font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] text-[0.7rem]"
                      onClick={() => {
                        router.push("/checkout");
                      }}
                    >
                      Login
                    </button>
                  )}
                </div>

                <button className="block py-3" tabIndex={1}>
                  <FaUser />
                </button>
              </li>
            </ul>
          </div>
          <hr className="bg-black h-[7px] dark:bg-white" id="hr" />
        </header>
      )}
    </>
  );
};
