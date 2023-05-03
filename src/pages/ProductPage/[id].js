import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDetectScroll } from "@smakss/react-scroll-direction";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { cartSelector } from "@/myReduxFiles/selectors";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/myReduxFiles/actions";

export const ProductPage = () => {
  const [singleCloth, setsingleCloth] = useState("");
  const [entireCloth, setEntireCloth] = useState("");
  const [clothState, setClothState] = useState("");
  const [shuffledCloth, setShuffledCloth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showItemAddedToCart, setShowItemAddedToCart] = useState(false);

  const router = useRouter();

  const getShuffledList = useCallback((theArray, numberOfItemsTOReturn) => {
    const shuffled = theArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfItemsTOReturn);
  }, []);

  useEffect(() => {
    const fetchData = async (category, id) => {
      try {
        const response = await fetch(`/api/getData/${category}`);
        if (response.ok) {
          const data = await response.json();

          setEntireCloth(data.theData);

          const singleClothData = data.theData.find(
            (eachCloth) => eachCloth.id === id
          );
          if (!singleClothData) {
            setLoading(false);
            setError(true);
            return;
          }

          setsingleCloth(singleClothData);
          setShuffledCloth(getShuffledList(data.theData, 6));
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(true);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (router.isReady) {
      const { query } = router;
      const { category, id } = query;
      setClothState(category);

      fetchData(category, id);
    }
  }, [router, getShuffledList]);

  const [quantityToPurchase, setQuantityToPurchase] = useState(1);

  // This resets the quantityToPurchase Field, when the user clicks on a new cloth
  useEffect(() => {
    setQuantityToPurchase(1);
  }, [singleCloth]);

  const [scrollDir] = useDetectScroll({});
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setCurrentScrollPosition(window.scrollY);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setCurrentScrollPosition(window.scrollY);
      });
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const retrievedCart = JSON.parse(localStorage.getItem("myCart")) || [];
    dispatch(cartAction(retrievedCart));
  }, [dispatch]);

  const currentCartInRedux = useSelector(cartSelector);

  const addItemToCart = (cloth) => {
    if (
      quantityToPurchase &&
      Number(quantityToPurchase) > 0 &&
      Number(quantityToPurchase) < 51
    ) {
      const noOfItemsNeeded = Number(quantityToPurchase);
      const newClothArray = [];
      for (let index = 0; index < noOfItemsNeeded; index++) {
        newClothArray.push(cloth);
      }

      const theCart = JSON.parse(localStorage.getItem("myCart")) || [];
      localStorage.setItem(
        "myCart",
        JSON.stringify([...theCart, ...newClothArray])
      );

      dispatch(cartAction([...currentCartInRedux, ...newClothArray]));

      setShowItemAddedToCart(true);
      setTimeout(() => {
        setShowItemAddedToCart(false);
      }, 5000);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <>Page does Not Exist</>;
  } else {
    return (
      <section className="grid place-items-center p-8">
        <figure className="flex flex-col min-[710px]:flex-row min-[980px]:w-[80%]">
          <picture className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] dark:shadow-[rgba(255,255,255,0.089)_0px_0px_7px_5px]">
            <source srcSet={`${singleCloth.image}`} />
            <img
              src={`${singleCloth.image}`}
              alt={`${singleCloth.name}`}
              loading="lazy"
              className="w-full min-[900px]:max-h-[601px]"
            />
          </picture>

          <figcaption className="p-4 min-[571px]:p-8">
            <p className="text-xl min-[571px]:text-2xl min-[710px]:mt-8 min-[710px]:max-w-[500px]">
              {singleCloth.name}
            </p>
            <p className="pb-6 pt-3 text-2xl min-[571px]:text-3xl font-bold text-[#af4261] dark:text-[#f3ec78] min-[710px]:my-8">
              {singleCloth.price}
            </p>

            <form
              className="flex"
              onSubmit={(e) => e.preventDefault()}
              id="numberToPurchaseForm"
            >
              <button
                type="button"
                className="p-4 bg-[#af4261] rounded-2xl"
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
                required
                max="50"
                min="1"
                aria-label="Enter the number you want to purchase"
                className="mx-1 w-14 rounded-2xl bg-[#af4261] text-2xl text-center"
              />

              <button
                type="button"
                className="p-4 bg-[#af4261] rounded-2xl"
                onClick={() => {
                  quantityToPurchase < 50 &&
                    setQuantityToPurchase(Number(quantityToPurchase) + 1);
                }}
              >
                <FaPlus />
              </button>
            </form>
            <button
              form="numberToPurchaseForm"
              type="submit"
              disabled={!quantityToPurchase}
              className={`p-4 w-[100%] mt-8 rounded-xl uppercase font-bold disabled:text-gray-400 disabled:cursor-not-allowed ${
                showItemAddedToCart ? " bg-[#af4261]" : "bg-green-500"
              }`}
              onClick={() => addItemToCart(singleCloth)}
            >
              {showItemAddedToCart ? (
                <span className="flex items-center justify-center">
                  Item added
                  <IoIosCheckmarkCircle className="text-xl ml-1" />
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
          </figcaption>
        </figure>

        <div className="min-[710px]:w-[80%] min-[980px]:w-[70%]">
          <h3 className="my-4 pt-4 text-center font-bold uppercase text-xl min-[571px]:text-2xl">
            Product Description
          </h3>

          <ul className="px-3 pb-8 min-[470px]:text-justify min-[571px]:text-xl">
            <li className="mb-4">
              <details open>
                <summary className="hover:cursor-pointer font-bold text-xl">
                  Style
                </summary>
                <p className="pl-3 text-lg mt-2">
                  {singleCloth.description.style}
                </p>
              </details>
            </li>

            <li className="mb-4">
              <details>
                <summary className="hover:cursor-pointer font-bold text-xl">
                  Size and Fit
                </summary>
                <ul className="pl-3 text-lg mt-2">
                  {singleCloth.description.sizeAndFit.map((item) => {
                    return (
                      <li key={item} className="list-disc list-inside">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>

            <li className="mb-4">
              <details>
                <summary className="hover:cursor-pointer font-bold text-xl">
                  Fabric Care
                </summary>
                <ul className="pl-3 text-lg mt-2">
                  {singleCloth.description.fabricCare.map((item) => {
                    return (
                      <li key={item} className="list-disc list-inside">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className="min-[980px]:w-[80%]">
          <h3 className="my-4 text-center font-bold uppercase text-xl min-[571px]:text-2xl">
            You may also like
          </h3>

          <div className="my-5 mx-2 min-[500px]:mx-5 grid grid-cols-2 gap-[30px] justify-items-center min-[700px]:grid-cols-3 min-[1000px]:grid-cols-4">
            {shuffledCloth.map(({ id, name, image, price }) => {
              return (
                <Link
                  href={`/ProductPage/${id}?category=${clothState}`}
                  className="max-w-[300px]"
                  key={name}
                >
                  <figure className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] dark:shadow-[rgba(255,255,255,0.089)_0px_0px_7px_5px]">
                    <picture>
                      <source srcSet={image} />
                      <img src={image} alt={name} loading="lazy" />
                    </picture>

                    <figcaption>
                      <p className="h-[44px] my-3 overflow-hidden text-ellipsis text-center">
                        {name}
                      </p>
                      <p className="text-center pb-3 text-xl font-bold text-[#af4261] dark:text-[#f3ec78]">
                        {price}
                      </p>
                    </figcaption>
                  </figure>
                </Link>
              );
            })}
          </div>
        </div>

        {currentScrollPosition > 200 && scrollDir === "up" && (
          <a
            href="#logo"
            className="flex items-center flex-col fixed bottom-5 right-3 text-black dark:text-[#f3ec78] font-bold"
          >
            <BsFillArrowUpCircleFill className="text-3xl" /> To Top
          </a>
        )}
      </section>
    );
  }
};

export default ProductPage;
