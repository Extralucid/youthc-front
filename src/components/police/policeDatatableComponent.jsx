 import 'regenerator-runtime/runtime';
import React, { useState, useCallback, useMemo } from "react";
import PolicePagination from "./policePagination";
import Swal from "sweetalert2";
import axios from "axios";


const PoliceDatatable = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [totalRow, setTotalRow] = useState(0);

    const fetchData = useCallback(async (pageSize, pageIndex, search, order) => {
        setLoading(true);
        const queryOptions = {
            page: pageIndex,
            limit: pageSize,
            search: search,
            order: order,
        };
        try {
            const items = [];//await getRoleDatatable(queryOptions);
            console.log(items); // Vérifiez la structure
            const sortedData = (items.data || []).sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ); // Trier par date de création décroissante
            setData(sortedData);
            setPageCount(items.pagination?.totalPage || 0);
            setTotalRow(items.pagination?.totalRow || 0);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (id) => {
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
                // Vérifiez si l'utilisateur a confirmé
                try {
                    await axios.delete(`http://localhost:3000/api/roles/${id}`);
                    setData((prevData) => prevData.filter((item) => item.id !== id));
                    Swal.fire({
                        title: "Supprimé!",
                        text: "Role supprimé avec succès!",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Erreur lors de la suppression du role:", error);
                    Swal.fire({
                        title: "Erreur!",
                        text: "Erreur lors de la suppression du role.",
                        icon: "error", // Utilisez "error" pour les erreurs
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Si l'utilisateur annule
                Swal.fire({
                    title: "Annulé",
                    text: "La suppression a été annulée.",
                    icon: "info",
                });
            }
        });
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "NumSIN",
                accessor: "NumSIN",
                Cell: ({ row }) => `R#${row.original.id}`,
                disableSortBy: true,
            },
            {
                Header: "Date Survenance",
                accessor: "dsurvenance",
            },
            {
                Header: "Date declaration",
                accessor: "ddeclaration",
            },
            {
                Header: "Agence",
                accessor: "agence"
            },
            {
                Header: "Police",
                accessor: "police"
            },
            {
                Header: "SAP",
                accessor: "sap"
            },
            {
                Header: "Reglements",
                accessor: "reglement"
            },
            {
                Header: "Statut",
                accessor: "statut"
            },
            {
                Header: "Actions",
                Cell: ({ row }) => {
                    return (
                        <div className="flex gap-2">
                            {/* Boutons Détails, Édition, Supprimer */}
                            <a
                                href={`/erp/saz/sni/detail/${row.original.id}`}
                                className="btn btn-primary btn-minier tooltip-info"
                                data-rel="tooltip"
                                data-placement="bottom"
                                title="Details"
                            >
                                <i className="ace-icon fa fa-eye bigger-130"></i>
                            </a>
                            &nbsp;
                            <a
                                href={`/erp/saz/sni/update/${row.original.id}`}
                                className="btn btn-success btn-minier tooltip-success"
                                data-rel="tooltip"
                                data-placement="bottom"
                                title="Edition"
                            >
                                <i className="ace-icon fa fa-edit bigger-130"></i>
                            </a>
                            &nbsp;
                            <button
                                className="btn btn-danger btn-minier tooltip-error"
                                data-rel="tooltip"
                                data-placement="bottom"
                                title="Supprimer"
                                onClick={() => handleDelete(row.original.id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    );
                },
            },
        ],
        [handleDelete]
    );

    return (
        <div>
            <PolicePagination
                columns={columns}
                data={data}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                totalRow={totalRow}
            />
        </div>
    );
}

export default PoliceDatatable;