import Link from "next/link";

import { useEffect, useState } from "react";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import Head from "next/head";
import { Loader } from "./Loader";
import { IoMdCheckmarkCircle } from "react-icons/io";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [disAbleButton, setDisableButton] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDisableButton(!email || !name || !message);
  }, [email, name, message]);

  const sendContactEmail = async () => {
    setLoading(true);
    setDisableButton(true);
    setLoading(true);
    const theBody = { from: email, name, message };
    try {
      const response = await fetch("/api/sendContactEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theBody),
      });

      if (response.ok) {
        setResponseMessage("success");
        setLoading(false);
        setDisableButton(false);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setResponseMessage("error");
        setLoading(false);
        setDisableButton(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setResponseMessage("error");
    }
  };

  return (
    <>
      <Head>
        <title>Contact-Udohs</title>
      </Head>

      <div className="flex justify-center">
        <p className="p-4 pt-6 text-center flex-[0_1_500px]">
          We are available 24-7 via our contact form below. We are happy to
          answer any questions you may have.
        </p>
      </div>

      <section className="grid min-[800px]:grid-cols-2 mb-4">
        <picture className="min-[800px]:block hidden max-h-[620px] overflow-hidden rounded-br-3xl">
          <img
            src="/Contact.webp"
            alt="Clothes on a hanger"
            className="rounded-tr-3xl"
          />
        </picture>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendContactEmail();
            }}
            className="flex items-center justify-center"
          >
            <div className="flex-[0_1_500px] bg-[#ebebebd5] p-4 m-4 pt-0 mt-1 rounded-3xl dark:ring-4 ring-blue-700 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
              <fieldset>
                <legend className="uppercase font-bold text-center mb-3 text-lg text-blue-600">
                  Contact Us
                </legend>

                <div className="my-8 relative">
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-black block w-full rounded-xl p-1 border-0 peer"
                  />
                  <label
                    htmlFor="name"
                    className="text-blue-700 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-70%] peer-focus:translate-y-[0] top-[-70%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                  >
                    Your Name
                  </label>
                </div>

                <div className="my-11 relative">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-black block w-full rounded-xl p-1 border-0 peer"
                  />
                  <label
                    htmlFor="email"
                    className="text-blue-700 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-70%] peer-focus:translate-y-[0] top-[-70%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                  >
                    Email
                  </label>
                </div>

                <div className="my-8 relative">
                  <textarea
                    id="message"
                    required
                    placeholder=" "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="text-black block w-full rounded-3xl p-1 resize-none h-[200px] border-0 peer"
                  ></textarea>
                  <label
                    htmlFor="email"
                    className="text-blue-700 absolute peer-placeholder-shown:top-[5%]  peer-focus:top-[-12%] top-[-12%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
                  >
                    Message
                  </label>
                </div>

                <p className="mb-3 text-center font-bold">
                  {responseMessage === "success" && (
                    <span className="text-green-700 flex items-center justify-center">
                      Message sent successfully
                      <IoMdCheckmarkCircle className="text-2xl ml-1" />
                    </span>
                  )}
                  {responseMessage === "error" && (
                    <span className="text-red-600">
                      Message sending failed. Please try again
                    </span>
                  )}
                </p>

                <button
                  type="submit"
                  disabled={disAbleButton}
                  className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-blue-500 rounded-xl group disabled:cursor-not-allowed disabled:opacity-[0.5]"
                >
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-blue-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-blue-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    {loading ? (
                      <Loader textColor="text-black" fillColor="fill-white" />
                    ) : (
                      <span>Send Message</span>
                    )}
                  </span>
                </button>
              </fieldset>

              <ul className="flex gap-6 justify-center my-4 mt-8 text-3xl items-center">
                <li className="text-blue-500 dark:hover:text-white hover:text-black">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    title="Facebook"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </Link>
                </li>

                <li className="text-blue-500 dark:hover:text-white hover:text-black">
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    title="Twitter"
                    aria-label="Twitter"
                    className="text-4xl"
                  >
                    <AiFillTwitterCircle />
                  </Link>
                </li>

                <li className="text-blue-500 dark:hover:text-white hover:text-black">
                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    title="Instagram"
                    aria-label="Instagram"
                    className="text-4xl"
                  >
                    <AiFillInstagram />
                  </Link>
                </li>

                <li className="text-blue-500 dark:hover:text-white hover:text-black">
                  <Link
                    href="https://www.linkedin.com"
                    target="_blank"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <BsLinkedin />
                  </Link>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
