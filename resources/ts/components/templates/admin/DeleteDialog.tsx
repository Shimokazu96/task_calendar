import React from "react";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";

type Props = {
    open: boolean;
    close: VoidFunction;
    DeleteData: VoidFunction;
};

export default function DeleteDialog(props: Props) {
    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                keepMounted
                onClose={() => props.close()}
                aria-labelledby="common-dialog-title"
                aria-describedby="common-dialog-description"
            >
                <DialogTitle>削除してもよろしいですか？</DialogTitle>

                <DialogActions>
                    <Button  sx={{ color: 'text.primary' }} onClick={() => props.close()}>No</Button>
                    <Button
                        onClick={() => props.DeleteData()}
                        color="error"
                        variant="contained"
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
