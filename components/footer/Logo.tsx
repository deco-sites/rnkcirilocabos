import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
    alternativeText: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col">
          <div class="w-28 max-h-16">
            <img
              loading="lazy"
              src={logo?.image}
              alt={logo?.alternativeText || "Logo"}
              width={200}
              height={200}
            />
          </div>
          {logo?.description && (
            <div>
              {logo.description}
            </div>
          )}
        </div>
      )}
    </>
  );
}
