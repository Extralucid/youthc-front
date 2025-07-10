import { Home, LayoutDashboard, StickyNote, Calendar, UserCog, Users, Book, Layers, Flag, Settings, LifeBuoy, CogIcon, HomeIcon, UserIcon, Album } from "lucide-react";
import { ReactNode, ReactElement, useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import SidebarItem from "../sidebarItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getUser, logout } from "../../slices/auth.slice";

interface LayoutProps {
  children: ReactNode;
}

// Check out the documentation for Configuring your Layout for more information:
// - https://react-md.dev/guides/configuring-your-layout
export default function MainLayout(): ReactElement {
  const mainStyle = {
    position: 'relative',
    width: '100%',
  };
  const [expanded, setExpanded] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const accessToken = useAppSelector((state) => state.auth);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  

  useEffect(() => {
    // if (accessToken) {
    //   dispatch(getUser());
    // }
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  const navBarItems = [
    {
      icon: <LayoutDashboard />,
      text: 'Dashboard',
      route: '/',
      active: true,
    },
    
    {
      icon: <UserCog />,
      route: '/partenaire',
      text: 'Partenaires',
    },
    {
      icon: <Users />,
      route: '/moderateur',
      text: 'Moderateurs',
    },
    {
      icon: <StickyNote />,
      subMenu: [
        {
          icon: <UserIcon />,
          route: '/offre/stage',
          text: 'Offres de stage',
        },
        {
          icon: <CogIcon />,
          route: '/offre/emploi',
          text: 'Offres d\'emplois',
        },
        {
          icon: <CogIcon />,
          route: '/offre/appel',
          text: 'Appels d\'offre',
        }
      ],
      route: '',
      text: 'Les Offres',
    },
    {
      icon: <Book />,
      route: '',
      text: 'Opportunités',
      subMenu: [
        {
          icon: <UserIcon />,
          route: '/opportunite/bourse',
          text: 'Bourses',
        },
        {
          icon: <CogIcon />,
          route: '/opportunite/formation',
          text: 'Formations',
        },
        {
          icon: <CogIcon />,
          route: '/opportunite/marche',
          text: 'Marketplace',
        }
      ]
    },
    {
      icon: <Album />,
      route: '',
      text: 'Emissions',
      subMenu: [
        {
          icon: <CogIcon />,
          route: '/emission/radio',
          text: 'Emissions Radios',
        },
        {
          icon: <CogIcon />,
          route: '/emission/tele',
          text: 'Emissions Tele',
        },
        {
          icon: <CogIcon />,
          route: '/emission/discussion',
          text: 'Discussions',
        }
      ]
    },
    {
      icon: <Flag />,
      route: '/statistique',
      text: 'Reporting',
    },
    {
      icon: <Settings />,
      route: '/settings',
      text: 'Paramètres',
    },
    {
      icon: <LifeBuoy />,
      route: '/aide',
      text: 'Aide',
    },

  ];
  return (
    <>
      <div className="flex main">
        <Sidebar expanded={expanded} setExpanded={setExpanded}  handleLogout={handleLogout}>
          {navBarItems.map((item, index) => (
            <SidebarItem key={index} expanded={expanded} {...item} />
          ))}
        </Sidebar>
        <main className="flex-1 w-64">
          <Outlet />
        </main>
      </div>

    </>

  );
}