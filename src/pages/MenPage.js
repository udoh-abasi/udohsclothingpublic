export const MenPage = () => {
  return (
    <div className="my-10">
      <h1 className="uppercase text-center font-bold text-3xl max-[500px]:text-2xl">
        Product Display
      </h1>

      <div className="my-5 mx-2 min-[500px]:mx-5 grid grid-cols-2 gap-[30px] justify-items-center min-[700px]:grid-cols-3 min-[1000px]:grid-cols-4">
        <a href="#_" className="max-w-[300px]">
          <figure className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] dark:shadow-[rgba(255,255,255,0.089)_0px_0px_7px_5px]">
            <picture>
              <source srcSet="/men 1.webp" />
              <img src="/men 1.webp" alt="" loading="lazy" />
            </picture>

            <figcaption>
              <p className="h-[44px] my-3 overflow-hidden text-ellipsis text-center">
                The Children&apos;s Place Girls Basic Super skinny Jean- Blue
              </p>
              <p className="text-center pb-3 text-xl font-bold text-[#af4261] dark:text-[#f3ec78]">
                $26.2
              </p>
            </figcaption>
          </figure>
        </a>
      </div>
    </div>
  );
};
