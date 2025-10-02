import { Avatar, AvatarFallback, AvatarImage } from "@esmate/shadcn/components/ui/avatar";
import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Switch } from "@esmate/shadcn/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@esmate/shadcn/components/ui/tabs";
import { Textarea } from "@esmate/shadcn/components/ui/textarea";
import { Calendar, Camera, Key, LoaderCircle, Mail, MapPin, Shield, Trash2 } from "@esmate/shadcn/pkgs/lucide-react";

import { auth } from "@frontend/shared/utils/auth";

export function Profile() {
  const session = auth.useSession();

  // auth.updateUser({
  //   name: "Vien Dinh",
  //   image: "https://bundui-images.netlify.app/avatars/08.png",
  // });

  if (session.isPending) {
    return <LoaderCircle className="animate-spin" />;
  }

  if (!session.data?.user || session.error) {
    return window.location.replace("/auth/signin");
  }

  const { user } = session.data;

  return (
    <div className="w-full max-w-lg space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage className="border" src={user.image || undefined} alt={user.name} />
                <AvatarFallback className="border text-5xl font-bold">{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              {/* <Button size="icon" variant="outline" className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full">
                <Camera />
              </Button> */}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge variant="secondary">{user.emailVerified ? "Verified" : "Unverified"}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  Joined {user.createdAt.toDateString()}
                </div>
                {/* <div className="flex items-center gap-1">
                  <Mail className="size-4" />
                  {user.email}
                </div> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" defaultValue="Senior Product Designer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="Acme Inc." />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              defaultValue="Passionate product designer with 8+ years of experience creating user-centered digital experiences. I love solving complex problems and turning ideas into beautiful, functional products."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="San Francisco, CA" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
