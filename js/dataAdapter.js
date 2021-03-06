// jQuery ロードが前提

var DataAdapter = function(){

  // 外部公開用. 全件取得する
  this.getAllData = function(viewCallback, search_condition){

    _getJSONP(
      //"http://www51.atpages.jp/hidork0222/store_my_history_map_data/store_my_history_map_data.php",
      "http://www51.atpages.jp/hidork0222/hanama_data/get_hanama_data.php",
       _onDataHandler,
       viewCallback,
       "myCallback"
     );
  }



  // ajaxでjsonpした結果を適切なオブジェクト(の配列)に変換し、view側の最もフロントのコールバックに処理結果を渡す
  function _onDataHandler(response, viewCallback) {
    var datas = [];

    if(response && response.length && (response.length > 0)){
      for(var i = 0; i < response.length; i++){

        var item = response[i];

        datas.push({
          place_id: item.place_id,
          place_name: item.place_name,
          pref_cd: item.pref_cd,
          lat: item.lat,
          lng: item.lng,
          caption: item.caption,
          crowdness: item.crowdness,
          accessbility: item.accessbility,
          recommend: item.recommend,
          picture_url_1: item.picture_url_1,
          picture_url_2: item.picture_url_2,
          picture_url_3: item.picture_url_3
        });
      }
    }

    // 最もフロント側のコールバックに処理結果をパス！
    viewCallback(datas);
  }

  // ajaxしてデータ処理用コールバック⇒フロント側のコールバック を呼ぶ. 内部用なんで
  function _getJSONP(url, dataProcessCallback, viewCallback, param) {

      return jQuery.ajax({
          url: url + "?" + "callback=" + param,
          /* 正しくは、
          jsonp: callback
          として、urlの後ろにcallbackを付与しないほうが良いのでは？...
          */
          dataType: "jsonp",
          success: function(res){
            console.log(viewCallback);
            dataProcessCallback(res, viewCallback);
          }
      });
  }
}
