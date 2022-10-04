// Reference: https://easings.net/#
function easeOutQuart(progress: number): number {
  return 1 - Math.pow(1 - progress, 4);
}

function easeInQuint(progress: number): number {
  return progress * progress * progress * progress * progress;
}

function easeInElastic(progress: number): number {
  const c4 = (2 * Math.PI) / 3;

  return progress === 0
    ? 0
    : progress === 1
    ? 1
    : -Math.pow(2, 10 * progress - 10) * Math.sin((progress * 10 - 10.75) * c4);
}

function easeOutElastic(progress: number): number {
  const c4 = (2 * Math.PI) / 3;

  return progress === 0
    ? 0
    : progress === 1
    ? 1
    : Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1;
}

function easeOutExpo(progress: number): number {
  return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
}

function linear(progress: number): number {
  return progress;
}

const timingFunctions = {
  easeOutQuart,
  easeInQuint,
  easeInElastic,
  easeOutElastic,
  easeOutExpo,
  linear,
};

export type TimingFunctionName = keyof typeof timingFunctions;

export const isTimingFunction = (name: string): name is TimingFunctionName => {
  return name in timingFunctions;
};

export default timingFunctions;
