import { href, Link } from "react-router";
import type { Listing, Profile, PublicProfile } from "~/types";
import { getMaxBid } from "~/utils/bids";
import { dateDifference } from "~/utils/date";

interface Props {
  listing: Listing;
  isUserTheSeller: boolean;
}

function bidText(bids: number): string {
  if (bids === 0) {
    return "No bids yet";
  }
  if (bids === 1) {
    return "1 bid";
  }
  return `${bids} bids`;
}

export function ListingCard({ listing, isUserTheSeller }: Props) {
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 border rounded border-gray-200 bg-white shadow-sm m-1">
      <div className="flex flex-row relative">
        <img
          src={listing.media[0]?.url}
          alt={listing.media[0]?.alt}
          className="object-cover h-[300px] w-full"
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold text-primary text-lg overflow-hidden overflow-ellipsis">
          <a href="listing.html?id=${listing.id}">{listing.title}</a>
        </h2>

        <div className="flex flex-row justify-between">
          <div className="flex gap-2">
            <Link
              to={href("/profile/:username?", {
                username: listing.seller?.name,
              })}
            >
              <div className="flex flex-row items-center justify-center gap-3">
                <div>
                  <img
                    src={listing.seller?.avatar.url}
                    alt={listing.seller?.avatar.alt}
                    className="w-4 h-4 rounded-full"
                  />
                </div>
                <div className="flex flex-col">{listing.seller?.name}</div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <p>Created: {dateDifference(listing.created)}</p>
            <p>Ends {dateDifference(listing.endsAt)}</p>
          </div>
        </div>
        <hr />
        <div id="listingBody">
          <p className="text-sm my-3 overflow-hidden overflow-ellipsis">
            {listing.description ||
              '<span class="italic">No description provided</span>'}
          </p>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="text-sm mt-3">Current Bid</p>
            <p className="font-bold text-primary">
              💰{getMaxBid(listing.bids)}
            </p>
            <p className="text-sm text-gray-400">
              {bidText(listing._count.bids)}
            </p>
          </div>
          <div>
            {" "}
            {isUserTheSeller ? (
              <button
                type="button"
                className={
                  "bg-primary p-2 pt-2 rounded-lg text-white font-medium delete-button (data-deleteid={listing.id)}"
                }
              >
                Delete
              </button>
            ) : (
              <a
                href="listing.html?id=${listingData.id}"
                type="button"
                className={
                  " bg-secondary p-2 pt-2 rounded-lg text-primary font-medium"
                }
              >
                Place Bid
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
