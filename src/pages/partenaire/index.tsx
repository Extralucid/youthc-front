import React, { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { Home, UserCog, User, Layers, ChartBar, ArrowDown, ArrowUp } from "lucide-react";
import { Table } from "../../components/Table";
import { data } from "../../components/Table/data";
//import { getCahierJournalierDatatable } from "../../services/cahierJ.service";



interface Props {
    name: string;
}

const Intermediaire: React.FC = () => {

  return (
    <div className="main--content">
      <div className="my-3 flex h-12 w-full items-center justify-center bg-brand-magnolia md:my-5 lg:my-10">
            Liste des Partenaires
            </div>
        <Table rows={data} />
    </div>
    
  );
};

export default Intermediaire;