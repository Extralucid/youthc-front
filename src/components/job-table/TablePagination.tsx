import {
    ArrowDown,
    ChevronsLeft,
    ArrowUp,
    Clock,
    Filter,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
    PlusCircle,
    ArrowRightLeft,
    PlusIcon,
    Ban,
} from "lucide-react";
import RichTextEditor from 'react-rte';
import React, { FC, useEffect, useState } from "react";
import {
    useAsyncDebounce,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import { Button, ButtonToolbar, Divider, Drawer, Form, IconButton, Input, InputPicker } from "rsuite";
import './table.css'

interface TablePaginationProps {
    columns: any[];
    data: any[];
    fetchData: (pageSize: number, pageIndex: number, search: string, sortBy: any[]) => Promise<void>;
    loading: boolean;
    pageCount: number;
    totalRow: number;
    actions?: FC;
}

const TablePagination: FC<TablePaginationProps> = ({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    totalRow,
    actions: Actions,
}) => {
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
            initialState: {
                pageIndex: 0,
                pageSize: 10,
            },
            pageCount: controlledPageCount,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetPage: false,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const [open, setOpen] = React.useState(false);
    const [openWithHeader, setOpenWithHeader] = React.useState(false);
    const [formValue, setFormValue] = React.useState(RichTextEditor.createEmptyValue());

    const GlobalFilter: FC<{
        preGlobalFilteredRows: number;
        globalFilter: string | undefined;
        setGlobalFilter: (filter: string | undefined) => void;
    }> = ({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) => {
            const count: number = preGlobalFilteredRows;
            const [value, setValue] = useState<string | undefined>(globalFilter);
            const onChange = useAsyncDebounce((value: string) => {
                setGlobalFilter(value || undefined);
            }, 700);

            return (

                <div className={
                    Actions !== undefined
                        ? "controls flex flex-row"
                        : "controls flex"
                }>

                    <div className="flex-auto w-64 ...">
                        <Input
                            placeholder={`${count} enregistrements...`}
                            value={value || ""}
                            onChange={(e) => {
                                setValue(e);
                                onChange(e);
                            }}
                            type="search"
                            className={`input input-bordered input-xs w-full max-w-xs focus:outline-0 mb-2 ${Actions !== undefined ? "" : "self-end"
                                }`}
                        />
                    </div>
                    <div className="flex-none w-14 ...">

                    </div>
                    <div className="flex-auto w-32 ...">
                        <ButtonToolbar>
                            <InputPicker style={{ width: 224 }} data={[]} className="max-w-xs mb-2" />
                            <Button startIcon={<ArrowRightLeft />} onClick={() => { }} color="cyan" appearance="primary" size="xs" >Reordonner </Button>
                            <Button startIcon={<PlusCircle />} size="xs" color="cyan" onClick={() => setOpenWithHeader(true)} appearance="primary"> Nouveau </Button>
                        </ButtonToolbar>
                    </div>
                    <br />
                </div>
            );
        };

    useEffect(() => {
        const search: string = globalFilter === undefined ? "" : globalFilter;
        fetchData(pageSize, pageIndex, search, sortBy);

    }, [fetchData, pageIndex, pageSize, globalFilter, sortBy]);

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={totalRow}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <div className="overflow-x-auto relative">
                <table
                    {...getTableProps()}
                    className="table table-compact table-zebra w-full"
                >
                    <thead>
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, index) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                                        <span>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <ArrowDown className="ace-icon h-1 w-1 inline mr-5" style={{ height: 16, width: 16 }} />
                                                ) : (
                                                    <ArrowUp className="ace-icon h-1 w-1 inline mr-5" style={{ height: 16, width: 16 }} />
                                                )
                                            ) : (
                                                <Filter className="ace-icon h-1 w-1 inline mr-5" style={{ height: 16, width: 16 }} />
                                            )}
                                        </span>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.length > 0 ? (
                            page.map((row, index) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="hover" key={index}>
                                        {row.cells.map((cell, index) => {
                                            return (
                                                <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="hover">
                                <td colSpan={10000} className="text-center">
                                    Données non trouvées!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-5 rounded-md z-20 flex items-center justify-center">
                        <div className="absolute p-3 bg-white w-36 shadow-md rounded-md text-center">
                            <div className="flex animate-pulse">
                                <Clock className="w-6 h-6 mr-1" /> <span>Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="flex flex-row justify-between">
                <div className="mt-2">
                    <Form layout="inline">
                        <Form.Group controlId="username-8">
                            <Form.ControlLabel><span>
                                Page{" "}
                                <strong>
                                    {pageIndex + 1} depuis {pageOptions.length}
                                </strong>{" "}
                                Total <strong>{preGlobalFilteredRows.length}</strong>{" "} | Aller à la page:{" "}
                            </span></Form.ControlLabel>
                            <Form.Control type="number" placeholder="Username" name="username" size="sm" defaultValue={pageIndex + 1} className="input input-bordered input-sm w-20 max-w-xs focus:outline-0" onChange={(e) => {
                                const page: number = e ? Number(e) - 1 : 0;
                                gotoPage(page);
                            }} style={{ width: 80 }} />
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                                className="select select-bordered select-sm w-30 max-w-xs focus:outline-0"
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Montrer {pageSize} doublés
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                    </Form>


                </div>
                <div className="mt-2">
                    <IconButton
                        icon={<ChevronsLeft />}
                        size="xs"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    />{" "}
                    <IconButton
                        icon={<ChevronLeft />}
                        size="xs"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    />{" "}
                    <IconButton
                        icon={<ChevronsRight />}
                        size="xs"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    />{" "}
                    <IconButton
                        icon={<ChevronRight />}
                        size="xs"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    />{" "}
                </div>
            </div>
            <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
                <Drawer.Header>
                    <Drawer.Title><Divider>Nouvelle Offre</Divider></Drawer.Title>
                    {/* <Drawer.Actions>
                    </Drawer.Actions> */}
                </Drawer.Header>
                <Drawer.Body>
                    <Form fluid>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <Form.Group controlId="name-1">
                                    <Form.ControlLabel>Code</Form.ControlLabel>
                                    <Form.Control name="code" placeholder="code" readOnly disabled/>
                                </Form.Group>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Form.Group controlId="name-1">
                                    <Form.ControlLabel>Libelle</Form.ControlLabel>
                                    <Form.Control name="libelle" placeholder="libelle"/>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group controlId="textarea-1">
                            <Form.ControlLabel>Description</Form.ControlLabel>
                            <RichTextEditor
                                value={formValue}
                                onChange={()=>{}}
                                editorClassName="h-48"
                                placeholder="Votre description ici!"
                            />
                        </Form.Group>
                        <Divider>Actions</Divider>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary" size="xs"> <PlusIcon />&nbsp; Enregistrer</Button>
                                <Button appearance="default" size="xs"><Ban />&nbsp; Annuler</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Drawer.Body>
            </Drawer>
        </>
    );
}

export default TablePagination;