import React, { useEffect, useState } from "react";
import {
    useAsyncDebounce,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import "./UserPagination.css"; //  <--  your plain CSS file
import { FiFilter } from "react-icons/fi";
import { PiPlusCircleFill } from "react-icons/pi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaClock } from "react-icons/fa";

/**
 *  @typedef {{
 *    columns: any[];
 *    data: any[];
 *    fetchData: (pageSize:number, pageIndex:number, search:string, sortBy:any[]) => Promise<void>;
 *    loading: boolean;
 *    pageCount: number;
 *    totalRow: number;
 *    actions?: React.ComponentType;
 *  }} TablePaginationProps
 */

export default function TablePagination(props) {
    const {
        columns,
        data,
        fetchData,
        loading,
        pageCount: controlledPageCount,
        totalRow,
        actions: Actions,
    } = props;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        nextPage,
        previousPage,
        pageCount,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state: { pageIndex, pageSize, globalFilter, sortBy },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            manualGlobalFilter: true,
            manualSortBy: true,
            initialState: { pageIndex: 0, pageSize: 10 },
            pageCount: controlledPageCount,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetPage: false,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const [openWithHeader, setOpenWithHeader] = useState(false);

    /* ---------- Global filter ---------- */
    const GlobalFilter = ({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) => {
        const count = preGlobalFilteredRows;
        const [value, setValue] = useState(globalFilter);
        const onChange = useAsyncDebounce((val) => {
            setGlobalFilter(val || undefined);
        }, 700);

        return (
            <div className="globalFilter">
                <h4>
                    <FiFilter size={16} style={{ marginRight: 6 }} />
                    Liste des users
                </h4>

                <div className="toolbar">
                    {Actions && <Actions />}
                    <div className="searchBox">
                        Rechercher:&nbsp;
                        <input
                            placeholder={`${count} enregistrements...`}
                            value={value || ""}
                            onChange={(e) => {
                                setValue(e.target.value);
                                onChange(e.target.value);
                            }}
                            type="search"
                        />
                        <button className="btnPrimary">
                            <PiPlusCircleFill size={14} style={{ marginRight: 4 }} />
                            Nouvelle Déclaration
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const search = globalFilter === undefined ? "" : globalFilter;
        fetchData(pageSize, pageIndex, search, sortBy);
    }, [fetchData, pageIndex, pageSize, globalFilter, sortBy]);

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={totalRow}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />

            <div className="tableWrapper">
                <table {...getTableProps()} className="dataTable">
                    <thead>
                        {headerGroups.map((headerGroup, idx) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                                {headerGroup.headers.map((column, i) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                        key={i}
                                    >
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <BsArrowDown size={14} />
                                            ) : (
                                                <BsArrowUp size={14} />
                                            )
                                        ) : (
                                            <FiFilter size={14} />
                                        )}
                                        &nbsp;
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.length > 0 ? (
                            page.map((row, idx) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={idx}>
                                        {row.cells.map((cell, i) => (
                                            <td {...cell.getCellProps()} key={i}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={10000} className="noData">
                                    Données non trouvées !
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {loading && (
                    <div className="overlay">
                        <div className="loader">
                            <FaClock size={16} />
                            &nbsp;Loading...
                        </div>
                    </div>
                )}
            </div>

            {/* ---------- Pagination ---------- */}
            <div className="pagination">
                <div className="pageInfo">
                    <span>
                        Page <strong>{pageIndex + 1}</strong> sur {pageOptions.length}{" "}
                        — Total <strong>{totalRow}</strong>
                    </span>
                    <label>
                        Aller à la page:
                        <input
                            type="number"
                            min={1}
                            max={pageCount}
                            value={pageIndex + 1}
                            onChange={(e) => {
                                const p = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                gotoPage(p);
                            }}
                        />
                    </label>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 30, 40, 50].map((s) => (
                            <option key={s} value={s}>
                                Montrer {s} doublés
                            </option>
                        ))}
                    </select>
                </div>

                <div className="buttons">
                    <button
                        className="btn btn-xs"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {"<<"}
                    </button>{" "}
                    <button
                        className="btn btn-xs"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>{" "}
                    <button
                        className="btn btn-xs"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>{" "}
                    <button
                        className="btn btn-xs"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {">>"}
                    </button>{" "}
                </div>
            </div>
        </>
    );
}