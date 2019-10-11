import React from 'react';
import { connect } from 'react-redux';
import { filesFetchFolderContent, filesFetchFileContent } from '../../store/filesList/actions';
import Table, { TableProps } from './Table';
import { withRouter } from "react-router-dom";

interface TableContainerProps extends TableProps {
    files: [{
        type: string,
        commitMessage: string,
        committer: string,
        updated: string,
        name: string
    }]
}

class TableContainer extends React.Component<TableContainerProps> {
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
            files={this.props.files} 
            commitHash={this.props.commitHash}
        />;
    }
}

type State = {
    filesList: {
        filesList: [{
            type: string,
            commitMessage: string,
            committer: string,
            updated: string,
            name: string
        }],
        commitHash: string,
        pathToFile: string
    }
}

const putStateToProps = (state: State) => {
    return {
        files: state.filesList.filesList,
        commitHash: state.filesList.commitHash,
        pathToFile: state.filesList.pathToFile
    }
};

const putDispatchToProps = (dispatch: any) => {
    return {
        fetchFolderContent: (url: string) => {dispatch(filesFetchFolderContent(url))},
        fetchFileContent: (url: string) => {dispatch(filesFetchFileContent(url))}
    }
};

export default withRouter( connect(putStateToProps, putDispatchToProps)(TableContainer) );