import React from "react";
import { IconList } from ".";

export type IconName = keyof typeof IconList;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  viewBox?: string;
}

const Icon: React.FC<IconProps> = ({ name, size, viewBox, ...rest }) => {
  const SvgIcon = IconList[name];

  return (
    <SvgIcon
      {...(size ? { width: size, height: size } : {})}
      {...(viewBox ? { viewBox } : {})}
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    />
  );
};

export default Icon;
// preserveAspectRatio="xMidYMid meet"
