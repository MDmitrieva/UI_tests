# language: ru

@component=Тип_плана
Функционал: Удаление типа плана

Контекст: 
  Дано Я авторизован в системе через API
  И Я попадаю в просмотр календаря в масштабе "Месяц"
    
Сценарий: Пользователь удаляет ранее созданный тип плана

    Когда Я перехожу в список типов планов
    То Я вижу текст "Наименование типа плана"
    И Я вижу текст "plTypeToDelete"
    Когда Я нажимаю на кнопку удаления записи "plTypeToDelete"
    То Я вижу модальное окно для подтверждения удаления
    Когда Я нажимаю на кнопку "Удалить"
    То Я не вижу удаленный пункт списка "plTypeToDelete"
