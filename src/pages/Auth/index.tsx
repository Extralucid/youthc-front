import React, { useState } from "react";
import banner from "../../assets/banner.png"
import allianz from "../../assets/sanlam-allianz.png"
import { useAppDispatch } from "../../hooks/redux-hooks";
import { login } from "../../slices/auth.slice";
import { NotificationType, showNotification } from "../../slices/notification.slice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      //console.log('login');
      
      dispatch(
        login({
          email,
          password,
        })
      );
    } else {
      dispatch(
        showNotification({
          content: "Please provide email and password",
          typer: NotificationType.Error,
        })
      );
    }
  };


  return (
    <>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-32 items-center my-0 mx-20 md:mx-0 md:my-0">
        <div className="md:w-3/4 max-w-lg">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw1.webp"
            alt="Sample image" />
        </div>
        <div className="md:w-3/4 max-w-lg">
          <div className="my-10 mt-6 flex items-center before:mt-0.5 before:flex-1 before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-neutral-300">
            <img
              src={allianz}
              alt="Sample image" className="items-center" />
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Connexion</p>
          </div>
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" name="email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }} />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Se souvenir de Moi</span>
            </label>
            <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Mot de passe oublié?</a>
          </div>
          <div className="text-center md:text-left">
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" onClick={handleLogin} type="submit">Se connecter</button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Pas de compte? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#">S'inscrire</a>
          </div>
        </div>

      </section>

    </>
  );
};

export default Login;