import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useDetectScroll } from "@smakss/react-scroll-direction";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export const ProductDisplayPage = () => {
  const [clothdata, setClothData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clothState, setClothState] = useState(""); // The query parameter is set here, so we can send it to the next page below

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

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (cloth) => {
      try {
        const response = await fetch(`/api/getData/${cloth}`);
        if (response.ok) {
          const data = await response.json();
          setClothData(data.theData);
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
      const { cloth } = query;
      setClothState(cloth);

      fetchData(cloth);
    }
  }, [router.isReady, clothState, router]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <>Page does Not Exist</>;
  } else {
    return (
      <>
        <Head>
          <title>{clothState} products display - Udohs</title>
        </Head>

        <section className="my-10">
          <h1 className="uppercase text-center font-bold text-3xl max-[500px]:text-2xl">
            Product Display
          </h1>

          <div className="my-5 mx-2 min-[500px]:mx-5 grid grid-cols-2 gap-[30px] justify-items-center min-[700px]:grid-cols-3 min-[1000px]:grid-cols-4">
            {clothdata.map(({ id, image, name, price }) => (
              <Link
                href={`/ProductPage/${id}?category=${clothState}`}
                className="max-w-[300px]"
                key={id}
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
            ))}
          </div>

          {currentScrollPosition > 200 && scrollDir === "up" && (
            <a
              href="#logo"
              className="flex items-center flex-col fixed bottom-5 right-2 text-black dark:text-[#f3ec78] font-bold"
            >
              <BsFillArrowUpCircleFill className="text-3xl" /> To Top
            </a>
          )}
        </section>
      </>
    );
  }
};

export default ProductDisplayPage;
