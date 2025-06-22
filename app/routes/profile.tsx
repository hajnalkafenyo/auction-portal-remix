import { getUser } from "~/.server/session";
import type { Route } from "./+types/profile";
import { NoroffClient } from "~/.server/noroff-api";

export default function Profile(p: Route.ComponentProps) {
  const id = p.loaderData.id;
  const profile = p.loaderData.profile;
  const isCurrentUser = p.loaderData.isCurrentUser;
  return (
    <main>
      <div className="relative mb-8">
        <img
          src={profile.banner.url}
          alt={profile.banner.alt}
          className="object-cover w-full h-72"
        />
        <div className="absolute -bottom-10 left-4">
          <img
            src={profile.avatar.url}
            alt={profile.avatar.alt}
            className="object-cover w-40 h-40 border-black rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 md:m-16 m-1 gap-4">
        <div className="flex flex-col md:col-span-9 col-span-12 ">
          <div className="p-4">
            <p className="header-1">{profile.name}</p>
            <p>{profile.email}</p>
          </div>
          <div className="border rounded border-gray-200 bg-white p-4 shadow-sm">
            <div className="font-bold text-primary">Bio</div>
            <div className="text-primary italic">
              {profile.bio || "User is not updated bio field yet"}
            </div>
          </div>
        </div>
        <div className="border rounded border-gray-200 p-4 bg-white shadow-sm md:col-span-3 col-span-12 h-fit">
          <p className="font-bold text-primary">Account balance</p>
          <p className="font-bold text-green-600">{profile.credits} Credits</p>
        </div>
        <div className="m-1">
          {isCurrentUser && (
            <button
              type="button"
              className="button-primary px-2 edit-profile-button"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="card-body card-profile-form hidden">
        <form className="edit-profile-form">
          <div className="form-floating">
            <div className="mb-4 inputfield">
              <label htmlFor="banner" className="form-label">
                Banner
              </label>
              <input
                value={profile.banner.url || ""}
                className="form-control edit-form-banner"
                type="url"
                placeholder="Leave a picture here"
              />
            </div>
            <div className="mb-4 inputfield">
              <label htmlFor="avatar" className="form-label">
                Avatar
              </label>
              <input
                value={profile.avatar.url || ""}
                className="form-control edit-form-avatar"
                type="url"
                placeholder="Leave a picture here"
              />
            </div>
            <div>
              <label htmlFor="Bio" className="form-label">
                Bio
              </label>
              <textarea
                className="form-control edit-form-bio"
                placeholder="Leave a comment here"
              >
                {profile.bio || ""}
              </textarea>
            </div>
            <div>
              <button className="button-primary px-2" type="submit">
                Save
              </button>
              <button
                className="bg-secondary p-2 pt-2 rounded-lg text-primary font-medium edit-profile-button"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-row justify-between">
        <p className="font-bold text-primary">My Listings</p>
      </div>
      <div
        className="grid grid-cols-12 w-fit gap-2 md:m-16 m-1"
        id="listing-container"
      ></div>
      <div className="flex justify-center mb-4">
        <a
          href="index.html"
          type="button"
          className="bg-white border p-2 pt-2 rounded-lg text-primary m-2"
        >
          View all Listings
        </a>
      </div>
    </main>
  );
}

export async function loader(p: Route.LoaderArgs) {
  const userNameFromParams = p.params.username;
  const user = await getUser(p.request);

  const profileName = userNameFromParams ?? user.userName;
  const isCurrentUser = profileName === user.userName;

  const client = new NoroffClient(user.accessToken);
  const profile = await client.getProfile(profileName);

  return {
    id: profileName,
    profile: profile,
    isCurrentUser,
  };
}
