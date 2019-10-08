import React from 'react';
import { connect } from 'react-redux';
import { filesFetchFolderContent, filesFetchFileContent } from '../../store/filesList/actions';
import Table from './Table';
import { withRouter } from "react-router-dom";


class TableContainer extends React.Component {
    componentDidMount() {
        window.addEventListener('popstate', () => {
            const localClearPath = this.props.history.location.pathname.replace(/folderpage|filepage/, '');
            this.props.fetchFolderContent(`http://localhost:3001/api/repos/test-repository/tree/master${localClearPath}`)
        });
        
        const clearPath = this.props.history.location.pathname.replace(/folderpage|filepage/, ''); //убираем file или folder из начала пути
        this.props.fetchFolderContent(`http://localhost:3001/api/repos/test-repository/tree/master${clearPath}`);
    }

    render() {
        return <Table 
            pathToFile={this.props.pathToFile}
            history={this.props.history}
            fetchFolderContent={this.props.fetchFolderContent} 
            fetchFileContent={this.props.fetchFileContent} 
            files={this.props.filesList} 
            commitHash={this.props.commitHash}
        />;
    }
}

const putStateToProps = (state) => {
    return {
        filesList: state.filesList.filesList,
        commitHash: state.filesList.commitHash,
        pathToFile: state.filesList.pathToFile,
        currRepo: 'state.repositoriesList.activeLink'
    }
};

const putDispatchToProps = (dispatch) => {
    return {
        fetchFolderContent: url => {dispatch(filesFetchFolderContent(url))},
        fetchFileContent: url => {dispatch(filesFetchFileContent(url))}
    }
};

export default withRouter( connect(putStateToProps, putDispatchToProps)(TableContainer) );