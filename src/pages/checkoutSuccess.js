import { IoMdCheckmarkCircle } from "react-icons/io";
import Link from "next/link";
import { itemsInCartDuplicateSelector } from "@/myReduxFiles/selectors";
import { getNumberOfEachItemInCart } from "@/util/getNumberOfEachItemInCart";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Loader } from "./Loader";
import { cartAction } from "@/myReduxFiles/actions";

const CheckoutSuccess = () => {
  // Get Items in cart
  const itemsInCartDuplicate = useSelector(itemsInCartDuplicateSelector);

  const [loading, setLoading] = useState(true);

  const onFirstMount = useRef(true);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (onFirstMount.current) {
      onFirstMount.current = false;
    } else {
      if (itemsInCartDuplicate.length) {
        dispatch(cartAction([]));
        localStorage.removeItem("myCart");
        setLoading(false);
      } else {
        router.push("/");
      }
    }
  }, [itemsInCartDuplicate, router, dispatch]);

  // Get the total Price
  const priceReducer = itemsInCartDuplicate.reduce(
    (accumulatedVal, currentVal) => {
      const thePrice = currentVal.price.slice(1);
      return accumulatedVal + Number(thePrice);
    },
    0
  );

  // Get and store the map() for each items in the cart, for display by the right hand side on bigger screens
  const [mappedItemsInCart, setMappedItemsInCart] = useState(null);

  useEffect(() => {
    const result = getNumberOfEachItemInCart(itemsInCartDuplicate);
    setMappedItemsInCart(result);
  }, [itemsInCartDuplicate]);

  const theCartItems = [];

  const getSixRandomNumber = () => {
    let allNumb = "";
    for (let index = 0; index < 6; index++) {
      const randomNumber = Math.floor(Math.random() * 10);
      allNumb = allNumb + randomNumber;
    }
    return allNumb;
  };

  return (
    <>
      {loading ? (
        <div className="my-8">
          <Loader textColor="text-white" fillColor="fill-black" />
        </div>
      ) : (
        <section className="my-6">
          <div className="flex flex-col items-center">
            <IoMdCheckmarkCircle className="text-6xl text-green-400" />

            <p className="text-3xl text-center uppercase font-bold my-4">
              Thank you for your purchase
            </p>
            <p>Your order number is: {getSixRandomNumber()}</p>

            <Link
              href="/"
              className="font-bold my-4 text-white bg-green-400 py-2 px-3 rounded-xl border-0 hover:ring-2 hover:ring-black dark:hover:ring-white hover:bg-green-600"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <div className="max-w-[240px]">
              <h3 className="text-xl mt-2 self-start">Order Summary:</h3>
              {mappedItemsInCart &&
                mappedItemsInCart.forEach((value, key) => {
                  const convertedKey = JSON.parse(key);
                  const { name, image, price } = convertedKey;

                  theCartItems.push(
                    <figure
                      key={name}
                      className="grid grid-cols-2 gap-2 my-4 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] dark:shadow-[rgba(255,255,255,0.089)_0px_0px_7px_5px]"
                    >
                      <picture>
                        <source srcSet={image} />
                        <img alt={name} src={image} title={name} />
                      </picture>

                      <figcaption>
                        <p className="h-[70px] overflow-hidden">{name}</p>
                        <p className="my-4">{price}</p>
                        <p>
                          Qty:{" "}
                          <span className="border-2 border-black dark:border-white inline-block w-[50px] text-center">
                            {value}
                          </span>
                        </p>
                      </figcaption>
                    </figure>
                  );
                })}

              {theCartItems.length === 0 ? (
                <p className="text-center text-xl text-[#af4261] dark:text-[#f3ec78] my-8">
                  No item in cart
                </p>
              ) : (
                theCartItems
              )}
            </div>
          </div>

          <div className="flex justify-center font-bold text-xl py-3">
            <div className="flex justify-center w-[260px] border-t-4 border-t-black dark:border-t-white">
              <p className="mr-24">Total</p>

              <p className="text-[#af4261] dark:text-[#f3ec78]">
                $&nbsp;{priceReducer.toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CheckoutSuccess;
