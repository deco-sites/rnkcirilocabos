import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center text-white">
      <a
        href={url}
        class="group-hover:bg-[#bb1b1a] text-[16px] font-thin p-4 rounded-t-lg"
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed opacity-0 hover:opacity-100 group-hover:opacity-100 bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen transition pointer-events-none hover:pointer-events-auto group-hover:pointer-events-auto"
            style={{ top: headerHeight, left: "0px" }}
          >
            <div class="container px-3">
              <ul>
                {children.map((node) => (
                  <li class="py-6">
                    <a class="text-black hover:underline" href={node.url}>
                      <span>{node.name}</span>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.children?.map((leaf) => (
                        <li>
                          <a class="text-black hover:underline" href={leaf.url}>
                            <span class="text-xs">{leaf.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            {
              /* {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )} */
            }
          </div>
        )}
    </li>
  );
}

export default NavItem;
