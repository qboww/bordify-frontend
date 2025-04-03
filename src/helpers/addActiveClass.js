import clsx from "clsx";

export const addActiveClass = (isActive, classname) => {
  return clsx(isActive && classname);
};