import { useEffect, type RefObject } from "react";

export type ModalAnimationType =
  | "fade-in"
  | "fade-out"
  | "slide-up"
  | "slide-down"
  | "fade-in-slide-up"
  | "fade-in-slide-down"
  | "fade-out-slide-up"
  | "fade-out-slide-down"
  | "custom-enter"
  | "custom-exit";

export type EnterAnimation = Exclude<
  ModalAnimationType,
  "fade-out" | "fade-out-slide-up" | "fade-out-slide-down" | "custom-exit"
>;
export type ExitAnimation = Exclude<
  ModalAnimationType,
  "fade-in" | "fade-in-slide-up" | "fade-in-slide-down" | "custom-enter"
>;

export interface CustomAnimation {
  name: string;
  keyframes: string;
  duration: string;
  options?: Omit<
    React.CSSProperties,
    "animation" | "animationName" | "animationDuration"
  >;
}

interface UseAnimationParams {
  ref: RefObject<HTMLElement> | null;
  enterAnimation?: EnterAnimation;
  exitAnimation?: ExitAnimation;
  animationDuration?: string | number;
  duration?: string;
  slideAnimationDistance?: string;
  customAnimations?: {
    enter?: CustomAnimation;
    exit?: CustomAnimation;
  };
}

const stylesInjected: Record<string, boolean> = {};

const defaultStyles = (slideAnimationDistance: string, duration: string) => `
.fade-in {
  -webkit-animation: ${duration} ease-out forwards fadeIn;
          animation: ${duration} ease-out forwards fadeIn;
}

.fade-out {
  -webkit-animation: ${duration} ease-out forwards fadeOut;
          animation: ${duration} ease-out forwards fadeOut;
}

.slide-up {
  -webkit-animation: ${duration} ease-out forwards slideUp;
          animation: ${duration} ease-out forwards slideUp;
}

.slide-down {
  -webkit-animation: ${duration} ease-out forwards slideDown;
          animation: ${duration} ease-out forwards slideDown;
}

.fade-in-slide-up {
  -webkit-animation: ${duration} ease-out forwards fadeInSlideUp;
          animation: ${duration} ease-out forwards fadeInSlideUp;
}

.fade-in-slide-down {
  -webkit-animation: ${duration} ease-out forwards fadeInSlideDown;
          animation: ${duration} ease-out forwards fadeInSlideDown;
}

.fade-out-slide-up {
  -webkit-animation: ${duration} ease-out forwards fadeOutSlideUp;
          animation: ${duration} ease-out forwards fadeOutSlideUp;
}

.fade-out-slide-down {
  -webkit-animation: ${duration} ease-out forwards fadeOutSlideDown;
          animation: ${duration} ease-out forwards fadeOutSlideDown;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes slideUp { from { transform: translateY(${slideAnimationDistance}); } to { transform: translateY(0); } }
@keyframes slideDown { from { transform: translateY(0); } to { transform: translateY(${slideAnimationDistance}); } }
@keyframes fadeInSlideUp { from { opacity: 0; transform: translateY(${slideAnimationDistance}); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInSlideDown { from { opacity: 0; transform: translateY(-${slideAnimationDistance}); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeOutSlideUp { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-${slideAnimationDistance}); } }
@keyframes fadeOutSlideDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(${slideAnimationDistance}); } }
`;

const injectStyle = (slideAnimationDistance: string, duration: string) => {
  if (stylesInjected["default-styles"]) return;
  const styleTag = document.createElement("style");
  styleTag.appendChild(
    document.createTextNode(defaultStyles(slideAnimationDistance, duration)),
  );
  document.head.appendChild(styleTag);

  stylesInjected["default-styles"] = true;
};

const applyCustomAnimation = (customAnimation: CustomAnimation) => {
  if (stylesInjected[customAnimation.name]) return;

  const styleTag = document.createElement("style");
  styleTag.appendChild(document.createTextNode(customAnimation.keyframes));
  document.head.appendChild(styleTag);

  stylesInjected[customAnimation.name] = true;
};

const useAnimation = ({
  ref,
  enterAnimation,
  exitAnimation,
  animationDuration = "${duration}",
  slideAnimationDistance = "20px",
  customAnimations,
  duration = "0.2s",
}: UseAnimationParams) => {
  useEffect(() => {
    injectStyle(slideAnimationDistance, duration);

    if (customAnimations?.enter) {
      applyCustomAnimation(customAnimations.enter);
    }
    if (customAnimations?.exit) {
      applyCustomAnimation(customAnimations.exit);
    }

    const element = ref?.current;

    if (!element) return;

    if (enterAnimation) {
      element.classList.add(enterAnimation);
      if (exitAnimation) element.classList.remove(exitAnimation);
    } else if (customAnimations?.enter) {
      element.style.animation = `${customAnimations.enter.name} ${customAnimations.enter.duration} ease-out forwards`;
    }

    return () => {
      if (exitAnimation) {
        element.classList.add(exitAnimation);
        if (enterAnimation) element.classList.remove(enterAnimation);
      } else if (customAnimations?.exit) {
        element.style.animation = `${customAnimations.exit.name} ${customAnimations.exit.duration} ease-out forwards`;
      }
    };
  }, [
    ref,
    enterAnimation,
    exitAnimation,
    animationDuration,
    slideAnimationDistance,
    customAnimations,
    duration,
  ]);
};

export default useAnimation;
