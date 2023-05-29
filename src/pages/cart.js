import {
  cartSelector,
  emailSelector,
  guestDataSelector,
} from "@/myReduxFiles/selectors";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { addOrRemoveClassToBody } from "@/util/addOrRemoveClassToBody";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/myReduxFiles/actions";
import { useRouter } from "next/router";
import { useUser } from "@/customHooks/useUser";

export const Cart = ({
  setOverLayForCart,
  setOverLayForCartOnBigScreen,
  numberOfEachItemInCart,
}) => {
  const currentCartInRedux = useSelector(cartSelector);

  const priceReducer = currentCartInRedux.reduce(
    (accumulatedVal, currentVal) => {
      const thePrice = currentVal.price.slice(1);
      return accumulatedVal + Number(thePrice);
    },
    0
  );

  const theCartElements = []; // NOTE: Since, 'new Map()' does not support the array's map()  method, we used forEach to loop through our Map(), and then pushed the result here, then displayed this in our code

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useUser();

  const guestInfo = useSelector(guestDataSelector);
  const email = useSelector(emailSelector);

  return (
    <section
      id="shopping-cart"
      className="fixed top-1 right-1 min-[520px]:z-[3] bg-white dark:bg-black w-[85vw] h-[100vh] overflow-auto z-[2] translate-x-[300%] hidden max-w-[400px] pb-8"
    >
      <h3 className="text-xl text-center mt-5  font-bold uppercase">
        Shopping Cart ({currentCartInRedux.length})
      </h3>

      {numberOfEachItemInCart &&
        numberOfEachItemInCart.forEach((value, key) => {
          const convertedKey = JSON.parse(key);
          const { id, category, name, image, price } = convertedKey;

          theCartElements.push(
            <figure
              className="flex justify-between p-4 items-center"
              key={name}
            >
              <Link
                href={`/ProductPage/${id}?category=${category}`}
                className="flex-[0_0_30%] max-w-[120px]"
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
                <picture>
                  <source srcSet={image} />
                  <img alt={name} src={image} />
                </picture>
              </Link>

              <figcaption className="flex-[0_0_55%] text-base">
                <Link
                  href={`/ProductPage/${id}?category=${category}`}
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
                  <p className="h-[44px] overflow-hidden">{name}</p>
                </Link>
                <p className="py-2 font-bold text-center text-[#af4261] dark:text-[#f3ec78]">
                  {price}
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
                      // This removes the last element added
                      if (value !== 1) {
                        const newArray = [...currentCartInRedux]; // This line was added bcoz next will not allow you modify the original array

                        const theReversedIndex = newArray
                          .reverse()
                          .findIndex((eachCloth) => eachCloth.id === id);

                        const theIndex = newArray.length - 1 - theReversedIndex; // This is how we get the last index

                        const newcurrentArray = [...currentCartInRedux];
                        newcurrentArray.splice(theIndex, 1);

                        dispatch(cartAction(newcurrentArray));
                        localStorage.setItem(
                          "myCart",
                          JSON.stringify(newcurrentArray)
                        );
                      }
                    }}
                  >
                    <FaMinus />
                  </button>

                  <input
                    disabled
                    type="number"
                    value={value}
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
                      if (value < 50) {
                        const theCart =
                          JSON.parse(localStorage.getItem("myCart")) || [];
                        localStorage.setItem(
                          "myCart",
                          JSON.stringify([...theCart, convertedKey])
                        );
                        dispatch(
                          cartAction([...currentCartInRedux, convertedKey])
                        );
                      }
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
                onClick={() => {
                  const newcurrentArray = [...currentCartInRedux];
                  const filteredArray = newcurrentArray.filter(
                    (eachCloth) => eachCloth.id !== id
                  );

                  localStorage.setItem(
                    "myCart",
                    JSON.stringify([...filteredArray])
                  );

                  dispatch(cartAction([...filteredArray]));
                }}
              >
                <AiOutlineClose />
              </button>
            </figure>
          );
        })}

      {theCartElements.length === 0 ? (
        <p className="text-center text-xl text-[#af4261] dark:text-[#f3ec78] my-8">
          No item in cart
        </p>
      ) : (
        theCartElements
      )}

      <hr className="bg-black h-[2px] dark:bg-white" />

      <p className="text-xl flex justify-around items-center p-4">
        Cart&nbsp;Subtotal:
        <span className="text-[#af4261] dark:text-[#f3ec78] font-bold">
          $&nbsp;{priceReducer.toFixed(2)}
        </span>
      </p>

      <div className="flex justify-center">
        <button
          type="submit"
          form="numberToPurchaseForm"
          disabled={!currentCartInRedux.length}
          className={`py-2 text-base w-[80%] rounded-md font-bold disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-500`}
          onClick={() => {
            const theCart = document.querySelector("#shopping-cart");
            theCart.classList.toggle("translate-x-[300%]");
            theCart.classList.toggle("translate-x-[0%]");

            setOverLayForCart(false);
            setOverLayForCartOnBigScreen(false);
            addOrRemoveClassToBody();

            if (guestInfo) {
              router.push("/payment-and-summary?status=guest");
            } else if (email) {
              router.push("/payment-and-summary");
            } else {
              router.push("/checkout");
            }

            setTimeout(() => {
              theCart.classList.toggle("hidden");
            }, 1000);
          }}
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
