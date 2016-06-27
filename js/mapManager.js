// どうせシングルトンなんでprototypeは使わなくてokっしょ
// googlemapsはインクルードされている前提
var MapManager = function(map_id){

  var hana_map;

  // マップの初期化
  this.initialize_map = function(){
    hana_map = new google.maps.Map(
      document.getElementById(map_id),
      {
        center: (new google.maps.LatLng(35.792621, 139.806513)),
        zoom: 6
      }
    );
  };

  // ポイントを打つ
  this.setPoint = function(lat, lng){
    
  };

};
