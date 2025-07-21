import React from "react";
import { FlagIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import './index.css'
interface Props {
  name: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  return (
    <div className="breadcrumb">
      <a className="breadcrumb__step breadcrumb__step--active" href="#">Accueil</a>
      {location.pathname.includes("/settings") && (
          <>
            <Link
              to={"settings"}
              className={` breadcrumb__step ${
                location.pathname.includes("/settings") &&
                " bg-[#b572d6] text-white"
              } ${
                location.pathname.includes("/settings/") &&
                " bg-[#E8DAEF] text-black"
              }`}>
              Paramètres
            </Link>
          </>
        )}
        {location.pathname.includes(`/settings/`) && (
          <>
            <Link
              to={"settings"}
              className={`breadcrumb__step ${
                location.pathname.includes("/settings") &&
                "bg-[#b572d6] text-white"
              }`}>
              Utilisateurs
            </Link>
          </>
        )}
    </div>
  );
};

export default Breadcrumb;