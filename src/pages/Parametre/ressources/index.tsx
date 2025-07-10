import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
//import { Home, UserCog, User, Layers, ChartBar, ArrowDown, ArrowUp } from "lucide-react";
//import { Table } from "../../../components/Table";
//import { data } from "../../../components/Table/data";
import TablePagination from "../../../components/Table/TablePagination";
import Swal from "sweetalert2";
import axios from "axios";
import { listRessources } from "../../../slices/ressource.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { Button, IconButton } from "rsuite";
import { Edit, Eye, Icon, PlusCircle, Trash, Trash2, ViewIcon } from "lucide-react";


interface Props {
    name: string;
}

interface Ressource {
    idressource: string;
    rcode: string;
    nomressource: string;
    descriptionressource: string;
    published: boolean,
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

interface Pagination {
    totalPage: number;
    totalRow: number;
}

interface ItemsResponse {
    data: Ressource[];
    totalPage: number;
    totalRow: number;
}

const Ressource: React.FC = () => {
    const [data, setData] = useState<Ressource[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(0);
    const [totalRow, setTotalRow] = useState<number>(0);
    const { status, ressourceData } = useSelector((state: any) => state.ressource);
    const dispatch = useAppDispatch();

    const fetchData = useCallback(async (pageSize: number, pageIndex: number, search: string, order: any[]) => {
        setLoading(true);
        const queryOptions = {
            page: pageIndex,
            limit: pageSize,
            search: search,
            order: order,
        };
        dispatch(listRessources(queryOptions)).unwrap()
            .then((resp) => {
                //console.log(resp.data);
                if (resp) {
                    const items: ItemsResponse = resp.data;
                    //console.log(items);
                    // const sortedData = (items.data || []).sort(
                    //     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    // );
                    console.log(items.data);
                    setData(items.data);
                    setPageCount(items.totalPage || 0);
                    setTotalRow(items.totalRow || 0);
                    setLoading(false);
                    //console.log(resp.data);
                }
                // handle result here
            })
            .catch((err) => {
                // handle error here
            });


        

    }, [setData, setPageCount, setTotalRow]);


    const handleDelete = useCallback(async (id: string) => {
        Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/api/roles/${id}`);
                    setData((prevData) => prevData.filter((item) => item.idressource !== id));
                    Swal.fire({
                        title: "Supprimé!",
                        text: "Ressource supprimé avec succès!",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Erreur lors de la suppression du role:", error);
                    Swal.fire({
                        title: "Erreur!",
                        text: "Erreur lors de la suppression du role.",
                        icon: "error",
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Annulé",
                    text: "La suppression a été annulée.",
                    icon: "info",
                });
            }
        });
    }, []);

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "idressource",
            Cell: ({ row }: { row: { original: Ressource } }) => `R#${row.original.idressource}`,
            disableSortBy: true,
        },
        {
            Header: "Code",
            accessor: "rcode",
        },
        {
            Header: "Nom du role",
            accessor: "nomressource",
        },
        {
            Header: "Description",
            accessor: "descriptionressource",
            Cell: ({ row }: { row: { original: Ressource } }) => row.original.descriptionressource,
        },
        {
            Header: "Actions",
            Cell: ({ row }: { row: { original: Ressource } }) => {
                return (
                    <div className="flex gap-2">
                        <IconButton size="xs" color="green" appearance="primary" onClick={() => handleDelete(row.original.idressource)} icon={<Eye size="1.2em"/>} />
                        &nbsp;
                        <IconButton size="xs" color="orange" appearance="primary" onClick={() => handleDelete(row.original.idressource)} icon={<Edit size="1.2em"/>} />
                        &nbsp;
                        <IconButton size="xs" color="red" appearance="primary" onClick={() => handleDelete(row.original.idressource)} icon={<Trash2 size="1.2em"/>} />
                    </div>
                );
            },
        },
    ], [handleDelete]);

    return (
        <>
            <div className="my-3 flex h-12 w-full items-center justify-center bg-brand-magnolia md:my-5 lg:my-10">
                Liste des Ressources
            </div>
            <div className="main--content">
                <TablePagination
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    totalRow={totalRow}
                />
            </div>
        </>

    );
};

export default Ressource;