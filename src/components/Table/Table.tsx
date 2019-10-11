import React from 'react';

export interface TableProps {
    pathToFile: string,
    history: {location: {pathname: string}, push: (path: string) => void},
    fetchFolderContent: (url: string) => void,
    fetchFileContent: (url: string) => void,
    commitHash: string,
    files: [{
        type: string,
        commitMessage: string,
        committer: string,
        updated: string,
        name: string
    }],
}

export default class Table extends React.Component<TableProps> {
    constructor(props: TableProps) {
        super(props);
        this.getMore = this.getMore.bind(this);
    }

    getMore(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        const isFolder = ~Array.prototype.indexOf.call(e.currentTarget.classList, 'Link_before_folder');
        let fetchString = '';
        let localPath = this.props.pathToFile ? `/${this.props.pathToFile}` : '';
        let typeOfQuery: string | string[] = e.currentTarget.pathname.match(/filepage|folderpage/g) || ['']; // определяем, file или folder стоит в начале пути
        typeOfQuery = typeOfQuery[typeOfQuery.length - 1];
        let parsedPath = e.currentTarget.pathname.match(/[\w\-\.]+$/) || []; // определяем название файла из конца пути
        let nameOfSubject = parsedPath[0];
        this.props.history.location.pathname = '/';
        this.props.history.push(typeOfQuery + localPath + '/' + nameOfSubject);

        if (isFolder) {
            fetchString = `http://localhost:3001/api/repos/test-repository/tree/master${localPath}/${nameOfSubject}`;
            this.props.fetchFolderContent(fetchString);
        } else {
            fetchString = `http://localhost:3001/api/repos/test-repository/blob/master${localPath}/${nameOfSubject}`;
            this.props.fetchFileContent(fetchString);
        }

        
    }

    getTableContent() {
        if (!this.props.files) {
            // console.log('no files');
            return;
        }
        
        return this.props.files.map((file, i) => {

            let fileTypeClass, filePagePath;
            
            switch(file.type) {
                case 'folder':
                    fileTypeClass = 'Link_weight_bold Link_before_folder';
                    filePagePath = 'folderpage';
                    break;
                case 'file':
                    fileTypeClass = 'Link_before_code';
                    filePagePath = 'filepage';
                    break;
                default:
                    fileTypeClass = '';
                    filePagePath = '';
            }

            return (
                <tr key={i} className="Table-Row" data-test="TableRow">
                    <td className="Table-Td"><a onClick={this.getMore} className={`Link Link_color_black ${fileTypeClass} Link_mob_after-link`} href={`${filePagePath}/${file.name}`}>{file.name}</a></td>
                    <td className="Table-Td"><a className="Link" href="/">{this.props.commitHash}</a></td>
                    <td className="Table-Td">{file.commitMessage}</td>
                    <td className="Table-Td"><span className="Name">{file.committer}</span><span className="Table-Mobile">{file.updated}</span></td>
                    <td className="Table-Td">{file.updated}</td>
                </tr>
            )
        });
    }

    render() {
        return (
            <section className="Table-Block">
                <table className="Table" id="filesList" data-test="TableComponent">
                    <thead>
                        <tr className="Table-Row Table-Row_header">
                            <th className="Table-Td Table-Td_header">Name</th>
                            <th className="Table-Td Table-Td_header">Last commit</th>
                            <th className="Table-Td Table-Td_header">Commit message</th>
                            <th className="Table-Td Table-Td_header">Committer</th>
                            <th className="Table-Td Table-Td_header">Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTableContent()}
                    </tbody>
                </table>
            </section>
        )
    }
}