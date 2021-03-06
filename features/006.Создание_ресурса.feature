# language: ru

@component=Ресурс
Функционал: Создание ресурса

Контекст: 
  Дано Я авторизован в системе через API
  И Я попадаю в просмотр календаря в масштабе "Месяц"
  
  Сценарий: Пользователь создает ресурс и видит его в списке ресурсов

    Когда Я перехожу в список ресурсов
    И Я нажимаю на кнопку создания новой сущности
    То Открывается форма "Создание ресурса "
    И Я вижу в форме добавления ресурса в поле ввода надпись "Введите наименование ресурса"
    Когда Я заполняю поле "Наименование ресурса" значением "Test resource name"
    И Я открываю выпадающий список выбора типа ресурса и выбираю в нем тип "ResTypeForResCreateTest"
    И Я нажимаю на кнопку "Создать"
    И Я жду, пока закроется форма "Создание ресурса "
    То Я вижу в списке созданный ресурс "Test resource name"