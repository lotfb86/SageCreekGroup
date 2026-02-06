import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  image: string;
  title?: string;
  subtitle?: string;
  height?: "full" | "large" | "medium";
  ctaText?: string;
  ctaHref?: string;
}

const heightClasses = {
  full: "min-h-screen",
  large: "min-h-[70vh]",
  medium: "min-h-[50vh]",
};

export default function HeroSection({
  image,
  title,
  subtitle,
  height = "large",
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  return (
    <section className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {title && (
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-4 font-sans text-base sm:text-lg text-white/80 uppercase tracking-[3px] font-medium">
            {subtitle}
          </p>
        )}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-sage-400 text-white font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-sage-400/90 transition-all rounded-sm"
          >
            {ctaText} <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Scroll Indicator */}
      {height === "full" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      )}
    </section>
  );
}
