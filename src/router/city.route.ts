export default [
  {
    path: "/weather/:state/:city",
    name: "CityView",
    component: () => import("../views/CityView.vue"),
    props: true,
  },
];
