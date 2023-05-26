export const Footer = () => {
  const date = new Date();
  return (
    <>
      <hr className="bg-black h-[7px] dark:bg-white mb-6" />
      <footer className="p-7 text-justify font-bold flex flex-col items-center">
        &copy;{date.getFullYear()}
        <p className="my-5 max-w-[700px]">
          This is a fictitious company created by Udoh Abasi, solely for
          training. Any resemblance to real products or services is purely
          coincidental.
        </p>
        <p className="mb-5 max-w-[700px]">
          Information provided about the products or services is also fictitious
          and should not be construed as representative of actual products or
          services on the market in a similar product or service category.
        </p>
      </footer>
    </>
  );
};
