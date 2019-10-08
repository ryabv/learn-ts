import React from 'react';
import { connect } from 'react-redux';
import { repositoriesList, setActiveRepository } from '../../store/repositories/actions';
import Dropdown from './Dropdown';
import { withRouter } from "react-router-dom";


class DropdownContainer extends React.Component {
    componentDidMount() { 
        this.props.getRepositoriesList(`http://localhost:3001/api/repos/`);
        // this.props.setActiveRepository(this.props.repositoriesList[0]);
    }

    render() {
        return (
            <Dropdown 
                {...this.props}
                history={this.props.history}
                repositoriesList={this.props.repositoriesList}
                setActiveRepository={this.props.setActiveRepository}
                activeLink={'test-repository'}
                // activeLink={this.props.activeLink || this.props.repositoriesList[0]}
            />
        )
    }
}

const putStateToProps = (state) => {
    return {
        repositoriesList: state.repositoriesList.names,
        activeLink: state.repositoriesList.activeLink
    }
};

const putDispatchToProps = (dispatch) => {
    return {
        getRepositoriesList: url => {return dispatch(repositoriesList(url))},
        setActiveRepository: name => {dispatch(setActiveRepository(name))}

    }
};

export default withRouter( connect(putStateToProps, putDispatchToProps)(DropdownContainer) );