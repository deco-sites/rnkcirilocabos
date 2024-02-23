import { useId } from "preact/hooks";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Container from "$store/sections/Layout/Container.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

export type Variant = "front-back" | "slider" | "auto";

export type ShareableNetwork = "Facebook" | "Twitter" | "Email" | "WhatsApp";

export interface Props {
  page: ProductDetailsPage | null;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
  shipmentPolitics?: {
    label: string;
    link: string;
  };
  shareableNetworks?: ShareableNetwork[];
}

const WIDTH = 500;
const HEIGHT = 500;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div className="w-full flex justify-center items-center py-28">
      <div className="flex flex-col items-center justify-center gap-6">
        <span className="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const platform = usePlatform();

  const {
    breadcrumbList,
    product,
  } = page;

  const {
    productID,
    offers,
    name,
    isVariantOf,
    additionalProperty = [],
  } = product;

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

  return (
    <>
      {/* Code and name */}
      <div className="mt-4 sm:mt-0">
        <div className="flex items-center justify-between gap-2">
          <h1>
            <span className="font-normal capitalize text-[24px]">
              {name}
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
        {productID && (
          <div className="text-black text-xs mt-4">
            <span className="font-bold">Produto:</span> {productID}
          </div>
        )}
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
      {/* Add to Cart button */}
      <div className="mt-4 lg:mt-10 flex md:flex-row flex-col gap-[30px]">
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
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
}: {
  page: ProductDetailsPage;
  variant: Variant;
}) {
  const { product, breadcrumbList } = page;
  const { description } = product;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  /**
   * Product slider variant
   */
  if (variant === "slider") {
    return (
      <>
        {/* Breadcrumb */}
        <div className="lg:py-4 py-2">
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
        </div>
        <div
          id={id}
          className="flex flex-col lg:flex-row gap-4"
        >
          {/* Product Images */}
          <div className="flex flex-col xl:flex-row-reverse relative lg:items-start gap-4 w-full">
            {/* Image Slider */}
            <div className="relative w-full">
              <div class="flex items-center justify-center">
                <Slider className="carousel carousel-center gap-6 box-border lg:box-content w-full px-4 lg:px-0">
                  {images.map((img, index) => (
                    <Slider.Item
                      index={index}
                      className="carousel-item w-full justify-center"
                    >
                      <Image
                        className="w-full rounded-[10px]"
                        sizes="(max-width: 640px) 100vw, 40vw"
                        style={{
                          aspectRatio: ASPECT_RATIO,
                          maxWidth: WIDTH,
                          maxHeight: HEIGHT,
                        }}
                        src={img.url!}
                        alt={img.alternateName}
                        width={WIDTH}
                        height={HEIGHT}
                        preload={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </Slider.Item>
                  ))}
                </Slider>
              </div>

              {/* Dots */}
              <div className="lg:self-start">
                <ul className="flex gap-2 overflow-auto lg:max-h-min lg:flex-1 lg:justify-start">
                  {images.map((img, index) => (
                    <li>
                      <Slider.Dot index={index}>
                        <div className="flex items-center justify-center w-[58px] h-[58px] group-disabled:border-base-300 border rounded overflow-hidden">
                          <Image
                            style={{ aspectRatio: ASPECT_RATIO }}
                            className="border-neutral hover:border-secondary-focus group-disabled:border-secondary-focus border-2 rounded-[10px]"
                            width={WIDTH / 5}
                            height={HEIGHT / 5}
                            src={img.url!}
                            alt={img.alternateName}
                          />
                        </div>
                      </Slider.Dot>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:max-w-[748px] w-full">
            <ProductInfo page={page} />
          </div>
        </div>
        {description && (
          <div className="mt-4 sm:mt-6">
            <span className="text-sm">
              <h2 className="font-bold text-lg mb-3">Descrição</h2>
              <div
                className="text-[#717786]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </span>
          </div>
        )}
        <SliderJS rootId={id}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[50vw_25vw] lg:grid-rows-1 lg:justify-center">
      {/* Image slider */}
      <ul className="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li className="carousel-item min-w-[100vw] lg:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div className="px-4 lg:pr-0 lg:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({
  page,
  variant: maybeVar = "auto",
}: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <Container>
      {page
        ? (
          <Details
            page={page}
            variant={variant}
          />
        )
        : <NotFound />}
    </Container>
  );
}

export default ProductDetails;
