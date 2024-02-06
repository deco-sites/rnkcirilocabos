import type { Product } from "apps/commerce/types.ts";

interface Props { product: Product; }

function ProductDescription({product}: {product: Product}) {
    // Descrição do Produto
    const description = product.description || (product.isVariantOf && product.isVariantOf.description);

    // Verificando se há propriedades de vídeo;
    const videoProperties = product.isVariantOf?.additionalProperty?.filter( (property) => property.name === "Video");

    // Construindo o iframe se houver link;
    const videoIframe = videoProperties?.map((video) => {
        // Convertendo a URL para o formato correto do YouTube;
        const embedUrl = video.value?.includes("youtube.com/watch")
        ? video.value.replace("/watch?v=", "/embed/")
        : video.value;

        // Remover parâmetros adicionais da URL
        const clearUrl = embedUrl?.split("&")[0];

        return `<iframe width="560" height="315" src="${clearUrl}" frameborder="0" allowfullscreen></iframe>`;
    });

    return(
    <>
        {/* Description card */}
        <div class="mt-4 sm:mt-6">
            <span class="text-sm">
            {description && (
                <details>

                    <summary class="cursor-pointer">Descrição</summary>
                    <div class="ml-2 mt-2" dangerouslySetInnerHTML={{ __html: description }} />

                    {/* Adicionando o iframe do vídeo */}
                    {videoIframe && videoIframe.map((iframe) => ( <div dangerouslySetInnerHTML={{ __html: iframe }} /> ))}

                </details>
            )}
            </span>
        </div>
    </>)
}

export default ProductDescription;