import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth';
import MainLayout from './components/layouts/main-layout';
import Dashboard from './pages/Dashboard';
import AuthLayout from './components/layouts/auth-layout';
import Parametre from './pages/Parametre';
import ErrorLayout from './components/layouts/error-layout';
import NotFoundPage from './pages/NotFound';
import Skill from './pages/Parametre/skills';
import Tdocument from './pages/Parametre/tdocuments';
import Statistique from './pages/report';
import JobCategory from './pages/Parametre/job-category';
import BlogCategory from './pages/Parametre/blog-category';
import Post from './pages/blog';
import Tutorial from './pages/tutoriels';
import Book from './pages/books';
import Job from './pages/job';

import Forum from './pages/forum'
import Podcast from './pages/podcast'
import Chat from './pages/chat'
import BookCategory from './pages/Parametre/book-category';
import TutorialCategory from './pages/Parametre/tutorial-category';
import User from './pages/Parametre/users';

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
               <Route path="/settings/user" element={<User />} />
               <Route path="/settings/tdocument" element={<Tdocument />} />
               <Route path="/settings/skill" element={<Skill />} />
               <Route path="/settings/job-categories" element={<JobCategory />} />
               <Route path="/settings/book-categories" element={<BookCategory />} />
               <Route path="/settings/blog-categories" element={<BlogCategory />} />
               <Route path="/settings/tutorial-categories" element={<TutorialCategory />} />

               <Route path="/statistique" element={<Statistique />} />  
               <Route path="/blog" element={<Post />} />     
               <Route path="/ressource/tutorial" element={<Tutorial />} />  
               <Route path="/ressource/book" element={<Book />} /> 

               <Route path="/forum/liste" element={<Forum />} />  
               <Route path="/offre/liste" element={<Job />} /> 
               <Route path="/emission/podcast" element={<Podcast />} />  
               <Route path="/emission/chat" element={<Chat />} />           
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
