import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Label } from "@esmate/shadcn/components/ui/label";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Switch } from "@esmate/shadcn/components/ui/switch";
import { TabsContent } from "@esmate/shadcn/components/ui/tabs";
import { Trash2 } from "@esmate/shadcn/pkgs/lucide-react";

interface Props {
  value: string;
}

export function ProfileAccountTab(props: Props) {
  return (
    <TabsContent value={props.value} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences and subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Account Status</Label>
              <p className="text-sm text-muted-foreground">Your account is currently active</p>
            </div>
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
              Active
            </Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Subscription Plan</Label>
              <p className="text-sm text-muted-foreground">Pro Plan - $29/month</p>
            </div>
            <Button variant="outline">Manage Subscription</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Account Visibility</Label>
              <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Data Export</Label>
              <p className="text-sm text-muted-foreground">Download a copy of your data</p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Delete Account</Label>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
