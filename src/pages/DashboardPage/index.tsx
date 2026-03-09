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
    { month: "Jan", value: 15000 },
    { month: "Feb", value: 22000 },
    { month: "Mar", value: 28000 },
    { month: "Apr", value: 35000 },
    { month: "May", value: 52000 },
    { month: "Jun", value: 68000 },
  ];

  const categoryData = [
    { name: "Platinum", percentage: 32, color: "#353e43" },
    { name: "Gold", percentage: 25, color: "#efbf04" },
    { name: "Silver", percentage: 53, color: "#c4c4c4" },
  ];

  const recentSponsors = [
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sponsorship Overview</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Total Sponsorship Funds Raised This Season</span>
          <span className="text-xl font-medium text-green-600">$92,852</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">
          <DashboardCard title="">
            <ChartCard
              title="Money Flow"
              subtitle="Total Sponsorship funds from 1-Jan - Today (25-May)"
              data={chartData}
              maxValue={80000}
            />
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-900 mb-1 self-start">
                Sponsorship Target Progress
              </h3>
              <p className="text-xs text-gray-500 mb-6 self-start">From 1-6 Dec, 2020</p>
              <ProgressCircle percentage={77} size={140} strokeWidth={16} />
              <div className="grid grid-cols-3 gap-4 mt-6 w-full">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-gray-700" />
                    <span className="text-xs text-gray-600">Platinum</span>
                  </div>
                  <p className="text-xs text-gray-500">40%</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-accent" />
                    <span className="text-xs text-gray-600">Gold</span>
                  </div>
                  <p className="text-xs text-gray-500">32%</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <span className="text-xs text-gray-600">Silver</span>
                  </div>
                  <p className="text-xs text-gray-500">28%</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <DashboardCard title="">
            <CategoryChart
              title="Sponsorship per category"
              subtitle="% of total sponsorship funds per category"
              categories={categoryData}
            />
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Most Recent Sponsors</h3>
              <p className="text-xs text-gray-500 mb-4">
                Recent sponsors to join{" "}
                {clubDetails !== null && clubDetails !== undefined
                  ? clubDetails.name
                  : "South Barwon FC"}{" "}
                for 2026
              </p>
              <div className="space-y-0">
                {recentSponsors.map((sponsor) => (
                  <SponsorListItem key={sponsor.name} name={sponsor.name} tier={sponsor.tier} />
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">Live Packages</h3>
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">3 Active</span>
              </div>
              <div className="space-y-3">
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
