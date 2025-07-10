import React from "react";
import { Outlet } from "react-router-dom";
import { Home, UserCog, User, Layers, ChartBar, ArrowDown, ArrowUp } from "lucide-react";
import { data } from "../../../components/Table/data";
import { Table } from "../../../components/Table";


interface Props {
    name: string;
}

const Marque: React.FC = () => {
    return (
        <div className="main--content">
            <div className="my-3 flex h-12 w-full items-center justify-center bg-brand-magnolia md:my-5 lg:my-10">
            Liste des Marques
            </div>
        <Table rows={data} />
    </div>
    );
};

export default Marque;