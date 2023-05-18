import { Loader } from "@/util/Loader";
import { forgotPassword } from "@/util/awsFuntions";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { IoIosCheckmark, IoMdCheckmarkCircle } from "react-icons/io";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordHelper, setShowPasswordHelper] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [passwordHasUppercase, setPasswordHasUppercase] = useState(false);
  const [passwordHasLowercase, setPasswordHasLowercase] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasCharacter, setPasswordHasCharacter] = useState(false);
  const [passwordIsEightDigit, setPasswordIsEightDigit] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [showEmailForm, setShowEmailForm] = useState(true);

  const [showVerificationCodeField, setShowVerificationCodeField] =
    useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [sendVerificationCodeLoading, setSendVerificationCodeLoading] =
    useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

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

  return (
    <div className="flex items-center flex-col">
      <section className="min-w-[h-[70vh]] max-w-[600px] p-4 bg-white m-4 rounded-3xl flex flex-col justify-center items-center shadow-[0px_5px_15px_rgba(0,0,0,0.35)] dark:shadow-[rgba(255,255,255,0.089)_0px_0px_7px_5px] text-black">
        <h1 className="text-center text-2xl font-bold text-[#471e2a] my-4">
          Forgot Password
        </h1>

        {showEmailForm && (
          <div>
            <p>
              To recover your account, please enter and submit the email address
              you registered with:
            </p>

            {errorMessage && (
              <p className="pt-4 text-red-500 text-sm text-center">
                {errorMessage}
              </p>
            )}

            <form
              className="my-8 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                forgotPassword.sendForgotPasswordCode(
                  email,
                  setShowVerificationCodeField,
                  setErrorMessage,
                  setSendVerificationCodeLoading
                );
              }}
            >
              <div className="mb-8 relative">
                <input
                  id="email"
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
                  htmlFor="email"
                  className="absolute  peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%]  peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                >
                  Email
                </label>
              </div>

              <button
                type="submit"
                disabled={!email}
                className="text-center border-2 w-[150px] py-2 rounded-full font-bold bg-black text-white hover:bg-white hover:text-black transition-all ease-linear duration-[300ms] disabled:text-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {sendVerificationCodeLoading && (
                  <Loader
                    textColor={"text-white"}
                    fillColor={"fill-blue-500"}
                  />
                )}

                {!sendVerificationCodeLoading && <span>Submit</span>}
              </button>
            </form>

            {showVerificationCodeField && (
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  forgotPassword.forgotPasswordSubmit(
                    email,
                    verificationCode,
                    password,
                    setShowSuccess,
                    setShowEmailForm,
                    setErrorMessage,
                    setForgotPasswordLoading
                  );
                }}
              >
                <div className="mb-8 relative">
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
                    className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text "
                  >
                    Verification Code
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
                      className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text  "
                    >
                      New Password
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
                    {showConfirmPassword ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>

                  <label
                    htmlFor="confirmPassword"
                    className="absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-60%] peer-focus:translate-y-[0] top-[-60%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text  "
                  >
                    Confirm New Password
                  </label>
                </div>

                {!passwordMatch && (
                  <p className="pl-8 text-sm text-red-500">
                    Password must match
                  </p>
                )}

                <button
                  type="submit"
                  className="my-6 text-center border-2 w-full py-2 rounded-full font-bold bg-[#af4261] text-white hover:bg-black hover:text-white transition-all ease-linear duration-[300ms] disabled:text-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  disabled={
                    !password ||
                    !verificationCode ||
                    password !== confirmPassword
                  }
                >
                  {forgotPasswordLoading && (
                    <Loader
                      textColor={"text-white"}
                      fillColor={"fill-blue-500"}
                    />
                  )}

                  {!forgotPasswordLoading && <span>Change Password</span>}
                </button>
              </form>
            )}
          </div>
        )}

        {showSuccess && (
          <fieldset className="border-2 mb-4 rounded-2xl p-4 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
            <legend className="text-xl font-bold px-1">Success</legend>

            <p className="flex flex-col items-center text-center">
              <IoMdCheckmarkCircle className="text-4xl" color="green" />

              <span className="min-[580px]:text-2xl">
                Password Reset Successfully
              </span>
            </p>

            <p className="pt-4">
              Please{" "}
              <Link
                href="/checkout"
                className="inline-block px-2 rounded-xl bg-[green] text-white"
              >
                Login
              </Link>{" "}
              with your new password to continue
            </p>
          </fieldset>
        )}
      </section>
    </div>
  );
};

export default ForgotPassword;
