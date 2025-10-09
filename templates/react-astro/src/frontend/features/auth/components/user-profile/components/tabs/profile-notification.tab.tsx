import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Label } from "@esmate/shadcn/components/ui/label";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Switch } from "@esmate/shadcn/components/ui/switch";
import { TabsContent } from "@esmate/shadcn/components/ui/tabs";

interface Props {
  value: string;
}

export function ProfileNotificationTab(props: Props) {
  return (
    <TabsContent value={props.value} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what notifications you want to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Weekly Summary</Label>
                <p className="text-sm text-muted-foreground">Get a weekly summary of your activity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Important security notifications (always enabled)</p>
              </div>
              <Switch checked disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
