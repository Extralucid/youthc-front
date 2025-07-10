import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth';
import MainLayout from './components/layouts/main-layout';
import Dashboard from './pages/Dashboard';
import AuthLayout from './components/layouts/auth-layout';
import Parametre from './pages/Parametre';
import ErrorLayout from './components/layouts/error-layout';
import NotFoundPage from './pages/NotFound';
import Activite from './pages/Parametre/activites';
import Agences from './pages/Parametre/agences';
import Capitaux from './pages/Parametre/capitaux';
import Energie from './pages/Parametre/energies';
import Franchise from './pages/Parametre/franchises';
import Garantie from './pages/Parametre/garanties';
import Marque from './pages/Parametre/marques';
import Modele from './pages/Parametre/modeles';
import Pack from './pages/Parametre/packs';
import Prime from './pages/Parametre/primes';
import Profession from './pages/Parametre/professions';
import Qualite from './pages/Parametre/qualites';
import Ressource from './pages/Parametre/ressources';
import Statut from './pages/Parametre/statuts';
import Tage from './pages/Parametre/tages';
import Tdocument from './pages/Parametre/tdocuments';
import Puissance from './pages/Parametre/tpuissances';
import Intermediaire from './pages/partenaire';
import Assure from './pages/cotations/assures';
import Contrat from './pages/cotations/contrats';
import Document from './pages/cotations/documents';
import Vehicule from './pages/cotations/vehicules';
import Statistique from './pages/report';
import Utilisateur from './pages/Parametre/users';
import Mono from './pages/cotations/mono';
import Flotte from './pages/cotations/flotte';
import MonoCreate from './pages/cotations/mono/mono-create';

interface AppProps {
   title: string;
}

const App: FC = () => {
   return (
      <>
         <Routes>
            <Route element={<MainLayout />}>
               <Route path="/" element={<Dashboard />} />
               <Route path="/settings" element={<Parametre />} />
               <Route path="/settings/activite" element={<Activite />} />
               <Route path="/settings/agence" element={<Agences />} />
               <Route path="/settings/capitaux" element={<Capitaux />} />
               <Route path="/settings/energie" element={<Energie />} />
               <Route path="/settings/franchise" element={<Franchise />} />
               <Route path="/settings/garantie" element={<Garantie />} />
               <Route path="/settings/marque" element={<Marque />} />
               <Route path="/settings/modele" element={<Modele />} />
               <Route path="/settings/pack" element={<Pack />} />
               <Route path="/settings/prime" element={<Prime />} />
               <Route path="/settings/profession" element={<Profession />} />
               <Route path="/settings/qualite" element={<Qualite />} />
               <Route path="/settings/ressource" element={<Ressource />} />
               <Route path="/settings/user" element={<Ressource />} />
               <Route path="/settings/statut" element={<Statut />} />
               <Route path="/settings/tage" element={<Tage />} />
               <Route path="/settings/tdocument" element={<Tdocument />} />
               <Route path="/settings/tpuissance" element={<Puissance />} />

               <Route path="/partenaire" element={<Intermediaire />} />
               <Route path="/moderateur" element={<Utilisateur />} />
               <Route path="/offre/stage" element={<Assure />} />
               <Route path="/offre/emploi" element={<Contrat />} />
               <Route path="/offre/appel" element={<Document />} />

               <Route path="/statistique" element={<Statistique />} />
               <Route path="/opportunite/bourse" element={<Mono />} />
               <Route path="/opportunite/marche" element={<Flotte />} />
               <Route path="/opportunite/appel" element={<Vehicule />} />

               <Route path="/emission/radio" element={<Mono />} />
               <Route path="/emission/tele" element={<Flotte />} />
               <Route path="/emission/discussion" element={<Vehicule />} />
               
            </Route>
            <Route element={<AuthLayout />}>
               <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ErrorLayout />}>
               <Route path="/notfound" element={<NotFoundPage />} />
            </Route>
         </Routes>
      </>

   );
};

export default App;
