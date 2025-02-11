// import React, { useContext } from 'react'
// import AuthContext from '../context/AuthContext';
// import useAxios from '../utils/useAxios';
// import YoutubeVideoCard from '../components/YoutubeVideoCard';
// import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';
// import Addsource from '../components/AddsourceComponent';
// import StopTrackingButton from '../components/StopTrackingButton';
// import Navbar from '@/components/Navbar';

// const HomePage = () => {

//   const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
//   const [userSources, setUserSources, setUserSourcesUpdateNeeded] = useUserSources();

//   let { authTokens, logoutUser } = useContext(AuthContext);

//   let api = useAxios()

//   return (
//     <>
//       <Navbar>
//         <h1>Home</h1>

//         <Addsource  sources={sources} setSourcesUpdateNeeded={setSourcesUpdateNeeded} setUserSourcesUpdateNeeded={setUserSourcesUpdateNeeded} />

//         <h2>Tracked Sources</h2>
//         <div>
//           {sources.map((source, index) => {
//             const userSource = userSources.find(us => us.source === source.id);
//             // console.log(userSource.id)
//             return (
//               <div key={index}>
//                 <YoutubeVideoCard url={source.url} />
//                 {/* {userSource && <button onClick={() => stopTracking(source.url, userSource.id)}>Stop Tracking</button>} */}
//                 {userSource && <StopTrackingButton sourceUrl={source.url} userSourceId={userSource.id} setSourcesUpdateNeeded={setSourcesUpdateNeeded} />}
//               </div>
//             );
//           })}
//         </div>
//       </Navbar>
//     </>
//   )
// }

// export default HomePage


import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';
import YoutubeVideoCard from '../components/YoutubeVideoCard';
import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';
import Addsource from '../components/AddsourceComponent';
import StopTrackingButton from '../components/StopTrackingButton';
import Navbar from '@/components/Navbar';
import { Dashboard } from '@/components/HomeComponent';
import { DrawerComponent } from '@/components/DrawerComponent';

const HomePage = () => {

  const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
  const [userSources, setUserSources, setUserSourcesUpdateNeeded] = useUserSources();

  let { authTokens, logoutUser } = useContext(AuthContext);

  let api = useAxios()

  // useEffect(() => {
  //   console.log('Sources in HomePage:', sources);
  // }, [sources]);


  return (
    <>
      <Navbar>
        
        <Dashboard>
          <DrawerComponent>
            <Addsource sources={sources} setSourcesUpdateNeeded={setSourcesUpdateNeeded} setUserSourcesUpdateNeeded={setUserSourcesUpdateNeeded} />
          </DrawerComponent>
        </Dashboard>

      </Navbar>
    </>
  )
}

export default HomePage
