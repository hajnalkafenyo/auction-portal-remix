import { getUser } from "~/.server/session";
import type { Route } from "./+types/home";
import { NoroffClient } from "~/.server/noroff-api";
import { profile } from "console";
import { ListingCard } from "~/components/ListingCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home(p: Route.ComponentProps) {
  const listings = p.loaderData.listings;
  const userName = p.loaderData.user;
  return (
    <div className="grid grid-cols-12 w-fit gap-1">
      {listings.map((listing) => (
        <ListingCard
          listing={listing}
          isUserTheSeller={userName === listing.seller.name}
        />
      ))}
    </div>
  );
}

export async function loader(p: Route.LoaderArgs) {
  const user = await getUser(p.request);
  const client = new NoroffClient(user.accessToken);
  const listings = await client.getlistings();

  return {
    user: user.userName,
    listings: listings,
  };
}
