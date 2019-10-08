import React from 'react';
import {connect} from 'react-redux';
import { breadcrumbsFetchData } from '../../store/breadcrumbs/actions';
import Breadcrumbs from './Breadcrumbs';
import { withRouter } from "react-router-dom";


class BreadcrumbsContainer extends React.Component {
    // componentDidMount() {
    //     this.props.getBreadcrumbs('http://localhost:3001/api/repos/test-repository/tree/master')
    // }

    render() {
        return (
            <Breadcrumbs 
                history={this.props.history}
                getBreadcrumbs={this.props.getBreadcrumbs}
            />
        );
    }
}

const putStateToProps = (state) => {
    return {
        breadcrumbs: state.breadcrumbs.breadcrumbs,
    }
}

const putDispatchToProps = (dispatch) => {
    return {
        getBreadcrumbs: url => {dispatch(breadcrumbsFetchData(url))}
    }
};

export default withRouter( connect(putStateToProps, putDispatchToProps)(BreadcrumbsContainer) );