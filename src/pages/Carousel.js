import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const HomeMainCarousel = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        useKeyboardArrows={true}
        animationHandler="slide"
        swipeScrollTolerance={5}
        showStatus={false}
        interval={5000}
        stopOnHover={true}
      >
        <div className="grid">
          <picture className="row-start-1 col-start-1">
            <source srcSet="/Home_page1-Large.webp" media="(min-width:520px)" />
            <source
              srcSet="/Home_page1-small.webp"
              media="(max-width:519.999px)"
            />
            <img src="/Home_page1-Large.webp" alt="A happy family" />
          </picture>

          <div
            className="flex justify-center items-center flex-col row-start-1 col-start-1 self-end mb-10"
            id="Carousel"
          >
            <p className="text-4xl font-bold mb-5 ">This is UDOHS</p>

            <div
              id="CarouselButtons"
              className="w-[70%] max-w-[287px] mb-5 flex justify-center items-center flex-col"
            >
              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">SHOP MEN</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP WOMEN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP CHILDREN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid">
          <picture className="row-start-1 col-start-1">
            <source srcSet="/Home_page2-Large.webp" media="(min-width:520px)" />
            <source
              srcSet="/Home_page2-small.webp"
              media="(max-width:519.999px)"
            />
            <img src="/Home_page2-Large.webp" alt="A happy family" />
          </picture>

          <div
            className="flex justify-center items-center flex-col row-start-1 col-start-1 self-end mb-10"
            id="Carousel"
          >
            <p className="text-4xl font-bold mb-5">This is UDOHS</p>

            <div
              id="CarouselButtons"
              className="w-[70%] max-w-[287px] mb-5 flex justify-center items-center flex-col"
            >
              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">SHOP MEN</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP WOMEN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP CHILDREN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid">
          <picture className="row-start-1 col-start-1">
            <source srcSet="/Home_page3-Large.webp" media="(min-width:520px)" />
            <source
              srcSet="/Home_page3-small.webp"
              media="(max-width:519.999px)"
            />
            <img src="/Home_page3-Large.webp" alt="A happy family" />
          </picture>

          <div
            className="flex justify-center items-center flex-col row-start-1 col-start-1 self-end mb-10"
            id="Carousel"
          >
            <p className="text-4xl font-bold mb-5">This is UDOHS</p>

            <div
              id="CarouselButtons"
              className="w-[70%] max-w-[287px] mb-5 flex justify-center items-center flex-col"
            >
              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">SHOP MEN</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP WOMEN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP CHILDREN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid">
          <picture className="row-start-1 col-start-1">
            <source srcSet="/Home_page4-Large.webp" media="(min-width:520px)" />
            <source
              srcSet="/Home_page4-small.webp"
              media="(max-width:519.999px)"
            />
            <img src="/Home_page4-Large.webp" alt="A happy family" />
          </picture>

          <div
            className="flex justify-center items-center flex-col row-start-1 col-start-1 self-end mb-10"
            id="Carousel"
          >
            <p className="text-4xl font-bold mb-5">This is UDOHS</p>

            <div
              id="CarouselButtons"
              className="w-[70%] max-w-[287px] mb-5 flex justify-center items-center flex-col"
            >
              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">SHOP MEN</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full mb-5">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP WOMEN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>

              <a href="#_" className="relative block text-lg group w-full">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-full h-52 pr-4 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative flex justify-center">
                    SHOP CHILDREN
                  </span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
