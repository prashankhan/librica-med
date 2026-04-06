import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#037eff] text-white hover:brightness-110 focus-visible:outline-[#037eff]",
  outline:
    "border border-gray-200 bg-white text-[#001f40] hover:border-[#037eff]/40 hover:bg-[#037eff]/5 focus-visible:outline-[#037eff]",
  ghost:
    "text-[#001f40] hover:bg-gray-100 focus-visible:outline-[#037eff]",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  target,
  rel,
  ...props
}: ButtonLinkProps) {
  const safeRel =
    target === "_blank"
      ? rel ?? "noopener noreferrer"
      : rel;

  return (
    <Link
      className={`${baseClass} ${variants[variant]} ${className}`}
      target={target}
      rel={safeRel}
      {...props}
    >
      {children}
    </Link>
  );
}
