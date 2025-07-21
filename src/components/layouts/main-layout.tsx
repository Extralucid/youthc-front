import { Home, LayoutDashboard, StickyNote, Calendar, UserCog, Users, Book, Layers, Flag, Settings, LifeBuoy, CogIcon, HomeIcon, UserIcon, Album, Newspaper, File, TagsIcon } from "lucide-react";
import { ReactNode, ReactElement, useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import SidebarItem from "../sidebarItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getUser, logout } from "../../slices/auth.slice";
import Breadcrumb from "../breadcrumb";

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

  const [menuSelector, setMenuSelector] = useState(null);
  const [subMenuSelector, setSubMenuSelector] = useState(null);


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
      icon: <Users />,
      route: '/settings/user',
      text: 'Utilisateurs',
    },
    {
      icon: <Newspaper />,
      route: '/blog',
      text: 'Blog',
    },
    {
      icon: <StickyNote />,
      route: '',
      text: 'Offres',
      subMenu: [
        {
          icon: <Book />,
          route: '/offre/liste',
          text: 'Liste',
        },
        {
          icon: <File />,
          route: '/offre/application',
          text: 'Candidatures',
        }
      ]
    },
    {
      icon: <TagsIcon />,
      route: '',
      text: 'Ressources',
      subMenu: [
        {
          icon: <Book />,
          route: '/ressource/tutorial',
          text: 'Tutoriels',
        },
        {
          icon: <StickyNote />,
          route: '/ressource/book',
          text: 'Livres',
        }
      ]
    },
    {
      icon: <Newspaper />,
      route: '',
      text: 'Forum',
      subMenu: [
        {
          icon: <CogIcon />,
          route: '/forum/liste',
          text: 'Liste',
        },
        {
          icon: <CogIcon />,
          route: '/forum/topic',
          text: 'Sujets',
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
          route: '/emission/podcast',
          text: 'Podcast',
        },
        {
          icon: <CogIcon />,
          route: '/emission/chat',
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

    const selectedMenus = navBarItems.filter((menu) => {
    if (menuSelector && menu.route !== menuSelector) return false;

    if (subMenuSelector && menu.route !== subMenuSelector) return false;

    return true;
  });


  return (
    <>
      <div className="flex main">
        <Sidebar expanded={expanded} setExpanded={setExpanded} handleLogout={handleLogout}>
          {navBarItems.map((item, index) => (
            <SidebarItem key={index} expanded={expanded} {...item} />
          ))}
        </Sidebar>
        <main className="flex-1 w-64">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>

    </>

  );
}