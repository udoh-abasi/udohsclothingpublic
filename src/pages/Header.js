import { useMatchMedia } from "@/customHooks/useMatchMedia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { addOrRemoveClassToBody } from "@/util/addOrRemoveClassToBody";
import { OverLayforBlurringScreen } from "@/util/OverLayforBluringScreen";

export const Header = () => {
  const [mobileScreenMenu, setMobileScreenMenu] = useState(false);
  const mobileScreen = useMatchMedia("(max-width:519px)");
  const mediumScreenOnly = useMatchMedia(
    "(min-width:451px) and (max-width:991px)"
  );
  const mediumScreenAndAbove = useMatchMedia("(min-width:520px)");
  const largeScreen = useMatchMedia("(min-width:992px)");

  return (
    <>
      {/* NOTE: FOR BIGGER SCREENS */}

      {mediumScreenAndAbove ? (
        <header
          className=" fixed left-0 right-0 bg-white dark:bg-black"
          id="headerWrapper"
        >
          <div className="p-7">
            <div className=" flex text-3xl items-center justify-between relative">
              <h1
                className="pr-4 font-bold tracking-[-0.12em] text-4xl"
                id="logo"
              >
                udohs
              </h1>

              <a
                href="#"
                className="absolute left-[100px] bottom-0 font-bold border border-r-emerald-700 bg-emerald-700 box rounded-md p-1 text-xs opacity-0 w-0 overflow-hidden h-0 focus:opacity-100 focus:w-auto focus:h-auto"
              >
                Skip Navigation
              </a>
              <nav>
                <ul className="flex items-center">
                  <div className="hidden md:flex items-center text-sm justify-between font-bold pr-8">
                    <li className="border-[3px] w-28 dark:border-white border-black ">
                      <a className="dark:hover:bg-[#695b09] hover:bg-[#e2cc50] w-[100%] px-4 py-2  flex justify-center ">
                        MEN
                      </a>
                    </li>
                    <li className="border-[3px] w-28 dark:border-white border-black mx-5">
                      <a className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]">
                        WOMEN
                      </a>
                    </li>
                    <li className=" border-[3px] w-28 dark:border-white border-black">
                      <a className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]">
                        CHILDREN
                      </a>
                    </li>
                  </div>

                  <li className="px-4 group">
                    <a className="">
                      <AiOutlineShoppingCart className="group-hover:text-[#e2cc50]" />
                    </a>
                  </li>
                  <li className="px-4 group">
                    <a>
                      <FaUser className="group-hover:text-[#e2cc50]" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <ul className="flex items-center pt-5 text-sm justify-between font-bold">
              <li className="pr-4 w-[250px] ">
                <a className=" bg-black text-white rounded-[27px] border-[2px] px-4 py-3 border-black dark:border-white hover:text-[#af4261]">
                  ABOUT US
                </a>
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
                <a className="bg-black text-white rounded-[27px] border-[2px] px-4 py-3 border-black dark:border-white hover:text-[#af4261]">
                  CONTACT US
                </a>
              </li>
            </ul>

            <ul className="md:hidden flex items-center text-sm justify-between font-bold pt-5">
              <li className="border-[3px] w-36 dark:border-white border-black ">
                <a className="dark:hover:bg-[#695b09] hover:bg-[#e2cc50] w-[100%] px-4 py-2  flex justify-center ">
                  MEN
                </a>
              </li>
              <li className="border-[3px] w-36 dark:border-white border-black">
                <a className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]">
                  WOMEN
                </a>
              </li>
              <li className=" border-[3px] w-36 dark:border-white border-black">
                <a className="dark:hover:bg-[#695b09] w-[100%] px-4 py-2  flex justify-center hover:bg-[#e2cc50]">
                  CHILDREN
                </a>
              </li>
            </ul>
          </div>
          <hr className="bg-black h-[7px] dark:bg-white" />
        </header>
      ) : (
        // {/* NOTE: FOR SMALLER SCREENS */}
        <header
          className="fixed left-0 right-0 bg-white dark:bg-black"
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
              <h1
                className="pr-4 font-bold tracking-[-0.12em] text-4xl"
                id="logo"
              >
                udohs
              </h1>
            </div>

            <>
              {mobileScreenMenu && (
                <nav>
                  <OverLayforBlurringScreen
                    stateToLinkWithOverlay={mobileScreenMenu}
                    setStateToLinkWithOverlay={setMobileScreenMenu}
                  />

                  <ul className="absolute left-0 top-0 bg-white dark:bg-black w-[90%] p-5 text-sm h-[100vh] flex flex-col overflow-auto">
                    <li className=" border-2 rounded-2xl w-[90%]  mb-8">
                      <a href="#" className=" py-4 flex justify-center">
                        SHOP MEN
                      </a>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <a href="" className=" py-4 flex justify-center">
                        SHOP WOMEN
                      </a>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <a href="" className=" py-4 flex justify-center">
                        SHOP CHILDREN
                      </a>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <a href="" className=" py-4 flex justify-center">
                        ABOUT US
                      </a>
                    </li>
                    <li className=" border-2 rounded-2xl w-[90%] mb-8">
                      <a href="" className=" py-4 flex justify-center">
                        CONTACT US
                      </a>
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
              <button type="button" className="block py-3">
                <FaSearch />
              </button>
              <li className="">
                <a href="#" className="block p-3">
                  <AiOutlineShoppingCart />
                </a>
              </li>
              <li>
                <a href="" className="block py-3">
                  <FaUser />
                </a>
              </li>
            </ul>
          </div>
          <hr className="bg-black h-[7px] dark:bg-white" />
        </header>
      )}
    </>
  );
};
