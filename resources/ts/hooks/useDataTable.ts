const useDataTable = () => {
    const options = {
        Response: "standard",
        filter: true as any,
        filterType: 'checkbox',
        print: false as any,
        viewColumns: false as any,
        download: true as any,
        selectableRows: "none" as any,
        tableBodyMaxHeight: "69vh",
    };

    return { options };
};
export default useDataTable;
