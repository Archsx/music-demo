 var APP_ID = "97EYKfMN2Tvguso9HbXLbaaq-gzGzoHsz";
 var APP_KEY = "RGQmBKaGRNNjneKu6nV5hODE";


 AV.init({
     appId: APP_ID,
     appKey: APP_KEY
 })
 var query = new AV.Query('Song');
 let $ol = $('.newSongs>ol')
 query.find().then(function (results) {
     $('#loading').remove();
     for (var i = 0; i < results.length; i++) {
         let song = results[i].attributes;
         let li = `<li>
                                <div class="songInfo">
                                    <div class="songName">
                                        <p>${song.name}</p>
                                    </div>
                                    <div class="singer">
                                        <svg class="icon">
                                         <use xlink:href="#icon-SQ"></use>
                                        </svg>
                                        ${song.singer}
                                    </div>
                                </div>
                                <div class="play">
                                    <svg class="icon">
                                        <use xlink:href="#icon-play"></use>
                                    </svg>
                                </div>
                            </li>
                    `
         $ol.append(li)
     }
 }, function (error) {
     throw new Error(error)
 })