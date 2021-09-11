import Index from "../src/views/Index";
import Animals from "../src/views/animals-api";
import Users from "../src/views/users-api";
import Hostels from "./views/hostels-api";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/animals",
    name: "Animals API",
    icon: "fas fa-paw",
    component: Animals,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users API",
    icon: "fas fa-users",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/hostels",
    name: "Hostels API",
    icon: "fas fa-hotel",
    component: Hostels,
    layout: "/admin",
  },
];
export default routes;
