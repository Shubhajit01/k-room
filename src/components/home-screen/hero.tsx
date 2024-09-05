import { useOptionalUser } from "@/hooks/use-user";
import { Link } from "@/router";
import { useFetcher } from "react-router-dom";
import { Button } from "../ui/button";

import roomScreenshotHref from "@/assets/images/rooms-screenshot.png?format=webp&w=1280?imagetools";

export default function Hero() {
  const user = useOptionalUser();
  const loginFetcher = useFetcher();

  return (
    <section className="text-center w-full max-w-7xl mx-auto pt-32 px-6 *:animate-in *:fade-in *:slide-in-from-bottom-2">
      <h1 className="text-5xl sm:text-7xl font-medium sm:tracking-tighter text-balance max-w-5xl mx-auto">
        Bringing people together with just a click!
      </h1>

      <div className="text-lg sm:text-xl text-gray-500 mt-4 text-balance">
        <p>Create your own space for meaningful conversations.</p>
        <p>Connect privately or join the world in public rooms.</p>
      </div>

      <Button
        asChild
        disabled={loginFetcher.state === "submitting"}
        className="text-lg px-14 py-7 mt-8 rounded-xl"
      >
        {user ? (
          <Link to="/rooms">Show my rooms</Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              loginFetcher.submit(
                { intent: "google" },
                { method: "POST", action: "/actions/auth/login" },
              );
            }}
          >
            Get started
          </button>
        )}
      </Button>

      <div className="w-10/12 border p-2.5 rounded-xl bg-gray-100 mx-auto mt-16 aspect-video">
        <div className="w-full rounded-xl h-full border bg-white relative">
          <img
            alt=""
            src={roomScreenshotHref}
            className="object-cover absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
}
