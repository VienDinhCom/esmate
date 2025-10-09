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

import { ProfileContent } from "./profile-content";
import { ProfileHeader } from "./profile-header";

export function UserProfile() {
  // const session = auth.useSession();

  // auth.updateUser({
  //   name: "Vien Dinh",
  //   image: "https://bundui-images.netlify.app/avatars/08.png",
  // });

  // if (session.isPending) {
  //   return <LoaderCircle className="animate-spin" />;
  // }

  // if (!session.data?.user || session.error) {
  //   return window.location.replace("/auth/signin");
  // }

  // const { user } = session.data;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}
