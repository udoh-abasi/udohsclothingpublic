import { useSelector } from "react-redux";
import { CountryStateCity } from "./countryStateCity";
import Link from "next/link";
import { countryStateCitySelector } from "@/myReduxFiles/selectors";
import {
  AiFillCloseCircle,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoIosCheckmark, IoMdCheckmarkCircle } from "react-icons/io";
import {
  confirmSignUpCode,
  resendSignUpConfirmationCode,
  signUp,
} from "@/util/awsFuntions";
import { useUser } from "@/customHooks/useUser";
import { Loader } from "@/util/Loader";

const SignUp = () => {
  const countryStateCity = useSelector(countryStateCitySelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hideError, setHideError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Show message that password must match
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Show the <ul> that tell the user what to be in the password field
  const [showPasswordHelper, setShowPasswordHelper] = useState(false);

  const [passwordHasUppercase, setPasswordHasUppercase] = useState(false);
  const [passwordHasLowercase, setPasswordHasLowercase] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasCharacter, setPasswordHasCharacter] = useState(false);
  const [passwordIsEightDigit, setPasswordIsEightDigit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // This useState show and hide the sign up field when sign up is successful
  const [showSignUpField, setShowSignUpField] = useState(true);

  // This useState shows and hides the verification field, if the user has signed up
  const [showVerificationCodeField, setShowVerificationCodeField] =
    useState(false);

  // This keeps tracks if the verification code was incorrect
  const [codeVerificationFailed, setCodeVerificationFailed] = useState(false);

  // This stores the verification code string
  const [verificationCode, setVerificationCode] = useState("");

  // When the user signs up, their email address is stored here
  const [signedUpUserEmail, setSignedUpUserEmail] = useState("");

  // If the signUp is currently loading, (i.e, a request is currently sent to signUp) this will be set to 'true'
  const [signUpLoading, setSignUpLoading] = useState(false);

  // This useState controls if the email verification code is currently loading
  const [verifyEmailCodeLoading, setVerifyEmailCodeLoading] = useState(false);

  // Checks if the resend password AWS function is currently loading
  const [resendSignUpCodeLoading, setResendSignUpCodeLoading] = useState(false);

  // This function manages the regular expression, and show what the user has ticked and what they have not
  const passwordRegularExpressionCheck = (e) => {
    setPassword(e.target.value);

    if (/(?=.*[a-z])/.test(e.target.value)) {
      setPasswordHasLowercase(true);
    } else {
      setPasswordHasLowercase(false);
    }

    if (/(?=.*[A-Z])/.test(e.target.value)) {
      setPasswordHasUppercase(true);
    } else {
      setPasswordHasUppercase(false);
    }

    if (/(?=.*\d)/.test(e.target.value)) {
      setPasswordHasNumber(true);
    } else {
      setPasswordHasNumber(false);
    }

    if (/(?=.*[^\da-zA-Z])/.test(e.target.value)) {
      setPasswordHasCharacter(true);
    } else {
      setPasswordHasCharacter(false);
    }

    if (/^.{8,100}$/.test(e.target.value)) {
      setPasswordIsEightDigit(true);
    } else {
      setPasswordIsEightDigit(false);
    }
  };

  useEffect(() => {
    if (confirmPassword !== password && confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [confirmPassword, password]);

  const user = useUser();
  console.log("User is", user);

  return (
    <div className="p-4 flex justify-center">
      <section className="bg-[#af4261] rounded-2xl shadow-[0px_5px_15px_rgba(0,0,0,0.35)] min-[650px]:m-8 max-w-[850px] w-[90%]">
        <h1 className="text-center my-8 text-2xl font-bold text-white">
          Sign Up
        </h1>

        <div
          className="bg-white text-black py-16 rounded-2xl p-2 min-[490px]:px-8"
          id="signWrapper"
        >
          {showSignUpField && (
            <form onSubmit={(e) => e.preventDefault()} className="">
              <div
                className={`text-center text-red-600 font-bold mt-[-20px] pb-8 px-3 relative ${
                  hideError && "hidden"
                }`}
              >
                {errorMessage}
                <div onClick={() => setHideError(true)}>
                  <AiFillCloseCircle className="absolute top-[-10px] right-4 cursor-pointer text-xl text-red-600" />
                </div>
              </div>

              <div className="mb-8 relative">
                <input
                  id="loginEmail"
                  type="email"
                  required
                  placeholder=" "
                  value={email}
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <label
                  htmlFor="loginEmail"
                  className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                >
                  Email
                </label>
              </div>

              <div className="mb-8">
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder=" "
                    value={password}
                    onFocus={() => setShowPasswordHelper(true)}
                    onBlur={() => setShowPasswordHelper(false)}
                    onChange={(e) => passwordRegularExpressionCheck(e)}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$"
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
                    htmlFor="password"
                    className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                  >
                    Password
                  </label>
                </div>

                {showPasswordHelper && (
                  <ul className="pl-8 text-red-500 py-2 text-sm">
                    <li
                      className={`${
                        passwordHasUppercase && "text-green-500"
                      } flex items-center`}
                    >
                      <span className="mr-2">
                        At least one uppercase letter
                      </span>

                      <span>
                        {passwordHasUppercase ? (
                          <IoIosCheckmark className="text-2xl" />
                        ) : (
                          <AiOutlineCloseCircle />
                        )}
                      </span>
                    </li>

                    <li
                      className={`${
                        passwordHasLowercase && "text-green-500"
                      } flex items-center`}
                    >
                      <span className="mr-2">
                        At least one lowercase letter
                      </span>

                      <span>
                        {passwordHasLowercase ? (
                          <IoIosCheckmark className="text-2xl" />
                        ) : (
                          <AiOutlineCloseCircle />
                        )}
                      </span>
                    </li>

                    <li
                      className={`${
                        passwordHasNumber && "text-green-500"
                      } flex items-center`}
                    >
                      <span className="mr-2">At least one digit</span>

                      <span>
                        {passwordHasNumber ? (
                          <IoIosCheckmark className="text-2xl" />
                        ) : (
                          <AiOutlineCloseCircle />
                        )}
                      </span>
                    </li>

                    <li
                      className={`${
                        passwordHasCharacter && "text-green-500"
                      } flex items-center`}
                    >
                      <span className="mr-2">
                        At least one special character
                      </span>

                      <span>
                        {passwordHasCharacter ? (
                          <IoIosCheckmark className="text-2xl" />
                        ) : (
                          <AiOutlineCloseCircle />
                        )}
                      </span>
                    </li>

                    <li
                      className={`${
                        passwordIsEightDigit && "text-green-500"
                      } flex items-center`}
                    >
                      <span className="mr-2">At least 8 characters long</span>

                      <span>
                        {passwordIsEightDigit ? (
                          <IoIosCheckmark className="text-2xl" />
                        ) : (
                          <AiOutlineCloseCircle />
                        )}
                      </span>
                    </li>
                  </ul>
                )}
              </div>

              <div className="mb-2 relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#-+=_])[A-Za-z\d@$!%*?&]{8,}$"
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                />

                <button
                  type="button"
                  className="absolute top-1 right-0 cursor-pointer text-3xl"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>

                <label
                  htmlFor="confirmPassword"
                  className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                >
                  Confirm Password
                </label>
              </div>

              {!passwordMatch && (
                <p className="pl-8 text-sm text-red-500">Password must match</p>
              )}

              <button
                type="submit"
                className="my-6 text-center border-2 w-full py-2 rounded-full font-bold bg-[#af4261] text-white hover:bg-black hover:text-white transition-all ease-linear duration-[300ms] disabled:text-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={!password || !email || password !== confirmPassword}
                onClick={() =>
                  signUp(
                    email,
                    password,
                    setErrorMessage,
                    setShowVerificationCodeField,
                    setSignedUpUserEmail,
                    setHideError,
                    setSignUpLoading
                  )
                }
              >
                {signUpLoading && <Loader />}

                {!signUpLoading && <span>Sign Up</span>}
              </button>

              <Link href="/checkout" className="text-center block underline">
                Already have an account&#x3f; Login
              </Link>
            </form>
          )}

          {showVerificationCodeField && (
            <form onSubmit={(e) => e.preventDefault()} className="pb-8 pt-3 ">
              <fieldset className="border-2 border-black p-6 rounded-3xl">
                <legend className="ml-3 px-1 font-bold">Verify Email</legend>

                {showVerificationCodeField === true && (
                  <div>
                    {codeVerificationFailed && (
                      <p className="text-center text-red-500 mb-4 font-bold text-sm">
                        Verification failed, please check the code and try again
                      </p>
                    )}

                    <p className="pb-8">
                      To verify that this is your email, please enter the
                      verification code sent to{" "}
                      <span className="underline ">{signedUpUserEmail}</span>
                    </p>

                    <div className="mb-2 relative">
                      <input
                        id="verificationCode"
                        type="text"
                        required
                        placeholder=" "
                        autoFocus
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                        }}
                        className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                      />

                      <label
                        htmlFor="verificationCode"
                        className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                      >
                        Verification Code
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="my-6 text-center border-2 w-full py-2 rounded-full font-bold bg-green-500 text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] disabled:text-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                      disabled={!verificationCode}
                      onClick={() => {
                        confirmSignUpCode(
                          email,
                          verificationCode,
                          setShowVerificationCodeField,
                          setCodeVerificationFailed,
                          setShowSignUpField,
                          setVerifyEmailCodeLoading
                        );
                      }}
                    >
                      {verifyEmailCodeLoading && <Loader />}

                      {!verifyEmailCodeLoading && <span>Submit Code </span>}
                    </button>

                    <button
                      type="button"
                      className="text-center border-2 w-[150px] py-2 rounded-full font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms]"
                      onClick={() => {
                        resendSignUpConfirmationCode(
                          email,
                          setResendSignUpCodeLoading
                        );
                      }}
                    >
                      {resendSignUpCodeLoading === true && <Loader />}
                      {resendSignUpCodeLoading === false && "Resend Code"}
                      {resendSignUpCodeLoading === "successful" && (
                        <span className="flex justify-center items-center">
                          Code Sent{" "}
                          <IoMdCheckmarkCircle className="ml-2 text-xl" />
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {showVerificationCodeField === "successful" && (
                  <p className="flex flex-col items-center text-center">
                    <IoMdCheckmarkCircle className="text-6xl" color="green" />
                    <span className="min-[580px]:text-2xl">
                      Email Verified Successfully
                    </span>
                  </p>
                )}
              </fieldset>
            </form>
          )}

          {showVerificationCodeField === "successful" && (
            <form>
              <div className="mb-2 relative">
                <input
                  id="name"
                  type="text"
                  required
                  placeholder=" "
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                />

                <label
                  htmlFor="name"
                  className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
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
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                />

                <label
                  htmlFor="streetAddress"
                  className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
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
                  className="dark:text-black block w-full rounded-xl p-1 border-black border-2 peer"
                />

                <label
                  htmlFor="phone"
                  className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                >
                  Phone Number
                </label>
              </div>

              <button
                type="submit"
                className="relative flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-white dark:text-white border-2 rounded-full group w-full justify-center"
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
                <span className="relative">Submit</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default SignUp;
