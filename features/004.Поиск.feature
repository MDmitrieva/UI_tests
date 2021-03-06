# language: ru

@component=Поиск
Функционал: Поиск сущностей в списках

Контекст: 
  Дано Я авторизован в системе через API
  И Я попадаю в просмотр календаря в масштабе "Месяц"

Сценарий: Пользователь ищет нужные ему сущности в списках

    Когда Я перехожу в список планов
    То Я вижу окно поиска элементов и список элементов на странице
    Когда Я ввожу в окно поиска слово "Search"
    То в списке остается только пункт "planToSearch"
    Когда Я перехожу в список событий
    То Я вижу окно поиска элементов и список элементов на странице
    Когда Я ввожу в окно поиска слово "Search"
    То в списке остается только пункт "evToSearch"
    Когда Я перехожу в список ресурсов
    То Я вижу окно поиска элементов и список элементов на странице
    Когда Я ввожу в окно поиска слово "Search"
    То в списке остается только пункт "resForSearch"
    Когда Я перехожу в список типов планов
    То Я вижу окно поиска элементов и список элементов на странице
    Когда Я ввожу в окно поиска слово "Search"
    То в списке остается только пункт "planTypeForSearch"
    Когда Я перехожу в список типов событий
    То Я вижу окно поиска элементов и список элементов на странице
    Когда Я ввожу в окно поиска слово "Search"
    То в списке остается только пункт "EvTypeSearch"
    Когда Я перехожу в список типов ресурсов
    То Я вижу окно поиска элементов и список элементов на странице
    Когда Я ввожу в окно поиска слово "Search"
    То в списке остается только пункт "resTypeForSearch"
    
    
