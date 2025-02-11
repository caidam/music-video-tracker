import React from 'react'
import {
Area,
AreaChart,
XAxis,
YAxis,
} from "recharts"

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

function AreaChartCard({ data }) {


  ///////////////////////////////
  const limit = 7; // Adjust this value to change the number of displayed records
  const fieldName = 'daily_likes'; // Field name variable

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
    time: item[fieldName] || 0, // Ensure a value is present for the chart
  }));

  const formattedLimitedAvgValue = limitedAvgValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const DailyVideoData = data[data.length - 1]?.[fieldName] || 0;
  const formattedDailyVideoData = DailyVideoData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="space-y-0 pb-0">
            <CardDescription>Likes Evolution</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {formattedDailyVideoData}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                daily likes
              </span>
              {/* 35 */}
              {/* <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                min
              </span> */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                time: {
                  label: "Time",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <AreaChart
                accessibilityLayer
                data = {chartData}
                // data={[
                //   {
                //     date: "2024-01-01",
                //     time: 8.5,
                //   },
                //   {
                //     date: "2024-01-02",
                //     time: 7.2,
                //   },
                //   {
                //     date: "2024-01-03",
                //     time: 8.1,
                //   },
                //   {
                //     date: "2024-01-04",
                //     time: 6.2,
                //   },
                //   {
                //     date: "2024-01-05",
                //     time: 5.2,
                //   },
                //   {
                //     date: "2024-01-06",
                //     time: 8.1,
                //   },
                //   {
                //     date: "2024-01-07",
                //     time: 7.0,
                //   },
                // ]}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="date" hide />
                <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="time"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-time)"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Daily likes :
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          {/* likes */}
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  )
}

export default AreaChartCard