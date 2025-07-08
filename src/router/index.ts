import cityRoute from "./city.route";
import homeRoutes from "./home.route";
import DefaultLayout from "../layouts/DefaultLayout.vue";
// Wrap all routes as children of DefaultLayout

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [...homeRoutes, ...cityRoute],
  },
];

export default routes;
