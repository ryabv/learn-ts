import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table/Table';

const setUp = (props = {}) => {
const component = shallow( <Table {...props } />)
    return component;
}

describe('Table component', () => {


    describe('Таблица без переданных файлами', () => {
        let component;
        beforeEach(() => {
            component = setUp();
        });

        it('Таблица отображается', () => {
            const wrapper = component.find(`[data-test="TableComponent"]`);
            expect(wrapper.length).toBe(1);
        });

        it('Не выводятся пустые TableRow', () => {
            const tr = component.find(`[data-test="TableRow"]`);
            expect(tr.length).toBe(0);
        });
    });


    describe('Таблица с переданными файлами', () => {
        let component;
        beforeEach(() => {
            let props = {
                files: [
                    { name: 'Folder1', type: 'folder' },
                    { name: 'Folder2', type: 'folder' },
                    { name: 'Folder3', type: 'folder' },
                    { name: 'File1', type: 'file' },
                    { name: 'File2', type: 'file' },
                ]
            };
            component = setUp(props);
        });

        it('Таблица отображается', () => {
            const wrapper = component.find(`[data-test="TableComponent"]`);
            expect(wrapper.length).toBe(1);
        });

        it('Выводятся строки TableRow с файлами и папками', () => {
            const tr = component.find(`[data-test="TableRow"]`);
            expect(tr.length).toBe(5);
        });

        it('Классы для ссылок файлов и папок отличаются', () => {
            const folderLink = component.find(`.Link_weight_bold.Link_before_folder`);
            const fileLink = component.find(`.Link_before_code`);
            expect(folderLink.length).toBe(3);
            expect(fileLink.length).toBe(2);
        });
    });
});