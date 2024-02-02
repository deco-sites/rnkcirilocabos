import { clx } from "../../sdk/clx.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { header } from "../../constants.tsx";
import type { Props as ProductShelfProps } from "../product/ProductShelf.tsx";

/** @titleBy url */
export interface NavigationTemplate {
  /** The name of the item. */
  name?: string;
  /** URL of the item. */
  url?: string;
}

export interface Navigation extends NavigationTemplate {
  children?: Array<
    NavigationTemplate & {
      children?: Array<
        NavigationTemplate & {
          children?: Array<
            NavigationTemplate & {
              children?: Array<
                NavigationTemplate & {
                  children?: NavigationTemplate[];
                }
              >;
            }
          >;
        }
      >;
    }
  >;
  shelf?: ProductShelfProps;
}
export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  alerts?: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: Navigation[] | null;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  buttons?: Buttons;
}

function Header({
  alerts,
  searchbar,
  navItems = [
    {
      name: "Feminino",
      url: "/",
    },
    {
      name: "Masculino",
      url: "/",
    },
    {
      name: "Sale",
      url: "/",
    },
    {
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "left",
  buttons,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header
        class={clx(
          "block",
          header.desk.height,
          header.mobi.height,
        )}
      >
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-danger fixed w-full z-50">
            {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
            <div class="container px-3">
              <Navbar
                items={items}
                searchbar={searchbar && { ...searchbar, platform }}
                logo={logo}
                logoPosition={logoPosition}
                buttons={buttons}
              />
            </div>
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
