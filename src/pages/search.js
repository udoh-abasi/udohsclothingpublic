import Head from "next/head";
import allClothes from "../../public/udohsClothingApi.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "./Loader";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      const { searchTerm } = query;

      if (searchTerm) {
        setSearchQuery(searchTerm);
      }
    }
  }, [router]);

  useEffect(() => {
    const category = ["women", "men", "children"];

    const getSearchClothes = () => {
      const theResult = [];

      category.map((eachCategory) => {
        const theCategory = allClothes[eachCategory];

        theCategory.map((eachCloth) => {
          if (
            eachCloth.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            theResult.push(eachCloth);
          }
        });
      });

      setSearchResult(theResult);
      setLoading(false);
    };

    if (searchQuery) {
      getSearchClothes();
    } else {
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>Search - {searchQuery} - Udohs</title>
      </Head>

      {loading ? (
        <div>
          Loading... <Loader textColor="text-black" fillColor="fill-white" />
        </div>
      ) : (
        <div>
          {!searchResult.length && (
            <section className="my-10 min-[740px]:flex justify-center">
              <div className="max-w-[700px]">
                <h1 className="uppercase text-center font-bold text-2xl max-[500px]:text-xl">
                  Nothing matches your search
                </h1>

                <p className="p-4 text-center">
                  But don&apos;t give up. Check the spelling or try less
                  specific search terms.
                </p>

                <p className="flex justify-center items-center uppercase font-bold my-6 before:mr-2 before:h-[1px] before:w-[800px] before:bg-gray-400 after:h-[1px] after:w-[800px]  after:bg-gray-400 after:ml-2">
                  or
                </p>

                <div className="flex justify-center">
                  <div className="w-[70%] max-w-[287px] mb-5 flex justify-center items-center flex-col min-[740px]:flex-row min-[740px]:w-full min-[740px]:max-w-none">
                    <Link
                      href="/ProductDisplayPage/men"
                      className="relative block text-lg group w-full mb-5 min-[740px]:mb-0"
                    >
                      <span className="relative z-1 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative flex justify-center">
                          SHOP MEN
                        </span>
                      </span>
                      <span
                        className="absolute bottom-0 z-[-10] right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                        data-rounded="rounded-lg"
                      ></span>
                    </Link>

                    <Link
                      href="/ProductDisplayPage/women"
                      className="relative block text-lg group w-full mb-5 min-[740px]:mb-0 min-[740px]:mx-5"
                    >
                      <span className="relative z-1 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative flex justify-center">
                          SHOP WOMEN
                        </span>
                      </span>
                      <span
                        className="absolute bottom-0 z-[-10] right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                        data-rounded="rounded-lg"
                      ></span>
                    </Link>

                    <Link
                      href="/ProductDisplayPage/children"
                      className="relative block text-lg group w-full"
                    >
                      <span className="relative z-1 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative flex justify-center">
                          SHOP CHILDREN
                        </span>
                      </span>
                      <span
                        className="absolute bottom-0 z-[-10] right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                        data-rounded="rounded-lg"
                      ></span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {!!searchResult.length && (
            <section className="my-10">
              <h1 className="uppercase text-center font-bold text-3xl max-[500px]:text-2xl">
                Search
              </h1>

              <p className="p-3">
                Search result for: <q className="italic">{searchQuery}</q>
              </p>

              <div className="my-5 mx-2 min-[500px]:mx-5 grid grid-cols-2 gap-[30px] justify-items-center min-[740px]:grid-cols-3 min-[1000px]:grid-cols-4">
                {searchResult.map(({ id, image, name, price, category }) => (
                  <Link
                    href={`/ProductPage/${id}?category=${category}`}
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
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
