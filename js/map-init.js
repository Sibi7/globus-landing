/**
 * Created by apuc0 on 17.10.2017.
 */
var map = new ACMap();
var districtAddress;

$(document).on('click', '.build__btn', function () {
    districtAddress = $(this).attr('data-address');
    $('.map__wrap').slideDown(0);
    $('.map__btn').addClass('active');
    // return districtAddress;

    map.customGeoCoder(districtAddress, [], function (coor) {
        map.init({
            mapId: 'yaMap',
            height: '365px',
            zoom: 11,
            center: coor,
            controls: ['default', 'routeButtonControl'],
            placeMarks: [
                {
                    address: districtAddress,
                    properties: {
                        hintContent: districtAddress,
                        balloonContent: districtAddress + ' - шикарные апартаменты!'
                    },
                    options: {
                        draggable: true
                    }
                }
            ]
        });
        console.log(coor);
    });
});

