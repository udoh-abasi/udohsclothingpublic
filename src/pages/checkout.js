import {
  cartSelector,
  countryStateCitySelector,
} from "@/myReduxFiles/selectors";
import { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  MdOutlineRadioButtonUnchecked,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { BsCheck2Circle, BsCheck2Square } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CountryStateCity } from "./countryStateCity";
import Link from "next/link";
import { logIn } from "@/util/awsFuntions";
import { Loader } from "@/util/Loader";
import { useRouter } from "next/router";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { guestDataAction } from "@/myReduxFiles/actions";
import { CartItemsToDisplayByTheSide } from "./CartItemsToDisplayByTheSide";
import { SignUpWithGoogle } from "./SignupWithGoogle";
import { useUser } from "@/customHooks/useUser";

export const CheckOutPage = () => {
  const countryStateCity = useSelector(countryStateCitySelector);

  // Get Items in cart
  const itemsInCart = useSelector(cartSelector);

  // Get the total Price
  const priceReducer = itemsInCart.reduce((accumulatedVal, currentVal) => {
    const thePrice = currentVal.price.slice(1); // Take out the dollar sign in front
    return accumulatedVal + Number(thePrice);
  }, 0);

  const [checkoutOption, setCheckoutOption] = useState("login");
  const [keepMeUpToDate, setKeepMeUpToDate] = useState(true);

  const [guestEmail, setGuestEmail] = useState("");
  const [guestVerificationCode, setGuestVerificationCode] = useState("");

  // This is where we store the code we will be sending to the client via email
  // The code was generated in the backend
  const [guestCodeInEmailSent, setGuestCodeInEmailSent] = useState("");

  const [guestErrorWithEmailSending, setGuestErrorWithEmailSending] =
    useState("");

  const [guestErrorWithCodeVerification, setGuestErrorWithCodeVerification] =
    useState("");

  const [guestEmailSendingLoading, setGuestEmailSendingLoading] =
    useState(false);

  // This can be 'email', 'verify' or 'success'
  const [guestVerificationStatus, setGuestVerificationStatus] =
    useState("email");

  const [codeSent, setCodeSent] = useState(false);

  // This function runs when the button is clicked to check if the code we emailed the user is correct
  const verifyGuestCode = () => {
    if (guestVerificationCode === guestCodeInEmailSent) {
      setGuestVerificationStatus("success");
    } else {
      setGuestErrorWithCodeVerification(
        "The code is different from what we have in our database. Please check and try again"
      );
    }
  };

  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const router = useRouter();

  // This function runs when the login button is clicked
  const loginClicked = async () => {
    await logIn(email, password, setLoginError, setLoginLoading, router);
  };

  // This function runs when the guest's verify Email button is clicked, and it sends the code
  const sendCodeToGuest = async () => {
    setGuestEmailSendingLoading(true);
    const theBody = { to: guestEmail };
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theBody),
      });

      if (response.ok) {
        const data = await response.json();
        setGuestCodeInEmailSent(data.code);
        setGuestEmailSendingLoading(false);

        setCodeSent(true);
        setTimeout(() => {
          setCodeSent(false);
        }, 5000);

        setGuestVerificationStatus("verify");
      } else {
        setGuestErrorWithEmailSending(
          "There was an error while sending the code. Please try again"
        );
        setGuestEmailSendingLoading(false);
      }
    } catch (e) {
      console.log(e);
      setGuestEmailSendingLoading(false);
      setGuestErrorWithEmailSending(
        "There was an error while sending the code. Please try again"
      );
    }
  };

  const dispatch = useDispatch();
  // When the 'NEXT' button is clicked, this function executes (on Form Submit)
  const NextButtonClicked = (guestData) => {
    dispatch(guestDataAction(guestData));
  };

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

      <form className="flex flex-col mb-2 mt-8 font-bold justify-between min-[580px]:flex-row min-[580px]:justify-around border-b-2 pb-6 border-black dark:border-white">
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

      <div className="min-[730px]:flex justify-center items-center">
        <div className="min-[730px]:grid grid-cols-[2fr_1fr] gap-2 max-w-[970px] ">
          <section
            className={`${checkoutOption === "guest" && "flex"} justify-center`}
          >
            {checkoutOption === "guest" ? (
              <div className="max-w-[400px] min-[580px]:max-w-[90%]">
                <h3 className="text-center my-4 text-xl font-bold">
                  Checkout as Guest
                </h3>

                {(guestVerificationStatus === "email" ||
                  guestVerificationStatus === "verify") && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendCodeToGuest();
                    }}
                    className="pb-6"
                  >
                    {guestErrorWithEmailSending && (
                      <p className="text-red-500 text-center text-sm py-2">
                        {guestErrorWithEmailSending}
                      </p>
                    )}

                    <div className="flex flex-col-reverse pb-4">
                      <input
                        type="email"
                        id="guestEmail"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder=" "
                        className="dark:text-black block w-full rounded-xl p-1 border-black border-2"
                      />
                      <label htmlFor="guestEmail" className="block ">
                        Email
                      </label>
                    </div>

                    <div className="pb-2 relative ">
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
                    <p
                      className={`text-center text-green-500 font-bold pb-2 flex items-center justify-center ${
                        codeSent ? "visible" : "invisible"
                      }`}
                    >
                      Verification code sent{" "}
                      <IoMdCheckmarkCircle className="ml-2 text-lg" />
                    </p>

                    <button
                      type="submit"
                      disabled={guestEmailSendingLoading ? true : !guestEmail}
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

                      {guestEmailSendingLoading ? (
                        <Loader
                          textColor={"text-white"}
                          fillColor={"fill-black"}
                        />
                      ) : (
                        <span className="relative">Verify Email</span>
                      )}
                    </button>
                  </form>
                )}

                {(guestVerificationStatus === "success" ||
                  guestVerificationStatus === "verify") && (
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="pb-8 pt-3"
                  >
                    <fieldset className="border-2 border-black dark:border-white p-6 rounded-3xl">
                      <legend className="ml-3 px-1 font-bold">
                        Verify Email
                      </legend>

                      {guestVerificationStatus === "verify" && (
                        <div>
                          {guestErrorWithCodeVerification && (
                            <p className="text-red-500 text-center text-sm py-2">
                              {guestErrorWithCodeVerification}
                            </p>
                          )}

                          <p className="pb-3">
                            To verify that this is your email, please enter the
                            verification code sent to{" "}
                            <span className="underline">{guestEmail}</span>
                          </p>

                          <div className="flex flex-col-reverse">
                            <input
                              type="text"
                              id="verifiCationCode"
                              required
                              autoFocus
                              value={guestVerificationCode}
                              onChange={(e) =>
                                setGuestVerificationCode(e.target.value)
                              }
                              placeholder=" "
                              className="dark:text-black block w-full rounded-xl p-1 border-black border-2"
                            />

                            <label htmlFor="verifiCationCode" className="block">
                              Verification code
                            </label>
                          </div>

                          <button
                            type="submit"
                            onClick={() => {
                              verifyGuestCode();
                            }}
                            className="my-6 text-center border-2 w-full py-2 rounded-full font-bold bg-green-500 text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms]"
                          >
                            Submit Code
                          </button>

                          <button
                            type="button"
                            onClick={() => sendCodeToGuest()}
                            disabled={
                              guestEmailSendingLoading ? true : !guestEmail
                            }
                            className="text-center border-2 w-[150px] py-2 rounded-full font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms]"
                          >
                            {guestEmailSendingLoading ? (
                              <Loader
                                textColor={"text-white"}
                                fillColor={"fill-black"}
                              />
                            ) : (
                              <span className="relative">Resend Code</span>
                            )}
                          </button>
                        </div>
                      )}

                      {guestVerificationStatus === "success" && (
                        <p className="flex flex-col items-center text-center">
                          <IoMdCheckmarkCircle className="text-4xl text-green-500" />
                          <span className="min-[580px]:text-2xl">
                            Email Verified Successfully
                          </span>
                        </p>
                      )}
                    </fieldset>
                  </form>
                )}

                {guestVerificationStatus === "success" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      const guestData = {
                        user: guestEmail,
                        data: {
                          name,
                          phoneNumber,
                          streetAddress,
                          ...countryStateCity,
                        },
                      };

                      NextButtonClicked(guestData);
                    }}
                  >
                    <div className="mb-2 relative">
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder=" "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                      />

                      <label
                        htmlFor="name"
                        className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text dark:peer-placeholder-shown:text-black dark:peer-focus:text-white"
                      >
                        Name
                      </label>
                    </div>

                    <div className="mb-8">
                      <CountryStateCity />
                    </div>

                    <div className="mb-8 relative">
                      <input
                        id="streetAddress"
                        type="text"
                        required
                        placeholder=" "
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                      />

                      <label
                        htmlFor="streetAddress"
                        className="absolute dark:peer-placeholder-shown:text-black dark:peer-focus:text-white peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                      >
                        Street Address
                      </label>
                    </div>

                    <div className="mb-8 relative">
                      <input
                        id="phone"
                        type="text"
                        required
                        placeholder=" "
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                      />

                      <label
                        htmlFor="phone"
                        className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text dark:peer-placeholder-shown:text-black dark:peer-focus:text-white"
                      >
                        Phone Number
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="relative flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-white dark:text-white border-2 rounded-full group w-full justify-center disabled:text-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                      disabled={!name || !phoneNumber || !streetAddress}
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
                )}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginClicked();
                }}
                className="bg-[#af4261] rounded-2xl shadow-[0px_5px_15px_rgba(0,0,0,0.35)] min-[650px]:m-8"
              >
                <h3 className="text-center my-4 text-2xl font-bold text-white pt-4">
                  Login
                </h3>

                <div
                  className="bg-white text-black py-16 rounded-2xl p-2 min-[490px]:px-8"
                  id="loginWrapper"
                >
                  {loginError && (
                    <p className="text-red-500 text-center mb-4">
                      {loginError}
                    </p>
                  )}

                  <div className="mb-8 relative">
                    <input
                      id="loginEmail"
                      type="email"
                      required
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" "
                      className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                    />

                    <button
                      type="button"
                      className="absolute top-1 right-0 cursor-pointer text-3xl"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>

                    <label
                      htmlFor="loginPassword"
                      className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                    >
                      Password
                    </label>
                  </div>

                  <button
                    disabled={!password || !email}
                    type="submit"
                    className="my-6 text-center border-2 w-full py-2 rounded-full font-bold bg-[#af4261] text-white hover:bg-black hover:text-white transition-all ease-linear duration-[300ms] disabled:text-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    {loginLoading ? (
                      <Loader
                        textColor={"text-white"}
                        fillColor={"fill-black"}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>

                  <button
                    type="button"
                    className="text-center border-2 w-[150px] py-2 mb-4 rounded-full font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms]"
                    onClick={() => {
                      router.push("/forgot-password");
                    }}
                  >
                    Forgot Password
                  </button>

                  <Link href="/signUp" className="text-center block underline">
                    Don&apos;t have an account&#x3f; Sign Up
                  </Link>

                  <div className="min-[730px]:flex justify-center min-[730px]:overflow-hidden">
                    <div className="min-[730px]:max-w-[300px]">
                      <SignUpWithGoogle />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </section>

          <section className="hidden min-[730px]:block mr-1 max-h-[100vh] overflow-y-auto sticky top-5">
            <CartItemsToDisplayByTheSide />
          </section>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
