import { mobileScreen, useMatchMedia } from "@/customHooks/useMatchMedia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
  const mobileScreen = useMatchMedia("(max-width:450px)");
  const mediumScreenOnly = useMatchMedia(
    "(min-width:451px) and (max-width:991px)"
  );
  const mediumScreenAndAbove = useMatchMedia("(min-width:451px)");
  const largeScreen = useMatchMedia("(min-width:992px)");
  return (
    <>
      {mediumScreenAndAbove && (
        <header>
          <h1>udohs</h1>

          <a href="#">Skip Navigation</a>

          <ul>
            <li>
              <a>MEN</a>
            </li>
            <li>
              <a>WOMEN</a>
            </li>
            <li>
              <a>CHILDREN</a>
            </li>

            <li>
              <a>
                <AiOutlineShoppingCart />
              </a>
            </li>
            <li>
              <a>
                <FaUser />
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a>ABOUT US</a>
            </li>
            <li>
              <input type="search" placeholder="search cloth name..." />
              <button type="button">
                <FaSearch />
              </button>
            </li>
            <li>
              <a>CONTACT US</a>
            </li>
          </ul>
        </header>
      )}

      {mobileScreen && (
        <header>
          <GiHamburgerMenu />
          <ul>
            <li>
              <a>SHOP MEN</a>
            </li>
            <li>
              <a>SHOP WOMEN</a>
            </li>
            <li>
              <a>SHOP CHILDREN</a>
            </li>
            <li>
              <a>ABOUT US</a>
            </li>
            <li>
              <a>CONTACT US</a>
            </li>
          </ul>

          <ul>
            <button type="button">
              <FaSearch />
            </button>
            <li>
              <a>
                <AiOutlineShoppingCart />
              </a>
            </li>
            <li>
              <a>
                <FaUser />
              </a>
            </li>
          </ul>

          <h1>udohs</h1>
        </header>
      )}
    </>
  );
};
