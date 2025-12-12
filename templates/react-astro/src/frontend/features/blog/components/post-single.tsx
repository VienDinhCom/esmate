import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@esmate/shadcn/components/ui/card";
import defaultImage from "@frontend/assets/images/blog-placeholder-1.jpg";

interface Props {
  id: string;
  title: string;
  image?: ImageMetadata;
  children: ReactNode;
}

export function PostSingle(props: Props) {
  return (
    <Card key={props.id} className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0">
      <div className="aspect-video w-full">
        <img
          src={props.image?.src || defaultImage.src}
          alt={props.title}
          height={props.image?.height || defaultImage.height}
          width={props.image?.width || defaultImage.width}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <CardHeader>
        <h1 className="text-3xl font-semibold">{props.title}</h1>
      </CardHeader>
      <CardContent className="prose min-w-full">{props.children}</CardContent>
    </Card>
  );
}
