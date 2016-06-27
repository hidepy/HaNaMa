// どうせシングルトンなんでprototypeは使わなくてokっしょ
// googlemapsはインクルードされている前提
var MapManager = function(map_id){

  var _id = map_id;
  var hana_map;
  var markers = [];

  // マップの初期化
  this.initialize_map = function(){

    console.log("in initialize_map");

    hana_map = new google.maps.Map(
      document.getElementById(_id),
      {
        center: (new google.maps.LatLng(35.792621, 139.806513)),
        zoom: 6
      }
    );
  };

  // ポイントを仕掛ける
  this.setPoint = function(lat, lng, is_clear_makers){

    // クリアフラグがたっていたら
    if(is_clear_makers){
      markers.forEach(function(mkr){
        mkr.setMap(null);
      });

      markers = [];
    }

    // マーカを作成
    var mkr = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng)
    });

    // mapにポイントをうつ
    mkr.setMap(hana_map);

    // ポイント情報を管理したいんで
    markers.push(mkr);
  }
};
