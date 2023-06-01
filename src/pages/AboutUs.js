import Head from "next/head";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us-Udohs</title>
      </Head>

      <div className="flex justify-center">
        <div className="p-4 flex-[0_1_500px] min-[800px]:flex-[0_1_800px]">
          <h1 className="text-center text-2xl uppercase font-bold mb-2">
            About us
          </h1>

          <div className="min-[800px]:grid min-[800px]:grid-cols-2 gap-4">
            <p className="text-justify col-start-1 col-end-1 row-end-1 row-start-1 self-center">
              <q className="italic font-bold">
                We just love beautiful and affordable clothes.
              </q>{" "}
              We are disappointed at how expensive and boring clothing materials
              are. Udohs is the perfect online shop for cloth lovers who are
              tired of overpaying. Our pursuit of affordable cloth inspired the
              creation and the need to bridge the gap between price and quality.
            </p>

            <picture>
              <img
                src="/About.webp"
                alt="Clothes on a hanger"
                className="rounded-3xl my-2 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]"
              />
            </picture>
          </div>

          <div className="min-[800px]:flex justify-center">
            <div className="my-4 flex-[0_1_650px]">
              <p className="text-justify">
                Udohs is Abuja&apos;s driving fashion store and home to the
                eponymous Udohs brand. A by-and-by curated determination of
                brands that are connected by a mix of tender loving care,
                quality, and craftsmanship.
              </p>

              <p className="text-justify my-4">
                Udohs started in Abuja city in 2023 with two good friends. Our
                goal is to prove that beautiful, affordable and quality clothes
                exist. Some of the feature concepts of Udohs include exploring
                new designs, collaborating with other brands around the world
                for more awesome designs and materials, as well as discounted
                sales for special occasions.
              </p>

              <p className="text-justify mb-2">
                Our site intends to empower you to explore classification of
                items in our store. On the off chance that you are uncertain or
                discovering challenges utilizing our site, kindly get in touch
                with us.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
