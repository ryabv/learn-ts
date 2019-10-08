import React from 'react';

import MainHeader from '../../components/MainHeader/MainHeader';
import MainFooter from '../../components/MainFooter/MainFooter';
import FileContainer from '../../components/File/FileContainer';
import PageHeaderContainer from '../../components/PageHeader/PageHeaderContainer';


function FilePage() {
    return ( 
      <>
        <MainHeader />
        <main className="Body-Main">
          <div className="Container">
            <PageHeaderContainer />
            <section className="Main-content Main-content_vertp_16">
                <FileContainer />
            </section>
          </div>
        </main>
        <MainFooter />
      </>
    )
}

export default FilePage;