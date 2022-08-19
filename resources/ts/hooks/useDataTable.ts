const useDataTable = () => {
    const options = {
        filter: true as any,
        print: false as any,
        viewColumns: false as any,
        download: false as any,
        selectableRows: "none" as any,
        tableBodyMaxHeight: "500px",
    };


    return { options };
};
export default useDataTable;
