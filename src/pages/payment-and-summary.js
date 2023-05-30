import {
  cartSelector,
  emailSelector,
  userLoadingSelector,
} from "@/myReduxFiles/selectors";
import { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CartItemsToDisplayByTheSide } from "./CartItemsToDisplayByTheSide";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import {
  BsCheck2Circle,
  BsCreditCard2Back,
  BsCreditCard2FrontFill,
} from "react-icons/bs";
import { useUser } from "@/customHooks/useUser";
import { Loader } from "./Loader";
import { useRouter } from "next/router";
import { guestDataSelector } from "@/myReduxFiles/selectors";
import { IoMdWarning } from "react-icons/io";
import { itemsInCartDuplicateAction } from "@/myReduxFiles/actions";
import Head from "next/head";

const PaymentAndSummary = () => {
  const user = useUser();
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cvv, setCvv] = useState("");

  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Set the delivery field to be editable
  const [editDeliveryField, setEditDeliveryField] = useState(true);

  // This sets the checkbox to either payment on delivery or with card
  const [paymentMethod, setPaymentMethod] = useState("onDelivery");

  // This tracks the entire page. It shows a <Loader /> except the user is signed in, and their data are in the database
  const [pageLoading, setPageLoading] = useState(true);

  // Format the credit card field, to add a space after 4 numbers have been typed
  const formatValue = (value) => {
    const regex = /[^0-9 ]/g; // Regex to accept just numbers

    const newString = value.replace(regex, ""); // Ensures only numbers are accepted in the field

    const rawText = [...newString.split(" ").join("")]; // Remove old space
    const creditCard = []; // Create card as array
    rawText.forEach((text, index) => {
      if (index % 4 === 0 && index !== 0) creditCard.push(" "); // Add space
      creditCard.push(text);
    });

    return creditCard.join(""); // Transform card array to string
  };

  const monthOption = [];

  for (let i = 1; i <= 12; i++) {
    monthOption.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  // For year, get the current year, and add 10 years to it, then populate the year's <select> with it
  const yearOption = [];
  const date = new Date();
  const currentYear = date.getFullYear();

  for (let i = currentYear; i <= currentYear + 10; i++) {
    yearOption.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  // Get Items in cart
  const itemsInCart = useSelector(cartSelector);

  // Get the total Price
  const priceReducer = itemsInCart.reduce((accumulatedVal, currentVal) => {
    const thePrice = currentVal.price.slice(1); // Take out the dollar sign in front
    return accumulatedVal + Number(thePrice);
  }, 0);

  const email = useSelector(emailSelector);

  const userLoading = useSelector(userLoadingSelector);

  const guestInfo = useSelector(guestDataSelector);

  // This stores the info of the user, loaded from the DB
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userInfo) {
      const { user: theUser, data } = userInfo;
      if (data) {
        setCity(data.city);
        setCountry(data.country);
        setName(data.name);
        setPhoneNumber(data.phoneNumber);
        setState(data.state);
        setStreetAddress(data.streetAddress);
      }
    }
  }, [userInfo]);

  const router = useRouter();

  // Since useEffect executes twice, this useRef is used to make sure that
  // the first useEffect execution does not send a request to getUserInfo
  const isInitialMount = useRef(true);

  // This useEffect checks if the user checked out as guest, or they logged in to checkout, then it executes the necessary function accordingly
  useEffect(() => {
    // This 'getUser' function sends a request to our backend to get the user's info
    const getUser = async () => {
      try {
        const response = await fetch(`/api/getUserInfo/${email}`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();

          if (data) {
            setUserInfo(data.userInfo);
            setPageLoading(false);
          }
        } else {
          if (email) {
            // If the user is logged in but their data was not submitted to our database
            router.push(`/signUp/?email=${encodeURIComponent(email)}`);
          } else {
            // else, if the user is not signed in at all, and they are trying to access the payment page
            router.push("/checkout");
          }
        }
      } catch (e) {
        router.push("/checkout");
      }
    };

    if (isInitialMount.current) {
      // On first mount, this will what will execute.
      // This is done because, the useUser does not load immediately to get the user, and a getUserInfo request can be sent to the backend, with a 'null' value, even when the user is logged in
      isInitialMount.current = false;
    } else {
      // On the second execution of this useEffect, this function will run
      if (!userLoading) {
        if (router.isReady) {
          const { query } = router;
          const { status } = query; // If status is in the query parameter, that means the user checked out as guest. (So, the url will look like this - /payment-and-summary?status=guest)

          if (status === "guest") {
            // If we have the URL - '/payment-and-summary?status=guest', and also we have 'guestInfo' in our redux store. (This was done to confirm the user didn't manually type the URL into the URL bar)
            if (guestInfo) {
              setUserInfo(guestInfo);
              setPageLoading(false);
            } else {
              router.push("/checkout");
            }
          } else {
            getUser(); // This line will execute if the URL was was just '/payment-and-summary' and NOT '/payment-and-summary?status=guest'
          }
        }
      }
    }
  }, [email, userLoading, router, guestInfo]);

  const [itemsInCartDuplicate, setItemsInCartDuplicate] = useState([]);

  return (
    <>
      <Head>
        <title>Payment and Summary - Udohs</title>
      </Head>

      <section>
        {pageLoading ? (
          <div className="text-center my-8">
            <Loader textColor="text-white" fillColor="fill-black" />
          </div>
        ) : (
          <>
            <div className="flex text-xs p-4">
              <p className="bg-[gray] text-white flex items-center justify-center font-bold p-2 rounded-2xl flex-[1_0_120px] mr-2">
                <span className="flex justify-center items-center mr-2 bg-white text-black rounded-full w-[23px] h-[23px] ">
                  1
                </span>
                Shipping
              </p>

              <p className="bg-green-500 text-white flex items-center justify-center font-bold p-2 rounded-2xl flex-[1_0_120px]">
                <span className="flex justify-center items-center mr-2 bg-white text-black rounded-full w-[23px] h-[23px] ">
                  2
                </span>
                <span className="whitespace-nowrap overflow-hidden text-clip">
                  Review & Payment
                </span>
              </p>
            </div>

            <div className="min-[730px]:grid grid-cols-[2fr_1fr] gap-2 max-w-[970px]">
              <section className="p-4 min-[500px]:p-8 flex flex-col items-center">
                <div className="max-w-[500px] w-full">
                  <div className="flex justify-between text-xl border-y-2 py-3 border-y-black dark:border-y-white min-[730px]:hidden">
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
                          const cartButton =
                            document.querySelector("#CartButton");
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

                  <div className="my-8 min-[730px]:mt-0">
                    <h3 className="text-2xl font-bold ">Email Address</h3>
                    <p className="text-sm">{userInfo && userInfo.user}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold">Delivery Address</h3>

                    <div className="flex my-4">
                      <button
                        type="button"
                        onClick={() => setEditDeliveryField(false)}
                        className="mr-6 text-center border-2 w-[100px] py-2 rounded-full font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] text-xs"
                      >
                        Edit
                      </button>

                      {!editDeliveryField && (
                        <button
                          onClick={() => setEditDeliveryField(true)}
                          type="submit"
                          className="text-center border-2 w-[100px] py-2 rounded-full font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] text-xs"
                        >
                          Update Change
                        </button>
                      )}
                    </div>

                    <ul className="mb-2">
                      <li className="mb-1">
                        <input
                          value={name}
                          autoFocus
                          onChange={(e) => setName(e.target.value)}
                          required
                          type="text"
                          disabled={editDeliveryField}
                          aria-label="Name"
                          placeholder="Name"
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 disabled:bg-gray-500 disabled:text-white disabled:border-0"
                        />
                      </li>
                      <li className="mb-1">
                        <input
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          required
                          type="text"
                          disabled={editDeliveryField}
                          aria-label="Street Address"
                          placeholder="Street Address"
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 disabled:bg-gray-500 disabled:text-white disabled:border-0"
                        />
                      </li>
                      <li className="mb-1">
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          type="text"
                          disabled={editDeliveryField}
                          aria-label="City"
                          placeholder="City"
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 disabled:bg-gray-500 disabled:text-white disabled:border-0"
                        />
                      </li>
                      <li className="mb-1">
                        <input
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                          type="text"
                          disabled={editDeliveryField}
                          aria-label="State"
                          placeholder="State"
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 disabled:bg-gray-500 disabled:text-white disabled:border-0"
                        />
                      </li>
                      <li className="mb-1">
                        <input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                          type="text"
                          disabled={editDeliveryField}
                          aria-label="Country"
                          placeholder="Country"
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 disabled:bg-gray-500 disabled:text-white disabled:border-0"
                        />
                      </li>
                      <li className="mb-1">
                        <input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          type="text"
                          disabled={editDeliveryField}
                          aria-label="Phone Number"
                          placeholder="Phone Number"
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 disabled:bg-gray-500 disabled:text-white disabled:border-0"
                        />
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold">Payment</h3>

                  <form className="flex flex-col mt-4 font-bold justify-between min-[580px]:flex-row min-[580px]:justify-between pb-6">
                    <div className="relative mb-3">
                      <div className="absolute left-0">
                        {paymentMethod === "onDelivery" ? (
                          <BsCheck2Circle className="text-2xl pointer-events-none font-bold" />
                        ) : (
                          <MdOutlineRadioButtonUnchecked className="text-2xl pointer-events-none" />
                        )}
                      </div>
                      <input
                        type="radio"
                        id="PayOnDelivery"
                        name="paymentMethod"
                        className="w-[20px] h-[20px] opacity-0"
                        onChange={() => setPaymentMethod("onDelivery")}
                      />
                      <label htmlFor="PayOnDelivery" className="ml-2">
                        Pay on Delivery
                      </label>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 text-black dark:text-white">
                        {paymentMethod === "withCard" ? (
                          <BsCheck2Circle className="text-2xl pointer-events-none font-bold" />
                        ) : (
                          <MdOutlineRadioButtonUnchecked className="text-2xl pointer-events-none " />
                        )}
                      </div>
                      <input
                        type="radio"
                        id="PayWithCard"
                        name="paymentMethod"
                        className="w-[20px] h-[20px] opacity-0"
                        onChange={() => setPaymentMethod("withCard")}
                      />
                      <label htmlFor="PayWithCard" className="ml-2">
                        Pay with Debit/Credit Card
                      </label>
                    </div>
                  </form>

                  {paymentMethod === "onDelivery" && (
                    <figure className="bg-white flex justify-center rounded-3xl shadow-[0px_5px_15px_rgba(0,0,0,0.35)] mb-8 border-emerald-500 border-[3px]">
                      <picture>
                        <img
                          src="cash_on_delivery.png"
                          alt="Cash on Delivery"
                          loading="lazy"
                        />
                      </picture>
                    </figure>
                  )}

                  {paymentMethod === "withCard" && (
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="mb-4 mt-4 relative">
                        <input
                          id="cardNumber"
                          type="text"
                          required
                          placeholder=" "
                          maxLength={19}
                          value={formatValue(cardNumber)}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                          }}
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                        />

                        <p
                          className="absolute top-2 right-3 cursor-text pointer-events-none text-xl"
                          aria-label="Credit card front"
                          title="Credit card front"
                        >
                          <BsCreditCard2FrontFill color="green" />
                        </p>

                        <label
                          htmlFor="cardNumber"
                          className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text dark:peer-placeholder-shown:text-black dark:peer-focus:text-white"
                        >
                          Card Number
                        </label>
                      </div>

                      <div className="mb-8">
                        <label htmlFor="ExpiryDate" className="block mb-2">
                          Expiry Date
                        </label>

                        <select
                          id="ExpiryDate"
                          required
                          className="dark:text-black mr-4 w-[80px] rounded-lg border-2 border-black"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Month
                          </option>

                          {monthOption}
                        </select>

                        <select
                          required
                          className="dark:text-black w-[80px] rounded-lg border-2 border-black"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Year
                          </option>

                          {yearOption}
                        </select>
                      </div>

                      <div className="mb-8 relative">
                        <input
                          id="nameOnCard"
                          type="text"
                          required
                          placeholder=" "
                          value={nameOnCard}
                          onChange={(e) => {
                            setNameOnCard(e.target.value);
                          }}
                          className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                        />

                        <label
                          htmlFor="nameOnCard"
                          className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text dark:peer-placeholder-shown:text-black dark:peer-focus:text-white"
                        >
                          Name on Card
                        </label>
                      </div>

                      <div className="mb-8 relative">
                        <input
                          id="cvv"
                          type="text"
                          required
                          placeholder=" "
                          maxLength={3}
                          value={formatValue(cvv)}
                          onChange={(e) => {
                            setCvv(e.target.value);
                          }}
                          className="dark:text-black block w-[100px] rounded-xl p-1 border-black border-2 peer"
                        />

                        <p
                          className="absolute top-2 left-[4.5rem] text-xl cursor-text pointer-events-none"
                          aria-label="Credit card back"
                          title="Credit card back"
                        >
                          <BsCreditCard2Back color="green" />
                        </p>

                        <label
                          htmlFor="cvv"
                          className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text dark:peer-placeholder-shown:text-black dark:peer-focus:text-white"
                        >
                          CVV
                        </label>
                      </div>
                    </form>
                  )}

                  {!itemsInCart.length && (
                    <p className="flex justify-center items-center mb-3 text-red-500 text-xs font-bold">
                      <IoMdWarning className="text-lg" /> To proceed, kindly add
                      at least one item in cart
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!itemsInCart.length}
                    onClick={() => {
                      dispatch(itemsInCartDuplicateAction(itemsInCart));
                      router.push("/checkoutSuccess");
                    }}
                    className="relative flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-white dark:text-white border-2 rounded-full group w-full justify-center disabled:text-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
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

                    <span className="relative uppercase">Buy now</span>
                  </button>
                </div>
              </section>

              <section className="hidden min-[730px]:block mr-1 max-h-[100vh] overflow-y-auto sticky top-5">
                <CartItemsToDisplayByTheSide />
              </section>
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default PaymentAndSummary;
