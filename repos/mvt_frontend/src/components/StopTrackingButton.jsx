import React from 'react';
import { useStopTracking } from '../hooks/useTrackedSources';

const StopTrackingButton = ({ sourceUrl, userSourceId, setSourcesUpdateNeeded }) => {
  const stopTracking = useStopTracking();

  const handleClick = async () => {
    const confirmStopTracking = window.confirm('Are you sure you want to stop tracking this source?');
    if (confirmStopTracking) {
      try {
        await stopTracking(sourceUrl, userSourceId);
        alert('Stopped tracking the source successfully!');
        setSourcesUpdateNeeded(true);
      } catch (error) {
        console.error('Error stopping tracking:', error);
      }
    }
  };

  return <button onClick={handleClick}>Stop Tracking</button>;
};

export default StopTrackingButton;