import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";
import type { Alerts } from "./Header.tsx";

// /**
//    * @title Ícone
//    * @description escolha o ícone pelo ID
//    */
// iconId: IconsId;

export interface Props {
  alerts?: Alerts[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="flex items-start h-[24px] lg:mb-[27px] mb-3">
      <Slider class="carousel carousel-center w-screen bg-secondary gap-6">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-[12px] text-secondary-content flex justify-center items-center w-screen h-[24px] gap-2">
              {alert.icon && <Icon id={alert.icon} size={20} />}
              {alert.text}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
