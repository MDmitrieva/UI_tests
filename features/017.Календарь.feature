# language: ru

@component=Событие
Функционал: Создание события через календарь

Контекст: 
  Дано Я авторизован в системе через API
  
   
Сценарий: Пользователь создает событие в календаре растяжением элемента календаря

    Когда Я перехожу в календарь
    То Я попадаю в просмотр календаря в масштабе "Месяц"
    Когда Я ввожу в поиск название ресурса "calendarEvCreate"
    То Я вижу только ресурс "calendarEvCreate"
    Когда Я растягиваю область для колбаски у ресурса "calendarEvCreate"
    То Я вижу окно для создания события
    Когда Я заполняю поля формы, выбрав тип события "EvTypeForCalendar"
    И Я нажимаю на кнопку "СОЗДАТЬ"
    То Я вижу созданное событие "EvTypeForCalendar" на календаре

  