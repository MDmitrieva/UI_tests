# language: ru

@component=Тип_плана
Функционал: Создание типа плана
Контекст: 
  Дано Я авторизован в системе через API
  И Я попадаю в просмотр календаря в масштабе "Месяц"

  @PLN-1342
  
  Сценарий: Пользователь создает тип плана и видит его в списке типов планов

    Когда Я перехожу в список типов планов
    И Я нажимаю на кнопку создания новой сущности
    То Открывается форма "Создание типа плана"
    И Я вижу, что Типы событий и Шаблоны отчетов недоступны для выбора в типе плана
    Когда Я заполняю поле "Наименование типа плана" значением "UI plan type test"
    И Я заполняю поле "Код"
    И Я выбираю длительность типа плана в один год
    И Я нажимаю на кнопку "Создать"
    То Я вижу, что заголовок формы изменился на "Редактирование типа плана"
    И Я вижу, что Типы событий и Шаблоны отчетов доступны для выбора в типе плана
    Когда Я выбираю значение "EvTForPlTypeCreateTest" для поля с выпадающим списком "Типы событий"
    То Я вижу, что тип события "EvTForPlTypeCreateTest" появился в списке типов событий для типа плана
    Когда Я нажимаю на кнопку выхода из таба
    То на странице типов плана Я вижу созданный тип плана "UI plan type test"