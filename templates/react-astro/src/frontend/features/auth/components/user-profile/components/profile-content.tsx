import { Tabs, TabsList, TabsTrigger } from "@esmate/shadcn/components/ui/tabs";

import { ProfileAccountTab } from "./tabs/profile-account-tab";
import { ProfileNotificationTab } from "./tabs/profile-notification.tab";
import { ProfilePersonalTab } from "./tabs/profile-personal-tab";
import { ProfileSecurityTab } from "./tabs/profile-security.tab";

export function ProfileContent() {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <ProfilePersonalTab value="personal" />
      <ProfileAccountTab value="account" />
      <ProfileSecurityTab value="security" />
      <ProfileNotificationTab value="notifications" />
    </Tabs>
  );
}
