import React from 'react'
import {
CartesianGrid,
Line,
LineChart,
XAxis,
YAxis,
} 
from "recharts"
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import {
ChartContainer,
ChartTooltip,
ChartTooltipContent,
} from "@/components/ui/chart"

function LineChartCard({ data }) {

  ///////////////////////////////
  const limit = 7; // Adjust this value to change the number of displayed records
  const fieldName = 'daily_views'; // Field name variable

  // Calculate overall average daily views
  const validValues = data.filter(record => record[fieldName] !== null).map(record => record[fieldName]);
  const overallAvg = validValues.reduce((acc, views) => acc + views, 0) / validValues.length;

  // Limit the data to the last specified number of records
  const limitedData = data.slice(-limit);

  // Calculate average daily views over the limited period and round to an integer
  const limitedAvgValue = Math.round(
    limitedData.reduce((acc, record) => acc + (record[fieldName] || 0), 0) / limitedData.length
  );

  // Transform the data to the format needed by the BarChart
  const chartData = limitedData.map(item => ({
    date: item.ref_day,
    daily_views: item[fieldName] || limitedAvgValue, // Ensure a value is present for the chart
  }));

  // Access the field value for the last record in the dataset
  const lastRecordValue = data[data.length - 1]?.[fieldName] || 0;

  const DailyVideoViewsWVariation = data[data.length - 1]?.['daily_views_dod_w_variation'] || 0;
  const formattedDailyVideoViewsWVariation = DailyVideoViewsWVariation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const DailyVideoViewsVariation = data[data.length - 1]?.['daily_views_dod_variation'] || 0;
  const formattedDailyVideoViewsVariation = DailyVideoViewsVariation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div>
        <Card
            className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1"
            >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
            <CardDescription>Daily Variation</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                {formattedDailyVideoViewsVariation}
                <span className="text-xs font-normal tracking-normal text-muted-foreground">
                %
                </span>
            </CardTitle>
            </div>
            <div>
              <CardDescription>Weekly Variation</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                {formattedDailyVideoViewsWVariation}
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  %
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <ChartContainer
              config={{
                resting: {
                  label: "Daily views",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="w-full"
            >
              <LineChart
                accessibilityLayer
                margin={{
                  left: 14,
                  right: 14,
                  top: 10,
                }}
                data={chartData}
                // data={[
                //   {
                //     date: "2024-01-01",
                //     resting: 62,
                //   },
                //   {
                //     date: "2024-01-02",
                //     resting: 72,
                //   },
                //   {
                //     date: "2024-01-03",
                //     resting: 35,
                //   },
                //   {
                //     date: "2024-01-04",
                //     resting: 62,
                //   },
                //   {
                //     date: "2024-01-05",
                //     resting: 52,
                //   },
                //   {
                //     date: "2024-01-06",
                //     resting: 62,
                //   },
                //   {
                //     date: "2024-01-07",
                //     resting: 70,
                //   },
                // ]}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }}
                />
                <Line
                  dataKey="daily_views"
                  type="natural"
                  fill="var(--color-resting)"
                  stroke="var(--color-resting)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    fill: "var(--color-resting)",
                    stroke: "var(--color-resting)",
                    r: 4,
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      }}
                    />
                  }
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  )
}

export default LineChartCard