import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuthenticate } from "@/hooks/admin";

const AdminAuthenticatedGuard: React.FC = ({ children }) => {
    const admin = useAdminAuthenticate();

    return admin ? <>{children}</> : <Navigate to="/admin/login" />;
};
export default AdminAuthenticatedGuard;
