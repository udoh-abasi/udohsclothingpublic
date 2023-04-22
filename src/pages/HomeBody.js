import { useHeaderHeightHook } from "@/customHooks/useHeaderHeightHook";
import styled from "styled-components";

/* NOTE: I also added this to my next.config.js File, in order to use styled-component and nextJs with ease
# It also ensure faster loading in dev environment:

module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}; */

const HomeBody_wrapper = styled.div`
  margin-top: ${(prop) => prop.headerHeight + 20}px;
`;

export const HomeBody = () => {
  const headerHeight = useHeaderHeightHook();

  return (
    <HomeBody_wrapper headerHeight={headerHeight}>
      <div className="">
        <p>This is UDOHS</p>
        <a>SHOP MEN</a>
        <a>SHOP WOMEN</a>
        <a>SHOP CHILDREN</a>

        <figure>
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
        </figure>

        <p>EASY WORLDWIDE DELIVERY</p>
        <p>UDOHS DESIGNS</p>
      </div>
    </HomeBody_wrapper>
  );
};
