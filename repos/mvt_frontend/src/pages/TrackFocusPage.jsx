import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Charts } from '@/components/FocusStatsComponent';
import { useModeledData } from '@/hooks/useModeledData';
import { ChartWrapper, ChartGridLeft, ChartGridMiddle, ChartGridRight } from '@/components/chart_elements/ChartGrid';
import BarChartCard from '@/components/chart_elements/BarChartCard';
import LineChartCard from '@/components/chart_elements/LineChartCard';
import ProgressCard from '@/components/chart_elements/ProgressCard';
import MiniBarChart from '@/components/chart_elements/MiniBarChart';
import MultiDonutCard from '@/components/chart_elements/MultiDonutCard';
import AreaChartCard from '@/components/chart_elements/AreaChartCard';
import TitleCard from '@/components/chart_elements/TitleCard';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from 'react-router-dom';
import '@/styles/ripple.css'

const TrackFocusPage = () => {
  const { source_id } = useParams();
  const [statsData, setStatsData, setStatsDataUpdateNeeded] = useModeledData('/api/source_stats', source_id); 
  const [loading, setLoading] = useState(true);
  const [extendedLoading, setExtendedLoading] = useState(false);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      if (!statsData) {
        setExtendedLoading(true);
        // toast.info('Waiting for data...');
      } else {
        setLoading(false);
      }
    }, 5000); // x seconds delay

    return () => clearTimeout(initialDelay);
  }, [statsData]);

  useEffect(() => {
    if (extendedLoading) {
      const extendedDelay = setTimeout(() => {
        if (!statsData) {
          toast.error('No data available yet... try again in a few days.');
        }
        setLoading(false);
      }, 4000); // Additional x seconds delay

      return () => clearTimeout(extendedDelay);
    }
  }, [extendedLoading, statsData]);

  useEffect(() => {
    if (!loading) {
      if (statsData && statsData.length > 0) {
        const firstDayOfTracking = new Date(statsData[0].ref_day);
        const today = new Date();
        const daysOfTracking = Math.floor((today - firstDayOfTracking) / (1000 * 60 * 60 * 24));

        if (daysOfTracking < 1) {
          toast.info('Data is not yet available. Please check back tomorrow.');
        } else if (daysOfTracking < 7) {
          toast.info(`Tracking data is still being collected for this video. Fully exhaustive data will be available in ${7 - daysOfTracking} days.`);
        }
      } else {
        toast.info("Data seem unavailable for the moment, come back in a few days!");
      }
    }
  }, [loading, statsData]);

  return (
    <div>
      <Navbar>
        <ChartWrapper>
          {loading ? (

<div className="flex flex-col items-center justify-center p-6 mx-auto mt-10">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        
        <div>
            <div className="flex flex-col space-y-3 mb-16 mx-auto">
                <Skeleton className="h-[150px] w-[150px] sm:w-[300px] rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px] sm:w-[220px]" />
                    <Skeleton className="h-5 w-[100px] sm:w-[180px]" />
                </div>
            </div>
        </div>

        <div>
            <div className="flex flex-col space-y-3 mb-16 mx-auto">
                <Skeleton className="h-[150px] w-[150px] sm:w-[300px] rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px] sm:w-[220px]" />
                    <Skeleton className="h-5 w-[100px] sm:w-[180px]" />
                </div>
            </div>
        </div>
        
        <div>
            <div className="flex flex-col space-y-3 mb-16 mx-auto">
                <Skeleton className="h-[150px] w-[150px] sm:w-[300px] rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px] sm:w-[220px]" />
                    <Skeleton className="h-5 w-[100px] sm:w-[180px]" />
                </div>
            </div>
        </div>
        
        <div>
            <div className="flex flex-col space-y-3 mb-16 mx-auto">
                <Skeleton className="h-[150px] w-[150px] sm:w-[300px] rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px] sm:w-[220px]" />
                    <Skeleton className="h-5 w-[100px] sm:w-[180px]" />
                </div>
            </div>
        </div>
        
        <div>
            <div className="flex flex-col space-y-3 mb-16 mx-auto">
                <Skeleton className="h-[150px] w-[150px] sm:w-[300px] rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px] sm:w-[220px]" />
                    <Skeleton className="h-5 w-[100px] sm:w-[180px]" />
                </div>
            </div>
        </div>
        
        <div>
            <div className="flex flex-col space-y-3 mb-16 mx-auto">
                <Skeleton className="h-[150px] w-[150px] sm:w-[300px] rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px] sm:w-[220px]" />
                    <Skeleton className="h-5 w-[100px] sm:w-[180px]" />
                </div>
            </div>
        </div>
        
    </div>
</div>


          ) : (
            statsData && statsData.length > 0 ? (
              <>
                <ChartGridLeft>
                  <TitleCard data={statsData} />
                  <BarChartCard data={statsData} />
                </ChartGridLeft>
                <ChartGridMiddle>
                  <LineChartCard data={statsData} />
                  <AreaChartCard data={statsData} />
                  <MiniBarChart data={statsData} datapoint='daily_likes' title='likes' />
                </ChartGridMiddle>
                <ChartGridRight>
                  <MiniBarChart data={statsData} datapoint='daily_comments' title='comments' />
                  <MultiDonutCard data={statsData} />
                  <ProgressCard data={statsData} />
                </ChartGridRight>
              </>
            ) : (
              <div style={{ marginTop: '20px' }} className='text-lg text-muted-foreground'>
                <Link to='/discovery'>
                <img 
                  src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDJteWo2enphenE1N2Q5eWEzNXphOTVkZzZmdHN2NzB0djc1M21kbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IXT16ltI7K2nC/giphy.gif" 
                  alt="No Data Available"
                  className='mx-auto flex items-center justify-center mt-10 mb-10' 
                />
                </Link>
                <p>No data available yet for this video... our best music loving robot has been assigned to the task, come back in a few days!</p>
                <p>For new videos, partial data is usually available the next day and is fully exhaustive after around a week of collecting.</p>
                <p className='mt-2'>In the meantime check the <Link to='/discovery' className='text-primary'>Discovery</Link> page to watch and listen random music videos added by other users of the website.</p>
              </div>
            )
          )}
        </ChartWrapper>
      </Navbar>
    </div>
  );
}

export default TrackFocusPage;