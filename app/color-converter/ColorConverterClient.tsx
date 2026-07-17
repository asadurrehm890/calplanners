"use client";

import { useState, useEffect } from "react";

// Types
interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  cmyk: { c: number; m: number; y: number; k: number };
  name: string;
}

interface Palette {
  name: string;
  colors: Color[];
  harmony: string;
}

export default function ColorConverterClient() {
  // State
  const [colorInput, setColorInput] = useState<string>("#2563eb");
  const [currentColor, setCurrentColor] = useState<Color>({
    hex: "#2563eb",
    rgb: { r: 37, g: 99, b: 235 },
    hsl: { h: 221, s: 83, l: 53 },
    cmyk: { c: 84, m: 58, y: 0, k: 8 },
    name: "Blue",
  });
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [savedColors, setSavedColors] = useState<Color[]>([]);
  const [activeTab, setActiveTab] = useState<"converter" | "palette" | "saved">("converter");
  const [paletteType, setPaletteType] = useState<string>("complementary");

  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
    const c = 1 - (r / 255);
    const m = 1 - (g / 255);
    const y = 1 - (b / 255);
    const k = Math.min(c, m, y);
    return {
      c: Math.round((c - k) / (1 - k) * 100) || 0,
      m: Math.round((m - k) / (1 - k) * 100) || 0,
      y: Math.round((y - k) / (1 - k) * 100) || 0,
      k: Math.round(k * 100) || 0
    };
  };

  // Get color name (simplified)
  const getColorName = (hex: string): string => {
    const colors: { [key: string]: string } = {
      '#000000': 'Black',
      '#ffffff': 'White',
      '#ff0000': 'Red',
      '#00ff00': 'Green',
      '#0000ff': 'Blue',
      '#ffff00': 'Yellow',
      '#ff00ff': 'Magenta',
      '#00ffff': 'Cyan',
      '#ffa500': 'Orange',
      '#800080': 'Purple',
      '#008000': 'Dark Green',
      '#ffc0cb': 'Pink',
      '#a52a2a': 'Brown',
      '#808080': 'Gray',
      '#c0c0c0': 'Silver',
      '#ffd700': 'Gold',
    };
    return colors[hex.toLowerCase()] || 'Custom Color';
  };

  // Update color from input
  const updateColor = (input: string) => {
    const hex = input.startsWith('#') ? input : `#${input}`;
    if (/^#([a-f\d]{6}|[a-f\d]{3})$/i.test(hex) || /^[a-f\d]{6}$/i.test(input) || /^[a-f\d]{3}$/i.test(input)) {
      const cleanHex = input.startsWith('#') ? input : `#${input}`;
      const rgb = hexToRgb(cleanHex);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        setCurrentColor({
          hex: cleanHex.toLowerCase(),
          rgb,
          hsl,
          cmyk,
          name: getColorName(cleanHex.toLowerCase()),
        });
        setColorInput(cleanHex);
      }
    }
  };

  // Generate color palette
  const generatePalette = () => {
    const hex = currentColor.hex;
    const rgb = currentColor.rgb;
    const hsl = currentColor.hsl;
    
    let colors: Color[] = [];
    const baseColor = { ...currentColor };

    switch(paletteType) {
      case "complementary": {
        const complementH = (hsl.h + 180) % 360;
        const compRgb = hslToRgb(complementH, hsl.s / 100, hsl.l / 100);
        colors = [
          baseColor,
          {
            hex: rgbToHex(compRgb.r, compRgb.g, compRgb.b),
            rgb: compRgb,
            hsl: { h: complementH, s: hsl.s, l: hsl.l },
            cmyk: rgbToCmyk(compRgb.r, compRgb.g, compRgb.b),
            name: getColorName(rgbToHex(compRgb.r, compRgb.g, compRgb.b)),
          }
        ];
        break;
      }
      case "analogous": {
        const offsets = [-30, 0, 30];
        colors = offsets.map((offset) => {
          const h = (hsl.h + offset + 360) % 360;
          const rgb = hslToRgb(h / 360, hsl.s / 100, hsl.l / 100);
          return {
            hex: rgbToHex(rgb.r, rgb.g, rgb.b),
            rgb,
            hsl: { h, s: hsl.s, l: hsl.l },
            cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
            name: getColorName(rgbToHex(rgb.r, rgb.g, rgb.b)),
          };
        });
        break;
      }
      case "triadic": {
        const offsets = [0, 120, 240];
        colors = offsets.map((offset) => {
          const h = (hsl.h + offset) % 360;
          const rgb = hslToRgb(h / 360, hsl.s / 100, hsl.l / 100);
          return {
            hex: rgbToHex(rgb.r, rgb.g, rgb.b),
            rgb,
            hsl: { h, s: hsl.s, l: hsl.l },
            cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
            name: getColorName(rgbToHex(rgb.r, rgb.g, rgb.b)),
          };
        });
        break;
      }
      case "monochromatic": {
        const lightness = [30, 50, 70, 90];
        colors = lightness.map((l) => {
          const rgb = hslToRgb(hsl.h / 360, hsl.s / 100, l / 100);
          return {
            hex: rgbToHex(rgb.r, rgb.g, rgb.b),
            rgb,
            hsl: { h: hsl.h, s: hsl.s, l },
            cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
            name: getColorName(rgbToHex(rgb.r, rgb.g, rgb.b)),
          };
        });
        break;
      }
      default: {
        colors = [baseColor];
      }
    }

    const paletteName = `${paletteType.charAt(0).toUpperCase() + paletteType.slice(1)} Palette`;
    setPalettes([...palettes, { name: paletteName, colors, harmony: paletteType }]);
  };

  // HSL to RGB helper
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // RGB to Hex helper
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${[r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
  };

  // Save color
  const saveColor = () => {
    if (!savedColors.find(c => c.hex === currentColor.hex)) {
      setSavedColors([...savedColors, { ...currentColor }]);
    }
  };

  // Remove saved color
  const removeSavedColor = (hex: string) => {
    setSavedColors(savedColors.filter(c => c.hex !== hex));
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    updateColor(colorInput);
  }, []);

  return (
    <>
    <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-2xl p-6 mb-8 border border-fuchsia-200 dark:border-fuchsia-800">
  <h2 className="text-xl font-semibold text-black dark:text-white mb-3">
    🎨 What is the Color Converter & Palette Generator?
  </h2>
  <p className="text-zinc-700 dark:text-zinc-300 mb-3">
    This tool helps designers and developers convert colors between HEX, RGB, HSL, CMYK formats and generate harmonious color palettes for their projects.
  </p>
  <p className="text-zinc-700 dark:text-zinc-300 mb-3">
    Enter any color, and the converter instantly shows all formats. Generate palettes (complementary, analogous, triadic, monochromatic) and save your favorite colors.
  </p>
  <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 mt-2">
    <p className="text-sm font-medium text-black dark:text-white">📋 Example:</p>
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      The color #2563eb (Blue) converts to rgb(37, 99, 235), hsl(221, 83%, 53%), and cmyk(84%, 58%, 0%, 8%). The complementary color is #eb4d25 (Orange).
    </p>
  </div>
</div>
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            🎨 Color Converter & Palette Generator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Convert colors between HEX, RGB, HSL, CMYK and generate harmonious color palettes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Main Tool */}
          <div className="lg:col-span-3 space-y-6">
            {/* Color Input & Preview */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 flex-shrink-0"
                  style={{ backgroundColor: currentColor.hex }}
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Enter Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onBlur={() => updateColor(colorInput)}
                      onKeyDown={(e) => e.key === 'Enter' && updateColor(colorInput)}
                      className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                      placeholder="#2563eb"
                    />
                    <input
                      type="color"
                      value={currentColor.hex}
                      onChange={(e) => {
                        setColorInput(e.target.value);
                        updateColor(e.target.value);
                      }}
                      className="w-12 h-12 rounded-lg cursor-pointer border border-zinc-300 dark:border-zinc-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Values */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Color Values
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-500 dark:text-zinc-400">HEX</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-mono text-black dark:text-white">
                      {currentColor.hex}
                    </code>
                    <button
                      onClick={() => copyToClipboard(currentColor.hex)}
                      className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-500 dark:text-zinc-400">RGB</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-mono text-black dark:text-white">
                      rgb({currentColor.rgb.r}, {currentColor.rgb.g}, {currentColor.rgb.b})
                    </code>
                    <button
                      onClick={() => copyToClipboard(`rgb(${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b})`)}
                      className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-500 dark:text-zinc-400">HSL</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-mono text-black dark:text-white">
                      hsl({currentColor.hsl.h}, {currentColor.hsl.s}%, {currentColor.hsl.l}%)
                    </code>
                    <button
                      onClick={() => copyToClipboard(`hsl(${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%)`)}
                      className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-500 dark:text-zinc-400">CMYK</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-mono text-black dark:text-white">
                      cmyk({currentColor.cmyk.c}%, {currentColor.cmyk.m}%, {currentColor.cmyk.y}%, {currentColor.cmyk.k}%)
                    </code>
                    <button
                      onClick={() => copyToClipboard(`cmyk(${currentColor.cmyk.c}%, ${currentColor.cmyk.m}%, ${currentColor.cmyk.y}%, ${currentColor.cmyk.k}%)`)}
                      className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={saveColor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  💾 Save Color
                </button>
              </div>
            </div>

            {/* Palette Generator */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Palette Generator
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {["complementary", "analogous", "triadic", "monochromatic"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPaletteType(type)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      paletteType === type
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
                <button
                  onClick={generatePalette}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                >
                  ✨ Generate Palette
                </button>
              </div>

              {/* Display generated palettes */}
              {palettes.length > 0 && (
                <div className="space-y-4">
                  {palettes.slice().reverse().map((palette, index) => (
                    <div key={index} className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-black dark:text-white">{palette.name}</h4>
                        <button
                          onClick={() => {
                            const newPalettes = palettes.filter((_, i) => i !== palettes.length - 1 - index);
                            setPalettes(newPalettes);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {palette.colors.map((color, i) => (
                          <div
                            key={i}
                            className="group relative"
                          >
                            <div
                              className="w-16 h-16 rounded-lg cursor-pointer border-2 border-zinc-200 dark:border-zinc-700 hover:scale-110 transition-transform"
                              style={{ backgroundColor: color.hex }}
                              onClick={() => {
                                setColorInput(color.hex);
                                updateColor(color.hex);
                              }}
                            />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {color.hex}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Saved Colors */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Colors */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                💾 Saved Colors
              </h3>
              {savedColors.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {savedColors.map((color, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                      <div
                        className="w-10 h-10 rounded-lg flex-shrink-0 border border-zinc-200 dark:border-zinc-700"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-black dark:text-white truncate">{color.hex}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{color.name}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setColorInput(color.hex);
                            updateColor(color.hex);
                          }}
                          className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          title="Select color"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => removeSavedColor(color.hex)}
                          className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          title="Remove color"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
                  No saved colors yet. Click "Save Color" to save your current color.
                </p>
              )}
            </div>

            {/* Quick Color Reference */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                🎨 Common Colors
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  "#ff0000", "#00ff00", "#0000ff", "#ffff00",
                  "#ff00ff", "#00ffff", "#ffa500", "#800080",
                  "#008000", "#ffc0cb", "#a52a2a", "#808080",
                  "#c0c0c0", "#ffd700", "#000000", "#ffffff"
                ].map((hex) => (
                  <button
                    key={hex}
                    className="w-full aspect-square rounded-lg border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform"
                    style={{ backgroundColor: hex }}
                    onClick={() => {
                      setColorInput(hex);
                      updateColor(hex);
                    }}
                    title={hex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}