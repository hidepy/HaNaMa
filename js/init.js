/* global vars */
var mapManager;   //
var dataAdapter;  // サーバとのデータやり取り用クラス
var v_card; // Vueオブジェクト


function pushStart(){
  console.log("push start!!");

  // ここで初めてオブジェクトインスタンス化(ボタン押下される前は動く必要ないんで)
  mapManager = new MapManager("hana_map");
  dataAdapter = new DataAdapter();

  // メイン画面表示
  jQuery("#header > .container").hide( 300 , function(){
    $("#header").remove();
  });

  // コンテンツを表示状態に

  jQuery("#contents").show(300, function(){ });

  console.log("before initialize map");

  // mapの初期化

  mapManager.initialize_map();

  // vue実行
  v_card = new Vue({
    el: "#contents",
    data: {
      current: {}, // 現在表示領域
      list: [], // 下の方に表示されるカード
      single_marker: false
    },
    methods: {
      updateList: function(){
        // 更新条件を渡してアップデートしてもらう
        var params = {sample: true};

        // データ取得
        dataAdapter.getAllData(function(data){
          v_card.list = data; // 自身がvueなんでなんかきもいんだけれど、コールバックしている手前this.listができないので...
        }, params);
      },
      selectCard: function(index){ //card選択時の操作
        console.log("" + index + " item selected");

        // 詳細部分に表示をコピー
        this.current = this.list[index];

        // マップにポイント情報を表示
        mapManager.setPoint(this.current.lat, this.current.lng, this.single_marker);


      }
    }
  });

}




/*
vueの勘所

コンポーネント化 再利用性を高める
  独自ディレクティブの登録のこと...？
  new Vueする前に登録しないといけないようす


vueディレクティブ
  v-if

  v-on



vue.extendの使いどころは？


{{{}}} で、htmlとしてバインド可能


vueに描画するとき、それなりに値の加工ができる

{{ id == true ? "ok" : "no"}} てきな

{{data | filters}} で値のフィルタができるらしい


js側のvueへのオプション
data
  まんまデータ
methods
  操作
computed
  複雑な値などを計算する時に使う
  値が変更された時に勝手に走るようす
    watchより場合によっては良いらしい
  getだけじゃなくてsetもできる



watchがあるよ
var v = new Vue({data: d, result: ""});
v.$watch("d", function(val){
  this.result = d + " changeeeed";⇒どうやら、thisはdataを指すようすだ
});






*/
