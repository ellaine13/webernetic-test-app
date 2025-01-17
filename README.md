# Webernetic Family Test Project

## Старт проекта

### Клонируем репозиторий и переходим в папку проекта
```
git clone https://github.com/ellaine13/webernetic-test-app.git
```

### Устанавливаем модули
```
yarn
```

## Команды для запуска

### Запуск с отслеживанием изменений
```
npm run dev
```
Эту команду запускаем при **разработке**

### Финальная (production) сборка
```
npm run deploy
```
Эту команду запускаем **на сервере**.

Команда оптимизирует, минифицирует файлы и собирает проект в папку `dist`

### Тестирование проекта в режиме production-сборки (со сжатыми файлами, без мапинга)
```
cross-env NODE_ENV=prod gulp dev
```

## Дополнительные команды
### Создание нового блока
Для создания нескольких блоков, названия нужно указывать через пробел:
```
npm run make-block [block-name-1] [block-name-2]
```
Команда создает в директории `app/blocks/` модуль `[block-name]` содержащий в себе три файла:
`[block-name].html`, `[block-name].css`, `[block-name].js`

### Локальный сервер на другом порте
```
cross-env PORT=9000 npm run dev
```

### Расшарить локальный сервер
```
cross-env TUNNEL=true npm run dev
```

### Собрать архив из папки `dist`
```
npm run zip
```
Команда создает `dist.zip` в папке `dist`.

### Очистка папки `dist`
```
npm run clean
```

### Lint стилей
```
npm run lint:styles
```

### Lint скриптов
```
npm run lint:scripts
```

### Lint общий
```
npm run lint
```

## Линтеры
В сборке линтуются стили и скрипты в следующих папках:

стили:
* `app/blocks`
* `app/styles`

скрипты:
* `app/blocks`
* `app/scripts`


## Git hooks
В сборке используется [husky](https://github.com/typicode/husky). Перед каждым `git commit` запускается линтер.
Если линтер падает с ошибкой, `git commit` не пройдет.

Список файлов, которые проверяются перед каждым коммитом указан в `.lintstagedrc`


## Подключение html-модулей
В сборке используется пакет [gulp-file-include](https://www.npmjs.com/package/gulp-file-include).

Он позволяет подключать html-файлы с помощью директивы `@@`, передавать объекты с данными и т.д.
Это некая альтернатива `pug` с возможностью использовать традиционный синтаксис `html`


## Как работать со стилями
В сборке используется препроцессор [Sass](https://sass-scss.ru/) в нотификации SCSS (Sassy CSS).

Стили из блоков-модулей уже подключены в основной файл стилей `app/styles/app.scss`.
Ничего подключать не нужно.
Просто, создаем модуль командой `npm run make-block`, или вручную и добавляем стили в файл стилей этого модуля.

Общие стили для всего сайта добавляем в файл `app/styles/common/common.scss`.

В папке `app/styles/helpers` лежат вспомогательные файлы:

`fonts.scss` - Подключение нестандартных шрифтов. Здесь можно посмотреть [список стандартных](https://puzzleweb.ru/css/6_fonts3.php) шрифтов.

`mixins.scss` - Примеси.

`nojs.scss` - Стили для предупреждения об отключенном java script в браузере.

`optimize.scss` - Оптимизация стилей.

`sprite_template.scss` - Стили для иконок из векторного спрайта.

`variables.scss` - Переменные.

В сборке можно использовать [линтер стилей по логическим группам](https://www.npmjs.com/package/stylelint-config-rational-order).
Чтобы его активировать, нужно в `.stylelintrc.json` установить поле `plugin/rational-order` в значение `true`.

Любой файл стилей добавленный непосредственно (без дополнительных подпапок) в папку `app/styles/` будет сгенерирован,
как отдельный css файл в папке `dist/assets/styles`


## Как работать со скриптами
### Скрипты в модулях
#### Шаг 1
Создаем модуль командой `npm run make-block`, или вручную.
В js-файле модуля добавляем объект нашего скрипта с необходимыми полями и методами.
Например:
```javascript
app.slider = {
  initEl: '.slider',
  init() {
    this.yourMethod();
  },
  yourMethod() {
    new Swiper({});
  },
};
```


#### Шаг 2
В файле `scripts/init.js` вызываем метод инициализации скрипта:
```javascript
app.slider.init();
```


## Добавление сторонних библиотек в проект
Сначала скачиваем библиотеку с помощью `npm` (с флагом `--save`) или `yarn add`

Добавляем путь к скриптам и стилям библиотеки в одном из файлов:

### libs-links-concat.js

`libs-links-concat.js`

```javascript
export const libsConcatJsLink = [
  'node_modules/lib1/lib1.js',
  'node_modules/lib2/lib2.js',
];

export const libsConcatCssLink = [
  'node_modules/lib1/lib1.css',
  'node_modules/lib2/lib2.css',
];
```

* Указанные в `libs-links-concat.js` файлы объединяются:
  * CSS-файлы - в `libs.min.css`
  * JS-файлы - в `libs.min.js`
* Объединенные файлы помещаются в папку `dist`
  * CSS-файлы - в `dist/assets/libs/css`
  * JS-файлы - в `dist/assets/libs/js`
* Сгенерированные файлы стилей и скриптов нужно подключать вручную:
  * CSS-файлы - в `app/blocks/head/head.html`
  * JS-файлы - в `app/blocks/link/link.html`


### libs-links.js

`libs-links.js`

```javascript
export const libsJsLink = [
  'node_modules/lib1/lib1.js',
  'node_modules/lib2/lib2.js',
];

export const libsCssLink = [
  'node_modules/lib1/lib1.css',
  'node_modules/lib2/lib2.css',
];
```

* Указанные в `libs-links.js` файлы НЕ объединяются, а копируются в папку `dist` раздельно
  * CSS-файлы - в `dist/assets/libs/css`
  * JS-файлы - в `dist/assets/libs/js`

* Чтобы использовать метод подключения библиотек указанные в пункте **_Динамическое добавления библиотек_**, библиотеки нужно подключать в этот файл.

* Если автоматическое подключение не планируется использовать, то скопированные файлы стилей и скриптов нужно подключать вручную:
  * CSS-файлы - в `app/blocks/head/head.html`
  * JS-файлы - в `app/blocks/link/link.html`

Перезапускаем проект.

Если же этот способ не будет использоваться, то можно удалить файл `app/scripts/common/addLibs.js`
и поле `pathToLibsFiles` в `app/scripts/app.js`.


### Динамическое добавления библиотек
```javascript
app.slider = {
  initEl: '.slider',
  init() {
    app.addLibs.initScript('swiper.min', 'Swiper', () => {
      this.yourMethod();
    });
    app.addLibs.initStyle('swiper.min');
  },
  yourMethod() {
    new Swiper({});
  },
};
```

###Конструкция для подключения JS-файлов библиотеки динамически:
```javascript
app.addLibs.initScript('swiper.min', 'Swiper', () => { ... });
```
где

`.initScript()` - метод, который динамически подключает скрипты библиотеки: `<script src="./assets/libs/js/swiper.min.js"></script>`;

`'swiper.min'` - название библиотеки (расширение `.js` не указываем);

`'Swiper'` - конструктор плагина;

###Конструкция для подключения JS-файлов библиотеки динамически:
```javascript
app.addLibs.initStyle('swiper.min');
```
где

`.initStyle()` - метод, который динамически подключает стили библиотеки: `<link href="./assets/libs/js/swiper.min.css"></link>`;

`'swiper.min'` - название библиотеки (расширение `.css` не указываем);

Если использовать этот метод, то вручную подключать стили и скрипты библиотек НЕ НУЖНО!


## Вспомогательные скрипты
### addLibs.js
Файл `app/scripts/common/addLibs.js` содержит методы для динамического подключения библиотек.


### app.js
Важно!

В файле `app/scripts/app.js` в поле `pathToLibsFiles` указан путь к библиотекам.
Этот путь нужно заменить во время программирования на реальный путь в структуре сайта.
```javascript
const app = {
  pathToLibsFiles: './assets/libs',
};
```
Например, в bitrix `'./assets/libs'`, обычно, заменяем на `/local/templates/defaults/front/dist/assets/libs`


### Подключение отдельных скриптов
// дополняется


### Добавление своих плагинов в проект
// дополняется


## jQuery
В сборке по умолчанию подключена библиотека `jQuery` (в `app/blocks/link/link.html`).

Если jQuery использовать не планируется, необходимо сделать следующее:

1. Удалить в `package.json` в секции `dependencies` поле `jquery`;
2. Удалить подключение `app/blocks/link/link.html`.


## Добавление статических файлов
Чтобы добавить статические файлы: шрифты, видео, json и т.д., - создаем в `app/resources/` папку `assets`,
и уже в неё добавляем нужные папки с файлами.

Они будут скопированы в `dist/assets/`. Возможно, понадобится перезапустить сборку.


## Генерирование и добавление фавиконок и дополнительных метатегов
В файле `app/blocks/head/head.html` уже прописан минимально необходимый набор метатегов.

Нужно только добавить фавиконки в папку `app/resources/favicons/`

### Favicons
Фавиконки генерируем [онлайн-генератором](https://realfavicongenerator.net/).
Исходное изображение должно быть в формате `.png` размером не меньше `260x260px`.
Если картинки нет в дизайне, то ее можно попросить у менеджера, дизайнера, или сделать самому, например, из логотипа.
Созданный в генераторе архив скачиваем и распаковываем в папку `app/resources/favicons/` вместо дефолтных.

В большинстве случаев этого будет достаточно.

Но нужно помнить, что генератор сильно портит качество иконок.
Особенно, favicon.ico и маленькие иконки.
Поэтому, лучше все эти иконки создать вручную, контролируя их качество.
favicon.ico можно сгенерировать в [favicon.cc](https://www.favicon.cc/) из favicon-16x16.png.

## Автоматическое создание svg-спрайтов
Добавьте в папку `app/images/sprite-icons/` svg-иконки, и они будут автоматически собраны в спрайт `app/images/sprite.svg`.

Код из этого файла помещаем после открывающегося тега `body` и скрываем свойством `display: none;`:
```html
<svg style="display: none;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <symbol viewBox="0 0 100 100" id="icon-1" xmlns="http://www.w3.org/2000/svg">...</symbol>
  <symbol viewBox="0 0 100 100" id="icon-2" xmlns="http://www.w3.org/2000/svg">...</symbol>
</svg>
```
В нужном месте добавляем иконку по `id`:
```html
<svg viewBox="0 0 100 100" class="icon icon_your-icon">
  <use xlink:href="#icon-1"></use>
</svg>
```
**Будет дополнено...** Todo: Разобраться, как кроссбраузерно подключать иконки прямо из файла-спрайта
Пока-что по умолчанию подключается библиотека [svg4everybody](https://jonneal.dev/svg4everybody/)
См. в `package.json` в секции `dependencies` и в `app/blocks/link/link.html`

## Изменения в версии 2.0.0
Предыдущая версия сборки сохранена в ветке `feature/v-0.1.0`

Таск по оптимизации изображений вынесен в `config.js`, как параметр `imagesOptimize: false`.
По умолчанию, изображения не оптимизируются при production-сборке.
Чтобы включить оптимизацию, нужно установить параметр `imagesOptimize` в значение `true`.  
Причины отключения оптимизации изображений:

  * визуально качество изображений нужно контролировать во время разработки;
  * при большом количестве изображений **production-сборка** выполняется долго.

Изменилась логика **production-сборки** в папку `dist`:

  * проект собирается в папка `pre-dist`;
  * удаляется папка `dist`;
  * папка `pre-dist` переименовывается в `dist`.

Это сделано с целью сократить время формирования папки `dist` на сервере.

Добавлена проверка на наличие `console.log()` в js-коде. Если такие есть,
то линтер выведет предупреждение `Unexpected console statement  no-console
`. Важно! `console.log()` не должны попадать в production-код.

Линтеры стилей и скриптов запускаются при каждом `git commit`.
В предыдущей версии запускались после команды `git push`.

Удален таск `deploy`, который позволял пушить проект на `git pages`.

Удалены таски `semver.js` (`patch`, `minor`, `major`).


## yarn.lock
`yarn.lock` файл используется следующим образом:

Если `yarn.lock` присутствует и его достаточно для удовлетворения всех зависимостей, перечисленных в `package.json`,
будут установлены точные версии, записанные в `yarn.lock`, и `yarn.lock` останется без изменений.

**Yarn не проверяет наличие более новых версий.**

Если `yarn.lock` отсутствует, или его не достаточно, чтобы удовлетворить все зависимости,
перечисленные в `package.json` (например, если вручную добавить зависимость к `package.json`),
Yarn будет искать самые новые версий указанные в package.json.
Результаты запишутся в `yarn.lock`.
Если нужно, чтобы `yarn.lock` не обновлялся, используйте команду `yarn install --frozen-lockfile`.


##package-lock.json
При повторной установке пакетов с зафиксированными версиями результирующий `node_modules` может отличаться,
так как могут быть обновлены зависимости зависимостей.
Чтобы добиться детерминированной установки в `npm` используется файл `package-lock.json`,
в котором явно описываются все версии всех зависимостей.

При запуске команды `npm i` установщик получает список зависимостей проекта из `package.json`
и во время их установки обновляет `package-lock.json`,
записывая туда полное дерево зависимостей с необходимой метаинформацей.

Для установки пакетов из `package-lock.json` нужно использовать другую команду — `npm ci`.
Эта команда устанавливает все зависимости, создавая идентичное дерево зависимостей на момент последнего выполнения `npm i`.

Кроме детерминированности, `npm ci` даёт очень хороший прирост скорости установки пакетов.


## Структура папок и файлов
```
├── app/                              # Исходники
│   ├── blocks/                       # Блоки
│   │   ├── block/                    # Блок
│   │   │    ├── block.html           # Разметка блока
│   │   │    ├── block.js             # Скрипт блока
│   │   │    └── block.scss           # Стили блока
│   │   ├── footer/                   # Футер сайта
│   │   │    ├── footer.html          # Начальная разметка футера сайта
│   │   │    └── footer.scss          # Начальные стили футера сайта
│   │   ├── head/                     # Секция head
│   │   │    └── head.html            # Разметка секции head и открывающие тэги документа
│   │   ├── header/                   # Шапка сайта
│   │   │    ├── header.html          # Начальная разметка шапки сайта
│   │   │    └── header.scss          # Начальные стили шапки сайта
│   │   └── link/                     # Подключение скриптов
│   │        └── link.html            # Разметка с подключаемыми скриптами и закрывающе тэги документа
│   ├── data/                         # Данные в формате JSON
│   ├── images/                       # Изображения
│   │   └── sprite-icons /            # SVG иконки для генерации векторного спрайта
│   ├── pages/                        # Страницы
│   │   └── index.html                # Разметка страницы
│   ├── resources/                    # Статические файлы для копирования в dist
│   ├── scripts/                      # Скрипты
│   │   ├── common/                   # Вспомогательные функции проекта
│   │   │   └── addLibs.js            # Файл содержащий методы для динамического добавления библиотек
│   │   ├── app.js                    # Главный скрипт
│   │   └── init.js                   # Подключение модулей проекта
│   └── styles/                       # Стили
│       ├── common/                   # Общие стили
│       │   └── common.scss           # Общие стили сайта
│       ├── helpers/                  # Помощники
│       │   ├── fonts.scss            # Подключение шрифтов
│       │   ├── mixins.scss           # Примеси
│       │   ├── nojs.scss             # Сообщение об отключенном js
│       │   ├── optimize.scss         # Сброс стилей и фиксы
│       │   ├── sprite_template.scss  # Переменные с размерами SVG иконок (автосборка)
│       │   └── variables.scss        # Переменные
│       └── app.scss                  # Главный стилевой файл
├── dist/                             # Сборка (автогенерация)
│   ├── assets/                       # Подключаемые ресурсы
│   │   ├── libs/                     # Файлы сторонних библиотек
│   │   │   ├── js/                   # JS файлы библиотек
│   │   │   └── css/                  # CSS файлы библиотек
│   │   ├── fonts/                    # Шрифты
│   │   ├── images/                   # Изображения
│   │   │   └── sprites/              # Спрайты (автогенерация)
│   │   ├── scripts/                  # Скрипты
│   │   └── styles/                   # Стили
│   └── index.html                    # Страница
├── tasks/                            # Подключаемые скрипты с задачами для gulpfile.babel.js
│   ├── config.js                     # Конфигурация
│   ├── copy.js                       # Копирование
│   ├── images.js                     # Сборка картинок
│   ├── libs.js                       # Сборка сторонних библиотек
│   ├── rename-predist.js             # Переименование dist папки при production-сборке
│   ├── scripts.js                    # Сборка скриптов
│   ├── sprite.js                     # Сборка векторного спрайта
│   ├── styles.js                     # Сборка стилей
│   ├── templates.js                  # Сборка страниц из шаблонов
│   ├── watch.js                      # Отслеживание изменений и запуск задач
│   └── zip.js                        # Архивация папки dist
├── .babelrc                          # Конфигурация babel
├── browserlist                       # Список версий браузеров для задач Gulp
├── .editorconfig                     # Конфигурация настроек редактора кода
├── .eslintignore                     # Список исключений для проверки JavaScript в ESLint
├── .eslintrc                         # Конфигурация проверки JavaScript в ESLint
├── .gitignore                        # Список исключённых файлов из Git
├── .lintstagedrc                     # Конфикугация lint-staged для husky
├── .sass-lint.yml                    # Конфигурация проверки SCSS в StyleLint
├── .stylelintrc                      # Конфигурация проверки SCSS в StyleLint
├── gulpfile.babel.js                 # Файл для запуска Gulp.js
├── make-block.js                     # Утилита создания новых блоков
├── libs-links.js                     # Пути к сторонним библиотекам
├── make-block.js                     # Скрипт создания структурных модулей проекта
├── package.json                      # Список модулей и прочей информации
└── README.md                         # Документация шаблона
```
