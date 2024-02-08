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

// Container Principal;
function ProductContainer({ page, layout }: Props) {
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
  const { price = 0, listPrice, seller = "1", installments, availability } =
    useOffer(offers);
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

  return (
    <>
      <div class="container px-3">
        {/* Breadcrumb */}
        <div class="lg:py-4 py-2">
            <Breadcrumb itemListElement={breadcrumb.itemListElement} />
        </div>

        {/* Product Sections */}
        <div class="flex flex-wrap">
          {/* Imagem do Produto */}
          <div class="w-full lg:w-1/3 bg-gray-300 p-4"></div>

          {/* Caixa de Ação */}
          <div class="w-full lg:w-2/3 px-4">
            {/* Code and name */}
            <div class="mt-4 sm:mt-8">
              <div>
                {gtin && <span class="text-sm text-base-300">Cod. {gtin}</span>}
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
            <div class="mt-4">
              <div class="flex flex-row gap-2 items-center">
                {(listPrice ?? 0) > price && (
                  <span class="line-through text-base-300 text-xs">
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </span>
                )}
                <span class="font-medium text-xl text-secondary">
                  {formatPrice(price, offers?.priceCurrency)}
                </span>
              </div>
              <span class="text-sm text-base-300">{installments}</span>
            </div>

            {/* Sku Selector */}
            <div class="mt-4 sm:mt-6">
              <ProductSelector product={product} />
            </div>

            {/* Add to Cart and Favorites button */}
            <div class="mt-4 sm:mt-10 flex flex-col gap-2">
              {availability === "https://schema.org/InStock"
                ? (
                  <>
                    {platform === "vtex" && (
                      <>
                        <AddToCartButtonVTEX
                          eventParams={{ items: [eventItem] }}
                          productID={productID}
                          seller={seller}
                        />
                        <WishlistButtonVtex
                          variant="full"
                          productID={productID}
                          productGroupID={productGroupID}
                        />
                      </>
                    )}
                    {platform === "wake" && (
                      <>
                        <AddToCartButtonWake
                          eventParams={{ items: [eventItem] }}
                          productID={productID}
                        />
                        <WishlistButtonWake
                          variant="full"
                          productID={productID}
                          productGroupID={productGroupID}
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

            {/* Shipping Simulation */}
            <div class="mt-8">
              {platform === "vtex" && (
                <ShippingSimulation
                  items={[
                    {
                      id: Number(product.sku),
                      quantity: 1,
                      seller: seller,
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
        {/* Descrição do Produto */}
        <ProductDescription product={product} />
      </div>
    </>
  );
}

export default ProductContainer;