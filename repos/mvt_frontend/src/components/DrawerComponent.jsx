// import * as React from "react"
// import { Minus, PlusCircle } from "lucide-react"
// // import { Bar, BarChart, ResponsiveContainer } from "recharts"

// import { Button } from "@/components/ui/button"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// // import Addsource from "./AddsourceComponent"

// export function DrawerComponent( props ) {
//   const [goal, setGoal] = React.useState(350)

//   // function onClick(adjustment) {
//   //   setGoal(Math.max(200, Math.min(400, goal + adjustment)))
//   // }

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button size="sm" className="h-8 gap-1">
//                   <PlusCircle className="h-3.5 w-3.5" />
//                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                     Add Video
//                   </span>
//         </Button>
//         {/* <Button variant="outline">Open Drawer</Button> */}
//       </DrawerTrigger>
//       <DrawerContent className='bg-card'>
//         <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <DrawerTitle className="m-4">Add A New Video</DrawerTitle>
//             <DrawerDescription>Submit the YouTube URL of the video you want to track</DrawerDescription>
//           </DrawerHeader>
//           <div className="pt-0 p-4 pb-0">

//             {/* <Addsource/> */}
//             {props.children}

//           </div>
//           <DrawerFooter>
//             {/* <Button>Submit</Button> */}
//             <DrawerClose asChild>
//               <Button variant="outline">Exit</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>

//   )
// }

// import * as React from "react";
// import { PlusCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

// // Custom hook to check screen size
// const useMediaQuery = (query) => {
//   const [matches, setMatches] = React.useState(window.matchMedia(query).matches);

//   React.useEffect(() => {
//     const mediaQueryList = window.matchMedia(query);
//     const listener = (event) => setMatches(event.matches);

//     mediaQueryList.addEventListener('change', listener);
//     return () => mediaQueryList.removeEventListener('change', listener);
//   }, [query]);

//   return matches;
// };

// export function DrawerComponent(props) {
//   const isSmallScreen = useMediaQuery('(max-width: 640px)'); // Adjust the breakpoint as needed

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button size="sm" className="h-8 gap-1">
//           <PlusCircle className="h-3.5 w-3.5" />
//           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//             Add Video
//           </span>
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent className={`bg-card ${isSmallScreen ? 'max-w-full h-screen max-h-screen overflow-y-auto' : 'max-w-sm'}`}>
//         <div className={`mx-auto w-full ${isSmallScreen ? 'px-4' : 'px-6'}`}>
//           <DrawerHeader>
//             <DrawerTitle className={`m-4 ${isSmallScreen ? 'text-base' : 'text-lg'}`}>
//               Add A New Video
//             </DrawerTitle>
//             <DrawerDescription className={`${isSmallScreen ? 'text-xs' : 'text-sm'}`}>
//               Submit the YouTube URL of the video you want to track
//             </DrawerDescription>
//           </DrawerHeader>
//           <div className="pt-0 p-4 pb-0">
//             {props.children}
//           </div>
//           <DrawerFooter>
//             <DrawerClose asChild>
//               <Button variant="outline">Exit</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }


import * as React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Custom hook to check screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(window.matchMedia(query).matches);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export function DrawerComponent(props) {
  const isSmallScreen = useMediaQuery('(max-width: 640px)'); // Adjust the breakpoint as needed

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Video
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent 
        className={`bg-card ${isSmallScreen ? 'max-w-full h-screen max-h-[90vh] overflow-y-auto mt-20 mx-2' : 'max-w-sm'}`}
      >
        <div className={`w-full ${isSmallScreen ? 'px-4' : 'px-6'}`}>
          <DrawerHeader>
            <DrawerTitle className={`m-4 ${isSmallScreen ? 'text-base' : 'text-lg'}`}>
              Add A New Video
            </DrawerTitle>
            <DrawerDescription className={`${isSmallScreen ? 'text-xs' : 'text-sm'}`}>
              Submit the YouTube URL of the video you want to track
            </DrawerDescription>
          </DrawerHeader>
          <div className="pt-0 p-4 pb-0">
            {props.children}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Exit</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
