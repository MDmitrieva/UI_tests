#language: ru

@component=Тип_ресурса
Функционал: Работа с кастомными полями

Контекст: 
  Дано Я авторизован в системе через API
  И Я попадаю в просмотр календаря в масштабе "Месяц"

Сценарий: Пользователь добавляет в тип ресурса кастомные поля и создает ресурс с ними 

Когда Я перехожу в список типов ресурсов 
И Я открываю тип ресурса "carsForFieldTest" 
То Я вижу кастомное поле  с названием "number", описанием "Номер" в списке под номером "1"
И Я вижу кастомное поле  с названием "model", описанием "Марка" в списке под номером "1"
Когда Я изменяю шаблон параметров ресурса на "модель: ${model} номер: ${number}"
И Я нажимаю на кнопку "Сохранить"
То Я вижу сообщение о том, что сущность "Тип ресурса " "carsForFieldTest" " успешно изменен."
Когда Я открываю поле "number" на редактирование
И Я меняю значение в поле "Позиция поля" на "2"
И Я делаю поле "Номер" обязательным
И Я нажимаю на кнопку "Сохранить" в форме редактирования поля
И Я вижу сообщение о том, что сущность "Поле " "number" " успешно изменено."
И Я нажимаю на кнопку выхода
То в списке кастомных полей Я вижу, что номер поля "number" изменился на "2"
Когда Я перехожу в список ресурсов
И Я нажимаю на кнопку создания новой сущности
И Я открываю выпадающий список выбора типа ресурса и выбираю в нем тип "carsForFieldTest"
То Я вижу, что поле "Марка" находится на позиции "1"
И Я вижу, что поле "Номер" находится на позиции "2"
Когда Я заполняю поле "Наименование ресурса" значением "Машина 1"
И Я нажимаю на кнопку "Создать"
То На обязательных полях формы Я вижу надпись "Заполните поле" в количестве "2" шт.
Когда Я указываю в поле "number" значение "645"
И Я указываю в поле "model" значение "Газель"
И Я нажимаю на кнопку "Создать"
То Я вижу сообщение о том, что сущность "Ресурс " "Машина 1" " успешно создан."
Когда Я перехожу в календарь
То Я вижу карточку ресурса "Машина 1" с лейблом "модель: Газель номер: 645"
