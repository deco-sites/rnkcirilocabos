import { clx } from "$store/sdk/clx.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Navigation } from "./Header.tsx";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { Buttons, Logo } from "$store/components/header/Header.tsx";

function Navbar({ items, searchbar, logo, buttons, logoPosition = "left" }: {
  items: Navigation[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  buttons?: Buttons;
  logoPosition?: "left" | "center";
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div class="lg:hidden grid grid-cols-3 justify-between items-center w-full pb-3 gap-2 text-white">
        <MenuButton />
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}

        <div class="flex justify-end gap-1">
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:grid lg:grid-cols-[auto_minmax(500px,_1fr)_auto] items-center w-full gap-3">
        <div
          class={clx(
            "flex",
            `${logoPosition === "left" ? "justify-start" : "justify-center"}`,
          )}
        >
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
                style={{ minWidth: 100 }}
              />
            </a>
          )}
        </div>

        <Searchbar searchbar={searchbar} />

        <div class="flex-none flex items-center justify-end gap-2 col-span-1 text-white">
          <div class="text-white text-xs">
            <p>SAC (11) 3224-1020</p>
            <p>
              <a
                href="https://api.whatsapp.com/send?phone=5511946265235"
                class="underline flex items-center gap-2"
              >
                <Icon id="WhatsApp" size={20} />
                (11) 9462-65235
              </a>
            </p>
            <p>
              <a href="mailto:sac@cirilocabos.com.br" class="underline">
                sac@cirilocabos.com.br
              </a>
            </p>
          </div>
          {!buttons?.hideSearchButton && (
            <div class="flex items-center text-xs font-thin gap-1">
              <SearchButton />SEARCH
            </div>
          )}
          {!buttons?.hideAccountButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/account"
              aria-label="Account"
            >
              <div class="flex btn btn-circle btn-ghost gap-1">
                <Icon id="User" size={20} strokeWidth={0.4} />
              </div>
            </a>
          )}
          {!buttons?.hideWishlistButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <div class="flex btn btn-circle btn-ghost gap-1">
                <Icon id="Heart" size={24} strokeWidth={0.4} />
              </div>
            </a>
          )}
          {!buttons?.hideCartButton && (
            <div class="flex items-center text-xs font-thin">
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />}
            </div>
          )}
        </div>
      </div>
      <div class="hidden lg:flex gap-2 justify-start mt-[27px]">
        {items.map((item) => <NavItem item={item} />)}
      </div>
    </>
  );
}

export default Navbar;
