import React from 'react'
import {
Bar,
BarChart,
LabelList,
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
} from "@/components/ui/chart"

function ProgressCard({ data }) {

  const totalChannelViews = data[data.length - 1]?.['channel_view_count'] || 0;
  const formattedTotalChannelViews = new Intl.NumberFormat('en-US').format(totalChannelViews);
  const totalVideoViews = data[data.length - 1]?.['video_view_count'] || 0;
  const formattedTotalVideoViews = new Intl.NumberFormat('en-US').format(totalVideoViews);

  const videoTitle = data[data.length - 1]?.['youtube_video_title'] || '';
  const channelTitle = data[data.length - 1]?.['youtube_channel_title'] || '';

  // For spaces instead of commas
  const formattedTotalVideoViewsWithSpaces = totalVideoViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const formattedTotalChannelViewsWithSpaces = totalChannelViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-2"
        >
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
            <CardDescription>
              Total views of the {channelTitle} channel and {videoTitle} video
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {formattedTotalChannelViewsWithSpaces}
                <span className="text-sm font-normal text-muted-foreground">
                  channel views
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--muted))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "Total channel views",
                      steps: 12435,
                    },
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="hsl(var(--muted-foreground))"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {formattedTotalVideoViewsWithSpaces}
                <span className="text-sm font-normal text-muted-foreground">
                  video views
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "Total video views",
                      steps: 10103,
                    },
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="white"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default ProgressCard