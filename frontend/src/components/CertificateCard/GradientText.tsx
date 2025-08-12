import React, { useId, useLayoutEffect, useRef, useState } from "react";

type GradientStop = {
  offset: number; // 0..1
  color: string;
  opacity?: number;
};

interface GradientTextProps {
  text: string;
  fontSize?: number;
  fontWeight?: number | string;
  className?: string;
  direction?: "vertical" | "horizontal";
  gradientStops?: GradientStop[];
  maxWidth?: number; // pixels; enables word wrapping when provided
  lineHeight?: number; // multiplier used when wrapping
}

/**
 * Renders text with a reliable gradient fill using SVG, which exports correctly via html2canvas.
 * The SVG auto-sizes to the text's bounding box so it can be used inline like normal text.
 */
const GradientText: React.FC<GradientTextProps> = ({
  text,
  fontSize = 24,
  fontWeight = 700,
  className = "",
  direction = "vertical",
  gradientStops = [
    { offset: 0, color: "#ffffff" },
    { offset: 1, color: "#6f6fbe" },
  ],
}) => {
  const id = useId().replace(/:/g, "");
  const textRef = useRef<SVGTextElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const node = textRef.current;
    const svg = svgRef.current;
    if (!node || !svg) return;
    // Use a tiny timeout to ensure layout/fonts are ready
    const r = () => {
      const bbox = node.getBBox();
      const width = Math.ceil(bbox.width);
      const height = Math.ceil(bbox.height + bbox.y);
      setSize({ width, height: Math.max(height, fontSize) });
    };
    r();
  }, [text, fontSize, fontWeight]);

  const [x2, y2] = direction === "horizontal" ? ["100%", "0%"] : ["0%", "100%"];

  return (
    <div className={`inline-block leading-none ${className}`.trim()} style={{ lineHeight: 1 }}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={size.width || 1}
        height={size.height || fontSize}
        overflow="visible"
        role="img"
        aria-label={text}
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2={x2} y2={y2}>
            {gradientStops.map((stop, idx) => (
              <stop
                key={idx}
                offset={`${Math.round(stop.offset * 100)}%`}
                stopColor={stop.color}
                stopOpacity={stop.opacity ?? 1}
              />
            ))}
          </linearGradient>
        </defs>
        <text
          ref={textRef}
          x={0}
          y={fontSize}
          fill={`url(#grad-${id})`}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
          style={{ whiteSpace: "pre" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default GradientText;


