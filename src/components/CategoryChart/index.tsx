import type { JSX } from "react";

interface CategoryData {
  name: string;
  percentage: number;
  color: string;
}

interface CategoryChartProps {
  title: string;
  subtitle: string;
  categories: CategoryData[];
}

export function CategoryChart({ title, subtitle, categories }: CategoryChartProps): JSX.Element {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-6">{subtitle}</p>

      <div className="flex items-center justify-center gap-8">
        {categories.map((category) => {
          const size = 80 + category.percentage * 0.5;
          return (
            <div key={category.name} className="flex flex-col items-center">
              <div
                className="rounded-full flex items-center justify-center shadow-lg"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: category.color,
                }}
              >
                <div className="text-center">
                  <p className="text-white font-semibold" style={{ fontSize: size / 5 }}>
                    {category.percentage}%
                  </p>
                  <p className="text-white text-xs mt-1">{category.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
