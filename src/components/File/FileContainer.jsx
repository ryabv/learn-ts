import React from 'react';
import { connect } from 'react-redux';
import { filesFetchFileContent } from '../../store/fileContent/actions';
import File from './File';
import { withRouter } from "react-router-dom";


class FileContainer extends React.Component {
    componentDidMount() {
        window.addEventListener('popstate', () => {
            const localClearPath = this.props.history.location.pathname.replace(/folderpage|filepage/, '');
            this.props.getFileContent(`http://localhost:3001/api/repos/test-repository/tree/master${localClearPath}`)
        });
        
        const clearPath = this.props.history.location.pathname.replace(/folderpage|filepage/, ''); //убираем file или folder из начала пути
        this.props.getFileContent(`http://localhost:3001/api/repos/test-repository/blob/master${clearPath}`);
    }

    render() {
        return <File 
            history={this.props.history}
            getFileContent={this.props.getFileContent} 
            fileContent={this.props.fileContent} 
        />;
    }
}

const putStateToProps = (state) => {
    return {
        fileContent: state.fileContent.fileData
    }
};

const putDispatchToProps = (dispatch) => {
    return {
        getFileContent: url => {dispatch(filesFetchFileContent(url))}
    }
};

export default withRouter( connect(putStateToProps, putDispatchToProps)(FileContainer) );