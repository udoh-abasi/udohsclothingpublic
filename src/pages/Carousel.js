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
        animationHandler="fade"
        swipeScrollTolerance={5}
        transitionTime={1000}
        showStatus={false}
        interval={5000}
        stopOnHover={false}
      >
        <picture>
          <source srcSet="/Home_page1-Large.webp" media="(min-width:520px)" />
          <source
            srcSet="/Home_page1-small.webp"
            media="(max-width:519.999px)"
          />
          <img src="/Home_page1-Large.webp" alt="A happy family" />
        </picture>

        <picture>
          <source srcSet="/Home_page2-Large.webp" media="(min-width:520px)" />
          <source
            srcSet="/Home_page2-small.webp"
            media="(max-width:519.999px)"
          />
          <img src="/Home_page2-Large.webp" alt="A happy family" />
        </picture>

        <picture>
          <source srcSet="/Home_page3-Large.webp" media="(min-width:520px)" />
          <source
            srcSet="/Home_page3-small.webp"
            media="(max-width:519.999px)"
          />
          <img src="/Home_page3-Large.webp" alt="A happy family" />
        </picture>

        <picture>
          <source srcSet="/Home_page4-Large.webp" media="(min-width:520px)" />
          <source
            srcSet="/Home_page4-small.webp"
            media="(max-width:519.999px)"
          />
          <img src="/Home_page4-Large.webp" alt="A happy family" />
        </picture>
      </Carousel>
    </div>
  );
};
