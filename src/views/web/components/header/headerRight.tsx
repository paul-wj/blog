import React, {ReactElement} from 'react';
import HeaderSearch from './headerSearch';
import HeaderNav from './headerNav';
import HeaderUser from './headerUser';

const AppHeaderRight = (): ReactElement => {
    return (
        <div className="app-header__right">
            <HeaderSearch />
            <HeaderNav />
            <HeaderUser />
        </div>
    )
};

export default AppHeaderRight;
