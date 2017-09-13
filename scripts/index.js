 var APP_ID = "97EYKfMN2Tvguso9HbXLbaaq-gzGzoHsz";
 var APP_KEY = "RGQmBKaGRNNjneKu6nV5hODE";


 AV.init({
     appId: APP_ID,
     appKey: APP_KEY
 })
 var now = new Date()
 var month = convertNum(now.getMonth() + 1);
 var day = convertNum(now.getDate());
 $('.updateTime').html(`更新日期:${month}月${day}日`)
 var query = new AV.Query('Song');
 let $ol = $('.newSongs>ol')
 query.find().then(function (results) {
     $('#loading').remove();
     for (var i = 0; i < results.length; i++) {
         let song = results[i].attributes;
         console.log(results[i])
         let li = `<li>
                        <a href='./song.html?id=${results[i].id}'>
                                <div class="songInfo">
                                    <div class="songName">
                                        <p>${song.name}</p>
                                    </div>
                                    <div class="singer">
                                        ${song.singer}-${song.album}
                                    </div>
                                </div>
                                <div class="play">
                                    <svg class="icon">
                                        <use xlink:href="#icon-play"></use>
                                    </svg>
                                </div>
                        </a>
                    </li>
                    `
         $ol.append(li)
         let liSQ = `
                        <svg class="icon">
                            <use xlink:href="#icon-SQ"></use>
                        </svg>
         `
         if (song.highquality) {
             $('.newSongs>ol>li').eq(i).find('.singer').prepend(liSQ)
         }
     }
 }, function (error) {
     throw new Error(error)
 })

 function getElementsInArray(arr, n) {
     var result = [];
     var count = arr.length;
     var index;
     while (result.length < n) {
         index = parseInt(Math.random() * 1000) % count
         if (arr[index]) {
             result.push(arr[index])
             arr[index] = undefined
         }
     }
     return result;
 }


 function quickSort(arr) {
     if (arr.length < 2) {
         return arr;
     }
     var temp = arr.pop();
     var smaller = arr.filter(function (ele) {
         return ele <= temp
     })
     var greater = arr.filter(function (ele) {
         return ele > temp;
     })
     return quickSort(smaller).concat([temp]).concat(quickSort(greater))

 }

 function convertNum(num) {
     numStr = num < 10 ? '0' + num : num + '';
     return numStr;
 }