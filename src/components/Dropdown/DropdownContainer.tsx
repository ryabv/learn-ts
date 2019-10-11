import React from 'react';
import { connect } from 'react-redux';
import { repositoriesList, setActiveRepository } from '../../store/repositories/actions';
import Dropdown, { DropdownProps } from './Dropdown';

interface DropdownContainerProps extends DropdownProps {
    getRepositoriesList?: (url: string) => void,
    
}

class DropdownContainer extends React.Component<DropdownContainerProps> {
    componentDidMount() { 
        if (this.props.getRepositoriesList) {
            this.props.getRepositoriesList(`http://localhost:3001/api/repos/`);
        }
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

type State = {
    repositoriesList: {
        names: string[],
        activeLink: string
    }
}

let putStateToProps: (state: State) => {};
putStateToProps = (state) => {
    return {
        repositoriesList: state.repositoriesList.names,
        activeLink: state.repositoriesList.activeLink
    }
};

let putDispatchToProps: (dispatch: (cb: {}) => void ) => {};
putDispatchToProps = (dispatch) => {
    return {
        getRepositoriesList: (url: string) => {return dispatch(repositoriesList(url))},
        setActiveRepository: (name: string) => {dispatch(setActiveRepository(name))}

    }
};

export default connect(putStateToProps, putDispatchToProps)(DropdownContainer);