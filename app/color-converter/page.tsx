import type { Metadata } from "next";
import ColorConverterClient from "./ColorConverterClient";

export const metadata: Metadata = {
  title: 'Color Converter & Palette Generator | HEX, RGB, HSL, CMYK',
  description: 'Convert colors between HEX, RGB, HSL, CMYK, and more. Generate harmonious color palettes for your design projects. Free color tool for designers and developers.',
  keywords: 'color converter, hex to rgb, rgb to hex, color palette generator, color picker, design tool, web colors',
  openGraph: {
    title: 'Color Converter & Palette Generator | HEX, RGB, HSL, CMYK',
    description: 'Convert colors between HEX, RGB, HSL, CMYK, and more. Generate harmonious color palettes for your design projects.',
    url: 'https://calplanners.online/color-converter',
  },
  alternates: {
    canonical: 'https://calplanners.online/color-converter',
  },
};

export default function Page() {
  return <ColorConverterClient />;
}