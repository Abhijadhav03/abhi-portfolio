import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & CV | Abhishek Jadhav",
  description:
    "View and download Abhishek Jadhav's resume. Explore technical skills, software engineering experience, and full-stack projects.",
  openGraph: {

    title: "Resume & CV | Abhishek Jadhav",
    description:
      "Frontend & Full-Stack Engineer focused on building high-performance, accessible, and scalable web applications.",
    type: "profile",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
