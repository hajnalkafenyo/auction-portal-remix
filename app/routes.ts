import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/index.tsx", [
        index("routes/home.tsx"),
    ]),

    route("/login", "routes/login.tsx"),
    route("/register", "routes/register.tsx")

] satisfies RouteConfig;
