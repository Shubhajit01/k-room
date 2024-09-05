import { useIsLoggedIn } from "@/hooks/use-user";
import { Link } from "@/router";
import { Icon } from "@iconify/react";
import { useFetcher } from "react-router-dom";

export default function Header() {
  const loginFetcher = useFetcher();
  const logoutFetcher = useFetcher();

  const isLoggedIn = useIsLoggedIn();

  return (
    <header className="flex justify-center sticky items-center top-10  px-6">
      <nav className="shadow-sm mx-auto py-2 px-6 border font-medium rounded-full text-[0.9rem] bg-white/80 backdrop-blur">
        <ul className="flex items-center justify-evenly gap-8">
          <li className="pl-0">
            <Link to="/">Home</Link>
          </li>
          <li className="border-r pr-6 -mr-2">
            <Link to="/">About</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/rooms"
                  className="flex items-center gap-1 text-indigo-600"
                >
                  <Icon className="size-5" icon="hugeicons:meeting-room" />
                  <span>Rooms</span>
                </Link>
              </li>

              <li className="-ml-2">
                <logoutFetcher.Form method="POST" action="/actions/auth/logout">
                  <button
                    type="submit"
                    className="flex items-center gap-1 text-rose-600"
                  >
                    <Icon
                      className="size-5"
                      icon={
                        logoutFetcher.state === "submitting"
                          ? "svg-spinners:bars-rotate-fade"
                          : "hugeicons:logout-03"
                      }
                    />
                    <span>Logout</span>
                  </button>
                </logoutFetcher.Form>
              </li>
            </>
          ) : (
            <li>
              <loginFetcher.Form method="POST" action="/actions/auth/login">
                <input type="hidden" name="intent" value="google" />
                <button
                  type="submit"
                  className="flex items-center gap-1 text-indigo-600"
                >
                  <Icon
                    className="size-5"
                    icon={
                      loginFetcher.state === "submitting"
                        ? "svg-spinners:bars-rotate-fade"
                        : "hugeicons:login-03"
                    }
                  />
                  <span>Login</span>
                </button>
              </loginFetcher.Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
