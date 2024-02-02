import { clx } from "$store/sdk/clx.ts";
import type { Navigation } from "./Header.tsx";
import { header } from "$store/constants.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";

function NavItem({ item }: { item: Navigation }) {
  const { url, name, children, shelf } = item;
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
            class={clx(
              "fixed opacity-0 hover:opacity-100 group-hover:opacity-100 bg-base-100 w-screen",
              "z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 transition",
              "pointer-events-none hover:pointer-events-auto group-hover:pointer-events-auto left-0",
              header.desk.top,
            )}
          >
            <div class="container px-3 grid grid-cols-[250px_auto]">
              <ul class="border-r [border-image:linear-gradient(180deg,#fff,#fc2726,#fff)_1_100%]">
                {children.map((node) => (
                  <li class="py-6">
                    <a class="text-danger hover:text-black" href={node.url}>
                      <span>{node.name}</span>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.children?.map((leaf) => (
                        <li>
                          <a
                            class="text-black hover:text-danger"
                            href={leaf.url}
                          >
                            <span class="text-xs">{leaf.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <ProductShelf
                products={shelf?.products ?? []}
                cardLayout={shelf?.cardLayout ?? {}}
                layout={shelf?.layout ?? {}}
              />
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
