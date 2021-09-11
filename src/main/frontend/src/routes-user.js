import { Link } from 'react-router-dom';
import EnrollAnimal from './components/EnrollAnimal/enroll-animal';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

export default function userRoutes(isLoginIn, userRoles, chechLoginIn) {
  var userroutes = [];
  
  if (isLoginIn == true) {
    if(userRoles.includes('admin')) {
      userroutes = [
        {
          path: "/index",
          name: "Home",
          icon: "fas fa-home",
          component: <Home logout={chechLoginIn} />,
          layout: "",
        },
        {
          path: "/enroll",
          name: "Enroll",
          icon: "fas fa-paw",
          component: <EnrollAnimal logout={chechLoginIn} />,
          layout: "",
        },
        {
          path: "/admin/index",
          name: "Admin",
          icon: "fas fa-home",
          component: <Link />,
          layout: "",
        },
      ];
      return {userroutes}
    } else {
      userroutes = [
        {
          path: "/index",
          name: "Home",
          icon: "fas fa-home",
          component: <Home logout={chechLoginIn} />,
          layout: "",
        },
        {
          path: "/enroll",
          name: "Enroll",
          icon: "fas fa-paw",
          component: <EnrollAnimal logout={chechLoginIn} />,
          layout: "",
        },
      ];
      return {userroutes}
    }
  } else {
    userroutes = [
      {
        path: "/index",
        name: "Home",
        icon: "fas fa-home",
        component: <Home logout={chechLoginIn} />,
        layout: "",
      },
      {
        path: "/login",
        name: "Login",
        icon: "fas fa-sign-in-alt",
        component: <Login chechIsLoginIn={chechLoginIn} logout={chechLoginIn}/>,
        layout: "",
      },
      {
        path: "/register",
        name: "Register",
        icon: "fas fa-user-plus",
        component: <Register chechIsLoginIn={chechLoginIn} logout={chechLoginIn}/>,
        layout: "",
      },
    ];
    return {userroutes};
  }
}