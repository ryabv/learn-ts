import React from 'react';
import { shallow } from 'enzyme';
import File from '../File/File';

const setUp = (props = {}) => {
const component = shallow( <File {...props } />)
    return component;
}

describe('File component', () => {
    
    describe('Файл без переданных данных', () => {
        let component;
        beforeEach(() => {
            component = setUp();
        });

        it('Файл отображается', () => {
            const wrapper = component.find(`[data-test="FileComponent"]`);
            expect(wrapper.length).toBe(1);
        });

        it('Не выводятся пустые строки', () => {
            const codeLine = component.find(`[data-test="CodeLine"]`);
            expect(codeLine.length).toBe(0);
        });
    });


    describe('Файл с переданными файлами', () => {
        let component;
        beforeEach(() => {
            let props = {
                fileContent: [
                    ['Lorem ipsum'],
                    [''],
                    ['dolor'],
                    ['sit amet']
                ]
            };
            component = setUp(props);
        });

        it('Файл отображается', () => {
            const wrapper = component.find(`[data-test="FileComponent"]`);
            expect(wrapper.length).toBe(1);
        });

        it('Выводятся строки с содержимым', () => {
            const codeLine = component.find(`[data-test="CodeLine"]`);
            expect(codeLine.length).toBe(4);
        });

    });

});