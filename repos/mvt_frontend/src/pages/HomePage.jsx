import React, { useContext, useEffect } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { DataTableDemo } from '@/components/DataTableComponent'
import Navbar from '@/components/Navbar'
import { DataTableDemo2 } from '@/components/DataTableComponent3'
import { Dashboard2 } from '@/components/dummydashboard'
import { DrawerComponent } from '@/components/DrawerComponent'
import Addsource from '@/components/AddsourceComponent'
import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';

const HomePage = () => {

  const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
  const [userSources, setUserSources, setUserSourcesUpdateNeeded] = useUserSources();

  useEffect(() => {
    console.log('Sources in AboutPage:', sources);
  }, [sources]);

  useEffect(() => {
    console.log('UserSources in AboutPage:', userSources);
  }, [userSources]);

  return (
    <>
        <Navbar>
          <Dashboard2>
            <DataTableDemo2 
                    sources={sources} 
                    userSources={userSources} 
                    setSourcesUpdateNeeded={setSourcesUpdateNeeded} 
                    setUserSourcesUpdateNeeded={setUserSourcesUpdateNeeded} 
            >
              <DrawerComponent>
                <Addsource 
                    sources={sources} 
                    setSourcesUpdateNeeded={setSourcesUpdateNeeded} 
                    setUserSourcesUpdateNeeded={setUserSourcesUpdateNeeded} 
                />
              </DrawerComponent>
            </DataTableDemo2>
          </Dashboard2>
        </Navbar>
    </>
  )
}

export default HomePage