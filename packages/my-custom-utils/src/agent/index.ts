export const isIosUser = (agent: string) => {
  return agent.toLocaleLowerCase().match(/(iphone)|(ipod)|(macintosh)|(ipad)/i);
};
