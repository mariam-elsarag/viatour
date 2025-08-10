import React from "react";

type ShapeType = {
  position?: "start" | "end";
};
const Shape: React.FC<ShapeType> = ({ position = "start" }) => {
  const align = {
    start: "start-0 bottom-0",
    end: "end-0 top-0",
  };
  return (
    <div
      className={`absolute z-[1] w-[272px] h-[272px] ${align[position]} bg-[#23D184]/20 blur-[180px] `}
    />
  );
};

export default Shape;
