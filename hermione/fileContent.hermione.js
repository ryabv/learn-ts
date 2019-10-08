const assert = require('assert');

describe('Страница файла', () => {
    it('должна появится при переходе по ссылке http://localhost:3000/filepage/file.txt', function() {
        return this.browser
            .url('/filepage/file.txt')
            .isExisting('.File')
            .then((exists) => {
                assert.ok(exists, 'Файл не появился');
            })
    })
});