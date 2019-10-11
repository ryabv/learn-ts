import React from 'react';
import { connect } from 'react-redux';
import { filesFetchFileContent } from '../../store/fileContent/actions';
import File, { FileProps } from './File';
import { withRouter } from "react-router-dom";


interface FileContainerProps extends FileProps {
    getFileContent: (url: string) => void
}

class FileContainer extends React.Component<FileContainerProps> {
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
            fileContent={this.props.fileContent} 
        />;
    }
}

const putStateToProps = (state: {fileContent: {fileData: []}}) => {
    return {
        fileContent: state.fileContent.fileData
    }
};

const putDispatchToProps = function(dispatch: any) {
    return {
        getFileContent: (url: string) => {dispatch(filesFetchFileContent(url))}
    }
};

export default withRouter( connect(putStateToProps, putDispatchToProps)(FileContainer) );