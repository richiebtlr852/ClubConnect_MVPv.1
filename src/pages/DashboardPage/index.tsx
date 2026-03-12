import {
  DashboardCard,
  ChartCard,
  CategoryChart,
  ProgressCircle,
  SponsorListItem,
  PackageCard,
} from "../../components";
import { useGetClubByUserId } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import type { JSX } from "react";

export function DashboardPage(): JSX.Element {
  const { user } = useAuth();
  const { data: clubDetails } = useGetClubByUserId(user?.uid);

  const chartData = [
    { month: "Jan", thisYear: 15000, lastYear: 12000 },
    { month: "Feb", thisYear: 18000, lastYear: 15000 },
    { month: "Mar", thisYear: 22000, lastYear: 18000 },
    { month: "Apr", thisYear: 22000, lastYear: 20000 },
    { month: "May", thisYear: 35000, lastYear: 28000 },
    { month: "Jun", thisYear: 68000, lastYear: 55000 },
  ];

  const progressSegments = [
    { percentage: 40, color: "#4c51bf", label: "Platinum" },
    { percentage: 32, color: "#818cf8", label: "Gold" },
    { percentage: 28, color: "#c7d2fe", label: "Silver" },
  ];

  const recentSponsors: Array<{ name: string; tier: "Platinum" | "Gold" | "Silver" }> = [
    { name: "Buxton Newtown", tier: "Platinum" },
    { name: "Routley's", tier: "Silver" },
    { name: "Davidsons", tier: "Gold" },
    { name: "West Carr & Harvey", tier: "Silver" },
  ];

  const livePackages = [
    {
      tier: "Platinum" as const,
      name: "Platinum Partner",
      price: "$10,000 / yr",
      benefits: 15,
      sponsors: 4,
      isActive: true,
    },
    {
      tier: "Gold" as const,
      name: "Gold Partner",
      price: "$7,500 / yr",
      benefits: 15,
      sponsors: 4,
    },
    {
      tier: "Silver" as const,
      name: "Silver Supporter",
      price: "$5,000 / yr",
      benefits: 15,
      sponsors: 4,
    },
  ];

  return (
    <div className="bg-white">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">Sponsorship Overview</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Total Sponsorship Funds Raised This Season</span>
          <span className="text-sm font-medium text-green-600">$92,852</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5 pb-5 border-b border-[#C8CBD9]">
        <div className="lg:col-span-2 lg:border-r lg:border-[#C8CBD9] lg:pr-5">
          <DashboardCard title="">
            <div className="h-[360px]">
              <ChartCard
                title="Money Flow"
                subtitle="Total Sponsorship funds from 1-Jan - Today (25-May)"
                data={chartData}
                maxValue={80000}
              />
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="">
            <div className="h-[360px] flex flex-col">
              <div className="flex items-start justify-between mb-3 gap-2">
                <div>
                  <h3 className="text-sm font-normal text-black tracking-[0.5px] mb-1">
                    Sponsorship Target Progress
                  </h3>
                  <p className="text-xs text-black opacity-50 tracking-[0.5px]">
                    From 1-6 Dec, 2020
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs text-[#5a6acf] border border-[#5a6acf] rounded hover:bg-indigo-50 transition-colors tracking-[0.5px] flex-shrink-0"
                >
                  View Report
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center min-h-0">
                <ProgressCircle
                  percentage={77}
                  size={124}
                  strokeWidth={18}
                  segments={progressSegments}
                />
                <div className="grid grid-cols-3 gap-6 mt-4 w-full px-2">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#4c51bf]" />
                      <span className="text-xs font-medium text-[#121212] opacity-70 tracking-[0.5px]">
                        Platinum
                      </span>
                    </div>
                    <p className="text-xs text-[#121212] opacity-70 tracking-[0.5px]">40%</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#818cf8]" />
                      <span className="text-xs font-medium text-[#121212] opacity-70 tracking-[0.5px]">
                        Gold
                      </span>
                    </div>
                    <p className="text-xs text-[#121212] opacity-70 tracking-[0.5px]">32%</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#c7d2fe]" />
                      <span className="text-xs font-medium text-[#121212] opacity-70 tracking-[0.5px]">
                        Silver
                      </span>
                    </div>
                    <p className="text-xs text-[#121212] opacity-70 tracking-[0.5px]">28%</p>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:border-r lg:border-[#C8CBD9] lg:pr-5">
          <DashboardCard title="">
            <div className="h-[360px]">
              <CategoryChart
                title="Sponsorship per category"
                subtitle="% of total sponsorship funds per category"
              />
            </div>
          </DashboardCard>
        </div>

        <div className="lg:border-r lg:border-[#C8CBD9] lg:pr-5">
          <DashboardCard title="">
            <div className="h-[360px] flex flex-col">
              <h3 className="text-sm font-medium text-gray-900 mb-1">Most Recent Sponsors</h3>
              <p className="text-xs text-gray-500 mb-3">
                Recent sponsors to join{" "}
                {clubDetails !== null && clubDetails !== undefined
                  ? clubDetails.name
                  : "South Barwon FC"}{" "}
                for 2026
              </p>
              <div className="space-y-0 flex-1 overflow-y-auto">
                {recentSponsors.map((sponsor) => (
                  <SponsorListItem key={sponsor.name} name={sponsor.name} tier={sponsor.tier} />
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="">
            <div className="h-[360px] flex flex-col">
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
                  <h3 className="text-sm font-medium text-gray-900">Live Packages</h3>
                </div>
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded whitespace-nowrap flex-shrink-0">
                  3 Active
                </span>
              </div>
              <div className="space-y-2 flex-1 overflow-y-auto">
                {livePackages.map((packageItem) => (
                  <PackageCard
                    key={packageItem.name}
                    tier={packageItem.tier}
                    name={packageItem.name}
                    price={packageItem.price}
                    benefits={packageItem.benefits}
                    sponsors={packageItem.sponsors}
                    isActive={packageItem.isActive}
                  />
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
