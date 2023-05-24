import { cartSelector } from "@/myReduxFiles/selectors";
import { getNumberOfEachItemInCart } from "@/util/getNumberOfEachItemInCart";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

export const CartItemsToDisplayByTheSide = () => {
  // Get Items in cart
  const itemsInCart = useSelector(cartSelector);

  // Get the total Price
  const priceReducer = itemsInCart.reduce((accumulatedVal, currentVal) => {
    const thePrice = currentVal.price.slice(1);
    return accumulatedVal + Number(thePrice);
  }, 0);

  // Get and store the map() for each items in the cart, for display by the right hand side on bigger screens
  const [mappedItemsInCart, setMappedItemsInCart] = useState(null);

  useEffect(() => {
    const result = getNumberOfEachItemInCart(itemsInCart);
    setMappedItemsInCart(result);
  }, [itemsInCart]);

  const theCartItems = [];

  return (
    <>
      <div className="flex justify-between text-xl border-b-2 py-3 border-b-black dark:border-b-white">
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

      <div>
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
    </>
  );
};
