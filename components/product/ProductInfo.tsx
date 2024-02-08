import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductDescription from "./ProductDescription.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

// Componente Principal - Renderiza as informações do Produto;
function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  // Verificação se a página de detalhes do produto foi fornecida
  if (page === null) throw new Error("Missing Product Details Page Info");

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  console.log("lorem", product);

  return (
    <div className="flex flex-col lg:max-w-[748px] lg:w-full" id={id}>
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      {/* Code and name */}
      <div className="mt-4 sm:mt-8">
        <div className="flex items-center justify-between gap-2">
          <h1>
            <span className="font-normal capitalize text-[24px]">
              {layout?.name === "concat"
                ? `${isVariantOf?.name} ${name}`
                : layout?.name === "productGroup"
                ? isVariantOf?.name
                : name}
            </span>
          </h1>
          {/* Favorites button */}
          <div>
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  {platform === "vtex" && (
                    <>
                      <WishlistButtonVtex
                        productID={productID}
                        productGroupID={productGroupID}
                      />
                    </>
                  )}
                  {platform === "wake" && (
                    <>
                      <WishlistButtonWake
                        productID={productID}
                        productGroupID={productGroupID}
                      />
                    </>
                  )}
                </>
              )
              : <OutOfStock productID={productID} />}
          </div>
        </div>
        <h1>
          <span class="font-open-sans text-xl capitalize">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>
      </div>
      {/* Prices */}
      <div className="mt-4">
        <div className="flex flex-col gap-2">
          {(listPrice ?? 0) > price && (
            <span className="text-base-300 text-xs">
              De:{" "}
              <span className="line-through">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            </span>
          )}
          <span className="flex flex-row items-center text-xs gap-1 font-bold leading-none">
            Por:{" "}
            <span className="font-medium text-[30px] text-danger">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </span>
        </div>
        <span className="text-sm text-black">{installments}</span>
      </div>
      {/* Sku Selector */}
      <div className="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart button */}
      <div className="flex flex-col sm:flex-row gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <ShippingSimulation
                    items={[
                      {
                        id: Number(product.sku),
                        quantity: 1,
                        seller: seller,
                      },
                    ]}
                  />
                  <div className="flex flex-col">
                    <AddToCartButtonVTEX
                      eventParams={{ items: [eventItem] }}
                      productID={productID}
                      seller={seller}
                    />
                    <a
                      className="btn btn-outline btn-sm border-green-500 text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 mt-2"
                      href="https://api.whatsapp.com/send?phone=5511946265235&text=Ol%C3%A1%20Cirilo%20gostaria%20de%20mais%20detalhes%20sobre%20este%20produto%3A%20%0A%20https%3A%2F%2Fwww.cirilocabos.com.br%2Fhdmi-extender-tx-rx-extensor-via-cabo-de-rede-ate-120-metros%2Fp%20%0A%201%20-%20Televendas%20%0A%202%20-%20SAC%20%0A%20Digite%20uma%20op%C3%A7%C3%A3o%3A%20"
                    >
                      Comprar pelo WhatsApp
                    </a>
                  </div>
                </>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Description card */}
      <ProductDescription product={product} />

      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
