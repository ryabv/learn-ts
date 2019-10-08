# Learn React

У меня возникли сложности с объединением сервера и клиента в одном репозитории, поэтому проект надо запускать через установку двух репозиториев.

## Как запустить проект

1. Создайте пустую папку
2. Выполните команду ```git clone https://github.com/ryabv/learn-react.git client```
3. Выполните команду ```git clone https://github.com/ryabv/git-API.git server```
4. В пустой папке должно появится две папки с названием ```client``` и ```server```
5. Перейдите в командной строке в папку ```server``` через команду ```cd ../server```
6. Выполните ```npm i```
7. Выполните ```node app```, сервер спросит путь к папке с репозиториями, введите ```./repos```
8. Откройте новую консоль в корневой папке, перейдите по пути ```server/test/test-repository``` и скачайте какой-нибудь репозиторий, например так: ```git clone https://github.com/GoogleChrome/puppeteer.git```
9. Перейдите в командной строке в папку ```client``` через команду ```cd ../../../client```
10. Выполните ```npm i```
11. Выполните ```npm start```
12. В итоге будет запущено 2 сервера: один для API, другой для клиента на 3001 и 3000 портах соответсвенно. Нам нужен на порту 3000 http://localhost:3000

## Что сделано


### Unit-тесты
Unit-тесты написаны только на блоки клиентской части, поэтому проверку нужно осуществлять из папки ```client```.

Всего в проекте на данный момент два системных блока и для каждого два сценария:

1. Страница со списком файлов и папок
  1. С данными
  2. Без данных
2. Страница файла
  1. С данными
  2. Без данных

Unit-тесты для каждого блока расположены в папках этих компонентов (```Table``` и ```File```).

Тесты запускаются через команду ```npm test```.


### Интеграционные тесты
Интеграционные тесты также написаны только на блоки клиентской части, поэтому проверку нужно осуществлять из папки ```client```.

Всего написано два интеграционных теста:

1. Страница файла должна появится при переходе по ссылке http://localhost:3000/filepage/file.txt
2. Страница списка файлов и папок должна появится при переходе по ссылке http://localhost:3000/folderpage/testFolder

Важно, что тесты должны запускаться при работающих серверах API и клиента (localhost:3001, localhost: 3000).

P.S. У меня по какой-то причине не получалось запустить Гермиону локально, поэтому пришлось установить глобально и запускать через команду ```hermione```.

P.P.S. К сожалению, не успел написать другие тесты из-за нехватки времени