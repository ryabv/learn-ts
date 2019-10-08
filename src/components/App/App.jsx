import React from 'react';

import MainHeader from '../../components/MainHeader/MainHeader';
import MainFooter from '../../components/MainFooter/MainFooter';
import TableContainer from '../../components/Table/TableContainer';
import PageHeaderContainer from '../../components/PageHeader/PageHeaderContainer';


function App() {
    return ( 
      <>
        <MainHeader />
        <main className="Body-Main">
          <div className="Container">
            <PageHeaderContainer />
            <TableContainer />
          </div>
        </main>
        <MainFooter />
      </>
    )
}

export default App;