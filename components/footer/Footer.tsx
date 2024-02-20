import { clx } from "$store/sdk/clx.ts";
import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import Social from "$store/components/footer/Social.tsx";
import ButtonLinks from "$store/components/footer/ButtonLinks.tsx";
import Stores from "$store/components/footer/Stores.tsx";
import ClearSale from "$store/components/footer/ClearSale.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  hide?: {
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    backToTheTop?: boolean;
    buttonLinks?: boolean;
    stores?: boolean;
    clearSale?: boolean;
  };
}

interface ButtonLinksInterface {
  title?: string;
  links?: (Item & { outline?: boolean })[];
}

interface StoreInterface {
  stores?: Item[];
}

interface ClearSaleInterface {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Props {
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  backToTheTop?: {
    text?: string;
  };
  buttonLinks?: ButtonLinksInterface;
  stores?: Item[];
  clearSale?: ClearSaleInterface;
  layout?: Layout;
}

function Footer({
  clearSale,
  stores = [{
    label: "Rua do Triunfo, 65 - com Estacionamento Fone: (11) 3224-1020",
    href:
      "https://www.google.com/maps/place/Cirilo+Cabos/@-23.5374594,-46.6396246,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce585a42e4708b:0x8bb4f9c742a18bad!8m2!3d-23.5374594!4d-46.6374359",
  }, {
    label: "Rua Aurora, 178 - Loja 24 Fone: (11) 3331-7985",
    href:
      "https://www.google.com/maps/place/R.+Aurora,+178+-+Santa+Ifig%C3%AAnia,+S%C3%A3o+Paulo+-+SP,+01209-000/@-23.5385049,-46.6407726,17z/data=!3m1!4b1!4m9!1m2!2m1!1sRua+Aurora,+178+-+Loja+24!3m5!1s0x94ce585a5b409939:0x5557572a7ff359ef!8m2!3d-23.5385098!4d-46.6385839!15sChlSdWEgQXVyb3JhLCAxNzggLSBMb2phIDI0kgEQY29tcG91bmRfc2VjdGlvbg",
  }],
  buttonLinks,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  backToTheTop,
  layout = {
    hide: {
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      backToTheTop: false,
      buttonLinks: false,
      stores: false,
      clearSale: false,
    },
  },
}: Props) {
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _buttonLinks = layout?.hide?.buttonLinks
    ? <></>
    : <ButtonLinks content={buttonLinks} />;
  const _stores = layout?.hide?.stores ? <></> : <Stores stores={stores} />;
  const _clearSale = layout?.hide?.clearSale
    ? <></>
    : (
      <div class="flex justify-center py-5">
        <ClearSale content={clearSale} />
      </div>
    );

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10",
        ColorClasses(layout),
      )}
    >
      <div class="bg-danger py-5">
        <div class="container px-3">
          {_newsletter}
        </div>
      </div>
      <div class="bg-dark text-white">
        <div class="lg:container lg:mx-auto px-3">
          <div class="flex flex-col">
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between py-5">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-[428px]">
                <div class="flex flex-col gap-2">
                  {_buttonLinks}
                </div>
                <div class="flex flex-col">
                  {_stores}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center py-5">
              {_payments}
              {_social}
            </div>
          </div>
        </div>
      </div>
      {_clearSale}
      <div class="bg-dark text-white py-2">
        <p className="text-center">
          <small>2022 @ All Right Reserved to VTEX & Imediata</small>
        </p>
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
