import React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";

type Props = {
    open: boolean;
    close: VoidFunction;
    onSubmit: VoidFunction;
};

export default function PasswordUpdateDialog(props: Props) {
    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                keepMounted
                onClose={() => props.close()}
                aria-labelledby="common-dialog-title"
                aria-describedby="common-dialog-description"
            >
                <DialogTitle>パスワードを変更しますか？</DialogTitle>
                <DialogContent>
                    <Typography
                        variant="subtitle2"
                    >
                        パスワードを変更すると自動的にログアウトされます。
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ color: "text.primary" }}
                        onClick={() => props.close()}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => props.onSubmit()}
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
