import type { JSX } from "react";

interface CategoryChartProps {
  title: string;
  subtitle: string;
}

interface BubbleData {
  percentage: number;
  label: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  size: number;
}

interface BubbleWithProgressRingProps {
  bubble: BubbleData;
}

function getBubbleFontSize(size: number): string {
  if (size > 150) return "32px";
  if (size > 110) return "24px";
  return "20px";
}

function bubbleWithProgressRing({ bubble }: BubbleWithProgressRingProps): JSX.Element {
  const svgSize = bubble.size + 8;
  const bgRadius = bubble.size / 2;
  const outlineRadius = bgRadius + 4;
  const circumference = 2 * Math.PI * outlineRadius;
  const strokeDashoffset = circumference - (bubble.percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: svgSize, height: svgSize }}
    >
      <svg width={svgSize} height={svgSize} className="absolute" style={{ overflow: "visible" }}>
        <circle
          cx={String(svgSize / 2)}
          cy={String(svgSize / 2)}
          r={String(outlineRadius)}
          fill="none"
          stroke={bubble.borderColor}
          strokeWidth="3"
          strokeDasharray={String(circumference)}
          strokeDashoffset={String(strokeDashoffset)}
          strokeLinecap="round"
          className="transform -rotate-90"
          style={{ transformOrigin: `${String(svgSize / 2)}px ${String(svgSize / 2)}px` }}
        />
      </svg>

      <div
        className="absolute rounded-full"
        style={{
          width: bubble.size,
          height: bubble.size,
          backgroundColor: bubble.bgColor,
        }}
      />

      <div className="text-center relative z-10">
        <p
          className="font-normal tracking-[0.5px]"
          style={{
            color: bubble.textColor,
            fontSize: getBubbleFontSize(bubble.size),
          }}
        >
          {bubble.percentage}%
        </p>
        <p className="text-xs tracking-[0.5px]" style={{ color: bubble.textColor }}>
          {bubble.label}
        </p>
      </div>
    </div>
  );
}

export function CategoryChart({ title, subtitle }: CategoryChartProps): JSX.Element {
  const bubbles: BubbleData[] = [
    {
      percentage: 53,
      label: "Silver",
      bgColor: "#C4C4C4",
      borderColor: "#F99C30",
      textColor: "#ffffff",
      size: 169,
    },
    {
      percentage: 32,
      label: "Platinum",
      bgColor: "#353E43",
      borderColor: "#2FBFDe",
      textColor: "#ffffff",
      size: 122,
    },
    {
      percentage: 25,
      label: "Gold",
      bgColor: "#EFBF04",
      borderColor: "#6463D6",
      textColor: "#353E43",
      size: 104,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-normal text-black tracking-[0.5px] mb-0.5">{title}</h3>
      <p className="text-xs text-black opacity-50 tracking-[0.5px] mb-4">{subtitle}</p>

      {/* Desktop: Overlapping layout */}
      <div className="hidden lg:flex relative flex-1 min-h-0 items-center justify-center px-4">
        {/* Gold - top center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
          {bubbleWithProgressRing({ bubble: bubbles[2] })}
        </div>

        {/* Platinum - bottom left */}
        <div className="absolute left-0 bottom-0">
          {bubbleWithProgressRing({ bubble: bubbles[1] })}
        </div>

        {/* Silver - right (largest), vertically centered */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          {bubbleWithProgressRing({ bubble: bubbles[0] })}
        </div>
      </div>

      {/* Tablet/Medium screens: Stacked with better spacing */}
      <div className="hidden sm:flex lg:hidden flex-col gap-3 items-center flex-1 min-h-0 justify-center">
        {bubbles.map((bubble) => (
          <div key={bubble.label}>{bubbleWithProgressRing({ bubble })}</div>
        ))}
      </div>

      {/* Mobile: Stacked vertically */}
      <div className="sm:hidden flex flex-col gap-3 items-center flex-1 min-h-0 justify-center">
        {bubbles.map((bubble) => (
          <div key={bubble.label}>{bubbleWithProgressRing({ bubble })}</div>
        ))}
      </div>
    </div>
  );
}
