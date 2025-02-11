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



export function Dashboard2( props ) {
  return (
    <div>

          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">

              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Tracked Videos</CardTitle>
                  <CardDescription>
                    Manage your tracked videos and add new ones
                  </CardDescription>
                </CardHeader>
                <CardContent>



                    {props.children}



                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

    </div>
  )
}
