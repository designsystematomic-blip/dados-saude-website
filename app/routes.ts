import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("*", "routes/$.tsx"),
  route("login", "routes/login.tsx"),
  route("forgot-password", "routes/forgot-password.tsx"),
  route("register", "routes/register.tsx"),
  route("exam", "routes/exam.tsx"),
  route('exam/:id', 'routes/exam.$id.tsx'),
  route("exam/new", "routes/exam.new.tsx"),
] satisfies RouteConfig;
