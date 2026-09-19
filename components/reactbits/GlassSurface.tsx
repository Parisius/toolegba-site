"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface GlassSurfaceProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** When false, the backdrop filter is disabled entirely (fully see-through,
   * no distortion) — lets a single persistent element toggle the effect on
   * and off without swapping DOM nodes, so other CSS transitions on the
   * same element keep working. */
  active?: boolean;
  /** Frost strength — higher blurs the content showing through. */
  blur?: number;
  /** Strength of the liquid-glass refraction distortion. */
  distortionScale?: number;
  /** Subtle per-channel offset, giving the refraction a faint chromatic-aberration edge. */
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  /** Brightness (%) applied to whatever shows through the glass. */
  brightness?: number;
  /** Saturation (%) applied to whatever shows through the glass. */
  saturation?: number;
}

/**
 * Adaptation of reactbits.dev's "Glass Surface" for this site's stack
 * (plain CSS + SVG filter, no extra deps). An SVG filter combining
 * feTurbulence + feDisplacementMap + feColorMatrix drives `backdrop-filter`,
 * giving a refractive "liquid glass" look instead of a flat blur/tint.
 * Safari's backdrop-filter doesn't reliably resolve SVG filter references,
 * so we feature-detect and fall back to a plain blur there.
 */
export default function GlassSurface({
  children,
  className = "",
  style,
  active = true,
  blur = 6,
  distortionScale = 22,
  redOffset = 0,
  greenOffset = 6,
  blueOffset = 14,
  brightness = 105,
  saturation = 140,
}: GlassSurfaceProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `glass-surface-${rawId}`;
  const [supportsSvgBackdrop, setSupportsSvgBackdrop] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setSupportsSvgBackdrop(
        typeof CSS !== "undefined" && CSS.supports("backdrop-filter", `url(#${filterId})`)
      );
    } catch {
      setSupportsSvgBackdrop(false);
    }
  }, [filterId]);

  const backdropFilter = !active
    ? "none"
    : supportsSvgBackdrop
      ? `url(#${filterId}) blur(${blur * 0.4}px)`
      : `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        transition: [style?.transition, "backdrop-filter 500ms ease"].filter(Boolean).join(", "),
      }}
    >
      {active && supportsSvgBackdrop && (
        <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.015"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation={3} result="softNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softNoise"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feColorMatrix
              in="displaced"
              type="matrix"
              values={`1 0 0 0 ${redOffset / 255}  0 1 0 0 ${greenOffset / 255}  0 0 1 0 ${blueOffset / 255}  0 0 0 1 0`}
              result="tinted"
            />
            <feComponentTransfer in="tinted" result="graded">
              <feFuncR type="linear" slope={brightness / 100} />
              <feFuncG type="linear" slope={brightness / 100} />
              <feFuncB type="linear" slope={brightness / 100} />
            </feComponentTransfer>
            <feGaussianBlur in="graded" stdDeviation={blur * 0.6} />
          </filter>
        </svg>
      )}
      {children}
    </div>
  );
}
