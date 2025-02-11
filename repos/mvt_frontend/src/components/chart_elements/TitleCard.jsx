import React from 'react'
import {
PolarAngleAxis,
RadialBar,
RadialBarChart,
} from "recharts"

import {
Card,
CardContent,
} from "@/components/ui/card"
import {
ChartContainer,
} from "@/components/ui/chart"

function TitleCard({ data }) {
  return (
    <div>
        <Card
          className="lg:max-w-md" x-chunk="charts-01-chunk-5"
        >
          <CardContent className="flex gap-4 p-4">

            {/* <div className="grid items-center gap-2"> */}
            {/* <div className="grid items-center gap-2"> */}
                
              <div className="grid flex-1 auto-rows-min gap-0.5">
              <div style={{ 
                            width: '200px', height: '130px', 
                            overflow: 'hidden', 
                            borderRadius: '20%', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            // border: '2px solid #555' 
                        }}
                className="mx-auto aspect-square w-full max-w-[80%] border-2 border-muted mb-4"
                >
              {data && data[0] && data[0].youtube_video_thumbnail_url && (
                <img src={data[0].youtube_video_thumbnail_url} alt="Video Thumbnail" style={{ maxWidth: '120%', maxHeight: '120%' }} />
                )}
              </div>
              {/* </div> */}
              <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Channel</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {data && data[0] && data[0].youtube_video_thumbnail_url && (
                   <p> {data[0].youtube_channel_title} </p>
                )}
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Title</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {data && data[0] && data[0].youtube_video_thumbnail_url && (
                   <p> {data[0].youtube_video_title} </p>
                )}
                </div>                
              </div>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default TitleCard