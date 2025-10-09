import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { TabsContent } from "@esmate/shadcn/components/ui/tabs";
import { getLanguageList, getTimeZoneList } from "@esmate/utils/locale";

import { SearchSelect } from "./search-select";

const timeZones = getTimeZoneList().map((tz) => ({ label: tz.name, value: tz.value }));
const languages = getLanguageList().map((lang) => ({ label: lang.name, value: lang.value }));

interface Props {
  value: string;
}

export function ProfilePersonalTab(props: Props) {
  return (
    <TabsContent value={props.value} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <SearchSelect id="timezone" options={timeZones} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <SearchSelect id="timezone" options={languages} />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
