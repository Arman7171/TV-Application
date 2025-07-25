import React from "react";

interface PropsType {
  buttonText: string;
  className?: string;
  icon?: string;
  onClick?: () => void;
}

const Button: React.FC<PropsType> = ({
  buttonText,
  className,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} 2xl:w-[240px] w-[180px] 2xl:h-[72px] h-[50px] rounded-[42px] cursor-pointer flex items-center justify-center 2xl:text-[32px] text-[20px] font-bold`}>
      <div className="flex items-center gap-[10px]">
        {icon && <img src={icon} alt="icon" className="w-[32px] h-[32px]" />}
        {buttonText}
      </div>
    </div>
  );
};

export default Button;
