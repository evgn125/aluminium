ymaps.ready(init);
var myMap,
  myPlacemark;

function init() {
  myMap = new ymaps.Map("map", {
    center: [56.01369396, 92.85567879],
    zoom: 17,
    controls: ['zoomControl']
  });
  myPlacemark = new ymaps.Placemark(
      [56.01350217, 92.85556526], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/pointer.svg',
      iconImageSize: [168, 252],
      iconImageOffset: [-77, -223]
    }
  );
  myMap.geoObjects.add(myPlacemark);
}
