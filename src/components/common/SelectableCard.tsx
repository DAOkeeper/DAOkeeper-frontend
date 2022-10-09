import CheckMiniIcon from '@src/assets/Icon/CheckMiniIcon.svg';
import React, { ReactNode } from 'react';

interface SelectableCardProps {
  isSelected?: boolean;
  className?: string;
  children: string | ReactNode;
  [key: string]: any;
}

function SelectableCard({
  isSelected = false,
  className,
  children,
  ...props
}: SelectableCardProps) {
  return isSelected ? (
    <div
      className={`relative bg-[#ffffff1a] border-solid box-border border-[#3C4EFE] border-[1px] text-[#3C4EFE] w-full h-full flex flex-row justify-center items-center rounded-[28px] font-semibold text-xl cursor-pointer ${className}`}
      {...props}
    >
      <CheckMiniIcon className="absolute left-[96%] top-[-2%]" />
      {children}
    </div>
  ) : (
    <div
      className={`bg-[#ffffff1a] border-solid box-border hover:border-[#3C4EFE] hover:border-[1px] hover:text-[#3C4EFE] rounded-[28px] text-white w-full h-full flex flex-row justify-center items-center font-semibold text-xl cursor-pointer ${className} `}
      {...props}
    >
      {children}
    </div>
  );
}

export default SelectableCard;
