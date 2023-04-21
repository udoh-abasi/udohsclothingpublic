export const HomeBody = () => {
  return (
    <div>
      <p>This is UDOHS</p>
      <a>SHOP MEN</a>
      <a>SHOP WOMEN</a>

      <figure>
        <picture>
          <source srcset="/Home_page1-Large.webp" media="(min-width:452px)" />
          <source srcset="/Home_page1-small.webp" media="(max-width:451px)" />
          <img src="/Home_page1-Large.webp" alt="A happy family" />
        </picture>

        <picture>
          <source srcset="/Home_page2-Large.webp" media="(min-width:452px)" />
          <source srcset="/Home_page2-small.webp" media="(max-width:451px)" />
          <img src="/Home_page2-Large.webp" alt="A happy family" />
        </picture>

        <picture>
          <source srcset="/Home_page3-Large.webp" media="(min-width:452px)" />
          <source srcset="/Home_page3-small.webp" media="(max-width:451px)" />
          <img src="/Home_page3-Large.webp" alt="A happy family" />
        </picture>

        <picture>
          <source srcset="/Home_page4-Large.webp" media="(min-width:452px)" />
          <source srcset="/Home_page4-small.webp" media="(max-width:451px)" />
          <img src="/Home_page4-Large.webp" alt="A happy family" />
        </picture>
      </figure>

      <p>EASY WORLDWIDE DELIVERY</p>
      <p>UDOHS DESIGNS</p>
    </div>
  );
};
