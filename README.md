Проект: Система учета рабочего времени.

Технологии: 

Backend: 
.net core 2.2 + ef(sqlite) + JsonApiDotNetCore + Hangfire

FrontEnd: 
Angular 7 + sb-admin-material + @ng-bootstrap + @ngx-formly/material + PrimeNg + angular2-jsonapi

Для запуска (консоль): 
1. cd [project folder]
2. dotnet run

В БД надо установить логин для своего пользователя (например, SqLiteStudio):
Update Persons Set UserName = '[YourDomain\YourLogin]' where UserName = 'VM-001\root'

Для сборки релизной версии:
dotnet publish -c Release

Примеры страниц:
![Alt text](/screenshots/Screenshot_01.png?raw=true "Главная")
![Alt text](/screenshots/Screenshot_02.png?raw=true "Мой табель")
![Alt text](/screenshots/Screenshot_03.png?raw=true "Документы компании")
![Alt text](/screenshots/Screenshot_04.png?raw=true "Табели подчиненных")
![Alt text](/screenshots/Screenshot_05.png?raw=true "Информация по проектам")
![Alt text](/screenshots/Screenshot_06.png?raw=true "Пример списочного представления")
![Alt text](/screenshots/Screenshot_07.png?raw=true "Календарь компании")
![Alt text](/screenshots/Screenshot_08.png?raw=true "Календарь исключений (рабочий/выходной)")
