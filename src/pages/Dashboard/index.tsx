import React from "react";
import { Outlet } from "react-router-dom";
import { Home, UserCog, User, Layers, ChartBar, ArrowDown, ArrowUp, CogIcon } from "lucide-react";
import './index.css';
import agent from "../../assets/agent.png"

interface Props {
    name: string;
}

const Dashboard: React.FC = () => {
    return (
        <div className="contenu">

            <main>

                <div className="separator">
                    <div className="info">
                        <h3>Tableau de bord</h3>
                    </div>
                    <div className="search">
                        <i className='bx bx-search'></i>
                    </div>
                </div>

                <div className="cards">
                    <div className="card card-1">
                        <div className="card--data">
                            <div className="card--content">
                                <h5 className="card--title">Total Moderateurs</h5>
                                <h1>152</h1>
                            </div>
                            <UserCog size="{80}" className="card--icon--lg" />
                        </div>
                        <div className="card--stats">
                            <span><ChartBar size="{20}" className="card--icon stat--icon" />65%</span>
                            <span><ArrowUp size="{20}" className="card--icon up--arrow" />10</span>
                            <span><ArrowDown size="{20}" className="card--icon down--arrow" />2</span>
                        </div>
                    </div>
                    <div className="card card-2">
                        <div className="card--data">
                            <div className="card--content">
                                <h5 className="card--title">Total Utilisateurs</h5>
                                <h1>1145</h1>
                            </div>
                            <User size="{80}" className="card--icon--lg" />
                        </div>
                        <div className="card--stats">
                            <span><ChartBar size="{20}" className="card--icon stat--icon" />82%</span>
                            <span><ArrowUp size="{20}" className="card--icon up--arrow" />230</span>
                            <span
                            ><ArrowDown size="{20}" className="card--icon down--arrow" />45</span>
                        </div>
                    </div>
                    <div className="card card-3">
                        <div className="card--data">
                            <div className="card--content">
                                <h5 className="card--title">Total Offres</h5>
                                <h1>102</h1>
                            </div>
                            <Layers size="{80}" className="card--icon--lg" />
                        </div>
                        <div className="card--stats">
                            <span><ChartBar size="{20}" className="card--icon stat--icon" />27%</span>
                            <span><ArrowUp size="{20}" className="card--icon up--arrow" />31</span>
                            <span
                            ><ArrowDown size="{20}" className="card--icon down--arrow" />23</span>
                        </div>
                    </div>
                    <div className="card card-4">
                        <div className="card--data">
                            <div className="card--content">
                                <h5 className="card--title">Total Agences</h5>
                                <h1>15</h1>
                            </div>
                            <Home size="{80}" className="card--icon--lg" />
                        </div>
                        <div className="card--stats">
                            <span><ChartBar size="{20}" className="card--icon stat--icon" />8%</span>
                            <span><ArrowUp size="{20}" className="card--icon up--arrow" />11</span>
                            <span><ArrowDown size="{20}" className="card--icon down--arrow" />2</span>
                        </div>
                    </div>
                </div>


                <div className="separator">
                    <div className="info">
                        <h3>Stat participants</h3>
                    </div>
                </div>

                <div className="planning">
                    <div className="item">
                        <div className="left">
                            <div className="icon">
                                <CogIcon />
                            </div>
                            <div className="details">
                                <h5>Entreprises</h5>
                                <p>100200</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="item">
                        <div className="left">
                            <div className="icon">
                                <CogIcon />
                            </div>
                            <div className="details">
                                <h5>Universités</h5>
                                <p>2487</p>
                            </div>
                        </div>
                        <i className='bx bx-dots-vertical-rounded'></i>
                    </div>
                    <div className="item">
                        <div className="left">
                            <div className="icon">
                               <CogIcon />
                            </div>
                            <div className="details">
                                <h5>Etudiants</h5>
                                <p>25065</p>
                            </div>
                        </div>
                        <i className='bx bx-dots-vertical-rounded'></i>
                    </div>
                    <div className="item">
                        <div className="left">
                            <div className="icon">
                                <CogIcon />
                            </div>
                            <div className="details">
                                <h5>Autres</h5>
                                <p>1256</p>
                            </div>
                        </div>
                        <i className='bx bx-dots-vertical-rounded'></i>
                    </div>
                </div>
            </main>

            <aside className="right-section">

                <div className="separator" id="first">
                    <h4>Statistiques</h4>
                </div>

                <div className="stats">
                    <div className="item">
                        <div className="top">
                            <p>Podcasts</p>
                            <p>Ouverts</p>
                        </div>
                        <div className="bottom">
                            <div className="line"></div>
                            <h3>02</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="top">
                            <p>Formations</p>
                            <p>ouvertes</p>
                        </div>
                        <div className="bottom">
                            <div className="line"></div>
                            <h3>250</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="top">
                            <p>Podcasts</p>
                            <p>Fermés</p>
                        </div>
                        <div className="bottom">
                            <div className="line"></div>
                            <h3>03</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="top">
                            <p>Formations</p>
                            <p>Closes</p>
                        </div>
                        <div className="bottom">
                            <div className="line"></div>
                            <h3>250</h3>
                        </div>
                    </div>
                </div>

                <div className="separator">
                    <h4>Statistiques Hebdomadaires</h4>
                </div>

                <div className="weekly">
                    <div className="title">
                        <div className="line"></div>
                        <h5>Utilisateurs actifs cette semaine</h5>
                    </div>
                </div>

            </aside>

        </div>
    );
};

export default Dashboard;