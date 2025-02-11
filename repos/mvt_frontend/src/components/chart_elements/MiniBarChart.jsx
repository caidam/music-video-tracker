import React from 'react'
import {
Bar,
BarChart,
Rectangle,
XAxis,
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
} from "@/components/ui/chart"

function MiniBarChart({ data, datapoint, title}) {

  ///////////////////////////////
  const limit = 7; // Adjust this value to change the number of displayed records
  const fieldName = datapoint; // Field name variable

  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  // Calculate overall average daily views
  const validValues = data.filter(record => record[fieldName] !== null).map(record => record[fieldName]);
  const overallAvg = validValues.reduce((acc, views) => acc + views, 0) / validValues.length;

  // Limit the data to the last specified number of records
  const limitedData = data.slice(-limit);

  // Calculate average daily views over the limited period and round to an integer
  const limitedAvgValue = Math.round(
    limitedData.reduce((acc, record) => acc + (record[fieldName] || 0), 0) / limitedData.length
  );

  const formattedLimitedAvgValue = limitedAvgValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Total count
  const totalFieldName = `video_${title.slice(0, -1)}_count`;
  const totalCount = data[data.length - 1]?.[totalFieldName] || '';
  const formattedTotalCount = totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Transform the data to the format needed by the BarChart
  const chartData = limitedData.map(item => ({
    date: item.ref_day,
    steps: item[fieldName] || limitedAvgValue, // Ensure a value is present for the chart
  }));

  return (
    <div>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>{capitalizedTitle} Overview</CardTitle>
            <CardDescription>
              Over the last 7 days, this video had an average of {formattedLimitedAvgValue} {title} per day for a grand total of {formattedTotalCount} {title}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
            {formattedLimitedAvgValue}
              <span className="text-sm font-normal text-muted-foreground">
                {title}/day on average
              </span>
            </div>
            <ChartContainer
              config={{
                steps: {
                  label: "Steps",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="ml-auto w-[72px]"
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                data = {chartData}
                // data={[
                //   {
                //     date: "2024-01-01",
                //     steps: 2000,
                //   },
                //   {
                //     date: "2024-01-02",
                //     steps: 2100,
                //   },
                //   {
                //     date: "2024-01-03",
                //     steps: 2200,
                //   },
                //   {
                //     date: "2024-01-04",
                //     steps: 1300,
                //   },
                //   {
                //     date: "2024-01-05",
                //     steps: 1400,
                //   },
                //   {
                //     date: "2024-01-06",
                //     steps: 2500,
                //   },
                //   {
                //     date: "2024-01-07",
                //     steps: 1600,
                //   },
                // ]}
              >
                <Bar
                  dataKey="steps"
                  fill="var(--color-steps)"
                  radius={2}
                  fillOpacity={0.2}
                  activeIndex={6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  hide
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  )
}

export default MiniBarChart