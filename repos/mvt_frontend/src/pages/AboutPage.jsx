import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Tabs,
    TabsContent,
  } from "@/components/ui/tabs"
import Navbar from '@/components/Navbar'
import { Link } from 'react-router-dom'
import Image from '@/components/CustomImage'
import ExampleImage from '@/assets/focuspageexample.png';

export default function AboutPageComponent() {
  return (

    <Navbar>
    <div className="w-full max-w-full">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            {/* Additional content */}
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className="mb-10 ml-10">About</CardTitle>
              <CardDescription className="text-md mx-auto">
                {/* Music discovery by way of visual curation */}
                <div className='ml-10'>
                <p className='mb-4'>This website helps you remember and keep track of the music videos you discover on YouTube.</p>

                <p>Visit the <Link to='/' className='text-primary'>Analytics</Link> page and use the <span className='text-primary'>Add Video</span> button to track a YouTube music video by pasting its URL.</p>
                <p className='mb-4'>Come back a few days later to check how it performed since the day you added it.</p>

                <p className='mb-8'>In the meantime visit the <Link to='/discovery' className='text-primary'>Discovery</Link> page to watch and listen to random music videos added by other users of the website.</p>
                </div>
                  <Image
                    alt="Thumbnail url"
                    className="rounded-md"
                    src={ExampleImage}
                    // height="60px"
                    // width="100px"
                  />
                
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full">

                {/* <Image
                  alt="Thumbnail url"
                  className="aspect-square rounded-md object-cover mx-auto"
                  src={ExampleImage}
                  // height="60px"
                  // width="100px"
                /> */}
                
                {/* {props.children} */}

              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </Navbar>

  )
}