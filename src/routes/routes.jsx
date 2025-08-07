import { GiBrokenShield } from "react-icons/gi";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Profile from "../pages/Profile";
import Security from "../pages/Security";
import Settings from "../pages/Settings";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLayers,
  FiDollarSign,
  FiDownloadCloud,
  FiArrowUp,
} from "react-icons/fi";
import { RiProductHuntFill } from "react-icons/ri";
import { CgLock, CgProfile } from "react-icons/cg";
import { TbTableColumn } from "react-icons/tb";
import { BiBook, BiCar, BiRefresh } from "react-icons/bi";
import Users from "../pages/Users";
import { Navigate } from "react-router-dom";
import Sinistre from "../pages/Sinistre";
import Production from "../pages/Production";
import SinistreDatatable from "../components/sinistre/sinistreDatatableComponent";
import AvenantDatatable from "../components/avenant/avenantDatatableComponent";
import VehiculeDatatable from "../components/vehicule/vehiculeDatatableComponent";
import PoliceDatatable from "../components/police/policeDatatableComponent";
import UserDatatable from "../components/user/userDatatableComponent";
import AgencePage from "../pages/AgencePage";

// routes.js
const ROUTES = [
  {
    path: "/login",
    element: <LoginPage />,
    noLayout: true,
  },
  {
    path: "/",
    element: <Home />,
    title: "Home",
    icon: <FiHome size={14} />,
    noLayout: false,
  },
  {
    path: "/production",
    element: <Production />,
    title: "Production",
    icon: <RiProductHuntFill size={14} />,
    noLayout: false,
    children: [
      {
        path: "simulation-mono",
        element: <Profile />,
        noLayout: true,
        title: "Projet Mono",
        icon: <BiRefresh size={14} />,
      },
      {
        path: "simulation-flotte",
        element: <Security />,
        noLayout: true,
        title: "Projet Flotte",
        icon: <BiRefresh size={14} />,
      },
      {
        path: "avenants",
        element: <AvenantDatatable />,
        noLayout: true,
        title: "Mes Avenants",
        icon: <BiBook size={14} />,
      },
      {
        path: "polices",
        element: <PoliceDatatable />,
        noLayout: true,
        title: "Mes Polices",
        icon: <BiBook size={14} />,
      },
      {
        path: "vehicules",
        element: <VehiculeDatatable />,
        noLayout: true,
        title: "Mes Vehicules",
        icon: <BiCar size={14} />,
      },
    ],
  },
  {
    path: "/sinistres",
    element: <Sinistre />,
    title: "Sinistres",
    icon: <GiBrokenShield size={14} />,
    noLayout: false,
    children: [
      {
        path: "declaration",
        element: <Profile />,
        noLayout: true,
        title: "Declaration",
        icon: <FiLayers size={14} />,
      },
      {
        path: "liste",
        element: <SinistreDatatable />,
        noLayout: true,
        title: "Liste",
        icon: <TbTableColumn size={14} />,
      },
      { index: true, element: <Navigate to="liste" replace /> }
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    title: "Settings",
    icon: <FiSettings size={14} />,
    noLayout: false,
    children: [
      {
        path: "profile",
        element: <Profile />,
        noLayout: true,
        title: "Profile",
        icon: <CgProfile size={14} />,
      },
      {
        path: "users",
        element: <UserDatatable />,
        noLayout: true,
        title: "Utilisateurs",
        icon: <FiUsers size={14} />,
      },
      {
        path: "agences",
        element: <AgencePage />,
        noLayout: true,
        title: "Agences",
        icon: <FiLayers size={14} />,
      },
      {
        path: "security",
        element: <Security />,
        noLayout: true,
        title: "Securité",
        icon: <CgLock size={14} />,
      },
      { index: true, element: <Navigate to="users" replace /> }
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    title: "Analyse financière",
    icon: <FiDollarSign size={14} />,
    noLayout: false,
    children: [
      {
        path: "profile",
        element: <Profile />,
        noLayout: true,
        title: "Courriers",
        icon: <FiDownloadCloud size={14} />,
      },
      { index: true, element: <Navigate to="users" replace /> }
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    title: "Courriers",
    icon: <FiLayers size={14} />,
    noLayout: false,
    children: [
      {
        path: "declaration",
        element: <Profile />,
        noLayout: true,
        title: "Declaration",
        icon: <FiDownloadCloud size={14} />,
      },
      {
        path: "transmission",
        element: <Profile />,
        noLayout: true,
        title: "Transmissions",
        icon: <FiArrowUp size={14} />,
      },
      { index: true, element: <Navigate to="users" replace /> }
    ],
  },
];

export default ROUTES;
