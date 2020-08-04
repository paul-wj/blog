import React, {FC, ReactElement} from 'react';
import {renderRoutes, RouteConfig} from "react-router-config";

interface AdminEmptyProps {
    route: RouteConfig;
}

export const AdminEmpty: FC<AdminEmptyProps> = ({route}: AdminEmptyProps): ReactElement => {
    return (
        <>
            {renderRoutes(route.routes)}
        </>
    )
};

export default AdminEmpty;
