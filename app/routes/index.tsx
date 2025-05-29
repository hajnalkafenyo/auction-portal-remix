import { Outlet } from "react-router";

export default function Index() {
  const user = {
    name: "Test Person",
    credits: 1000,
  };
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <header className="">
        <nav
          id="header"
          className="flex flex-row w-full justify-center p-2 bg-white border"
        >
          <div className="flex flex-row justify-between max-w-[1024px] w-full items-center">
            <a
              data-toggle="popover"
              title="Home"
              href="/"
              className="flex flex-row gap-8 h-fit"
            >
              <img
                src="/images/logo.png"
                alt="BookBid Logo"
                style={{
                  height: "24px",
                  width: "24px",
                }}
              />
              <span className="font-bold text-primary sm:block hidden">
                BookBid
              </span>
            </a>
            <div className="flex flex-row gap-4 items-center">
              <a
                data-toggle="popover"
                title="Create a new listing"
                href="new_listing.html"
                type="button"
                className="button-primary px-2 hidden md:block"
              >
                New Listing
              </a>
              <a
                data-toggle="popover"
                title="Create a new listing"
                href="new_listing.html"
                type="button"
                className="button-primary px-2 block md:hidden"
              >
                +
              </a>
              <div
                data-toggle="popover"
                title="Your Credits"
                className="bg-secondary p-2 pt-2 rounded-lg text-primary font-medium"
              >
                💰{user.credits}
              </div>
              <a
                data-toggle="popover"
                title="Your user"
                href="profile.html?id=${user.name}"
                id="headerUser"
                className="font-medium text-primary items-center"
              >
                {user.name}
              </a>
              <a
                data-toggle="popover"
                title="Log out"
                className="text-primary"
                id="logOut"
                href="#"
              >
                <img
                  src="/images/logout.svg"
                  alt="logout icon"
                  style={{
                    height: "24px",
                    width: "24px",
                  }}
                />
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-[1024px] mx-auto w-full grow">
        <Outlet />
      </main>
      <footer className="bg-white grid md:grid-cols-3 w-full px-4 py-8 max-w-[1024px] mx-auto">
        <div>
          <a href="/" className="flex flex-row gap-8 h-fit">
            <img
              src="/images/logo.png"
              alt="BookBid Logo"
              style={{
                height: "24px",
                width: "24px",
              }}
            />
            <span className="font-bold text-primary">BookBid</span>
          </a>
          <p className="text-gray-400">
            BookBid is the premier auction platform for bibliophiles, connecting
            book lovers with rare and valuable literary treasures from around
            the world.
          </p>
          <span className="flex flex-row">
            <img src="/images/fb.png" alt="socialmedia icon" />
            <img src="/images/insta.png" alt="socialmedia icon" />
            <img src="/images/twitter.png" alt="socialmedia icon" />
          </span>
        </div>
        <div>
          <p>Quick Links</p>
          <p>Home</p>
          <p>Browse Auctions</p>
          <p>How It Works</p>
          <p>Seller Guidelines</p>
          <p>Buyer Guidelines</p>
        </div>
        <div>
          <p>Support</p>
          <p>FaQ</p>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Cookie Policy</p>
        </div>
      </footer>
    </div>
  );
}
