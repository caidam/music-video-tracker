import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
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

export default function DiscoveryComponent( props ) {
  return (
    // <div
    // className="items-center justify-center rounded-lg border border-dashed shadow-sm"
    // >
    //     <div //className="flex flex-col items-center gap-1 text-center"
    //     >
    //         <h3 className="text-2xl font-bold tracking-tight">
    //             You have no products
    //         </h3>
    //         <p className="text-sm text-muted-foreground">
    //             You can start selling as soon as you add a product.
    //         </p>
    //         <Button className="mt-4">Add Product</Button>
    //     </div>
    // </div>

    // <div className="w-full max-w-full">
    //   <Tabs defaultValue="all">
    //     <div className="flex items-center">
    //       <div className="ml-auto flex items-center gap-2">
    //         {/* Additional content */}
    //       </div>
    //     </div>
    //     <TabsContent value="all">
    //       <Card x-chunk="dashboard-06-chunk-0">
    //         <CardHeader>
    //           <CardTitle>Tracked Videos</CardTitle>
    //           <CardDescription>
    //             Manage your tracked videos and add new ones
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <div className="w-full">
                
    //             {props.children}

    //           </div>
    //         </CardContent>
    //       </Card>
    //     </TabsContent>
    //   </Tabs>
    // </div>


    <div className="flex justify-center w-full">
                    
        {props.children}

    </div>


  )
}
