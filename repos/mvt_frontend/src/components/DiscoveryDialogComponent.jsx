import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DiscoveryDialogComponent(props) {

  // List of predetermined GIF URLs
  const gifUrls = [
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmlncnBpeTNhMWNhbDM1NHdyaTZvdmQ1YTFlbngyMXV2dzEyeTF5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xelUS261fe2Nu1O/giphy.gif",
    // Add more URLs as needed
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3dpNXV5dTdtbDQ1cG04OHhqYmdoeDBuNXZmcDBmajNxNzlsd2lyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wKnqovL33x9in9ci6X/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWczYTRxZ2E0NzJ4emltb2NkZDdrb3Z2bGFsbHl5ZTFwZ2x1cnFxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nSiNho356rXH2/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ozcjNya3I5M3d2MWpyOHIwZXAzYWJnankxM3ppZ2lvdWw2bHYyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ynwkjey7vNnhh2QWi5/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHN2eW11eGJobGF5YjAxeTdjazQwbmNvemloZTMyMHM5d2R4bGYwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vMSXa7KFGx49aeeXhe/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGYwNm5tMGVlM3RoOGl5bjU4aDhuN3IwZjFvbmR2NGZ6ejZlejU0MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OiQAbeIgiJEzyrM4p9/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmEwcmRxbmZoNDAzY3B0bHFrcmEwM3c0ZWR2OGVoNDlwaWR4a2d1byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V5qXaUBISlbTa/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTJlbDQ3Y2Y2MjdzdjNzbHZhY3lyOTNyZXdiamE2ZnF1cGI3bW16OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6IcLJFT5bHqZ4zYWi5/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2p2dTRsZXg4dTBhc3lrYXNmMWZlOWZ1bjUydHBjejRja2wxeTJzMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4DNPcZOIcgnwA/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDM5Yzl1c3pxZnMxajhhZndlemRlMDE5ZGdha3o3MnQ0Ym5kMjBnbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XxHVJxuogNP32/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDhyMnM1MmcyOHc2eDB6c3YxOHk4NDMxZjZ0ZzE5OHJqajZ4Z2NtbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ff3HmoHoffUxYOSaK6/giphy.gif",
  
  ];

  // Function to get a random GIF URL
  const getRandomGifUrl = () => {
    const randomIndex = Math.floor(Math.random() * gifUrls.length);
    return gifUrls[randomIndex];
  };

  // Get a random GIF URL
  const [randomGifUrl] = React.useState(getRandomGifUrl);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4" style={{ paddingBottom: '30vh' }}>
          <img 
            src={randomGifUrl} 
            alt="Random GIF"
            className='mx-auto flex items-center justify-center mt-10 mb-10' 
          />
      <p className="mb-4 text-lg text-muted-foreground pb-10">
        Click below to discover random music videos tracked by other users
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-md text-primary py-3 px-6">Discover</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-7xl h-auto p-4 flex flex-col items-center justify-center">
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DiscoveryDialogComponent;
