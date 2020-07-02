#language: ru

@component=Ресурс
Функционал: Редактирование ресурса

Контекст: 
  Дано Я авторизован в системе через API
  И Я попадаю в просмотр календаря в масштабе "Месяц"
   
Сценарий: Пользователь изменяет ранее созданный ресурс

    Когда Я перехожу в список ресурсов
    То Я вижу текст "Наименование ресурса"
    Когда Я открываю ресурс "resToEdit"
    То Открывается форма "Редактирование ресурса"
    Когда Я очищаю поле "Наименование"
    И Я нажимаю на кнопку "Сохранить"
    То На обязательных полях формы Я вижу надпись "Заполните поле" в количестве "1" шт.
    Когда Я меняю наименование на "resEdited" и выбираю тип ресурса "rtForEditedRes" 
    И Я нажимаю на кнопку "Сохранить"
    То Я вижу сообщение о том, что сущность "Ресурс " "resEdited" " успешно изменен."
    И Я вижу обновленный ресурс "resEdited" в списке ресурсов
    И Я не вижу ресурс "resToEdit" в списке ресурсов
    Когда Я открываю ресурс "resEdited"
    То Я вижу, что наименование изменилось на "resEdited", а тип ресурса на "rtForEditedRes"