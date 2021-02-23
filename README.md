<details>
<summary>Task description</summary>
В коде можно создать любое количество объектов, представляющих информацию о
прямоугольниках разных размеров.
Каждый прямоугольник должен отображаться на HTML канвасе. Канвас имеет размеры экрана с
отступами от края экрана. При первом запуске приложение отображает созданные
прямоугольники списком, один под другим, на небольшом расстоянии друг от друга.
Пользователь может передвигать прямоугольники по канвасу с помощью механизма drag & drop.
Если перемещаемый прямоугольник пересекается с другими, то все пересекающиеся фигуры
должны поменять цвет заливки на красный. Завершить перемещение (сделать drop) можно лишь
при отсутствии пересечений. В противном случае, прямоугольник после drop возвращается на
исходную позицию.
В процессе перемещений прямоугольники могут «сцепляться».
Как только одна из сторон перемещаемого прямоугольника приближается к одной из сторон
другого прямоугольника на расстояние <= X, прямоугольники сцепляются - т.е. становятся
вплотную к друг другу с совмещением одного из краёв их сторон.
Чтобы расцепить прямоугольники, надо отвести их на расстояние > X друг от друга.
Сцепление должно срабатывать таким образом, чтобы в результате не возникло пересечений
прямоугольников.
Приложение должно быть реализовано без применения сторонних библиотек.
</details>

<img src="https://i.gifer.com/3O7XM.gif" alt="Demo">

[DEMO ONLINE](https://kind-panini-5f4a4e.netlify.app/)

Start your local server use:
```
yarn dev
```

Build your application use:
```
yarn build-dev
```

Format prettier use:
```
yarn format
```

Start unit-tests use:
```
yarn unit-tests
```

Run functional tests via docker-compose, you need:
#### Build the image:
```
docker-compose -f docker-compose.test.yml build
```
#### and then:
```
docker-compose -f docker-compose.test.yml run cypress
```

build web image via docker-compose:
```
docker-compose build
```

start web image via docker-compose:
```
docker-compose up -d
```