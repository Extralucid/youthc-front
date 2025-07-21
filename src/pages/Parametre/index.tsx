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
                <a href="settings/skill" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Skills</h3>
                            <p className="text-3xl">12,768</p>
                        </div>
                    </div>
                </a>
                <a href="settings/job-categories" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Job Categories</h3>
                            <p className="text-3xl">39,265</p>
                        </div>
                    </div>
                </a>
                <a href="settings/tutorial-cetgories" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Tutorial Categories</h3>
                            <p className="text-3xl">142,334</p>
                        </div>
                    </div>
                </a>
                <a href="settings/book-categories" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Book Categories</h3>
                            <p className="text-3xl">0023</p>
                        </div>
                    </div>
                </a>
                <a href="settings/post-categories" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><Settings className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Blog Categories</h3>
                            <p className="text-3xl">12,768</p>
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
                 <a href="settings/tag" className="params">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-blue-400"><UserCog className="h-12 w-12 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" /></div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">Tags</h3>
                            <p className="text-3xl">142,334</p>
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