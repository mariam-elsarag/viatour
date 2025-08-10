import React from "react";

type SectionHeaderType = {
  title: string;
  des?: string;
  alignment?: "center" | "start";
  variant?: "light" | "dark";
};
const Section_Header: React.FC<SectionHeaderType> = ({
  title,
  des,
  alignment = "center",
  variant = "dark",
}) => {
  const align = {
    center: "flex_center text-center",
    start: "flex items-center",
  };
  const header = {
    light: "text-neutral-200",
    dark: "text-primary-800",
  };
  const description = {
    light: "text-neutral-400",
    dark: "text-neutral-500",
  };
  return (
    <header
      className={`${align[alignment]} flex-col gap-3 sm:max-w-[700px] mx-auto`}
    >
      <h2 className={`headline_lg font-semibold ${header[variant]} `}>
        {title}
      </h2>
      {des && <p className={`${description[variant]} body_lg`}>{des}</p>}
    </header>
  );
};

export default Section_Header;
