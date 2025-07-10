import React from "react";
import { Outlet } from "react-router-dom";
import { Home, UserCog, User, Layers, ChartBar, ArrowDown, ArrowUp, CogIcon, Settings } from "lucide-react";
import { Button, Message, useToaster } from 'rsuite';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

interface Props {
    name: string;
}

const Parametre: React.FC = () => {
    const dispatch = useAppDispatch();
    const { open, content, typer } = useAppSelector((state) => state.notification);
    //const [typer, setTyper] = React.useState('info');
    const [placement, setPlacement] = React.useState('topCenter');
    const toaster = useToaster();

    const message = (
        <Message showIcon type={typer} closable>
            <strong>{typer}!</strong> The message appears on the {placement}.
        </Message>
    );

    return (
        <div className="main--content">

            <div className="my-3 flex h-12 w-full items-center justify-center bg-brand-magnolia md:my-5 lg:my-10">
                Liste des Paramètres
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
                <a href="settings/activite" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Activités</h3>
                            <p className="text-3xl">12,768</p>
                        </div>
                    </div>
                </a>
                <a href="settings/agence" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Agences</h3>
                            <p className="text-3xl">39,265</p>
                        </div>
                    </div>
                </a>
                <a href="settings/format" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Format</h3>
                            <p className="text-3xl">142,334</p>
                        </div>
                    </div>
                </a>
                <a href="settings/energie" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Energie</h3>
                            <p className="text-3xl">0023</p>
                        </div>
                    </div>
                </a>
                <a href="settings/couleur" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Couleurs</h3>
                            <p className="text-3xl">12,768</p>
                        </div>
                    </div>
                </a>
                <a href="settings/garantie" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Garantie</h3>
                            <p className="text-3xl">39,265</p>
                        </div>
                    </div>
                </a>
                <a href="settings/marque" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Marques</h3>
                            <p className="text-3xl">142,334</p>
                        </div>
                    </div>
                </a>
                <a href="settings/modele" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Modeles</h3>
                            <p className="text-3xl">0023</p>
                        </div>
                    </div>
                </a>
                <a href="settings/pack" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Localites</h3>
                            <p className="text-3xl">12,768</p>
                        </div>
                    </div>
                </a>
                <a href="settings/prime" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Prime</h3>
                            <p className="text-3xl">39,265</p>
                        </div>
                    </div>
                </a>
                <a href="settings/profession" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Professions</h3>
                            <p className="text-3xl">142,334</p>
                        </div>
                    </div>
                </a>
                <a href="settings/qualite" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Qualites</h3>
                            <p className="text-3xl">0023</p>
                        </div>
                    </div>
                </a>
                <a href="settings/statut" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Statuts</h3>
                            <p className="text-3xl">12,768</p>
                        </div>
                    </div>
                </a>
                <a href="settings/tage" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Categories</h3>
                            <p className="text-3xl">39,265</p>
                        </div>
                    </div>
                </a>
                <a href="settings/tdocument" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Types document</h3>
                            <p className="text-3xl">142,334</p>
                        </div>
                    </div>
                </a>
                <a href="settings/produit" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Produits</h3>
                            <p className="text-3xl">0023</p>
                        </div>
                    </div>
                </a>
                <a href="settings/profession" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Professions</h3>
                            <p className="text-3xl">12,768</p>
                        </div>
                    </div>
                </a>
                <a href="settings/universite" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Universites</h3>
                            <p className="text-3xl">39,265</p>
                        </div>
                    </div>
                </a>
                <a href="settings/user" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><UserCog className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Utilisateurs</h3>
                            <p className="text-3xl">142,334</p>
                        </div>
                    </div>
                </a>
                <a href="settings/ressource" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Roles</h3>
                            <p className="text-3xl">0023</p>
                        </div>
                    </div>
                </a>
                <Button
                    onClick={() => toaster.push(message, { duration: 5000, placement: 'topEnd' })}
                    appearance="primary"
                >Test</Button>
            </div>
        </div>
    );
};

export default Parametre;