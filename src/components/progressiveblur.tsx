import React from "react";

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
};

const ProgressiveBlur = ({
  className = "",
  backgroundColor = "#f5f4f3",
  position = "top",
  height = "150px",
  blurAmount = "8px",
}: ProgressiveBlurProps) => {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none fixed left-0 w-full select-none ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
        zIndex: 20,
      }}
    />
  );
};

const Skiper41 = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#f5f4f3] text-black">
      {/* ✅ Blur layers fixed to viewport edges */}
      <ProgressiveBlur position="top" backgroundColor="#f5f4f3" />
      <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" />

      {/* ✅ Main content container (currently empty) */}
      <div className="relative z-10 w-full max-w-3xl px-6 py-20">
        {/* Add your actual content here */}
      </div>
    </div>
  );
};

export { ProgressiveBlur, Skiper41 };


 