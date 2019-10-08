import React from 'react';
import {connect} from 'react-redux';
import PageHeader from './PageHeader';


class PageHeaderContainer extends React.Component {
    render() {
        return <PageHeader />;
    }
}

const putStateToProps = (state) => {
    return {
        
    }
}

const putDispatchToProps = {

};

export default connect(putStateToProps, putDispatchToProps)(PageHeaderContainer);