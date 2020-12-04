/******************************************************
* #### jQuery-Youtube-Channels-Playlist v7.0 ####
* Coded by Ican Bachors 2014.
* https://github.com/bachors/jQuery-Youtube-Channels-Playlist
* Updates will be posted to this site.
******************************************************/

$.fn.ycp = function(j) {
    const n = {
        playlist: 10,
        autoplay: false,
        related: false,
        baner: true,
        col : 2
    };
    j.playlist = (j.playlist == undefined ? n.playlist : j.playlist);
    j.autoplay = (j.autoplay == undefined ? n.autoplay : j.autoplay);
    j.related = (j.related == undefined ? n.related : j.related);
    j.baner = (j.baner == undefined ? n.baner : j.baner);
    j.col = (j.col == undefined ? n.col : j.col);
    $(this).each(function(i, a) {
        const b = ($(this).attr('id') != null && $(this).attr('id') != undefined ? `#${$(this).attr('id')}` : `.${$(this).attr('class')}`);
        const title = ($(this).data('ycp_title') == undefined ? '' : $(this).data('ycp_title'));
        const channel = $(this).data('ycp_channel');
        

        const channelId = ($(this).data('chanelid') == undefined ? '' : $(this).data('chanelid'));


        const html_group = '';

        const html = `<div class="ycp yqa-content-feed">
        <div class="yqa-widget-feed-item-loader"><div class="yqa-widget-feed-spinner"><div></div><div></div><div></div></div></div>
        <div class="yqa-widget-feed-search">
        <form class="yqa-widget-feed-section-search-m"> 
          <input class="yqa-widget-feed-section-search-input" name="search" placeholder="Search..."> 
          <a class="yqa-widget-feed-section-search-button"><i class="fa fa-search" aria-hidden="true"></i></a>
        </form>
        </div>
        <div class="belah ycp_vid_play yqa-widget-feed-popup" title="Play video"></div><div class="yqa-widget-feed-belah belah" id="ycp_youtube_channels${i}"></div></div>`;
        $(this).html(html);
        
        if (channel.substring(0, 2) == 'PL' || channel.substring(0, 2) == 'UU') {
            const c = '';
            ycp_list(title, channel, c, i, b)
        } else {
            const d = (channel.substring(0, 2) == 'UC' ? 'id' : 'forUsername');
            ycp_play(title, channel, d, i, b)
        }   

        $(document).on(`input`, `${b} input[name="search"]`, function () {
          $(`${b} .yqa-widget-feed-handap`).children().remove();
        console.log(channel);
          if (channel.substring(0, 2) == 'PL' || channel.substring(0, 2) == 'UU') {
            const c = '';
            if($(this).val().length >= 1  ){
                yqa_search($(this).val() ,title, channelId, c, i, b);
                console.log(channelId);
            }else{
                ycp_list(title, channel, c, i, b);
            }
          } else {
            
            const d = (channel.substring(0, 2) == 'UC' ? 'id' : 'forUsername');
            
            if($(this).val().length >= 1  ){
                yqa_playchange($(this).val(),title, channel, d, i, b);
            }else{
                ycp_play(title, channel, d, i, b);
            }
          }  

        });

        getBaner(channelId, b);
    });

    function ycp_play(g, c, d, e, f) {
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&${d}=${c}&key=${j.apikey}`,
            crossDomain: true,
            dataType: 'json'
        }).done(a => {
            const b = a.items[0].contentDetails.relatedPlaylists.uploads;
            const pageToken = '';

            ycp_list(g, b, pageToken, e, f)
        })
    }

    function yqa_playchange(s,g, c, d, e, f) {
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/channels?part=snippet&${d}=${c}&key=${j.apikey}`,
            crossDomain: true,
            dataType: 'json'
        }).done(a => {
            const b = a.items[0].snippet.channelId;
            const pageToken = '';

            yqa_search( s,g, b, pageToken, e, f)
        })
    }

    function ycp_list(h, f, g, k, l) {
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/playlistItems?part=status,snippet&maxResults=${j.playlist}&playlistId=${f}&key=${j.apikey}&pageToken=${g}`,
            dataType: 'json',
            beforeSend: function() {
              $(`${l} .ycp.yqa-content-feed .yqa-widget-feed-item-loader`).addClass('active');
            }
        }).done(c => {
            //getBaner(c.items[0].snippet.channelId, l);
            $(`${l} .ycp.yqa-content-feed .yqa-widget-feed-item-loader`).removeClass('active');
            let d = '';
            $(`${l}`).attr('data-chanelId', c.items[0].snippet.channelId);
            //d += '<div class="yqa-widget-feed-luhur luhur">';
            //d += `<div class="title">${h}</div>`;
            d += '<span class="yqa-widget-feed-tombol yqa-widget-feed-tombol-prev tombol vid-prev" title="Previous videos"><i class="fa fa-chevron-left" aria-hidden="true"></i></span> ';
            d += '<span class="yqa-widget-feed-tombol yqa-widget-feed-tombol-next tombol vid-next" title="Next videos"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';

            d +='<div class="yqa-widget-feed-handap handap owl-carousel owl-theme ">';
            
            let arrAy = [];
            let n = m = j.col;
            let q =0;
            let count1 = '', count2 ='', count3 = '';
            $.each(c.items, (i, a) => {

                if (c.items[i].status.privacyStatus == "public") {

                    const b = c.items[i].snippet.resourceId.videoId;
                    ycp_part(b, i, k, l);
                    count2 = `<div class="yqa-widget-feed-play play " data-vvv="${b}" data-img="${c.items[i].snippet.thumbnails.medium.url}" title="${c.items[i].snippet.title}"><div class="yqa-widget-feed-thumb thumb" data-vvv="${b}"><span class="yqa-widget-feed-preview-thumbnail"><img src="${c.items[i].snippet.thumbnails.medium.url}" alt=" "></span><span class="yqa-widget-feed-preview-maker tm${i}"></span><span class="yqa-widget-feed-preview-play"></span></div>`;
                    count3 = `<div class="yqa-widget-feed-info"> <div class="yqa-widget-feed-title title"><a href="https://www.youtube.com/watch?v=${b}">${c.items[i].snippet.title}</a></div><div class="yqa-widget-feed-preview-time">${getTime(c.items[i].snippet.publishedAt)}</div><a class="yqa-widet-feed-click" href="javascript:void(0)"><i class="fa fa-sort-desc" aria-hidden="true"></i></a><div class="yqa-widget-feed-preview-caption">${getCaptionUrl(c.items[i].snippet.description)}</div>
                    <span class="yqa-widget-feed-mute  mute by${i}" style="display:none" ></span>
                    <span class="yqa-widget-feed-mute mute views${i}" style="display:none"></span> 
                    <span class="yqa-widget-feed-mute mute" style="display:none">-</span> 
                    <span class="yqa-widget-feed-mute mute date${i}" style="display:none"></span>
                    <div class="yqa-widget-feed-preview-properties">
                    <div class="yqa-widget-feed-preview-properties-inner">
                    <span class="yqa-widget-feed-preview-properties-item view"><i class="fa fa-eye" aria-hidden="true"></i><span class="views${i}"></span></span>
                    <span class="yqa-widget-feed-preview-properties-item like"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i><span class="likes${i}"></span></span>
                     <span class="yqa-widget-feed-preview-properties-item dislike"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i><span class="dislike${i}"></span></span>
                    <span class="yqa-widget-feed-preview-properties-item comment"><i class="fa fa-comments-o" aria-hidden="true"></i><span class="comments${i}"></span ></span></div></div></div></div>`
                    arrAy.push(count2 + count3);
                }
            });

            let newArray = [];
            $.each(arrAy, (i , a) => {
                newArray.push('<div class="yqa-widget-feed-item">' + arrAy.slice(q, m).join('') + '</div>');    

                q += n;
                m = q + n;
            }); 
            d += newArray.join(" ");

            d += '</div>';


            $(`${l} .ycp div#ycp_youtube_channels${k}`).html(d);
            if (c.prevPageToken == null || c.prevPageToken == undefined) {
                const e = $(`${l} .ycp div#ycp_youtube_channels${k} div.play`).attr("data-vvv");
                const imag = $(`${l} .ycp div#ycp_youtube_channels${k} div.play`).attr("data-img");
                if (j.autoplay == false) {
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html('<a href="#"></a>');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background', `url(${imag}) no-repeat`);
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-webkit-background-size', 'cover');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-moz-background-size', 'cover');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-o-background-size', 'cover');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background-size', 'cover')
                } else {
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html(`<iframe src="//www.youtube.com/embed/${e}?rel=${j.related ? 1 : 0}&amp;autoplay=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`)
                }
                $(`${l} .ycp div#ycp_youtube_channels${k} div`).removeClass('vid-active');
                $(`${l} .ycp div#ycp_youtube_channels${k} div.play:eq(0)`).addClass('vid-active')
            } else {
                $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-prev`).click(() => {
                    $(`${l} .ycp div#ycp_youtube_channels${k} div.play.yqa-widget-feed-play`).addClass(' slideInLeft');
                    g = c.prevPageToken;
                    if(g == undefined){
                      $(`${l} .ycp.yqa-content-feed .yqa-widget-feed-item-loader`).removeClass('active');
                      return;
                    }
                    ycp_list(h, f, g, k, l);
                    return false
                })
            }
            $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-next`).click(() => {

               // $(`${l} .ycp div#ycp_youtube_channels${k} div.play.yqa-widget-feed-play`).fadeIn();
               //  $(`${l} .ycp div#ycp_youtube_channels${k} div.play.yqa-widget-feed-play`).each(function(){
               //      $(this).fadeIn();
               //  });
                g = c.nextPageToken;
                if(g == undefined){
                  $(`${l} .ycp.yqa-content-feed .yqa-widget-feed-item-loader`).removeClass('active');
                  return;
                }
                ycp_list(h, f, g, k, l);
                return false
            });
            $(`${l} .ycp div#ycp_youtube_channels${k} div.play .yqa-widget-feed-thumb`).each(function() {
                $(this).click(function() {
                    const a = $(this).attr("data-vvv");
                    const m = $(this).attr("data-img");
                    const title = $(this).next().find('.yqa-widget-feed-title a').text();
                    const time = $(this).next().find('.yqa-widget-feed-preview-time').text();
                    const caption = $(this).next().find('.yqa-widget-feed-preview-caption').html();
                    
                    const logo = $('.yqa-header-feed-logo').html();
                    const text_logo =  $('.yqa-header-feed-channel-title').html();
                    const view = $('.yqa-widget-feed-preview-properties span.view').attr('title');
                    const like = $('.yqa-widget-feed-preview-properties span.like').html();
                    const dislike = $('.yqa-widget-feed-preview-properties span.dislike').html();
                    const share_url = $('.yqa-widget-feed-title a').attr('href');

                    var dataItem = {
                    
                      time: time,
                      logo: logo,
                      text_logo: text_logo,
                      view: view,
                      like: like,
                      dislike: dislike,
                      share_url: share_url,
                      captions: caption
                    }
                    console.log(dataItem);

                    $(`${l} .ycp div#ycp_youtube_channels${k} div`).removeClass('vid-active');
                    $(this).addClass('vid-active');
                    if (j.autoplay == false) {
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html('<a href="#"></a>');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background', `url(${m}) no-repeat`);
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-webkit-background-size', 'cover');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-moz-background-size', 'cover');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-o-background-size', 'cover');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background-size', 'cover')
                    } else {
                        yqaPopUp(dataItem, a, j.related, title, k, l);
                        //$(`${l} .ycp div.ycp_vid_play:eq(${k})`).addClass('yqa-widget-feed-popup-show').html(`<iframe src="//www.youtube.com/embed/${a}?rel=${j.related ? 1 : 0}&amp;autoplay=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`)
                    }
                    return false
                })
            });
            $(`${l} .ycp div.ycp_vid_play:eq(${k})`).click(function() {
                const a = $(`${l} .ycp div#ycp_youtube_channels${k} div.play.vid-active`).attr("data-vvv");
                //$(this).html(`<iframe src="//www.youtube.com/embed/${a}?rel=${j.related ? 1 : 0}&amp;autoplay=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`);
                return false
            })

            $(`${l} .ycp div.ycp_vid_play:eq(${k})`).on('click', '.yqa-widget-feed-popup-close', function(){
                
                $(this).parent().parent().parent().removeClass('yqa-widget-feed-popup-show').addClass('yqa-widget-feed-popup-hide');
                $(this).parent().parent().remove();
            });
            
            var owl = $(`${l} .owl-carousel`).owlCarousel({
              loop:false,
              margin:10,
              nav:true,
              mouseDrag: true,
              slideBy: 1, 
                rtl:false,

                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
           
                smartSpeed: 600,
                navSpeed: 500,
                dotsSpeed: 500,

              responsive:{
                  0:{
                      items:1
                  },
                  600:{
                      items:3
                  },
                  1000:{
                      items: j.playlist
                  }
                }
            })

            owl.on("dragged.owl.carousel", function (event) {
                if (event.relatedTarget['_drag']['direction'] === "left") {
                    $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-next`).trigger('click');
                    //console.log('left');
                } else {
                    $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-prev`).trigger("click");
                    //console.log('right');
                }
            });

            $(`${l} .owl-item .yqa-widget-feed-item:empty`).parent().remove();
            var width_boder = $(`${l}`).width();
            if(width_boder > 320){
                $(`${l} .owl-stage`).css('width',width_boder);
                var count_item = $(`${l} .owl-stage .owl-item`).length;
                
                var tong = width_boder / count_item;
                $(`${l} .owl-item`).css({"width":tong, "margin-right": 0});
            }

             $(`${l} .ycp div#ycp_youtube_channels${k} .yqa-widet-feed-click`).click( function(){
                $(this).find('i').toggleClass('fa-sort-asc fa-sort-desc');
                $(this).next().toggleClass('active');
             });

        })
    }

    function yqa_search(s, h, f, g, k, l) {
        if(g == undefined){
            var g = '';
        }
        if(f == undefined){
            const channelId = ($(`${l}`).data('chanelid') == undefined ? '' : $(`${l}`).data('chanelid'));
            var f = channelId;
        }

        $.ajax({
            url :`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${j.playlist}&channelId=${f}&key=${j.apikey}&pageToken=${g}&q=${s}`,
            //url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${j.playlist}&channelId=${f}&key=${j.apikey}&pageToken=${g}&q=s`,
            dataType: 'json',
            beforeSend: function() {
              $(`${l} .ycp.yqa-content-feed .yqa-widget-feed-item-loader`).addClass('active');
            }
        }).done(c => {
            $(`${l} .ycp.yqa-content-feed .yqa-widget-feed-item-loader`).removeClass('active');
            //getBaner(c.items[0].snippet.channelId, l);
            let d = '';
           // $(`${l}`).attr('data-chanelId', c.items[0].snippet.channelId);
            //d += '<div class="yqa-widget-feed-luhur luhur">';
            //d += `<div class="title">${h}</div>`;
            d += '<span class="yqa-widget-feed-tombol yqa-widget-feed-tombol-prev tombol vid-prev" title="Previous videos"><i class="fa fa-chevron-left" aria-hidden="true"></i></span> ';
            d += '<span class="yqa-widget-feed-tombol yqa-widget-feed-tombol-next tombol vid-next" title="Next videos"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';

            d +='<div class="yqa-widget-feed-handap handap owl-carousel owl-theme">';
            
            let arrAy = [];
            let n = m = j.col;
            let q =0;
            let count1 = '', count2 ='', count3 = '';
            $.each(c.items, (i, a) => {

                //if (c.items[i].status.privacyStatus == "public") {
                   // console.log(c)
                    const b = c.items[i].id.videoId;
                    ycp_part(b, i, k, l);
                    count2 = `<div class="yqa-widget-feed-play play " data-vvv="${b}" data-img="${c.items[i].snippet.thumbnails.medium.url}" title="${c.items[i].snippet.title}"><div class="yqa-widget-feed-thumb thumb" data-vvv="${b}"><span class="yqa-widget-feed-preview-thumbnail"><img src="${c.items[i].snippet.thumbnails.medium.url}" alt=" "></span><span class="yqa-widget-feed-preview-maker tm${i}"></span><span class="yqa-widget-feed-preview-play"></span></div>`;
                    count3 = `<div class="yqa-widget-feed-info"> <div class="yqa-widget-feed-title title"><a href="https://www.youtube.com/watch?v=${b}">${c.items[i].snippet.title}</a></div><div class="yqa-widget-feed-preview-time">${getTime(c.items[i].snippet.publishedAt)}</div><a class="yqa-widet-feed-click" href="javascript:void(0)"><i class="fa fa-sort-desc" aria-hidden="true"></i></a><div class="yqa-widget-feed-preview-caption">${getCaptionUrl(c.items[i].snippet.description)}</div>
                    <span class="yqa-widget-feed-mute  mute by${i}" style="display:none" ></span>
                    <span class="yqa-widget-feed-mute mute views${i}" style="display:none"></span> 
                    <span class="yqa-widget-feed-mute mute" style="display:none">-</span> 
                    <span class="yqa-widget-feed-mute mute date${i}" style="display:none"></span>
                    <div class="yqa-widget-feed-preview-properties">
                    <div class="yqa-widget-feed-preview-properties-inner">
                    <span class="yqa-widget-feed-preview-properties-item view"><i class="fa fa-eye" aria-hidden="true"></i><span class="views${i}"></span></span>
                    <span class="yqa-widget-feed-preview-properties-item like"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i><span class="likes${i}"></span></span>
                     <span class="yqa-widget-feed-preview-properties-item dislike"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i><span class="dislike${i}"></span></span>
                    <span class="yqa-widget-feed-preview-properties-item comment"><i class="fa fa-comments-o" aria-hidden="true"></i><span class="comments${i}"></span ></span></div></div></div></div>`
                    arrAy.push(count2 + count3);
                //}
            });

            let newArray = [];
            $.each(arrAy, (i , a) => {
                newArray.push('<div class="yqa-widget-feed-item">' + arrAy.slice(q, m).join('') + '</div>');    

                q += n;
                m = q + n;
            }); 
            d += newArray.join(" ");
            d += '</div>';
            $(`${l} .ycp div#ycp_youtube_channels${k}`).html(d);
            if (c.prevPageToken == null || c.prevPageToken == undefined) {
                const e = $(`${l} .ycp div#ycp_youtube_channels${k} div.play`).attr("data-vvv");
                const imag = $(`${l} .ycp div#ycp_youtube_channels${k} div.play`).attr("data-img");
                if (j.autoplay == false) {
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html('<a href="#"></a>');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background', `url(${imag}) no-repeat`);
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-webkit-background-size', 'cover');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-moz-background-size', 'cover');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-o-background-size', 'cover');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background-size', 'cover')
                } else {
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html(`<iframe src="//www.youtube.com/embed/${e}?rel=${j.related ? 1 : 0}&amp;autoplay=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`)
                }
                $(`${l} .ycp div#ycp_youtube_channels${k} div`).removeClass('vid-active');
                $(`${l} .ycp div#ycp_youtube_channels${k} div.play:eq(0)`).addClass('vid-active')
            } else {
                $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-prev`).click(() => {
                    g = c.prevPageToken;
                    yqa_search(s, h, f, g, k, l);
                    return false
                })
            }
            $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-next`).click(() => {
                g = c.nextPageToken;
                yqa_search(s, h, f, g, k, l);
                return false
            });
            $(`${l} .ycp div#ycp_youtube_channels${k} div.play .yqa-widget-feed-thumb`).each(function() {
                $(this).click( function() {
                    const a = $(this).attr("data-vvv");
                    const m = $(this).attr("data-img");
                    const title = $(this).next().find('.yqa-widget-feed-title a').text();
                    const time = $(this).next().find('.yqa-widget-feed-preview-time').text();
                    const caption = $(this).next().find('.yqa-widget-feed-preview-caption').html();
                    const logo = $('.yqa-header-feed-logo').html();
                    const text_logo =  $('.yqa-header-feed-channel-title').html();
                    const view = $('.yqa-widget-feed-preview-properties span.view').attr('title');
                    const like = $('.yqa-widget-feed-preview-properties span.like').html();
                    const dislike = $('.yqa-widget-feed-preview-properties span.dislike').html();
                    const share_url = $('yqa-widget-feed-title a').attr('href');

                    var dataItem = {
                    
                      time: time,
                      logo: logo,
                      text_logo: text_logo,
                      view: view,
                      like: like,
                      dislike: dislike,
                      share_url: share_url,
                      captions: caption
                    }
                    
                    $(`${l} .ycp div#ycp_youtube_channels${k} div`).removeClass('vid-active');
                    $(this).addClass('vid-active');
                    if (j.autoplay == false) {
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html('<a href="#"></a>');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background', `url(${m}) no-repeat`);
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-webkit-background-size', 'cover');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-moz-background-size', 'cover');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('-o-background-size', 'cover');
                        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).css('background-size', 'cover')
                    } else {
                        yqaPopUp(dataItem, a, j.related, title, k, l);
                        //$(`${l} .ycp div.ycp_vid_play:eq(${k})`).addClass('yqa-widget-feed-popup-show').html(`<iframe src="//www.youtube.com/embed/${a}?rel=${j.related ? 1 : 0}&amp;autoplay=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`)
                    }
                    return false
                })
            });
            $(`${l} .ycp div.ycp_vid_play:eq(${k})`).click(function() {
                const a = $(`${l} .ycp div#ycp_youtube_channels${k} div.play.vid-active`).attr("data-vvv");
                //$(this).html(`<iframe src="//www.youtube.com/embed/${a}?rel=${j.related ? 1 : 0}&amp;autoplay=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`);
                return false
            })

            $(`${l} .ycp div.ycp_vid_play:eq(${k})`).on('click', '.yqa-widget-feed-popup-close', function(){
                
                $(this).parent().parent().parent().removeClass('yqa-widget-feed-popup-show').addClass('yqa-widget-feed-popup-hide');
                $(this).parent().parent().remove();
            });
            
            var owl = $(`${l} .owl-carousel`).owlCarousel({
              loop:false,
              margin:10,
              nav:true,
              mouseDrag: true,
              slideBy: 1, 
                rtl:false,

                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
           
                smartSpeed: 600,
                navSpeed: 500,
                dotsSpeed: 500,

              responsive:{
                  0:{
                      items:1
                  },
                  600:{
                      items:3
                  },
                  1000:{
                      items: j.playlist
                  }
                }
            })

            owl.on("dragged.owl.carousel", function (event) {
                if (event.relatedTarget.state.direction === "left") {
                    $(".owl-carousel").trigger("span.vid-next");
                } else {
                    $(".owl-carousel").trigger("span.vid-prev");
                }
            });

            $(`${l} .owl-item .yqa-widget-feed-item:empty`).parent().remove();
            var width_boder = $(`${l}`).width();
            if(width_boder > 320){
                $(`${l} .owl-stage`).css('width',width_boder);
                var item = $(`${l} .yqa-widget-feed-play`).length;
                var count_item = $(`${l} .owl-stage .owl-item`).length;
               //console.log(count_item);
                var tong = width_boder / count_item;
                if(item > 3){
                   $(`${l} .owl-item`).css({"width":tong, "margin-right": 0});
                }else{
                    $(`${l} .owl-item`).css({"width": "320px" , "margin-right": 0});
                }
            }


        })
    }

    function ycp_part(c, i, d, e) {
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/videos?id=${c}&key=${j.apikey}&part=contentDetails,snippet,statistics`,
            dataType: 'json'
        }).done(a => {
            if(a.items != ''){
                const b = a.items[0].contentDetails.duration;
                let dataw = '';
                let menit = '';
                let detik = '';
                if (b.match(/M/g)) {
                    dataw = b.split('M');
                    menit = dataw[0].replace('PT', '');
                    if (dataw[1] != '') {
                        detik = dataw[1].replace('S', '')
                    } else {
                        detik = '00'
                    }
                } else {
                    dataw = b.split('PT');
                    menit = '00';
                    detik = dataw[1].replace('S', '')
                }
                detik = (detik.length > 1 ? detik : `0${detik}`);
                $(`${e} .ycp div#ycp_youtube_channels${d} span.tm${i}`).html(`${menit}:${detik}`);
                

                $(`${e} .ycp div#ycp_youtube_channels${d} span.by${i}`).html(`by ${a.items[0].snippet.channelTitle}`);
                $(`${e} .ycp div#ycp_youtube_channels${d} span.views${i}`).html(`${addCommas(a.items[0].statistics.viewCount)} views`);
                $(`${e} .ycp div#ycp_youtube_channels${d} span.date${i}`).html(_timeSince(new Date(a.items[0].snippet.publishedAt).getTime()))
                
                $(`${e} .ycp div#ycp_youtube_channels${d} .yqa-widget-feed-preview-properties span span.views${i}`).html(`${convertNumber(a.items[0].statistics.viewCount)}`).parent().attr('title', 'Views:' + a.items[0].statistics.viewCount);
                $(`${e} .ycp div#ycp_youtube_channels${d} .yqa-widget-feed-preview-properties span span.likes${i}`).html(`${convertNumber(a.items[0].statistics.likeCount)}`).parent().attr('title', 'Likes:' + a.items[0].statistics.likeCount);
                $(`${e} .ycp div#ycp_youtube_channels${d} .yqa-widget-feed-preview-properties span span.dislike${i}`).html(`${convertNumber(a.items[0].statistics.dislikeCount)}`).parent().attr('title', 'Disklike:' + a.items[0].statistics.dislikeCount);
                $(`${e} .ycp div#ycp_youtube_channels${d} .yqa-widget-feed-preview-properties span span.comments${i}`).html(`${convertNumber(a.items[0].statistics.commentCount)}`).parent().attr('title', 'Comments:' + a.items[0].statistics.commentCount);

            }
        })
    }

    function _timeSince(a) {
        const s = Math.floor((new Date() - a) / 1000);
        let i = Math.floor(s / 31536000);
        if (i > 1) {
            return `${i} years ago`
        }
        i = Math.floor(s / 2592000);
        if (i > 1) {
            return `${i} months ago`
        }
        i = Math.floor(s / 86400);
        if (i > 1) {
            return `${i} days ago`
        }
        i = Math.floor(s / 3600);
        if (i > 1) {
            return `${i} hours ago`
        }
        i = Math.floor(s / 60);
        if (i > 1) {
            return `${i} minutes ago`
        }
        return `${Math.floor(s)} seconds ago`
    }

    function addCommas(a) {
        a += '';
        x = a.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? `.${x[1]}` : '';
        const b = /(\d+)(\d{3})/;
        while (b.test(x1)) {
            x1 = x1.replace(b, '$1' + ',' + '$2')
        }
        return x1 + x2
    }   

    function getBaner( channelId, l ){
      if(channelId == undefined){
        var channelId = $(`${l}`).data('chanelid');
        
      }
        debugger;
        //console.log(channelId);
        url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,contentDetails,statistics&id=${channelId}&key=${j.apikey}`;
        $.ajax({
            url: url,
            dataType: 'json'
        }).done(c=>{
            debugger;
            console.log(c.items[0].brandingSettings.image, 'c.items[0].brandingSettings.image.bannerTabletExtraHdImageUr');
            html = `<div class="yqa-header-feed yqa-header-feed-classic luhur">
            <div class="yqa-header-feed-banner" style="background-image: url('${c.items[0].brandingSettings.image.bannerTabletExtraHdImageUrl}');"></div>
            <div class="yqa-header-feed-channel">
                <div class="yqa-header-feed-logo">
                    <a href="https://www.youtube.com/channel/${c.items[0].id}" class="yqa-header-feed-logo-chil"><img src="${c.items[0].snippet.thumbnails.default.url}" /></a>
                </div>
                <div class="yqa-header-feed-inner">
                    <div class="yqa-header-feed-channel-title"> 
                        <a href="https://www.youtube.com/channel/${c.items[0].id}" title="Around The World 4K" target="_blank">Around The World 4K</a>
                    </div>
                    <div class="yqa-header-feed-channel-caption">
                    AROUND THE WORLD 4K is an international unique project which covers all the continents. The main objective of the project is to realize video materials from over 70 countries and broadcast them by Youtube for the pleasure and entertainment of our dear viewers on a period of 2 years. We focus on the most famous tourist spots on all the continents and thereby we want to achieve our purpose offering a qualitative and original product about the real life, but in an online world.
                    </div>
                </div>
            </div>
            <div class="yqa-header-feed-properties">
              <span class="yqa-header-feed-properties-item" title="Videos: ${convertNumber(c.items[0].statistics.videoCount)}"><i class="fa fa-video-camera" aria-hidden="true"></i><span>${convertNumber(c.items[0].statistics.videoCount)}</span></span>
              <span class="yqa-header-feed-properties-item" title="Subscribers: ${convertNumber(c.items[0].statistics.subscriberCount)}"><i class="fa fa-user-plus" aria-hidden="true"></i> <span>${convertNumber(c.items[0].statistics.subscriberCount)}</span></span>
              <span class="yqa-header-feed-properties-item" title="Views: ${convertNumber(c.items[0].statistics.viewCount)}"><i class="fa fa-eye" aria-hidden="true"></i><span>${convertNumber(c.items[0].statistics.viewCount)}</span></span>
            </div>
            <div class="yqa-header-feed-subscribe"><div class="g-ytsubscribe" data-channelid="${channelId}" data-layout="default" data-count="default"></div></div>
            `;
            html += '</div>';

            $(`${l}`).prepend(html);
            getScript();
        });
    }

    function getTime( date ){
        if(date == undefined){
            return ;
        }
        date =  new Date(date);
        
        return date.toLocaleDateString();
    }

    function getCaptionUrl( url ){
        if(url == undefined){
            return ;
        }
        var array = url.split(" ");

        for (var i = 0; i < array.length; i++) {
            var m = array[i].match(/\bhttps?:\/\/\S+/gi);
            if(m){
              array[i] = '<a href="'+m+'">' +m+ '</a>'+'<br>';
            }
        }

        return array.join(" ").replace(/(?:\r\n|\r|\n)/g, '<br>');
    }    

    function convertNumber( number ){
        var thousand = 1000;
        var million = 1000000;
        var billion = 1000000000;
        var trillion = 1000000000000;
        number = Number(number);
        if( number < thousand){
            return number;
        }

        if(number >= thousand && number <= million){
            return Math.round(number/thousand) + 'k';
        }
        if (number >= million && number <= billion) {
            return Math.round(number/million) + 'M';   
        }
        
        if (number >= billion && number <= trillion) {
            return Math.round(number/billion) + 'B';   
        }
        
        else {
            return Math.round(number/trillion) + 'T';   
        }
    }

    function yqaPopUp( data, a, b, c, k, l ){

        html = `<div class="yqa-widget-feed-popup-overlay"></div>`;
        
        html += `<div class="yqa-widget-feed-popup-wraper">`;
        html += `<div class="yqa-widget-feed-popup-inner">`;
        
        html += `<div class="yqa-widget-feed-popup-loader"><div class="yqa-widget-feed-spinner"><div></div><div></div><div></div></div></div>`;
        html += `<div class="yqa-widget-feed-popup-close"><i class="fa fa-times" aria-hidden="true"></i></div>`;
        html += 
        `<div class="yqa-widget-feed-popup-video">
            <div class="yqa-widget-feed-popup-video-player"><iframe src="https://www.youtube.com/embed/${a}?rel=${b ? 1 : 0}&amp;autoplay=true&showinfo=false&rel=0&enablejsapi=1" allowfullscreen="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="${c}" frameborder="0" class="bingkay" width="640" height="360"></iframe></div>
            <div class="yqa-widget-feed-popup-video-content">
              <div class="yqa-widget-feed-popup-info">
                <div class="yqa-widget-feed-popup-info-header"> 
                  <div class="yqa-widget-feed-popup-title">${c}</div>   
                  <div class="yqa-widget-feed-popup-properties">
                    <div class="yqa-widget-feed-popup-properties-views">${data.view}</div>  
                    <div class="yqa-widget-feed-popup-properties-rating">
                      <div class="yqa-widget-feed-popup-properties-rating-ratio"><span style="width: 98%"></span></div>  
                      <div class="yqa-widget-feed-popup-properties-rating-counters"> 
                        <div class="yqa-widget-feed-popup-properties-rating-counters-like">${data.like}</div>  
                        <div class="yqa-widget-feed-popup-properties-rating-counters-dislike">${data.dislike}</div> 
                      </div> 
                    </div> 
                  </div> 
                </div>
                <div class="yqa-widget-feed-popup-info-meta">  
                  <div class="yqa-widget-feed-popup-channel"> 
                    <div class="yqa-widget-feed-popup-channel-logo"> 
                      ${data.logo}
                    </div> 
                    <div class="yqa-widget-feed-popup-channel-info">  
                      ${data.text_logo}  
                      <div class="yqa-widget-feed-popup-channel-subscribe">
                        <div class="g-ytsubscribe" data-channelid="UC4F-DMVCe-UbIsweL6kIEfg" data-layout="default" data-count="default"></div>
                      </div> 
                    </div>
                  </div>   
                  <div class="yqa-widget-feed-popup-share"> 
                    <a class="yqa-widget-feed-popup-share-item-facebook yqa-widget-feed-popup-share-item" href="https://www.facebook.com/sharer/sharer.php?u=${data.share_url}">
                    <i class="fa fa-facebook-official" aria-hidden="true"></i>
                    <span>Share on Facebook</span></a>
                    <a class="yqa-widget-feed-popup-share-item-twitter yqa-widget-feed-popup-share-item" href="https://twitter.com/home?status=${data.share_url}">
                    <i class="fa fa-twitter-square" aria-hidden="true"></i><span>Share on Twitter</span></a>
                  </div> 
                </div>
                <div class="yqa-widget-feed-popup-info-main">
                  <div class="yqa-widget-feed-popup-info-date">Published at ${data.time}</div>
                  <div class="yqa-widget-feed-popup-info-description">${data.captions}</div>

                </div>
              </div>
            </div>        
        </div>`;

        html += `</div>`;
        html += `</div>`;
        $(`${l} .ycp div.ycp_vid_play:eq(${k})`).addClass('yqa-widget-feed-popup-show').html(html);
        getScript();
    }

    function getScript(){
        var script = document.createElement("SCRIPT");
        script.src = 'js/platform.js';
        script.type = 'text/javascript';
        script.onload = function() {
            var $ = window.jQuery;
            gapi.load('client:auth2', {
              callback: function() {
                // Handle gapi.client initialization.
                //initGapiClient();
                debugger;
              },
              onerror: function() {
                // Handle loading error.
                alert('gapi.client failed to load!');
              },
              timeout: 5000, // 5 seconds.
              ontimeout: function() {
                // Handle timeout.
                alert('gapi.client could not load in a timely manner!');
              }
            })
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    }


}
