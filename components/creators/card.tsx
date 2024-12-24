import { Creator } from "@/types";
import { CardContainer } from "../card/container";
import { FavoriteButton } from "../card/favourite-button";
import { CardHeader } from "../card/header";
import { CardImage } from "../card/image";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <CardContainer className="p-0 relative overflow-hidden">
      <CardImage
        className="h-96 w-full object-cover"
        src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
        alt={creator.fullName}
      />
      <CardHeader
        className="flex flex-col justify-center items-start p-4 absolute bottom-0 bg-gradient-to-t from-black/100 to-black/5 w-full">
        <p className="font-medium text-white">{creator.fullName}</p>
      </CardHeader>
    </CardContainer>
  );
}