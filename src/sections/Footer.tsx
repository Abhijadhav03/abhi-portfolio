import { Signature } from "@/components/signature";

export const Footer = () => {
  return (
    <div className="w-full border-t border-white/10 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <Signature
          className="inline-block align-middle"
          fontSize={16}
          color="#ffffff"          // ← light color for dark footer
          text="Abhishek"
        />
        All rights reserved.
      </div>
    </div>
  );
};