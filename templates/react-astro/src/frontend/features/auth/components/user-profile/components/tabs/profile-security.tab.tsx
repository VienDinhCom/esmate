import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Label } from "@esmate/shadcn/components/ui/label";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Switch } from "@esmate/shadcn/components/ui/switch";
import { TabsContent } from "@esmate/shadcn/components/ui/tabs";
import { Key, Shield } from "@esmate/shadcn/pkgs/lucide-react";

interface Props {
  value: string;
}

export function ProfileSecurityTab(props: Props) {
  return (
    <TabsContent value={props.value} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and authentication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Password</Label>
                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <Button variant="outline">
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                  Enabled
                </Badge>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Login Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Active Sessions</Label>
                <p className="text-sm text-muted-foreground">Manage devices that are logged into your account</p>
              </div>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                View Sessions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
