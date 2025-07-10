import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Home, UserCog, User, Layers, ChartBar, ArrowDown, ArrowUp } from "lucide-react";
import { Table } from "../../../components/Table";
import { data } from "../../../components/Table/data";
import { Button } from "rsuite";


interface Props {
    name: string;
}

const Mono: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="main--content">
            <div className="my-3 flex h-12 w-full items-center justify-center bg-brand-magnolia md:my-5 lg:my-10">
            Liste des
            Bourses
            </div>
            <div>
                <div
                >&nbsp; &nbsp;
                    <Button
                onClick={() => navigate('/production/mono/create')}
                appearance="primary"
            >Affaire Nouvelle</Button>
                </div>
            </div>
            <Table rows={data} />
        </div>
    );
};

export default Mono;