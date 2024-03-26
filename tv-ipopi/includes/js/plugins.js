/**
 * bxSlider v4.2.5
 * Copyright 2013-2015 Steven Wanderski
 * Written while drinking Belgian ales and listening to jazz

 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

;(function($){var X={mode:'horizontal',slideSelector:'',infiniteLoop:true,hideControlOnEnd:false,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:false,captions:false,ticker:false,tickerHover:false,adaptiveHeight:false,adaptiveHeightSpeed:500,video:false,useCSS:true,preloadImages:'visible',responsive:true,slideZIndex:50,wrapperClass:'bx-wrapper',touchEnabled:true,swipeThreshold:50,oneToOneTouch:true,preventDefaultSwipeX:true,preventDefaultSwipeY:false,ariaLive:true,ariaHidden:true,keyboardEnabled:false,pager:true,pagerType:'full',pagerShortSeparator:' / ',pagerSelector:null,buildPager:null,pagerCustom:null,controls:true,nextText:'Next',prevText:'Prev',nextSelector:null,prevSelector:null,autoControls:false,startText:'Start',stopText:'Stop',autoControlsCombine:false,autoControlsSelector:null,auto:false,pause:4000,autoStart:true,autoDirection:'next',stopAutoOnClick:false,autoHover:false,autoDelay:0,autoSlideForOnePage:false,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,shrinkItems:false,onSliderLoad:function(){return true},onSlideBefore:function(){return true},onSlideAfter:function(){return true},onSlideNext:function(){return true},onSlidePrev:function(){return true},onSliderResize:function(){return true}};$.fn.bxSlider=function(g){if(this.length===0){return this}if(this.length>1){this.each(function(){$(this).bxSlider(g)});return this}var h={},el=this,windowWidth=$(window).width(),windowHeight=$(window).height();if($(el).data('bxSlider')){return}var j=function(){if($(el).data('bxSlider')){return}h.settings=$.extend({},X,g);h.settings.slideWidth=parseInt(h.settings.slideWidth);h.children=el.children(h.settings.slideSelector);if(h.children.length<h.settings.minSlides){h.settings.minSlides=h.children.length}if(h.children.length<h.settings.maxSlides){h.settings.maxSlides=h.children.length}if(h.settings.randomStart){h.settings.startSlide=Math.floor(Math.random()*h.children.length)}h.active={index:h.settings.startSlide};h.carousel=h.settings.minSlides>1||h.settings.maxSlides>1?true:false;if(h.carousel){h.settings.preloadImages='all'}h.minThreshold=(h.settings.minSlides*h.settings.slideWidth)+((h.settings.minSlides-1)*h.settings.slideMargin);h.maxThreshold=(h.settings.maxSlides*h.settings.slideWidth)+((h.settings.maxSlides-1)*h.settings.slideMargin);h.working=false;h.controls={};h.interval=null;h.animProp=h.settings.mode==='vertical'?'top':'left';h.usingCSS=h.settings.useCSS&&h.settings.mode!=='fade'&&(function(){var a=document.createElement('div'),props=['WebkitPerspective','MozPerspective','OPerspective','msPerspective'];for(var i=0;i<props.length;i++){if(a.style[props[i]]!==undefined){h.cssPrefix=props[i].replace('Perspective','').toLowerCase();h.animProp='-'+h.cssPrefix+'-transform';return true}}return false}());if(h.settings.mode==='vertical'){h.settings.maxSlides=h.settings.minSlides}el.data('origStyle',el.attr('style'));el.children(h.settings.slideSelector).each(function(){$(this).data('origStyle',$(this).attr('style'))});k()};var k=function(){var a=h.children.eq(h.settings.startSlide);el.wrap('<div class="'+h.settings.wrapperClass+'"><div class="bx-viewport"></div></div>');h.viewport=el.parent();if(h.settings.ariaLive&&!h.settings.ticker){h.viewport.attr('aria-live','polite')}h.loader=$('<div class="bx-loading" />');h.viewport.prepend(h.loader);el.css({width:h.settings.mode==='horizontal'?(h.children.length*1000+215)+'%':'auto',position:'relative'});if(h.usingCSS&&h.settings.easing){el.css('-'+h.cssPrefix+'-transition-timing-function',h.settings.easing)}else if(!h.settings.easing){h.settings.easing='swing'}h.viewport.css({width:'100%',overflow:'hidden',position:'relative'});h.viewport.parent().css({maxWidth:o()});if(!h.settings.pager&&!h.settings.controls){h.viewport.parent().css({margin:'0 auto 0px'})}h.children.css({float:h.settings.mode==='horizontal'?'left':'none',listStyle:'none',position:'relative'});h.children.css('width',q());if(h.settings.mode==='horizontal'&&h.settings.slideMargin>0){h.children.css('marginRight',h.settings.slideMargin)}if(h.settings.mode==='vertical'&&h.settings.slideMargin>0){h.children.css('marginBottom',h.settings.slideMargin)}if(h.settings.mode==='fade'){h.children.css({position:'absolute',zIndex:0,display:'none'});h.children.eq(h.settings.startSlide).css({zIndex:h.settings.slideZIndex,display:'block'})}h.controls.el=$('<div class="bx-controls" />');if(h.settings.captions){A()}h.active.last=h.settings.startSlide===s()-1;if(h.settings.video){el.fitVids()}if(h.settings.preloadImages==='all'||h.settings.ticker){a=h.children}if(!h.settings.ticker){if(h.settings.controls){y()}if(h.settings.auto&&h.settings.autoControls){z()}if(h.settings.pager){x()}if(h.settings.controls||h.settings.autoControls||h.settings.pager){h.viewport.after(h.controls.el)}}else{h.settings.pager=false}l(a,m)};var l=function(a,b){var c=a.find('img:not([src=""]), iframe').length,count=0;if(c===0){b();return}a.find('img:not([src=""]), iframe').each(function(){$(this).one('load error',function(){if(++count===c){b()}}).each(function(){if(this.complete){$(this).load()}})})};var m=function(){if(h.settings.infiniteLoop&&h.settings.mode!=='fade'&&!h.settings.ticker){var a=h.settings.mode==='vertical'?h.settings.minSlides:h.settings.maxSlides,sliceAppend=h.children.slice(0,a).clone(true).addClass('bx-clone'),slicePrepend=h.children.slice(-a).clone(true).addClass('bx-clone');if(h.settings.ariaHidden){sliceAppend.attr('aria-hidden',true);slicePrepend.attr('aria-hidden',true)}el.append(sliceAppend).prepend(slicePrepend)}h.loader.remove();u();if(h.settings.mode==='vertical'){h.settings.adaptiveHeight=true}h.viewport.height(n());el.redrawSlider();h.settings.onSliderLoad.call(el,h.active.index);h.initialized=true;if(h.settings.responsive){$(window).bind('resize',U)}if(h.settings.auto&&h.settings.autoStart&&(s()>1||h.settings.autoSlideForOnePage)){K()}if(h.settings.ticker){L()}if(h.settings.pager){G(h.settings.startSlide)}if(h.settings.controls){J()}if(h.settings.touchEnabled&&!h.settings.ticker){P()}if(h.settings.keyboardEnabled&&!h.settings.ticker){$(document).keydown(O)}};var n=function(){var b=0;var c=$();if(h.settings.mode!=='vertical'&&!h.settings.adaptiveHeight){c=h.children}else{if(!h.carousel){c=h.children.eq(h.active.index)}else{var d=h.settings.moveSlides===1?h.active.index:h.active.index*t();c=h.children.eq(d);for(i=1;i<=h.settings.maxSlides-1;i++){if(d+i>=h.children.length){c=c.add(h.children.eq(i-1))}else{c=c.add(h.children.eq(d+i))}}}}if(h.settings.mode==='vertical'){c.each(function(a){b+=$(this).outerHeight()});if(h.settings.slideMargin>0){b+=h.settings.slideMargin*(h.settings.minSlides-1)}}else{b=Math.max.apply(Math,c.map(function(){return $(this).outerHeight(false)}).get())}if(h.viewport.css('box-sizing')==='border-box'){b+=parseFloat(h.viewport.css('padding-top'))+parseFloat(h.viewport.css('padding-bottom'))+parseFloat(h.viewport.css('border-top-width'))+parseFloat(h.viewport.css('border-bottom-width'))}else if(h.viewport.css('box-sizing')==='padding-box'){b+=parseFloat(h.viewport.css('padding-top'))+parseFloat(h.viewport.css('padding-bottom'))}return b};var o=function(){var a='100%';if(h.settings.slideWidth>0){if(h.settings.mode==='horizontal'){a=(h.settings.maxSlides*h.settings.slideWidth)+((h.settings.maxSlides-1)*h.settings.slideMargin)}else{a=h.settings.slideWidth}}return a};var q=function(){var a=h.settings.slideWidth,wrapWidth=h.viewport.width();if(h.settings.slideWidth===0||(h.settings.slideWidth>wrapWidth&&!h.carousel)||h.settings.mode==='vertical'){a=wrapWidth}else if(h.settings.maxSlides>1&&h.settings.mode==='horizontal'){if(wrapWidth>h.maxThreshold){return a}else if(wrapWidth<h.minThreshold){a=(wrapWidth-(h.settings.slideMargin*(h.settings.minSlides-1)))/h.settings.minSlides}else if(h.settings.shrinkItems){a=Math.floor((wrapWidth+h.settings.slideMargin)/(Math.ceil((wrapWidth+h.settings.slideMargin)/(a+h.settings.slideMargin)))-h.settings.slideMargin)}}return a};var r=function(){var a=1,childWidth=null;if(h.settings.mode==='horizontal'&&h.settings.slideWidth>0){if(h.viewport.width()<h.minThreshold){a=h.settings.minSlides}else if(h.viewport.width()>h.maxThreshold){a=h.settings.maxSlides}else{childWidth=h.children.first().width()+h.settings.slideMargin;a=Math.floor((h.viewport.width()+h.settings.slideMargin)/childWidth)}}else if(h.settings.mode==='vertical'){a=h.settings.minSlides}return a};var s=function(){var a=0,breakPoint=0,counter=0;if(h.settings.moveSlides>0){if(h.settings.infiniteLoop){a=Math.ceil(h.children.length/t())}else{while(breakPoint<h.children.length){++a;breakPoint=counter+r();counter+=h.settings.moveSlides<=r()?h.settings.moveSlides:r()}}}else{a=Math.ceil(h.children.length/r())}return a};var t=function(){if(h.settings.moveSlides>0&&h.settings.moveSlides<=r()){return h.settings.moveSlides}return r()};var u=function(){var a,lastChild,lastShowingIndex;if(h.children.length>h.settings.maxSlides&&h.active.last&&!h.settings.infiniteLoop){if(h.settings.mode==='horizontal'){lastChild=h.children.last();a=lastChild.position();v(-(a.left-(h.viewport.width()-lastChild.outerWidth())),'reset',0)}else if(h.settings.mode==='vertical'){lastShowingIndex=h.children.length-h.settings.minSlides;a=h.children.eq(lastShowingIndex).position();v(-a.top,'reset',0)}}else{a=h.children.eq(h.active.index*t()).position();if(h.active.index===s()-1){h.active.last=true}if(a!==undefined){if(h.settings.mode==='horizontal'){v(-a.left,'reset',0)}else if(h.settings.mode==='vertical'){v(-a.top,'reset',0)}}}};var v=function(a,b,c,d){var f,propValue;if(h.usingCSS){propValue=h.settings.mode==='vertical'?'translate3d(0, '+a+'px, 0)':'translate3d('+a+'px, 0, 0)';el.css('-'+h.cssPrefix+'-transition-duration',c/1000+'s');if(b==='slide'){el.css(h.animProp,propValue);if(c!==0){el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(e){if(!$(e.target).is(el)){return}el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');H()})}else{H()}}else if(b==='reset'){el.css(h.animProp,propValue)}else if(b==='ticker'){el.css('-'+h.cssPrefix+'-transition-timing-function','linear');el.css(h.animProp,propValue);if(c!==0){el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(e){if(!$(e.target).is(el)){return}el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');v(d.resetValue,'reset',0);M()})}else{v(d.resetValue,'reset',0);M()}}}else{f={};f[h.animProp]=a;if(b==='slide'){el.animate(f,c,h.settings.easing,function(){H()})}else if(b==='reset'){el.css(h.animProp,a)}else if(b==='ticker'){el.animate(f,c,'linear',function(){v(d.resetValue,'reset',0);M()})}}};var w=function(){var a='',linkContent='',pagerQty=s();for(var i=0;i<pagerQty;i++){linkContent='';if(h.settings.buildPager&&$.isFunction(h.settings.buildPager)||h.settings.pagerCustom){linkContent=h.settings.buildPager(i);h.pagerEl.addClass('bx-custom-pager')}else{linkContent=i+1;h.pagerEl.addClass('bx-default-pager')}a+='<div class="bx-pager-item"><a href="" data-slide-index="'+i+'" class="bx-pager-link">'+linkContent+'</a></div>'}h.pagerEl.html(a)};var x=function(){if(!h.settings.pagerCustom){h.pagerEl=$('<div class="bx-pager" />');if(h.settings.pagerSelector){$(h.settings.pagerSelector).html(h.pagerEl)}else{h.controls.el.addClass('bx-has-pager').append(h.pagerEl)}w()}else{h.pagerEl=$(h.settings.pagerCustom)}h.pagerEl.on('click touchend','a',F)};var y=function(){h.controls.next=$('<a class="bx-next" href="">'+h.settings.nextText+'</a>');h.controls.prev=$('<a class="bx-prev" href="">'+h.settings.prevText+'</a>');h.controls.next.bind('click touchend',B);h.controls.prev.bind('click touchend',C);if(h.settings.nextSelector){$(h.settings.nextSelector).append(h.controls.next)}if(h.settings.prevSelector){$(h.settings.prevSelector).append(h.controls.prev)}if(!h.settings.nextSelector&&!h.settings.prevSelector){h.controls.directionEl=$('<div class="bx-controls-direction" />');h.controls.directionEl.append(h.controls.prev).append(h.controls.next);h.controls.el.addClass('bx-has-controls-direction').append(h.controls.directionEl)}};var z=function(){h.controls.start=$('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+h.settings.startText+'</a></div>');h.controls.stop=$('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+h.settings.stopText+'</a></div>');h.controls.autoEl=$('<div class="bx-controls-auto" />');h.controls.autoEl.on('click','.bx-start',D);h.controls.autoEl.on('click','.bx-stop',E);if(h.settings.autoControlsCombine){h.controls.autoEl.append(h.controls.start)}else{h.controls.autoEl.append(h.controls.start).append(h.controls.stop)}if(h.settings.autoControlsSelector){$(h.settings.autoControlsSelector).html(h.controls.autoEl)}else{h.controls.el.addClass('bx-has-controls-auto').append(h.controls.autoEl)}I(h.settings.autoStart?'stop':'start')};var A=function(){h.children.each(function(a){var b=$(this).find('img:first').attr('title');if(b!==undefined&&(''+b).length){$(this).append('<div class="bx-caption"><span>'+b+'</span></div>')}})};var B=function(e){e.preventDefault();if(h.controls.el.hasClass('disabled')){return}if(h.settings.auto&&h.settings.stopAutoOnClick){el.stopAuto()}el.goToNextSlide()};var C=function(e){e.preventDefault();if(h.controls.el.hasClass('disabled')){return}if(h.settings.auto&&h.settings.stopAutoOnClick){el.stopAuto()}el.goToPrevSlide()};var D=function(e){el.startAuto();e.preventDefault()};var E=function(e){el.stopAuto();e.preventDefault()};var F=function(e){var a,pagerIndex;e.preventDefault();if(h.controls.el.hasClass('disabled')){return}if(h.settings.auto&&h.settings.stopAutoOnClick){el.stopAuto()}a=$(e.currentTarget);if(a.attr('data-slide-index')!==undefined){pagerIndex=parseInt(a.attr('data-slide-index'));if(pagerIndex!==h.active.index){el.goToSlide(pagerIndex)}}};var G=function(b){var c=h.children.length;if(h.settings.pagerType==='short'){if(h.settings.maxSlides>1){c=Math.ceil(h.children.length/h.settings.maxSlides)}h.pagerEl.html((b+1)+h.settings.pagerShortSeparator+c);return}h.pagerEl.find('a').removeClass('active');h.pagerEl.each(function(i,a){$(a).find('a').eq(b).addClass('active')})};var H=function(){if(h.settings.infiniteLoop){var a='';if(h.active.index===0){a=h.children.eq(0).position()}else if(h.active.index===s()-1&&h.carousel){a=h.children.eq((s()-1)*t()).position()}else if(h.active.index===h.children.length-1){a=h.children.eq(h.children.length-1).position()}if(a){if(h.settings.mode==='horizontal'){v(-a.left,'reset',0)}else if(h.settings.mode==='vertical'){v(-a.top,'reset',0)}}}h.working=false;h.settings.onSlideAfter.call(el,h.children.eq(h.active.index),h.oldIndex,h.active.index)};var I=function(a){if(h.settings.autoControlsCombine){h.controls.autoEl.html(h.controls[a])}else{h.controls.autoEl.find('a').removeClass('active');h.controls.autoEl.find('a:not(.bx-'+a+')').addClass('active')}};var J=function(){if(s()===1){h.controls.prev.addClass('disabled');h.controls.next.addClass('disabled')}else if(!h.settings.infiniteLoop&&h.settings.hideControlOnEnd){if(h.active.index===0){h.controls.prev.addClass('disabled');h.controls.next.removeClass('disabled')}else if(h.active.index===s()-1){h.controls.next.addClass('disabled');h.controls.prev.removeClass('disabled')}else{h.controls.prev.removeClass('disabled');h.controls.next.removeClass('disabled')}}};var K=function(){if(h.settings.autoDelay>0){var a=setTimeout(el.startAuto,h.settings.autoDelay)}else{el.startAuto();$(window).focus(function(){el.startAuto()}).blur(function(){el.stopAuto()})}if(h.settings.autoHover){el.hover(function(){if(h.interval){el.stopAuto(true);h.autoPaused=true}},function(){if(h.autoPaused){el.startAuto(true);h.autoPaused=null}})}};var L=function(){var b=0,position,transform,value,idx,ratio,property,newSpeed,totalDimens;if(h.settings.autoDirection==='next'){el.append(h.children.clone().addClass('bx-clone'))}else{el.prepend(h.children.clone().addClass('bx-clone'));position=h.children.first().position();b=h.settings.mode==='horizontal'?-position.left:-position.top}v(b,'reset',0);h.settings.pager=false;h.settings.controls=false;h.settings.autoControls=false;if(h.settings.tickerHover){if(h.usingCSS){idx=h.settings.mode==='horizontal'?4:5;h.viewport.hover(function(){transform=el.css('-'+h.cssPrefix+'-transform');value=parseFloat(transform.split(',')[idx]);v(value,'reset',0)},function(){totalDimens=0;h.children.each(function(a){totalDimens+=h.settings.mode==='horizontal'?$(this).outerWidth(true):$(this).outerHeight(true)});ratio=h.settings.speed/totalDimens;property=h.settings.mode==='horizontal'?'left':'top';newSpeed=ratio*(totalDimens-(Math.abs(parseInt(value))));M(newSpeed)})}else{h.viewport.hover(function(){el.stop()},function(){totalDimens=0;h.children.each(function(a){totalDimens+=h.settings.mode==='horizontal'?$(this).outerWidth(true):$(this).outerHeight(true)});ratio=h.settings.speed/totalDimens;property=h.settings.mode==='horizontal'?'left':'top';newSpeed=ratio*(totalDimens-(Math.abs(parseInt(el.css(property)))));M(newSpeed)})}}M()};var M=function(a){var b=a?a:h.settings.speed,position={left:0,top:0},reset={left:0,top:0},animateProperty,resetValue,params;if(h.settings.autoDirection==='next'){position=el.find('.bx-clone').first().position()}else{reset=h.children.first().position()}animateProperty=h.settings.mode==='horizontal'?-position.left:-position.top;resetValue=h.settings.mode==='horizontal'?-reset.left:-reset.top;params={resetValue:resetValue};v(animateProperty,'ticker',b,params)};var N=function(a){var b=$(window),viewport={top:b.scrollTop(),left:b.scrollLeft()},bounds=a.offset();viewport.right=viewport.left+b.width();viewport.bottom=viewport.top+b.height();bounds.right=bounds.left+a.outerWidth();bounds.bottom=bounds.top+a.outerHeight();return(!(viewport.right<bounds.left||viewport.left>bounds.right||viewport.bottom<bounds.top||viewport.top>bounds.bottom))};var O=function(e){var a=document.activeElement.tagName.toLowerCase(),tagFilters='input|textarea',p=new RegExp(a,['i']),result=p.exec(tagFilters);if(result==null&&N(el)){if(e.keyCode===39){B(e);return false}else if(e.keyCode===37){C(e);return false}}};var P=function(){h.touch={start:{x:0,y:0},end:{x:0,y:0}};h.viewport.bind('touchstart MSPointerDown pointerdown',Q);h.viewport.on('click','.bxslider a',function(e){if(h.viewport.hasClass('click-disabled')){e.preventDefault();h.viewport.removeClass('click-disabled')}})};var Q=function(e){h.controls.el.addClass('disabled');if(h.working){e.preventDefault();h.controls.el.removeClass('disabled')}else{h.touch.originalPos=el.position();var a=e.originalEvent,touchPoints=(typeof a.changedTouches!=='undefined')?a.changedTouches:[a];h.touch.start.x=touchPoints[0].pageX;h.touch.start.y=touchPoints[0].pageY;if(h.viewport.get(0).setPointerCapture){h.pointerId=a.pointerId;h.viewport.get(0).setPointerCapture(h.pointerId)}h.viewport.bind('touchmove MSPointerMove pointermove',S);h.viewport.bind('touchend MSPointerUp pointerup',T);h.viewport.bind('MSPointerCancel pointercancel',R)}};var R=function(e){v(h.touch.originalPos.left,'reset',0);h.controls.el.removeClass('disabled');h.viewport.unbind('MSPointerCancel pointercancel',R);h.viewport.unbind('touchmove MSPointerMove pointermove',S);h.viewport.unbind('touchend MSPointerUp pointerup',T);if(h.viewport.get(0).releasePointerCapture){h.viewport.get(0).releasePointerCapture(h.pointerId)}};var S=function(e){var a=e.originalEvent,touchPoints=(typeof a.changedTouches!=='undefined')?a.changedTouches:[a],xMovement=Math.abs(touchPoints[0].pageX-h.touch.start.x),yMovement=Math.abs(touchPoints[0].pageY-h.touch.start.y),value=0,change=0;if((xMovement*3)>yMovement&&h.settings.preventDefaultSwipeX){e.preventDefault()}else if((yMovement*3)>xMovement&&h.settings.preventDefaultSwipeY){e.preventDefault()}if(h.settings.mode!=='fade'&&h.settings.oneToOneTouch){if(h.settings.mode==='horizontal'){change=touchPoints[0].pageX-h.touch.start.x;value=h.touch.originalPos.left+change}else{change=touchPoints[0].pageY-h.touch.start.y;value=h.touch.originalPos.top+change}v(value,'reset',0)}};var T=function(e){h.viewport.unbind('touchmove MSPointerMove pointermove',S);h.controls.el.removeClass('disabled');var a=e.originalEvent,touchPoints=(typeof a.changedTouches!=='undefined')?a.changedTouches:[a],value=0,distance=0;h.touch.end.x=touchPoints[0].pageX;h.touch.end.y=touchPoints[0].pageY;if(h.settings.mode==='fade'){distance=Math.abs(h.touch.start.x-h.touch.end.x);if(distance>=h.settings.swipeThreshold){if(h.touch.start.x>h.touch.end.x){el.goToNextSlide()}else{el.goToPrevSlide()}el.stopAuto()}}else{if(h.settings.mode==='horizontal'){distance=h.touch.end.x-h.touch.start.x;value=h.touch.originalPos.left}else{distance=h.touch.end.y-h.touch.start.y;value=h.touch.originalPos.top}if(!h.settings.infiniteLoop&&((h.active.index===0&&distance>0)||(h.active.last&&distance<0))){v(value,'reset',200)}else{if(Math.abs(distance)>=h.settings.swipeThreshold){if(distance<0){el.goToNextSlide()}else{el.goToPrevSlide()}el.stopAuto()}else{v(value,'reset',200)}}}h.viewport.unbind('touchend MSPointerUp pointerup',T);if(h.viewport.get(0).releasePointerCapture){h.viewport.get(0).releasePointerCapture(h.pointerId)}};var U=function(e){if(!h.initialized){return}if(h.working){window.setTimeout(U,10)}else{var a=$(window).width(),windowHeightNew=$(window).height();if(windowWidth!==a||windowHeight!==windowHeightNew){windowWidth=a;windowHeight=windowHeightNew;el.redrawSlider();h.settings.onSliderResize.call(el,h.active.index)}}};var V=function(a){var b=r();if(h.settings.ariaHidden&&!h.settings.ticker){h.children.attr('aria-hidden','true');h.children.slice(a,a+b).attr('aria-hidden','false')}};var W=function(a){if(a<0){if(h.settings.infiniteLoop){return s()-1}else{return h.active.index}}else if(a>=s()){if(h.settings.infiniteLoop){return 0}else{return h.active.index}}else{return a}};el.goToSlide=function(a,b){var c=true,moveBy=0,position={left:0,top:0},lastChild=null,lastShowingIndex,eq,value,requestEl;h.oldIndex=h.active.index;h.active.index=W(a);if(h.working||h.active.index===h.oldIndex){return}h.working=true;c=h.settings.onSlideBefore.call(el,h.children.eq(h.active.index),h.oldIndex,h.active.index);if(typeof(c)!=='undefined'&&!c){h.active.index=h.oldIndex;h.working=false;return}if(b==='next'){if(!h.settings.onSlideNext.call(el,h.children.eq(h.active.index),h.oldIndex,h.active.index)){c=false}}else if(b==='prev'){if(!h.settings.onSlidePrev.call(el,h.children.eq(h.active.index),h.oldIndex,h.active.index)){c=false}}h.active.last=h.active.index>=s()-1;if(h.settings.pager||h.settings.pagerCustom){G(h.active.index)}if(h.settings.controls){J()}if(h.settings.mode==='fade'){if(h.settings.adaptiveHeight&&h.viewport.height()!==n()){h.viewport.animate({height:n()},h.settings.adaptiveHeightSpeed)}h.children.filter(':visible').fadeOut(h.settings.speed).css({zIndex:0});h.children.eq(h.active.index).css('zIndex',h.settings.slideZIndex+1).fadeIn(h.settings.speed,function(){$(this).css('zIndex',h.settings.slideZIndex);H()})}else{if(h.settings.adaptiveHeight&&h.viewport.height()!==n()){h.viewport.animate({height:n()},h.settings.adaptiveHeightSpeed)}if(!h.settings.infiniteLoop&&h.carousel&&h.active.last){if(h.settings.mode==='horizontal'){lastChild=h.children.eq(h.children.length-1);position=lastChild.position();moveBy=h.viewport.width()-lastChild.outerWidth()}else{lastShowingIndex=h.children.length-h.settings.minSlides;position=h.children.eq(lastShowingIndex).position()}}else if(h.carousel&&h.active.last&&b==='prev'){eq=h.settings.moveSlides===1?h.settings.maxSlides-t():((s()-1)*t())-(h.children.length-h.settings.maxSlides);lastChild=el.children('.bx-clone').eq(eq);position=lastChild.position()}else if(b==='next'&&h.active.index===0){position=el.find('> .bx-clone').eq(h.settings.maxSlides).position();h.active.last=false}else if(a>=0){requestEl=a*parseInt(t());position=h.children.eq(requestEl).position()}if(typeof(position)!=='undefined'){value=h.settings.mode==='horizontal'?-(position.left-moveBy):-position.top;v(value,'slide',h.settings.speed)}else{h.working=false}}if(h.settings.ariaHidden){V(h.active.index*t())}};el.goToNextSlide=function(){if(!h.settings.infiniteLoop&&h.active.last){return}var a=parseInt(h.active.index)+1;el.goToSlide(a,'next')};el.goToPrevSlide=function(){if(!h.settings.infiniteLoop&&h.active.index===0){return}var a=parseInt(h.active.index)-1;el.goToSlide(a,'prev')};el.startAuto=function(a){if(h.interval){return}h.interval=setInterval(function(){if(h.settings.autoDirection==='next'){el.goToNextSlide()}else{el.goToPrevSlide()}},h.settings.pause);if(h.settings.autoControls&&a!==true){I('stop')}};el.stopAuto=function(a){if(!h.interval){return}clearInterval(h.interval);h.interval=null;if(h.settings.autoControls&&a!==true){I('start')}};el.getCurrentSlide=function(){return h.active.index};el.getCurrentSlideElement=function(){return h.children.eq(h.active.index)};el.getSlideElement=function(a){return h.children.eq(a)};el.getSlideCount=function(){return h.children.length};el.isWorking=function(){return h.working};el.redrawSlider=function(){h.children.add(el.find('.bx-clone')).outerWidth(q());h.viewport.css('height',n());if(!h.settings.ticker){u()}if(h.active.last){h.active.index=s()-1}if(h.active.index>=s()){h.active.last=true}if(h.settings.pager&&!h.settings.pagerCustom){w();G(h.active.index)}if(h.settings.ariaHidden){V(h.active.index*t())}};el.destroySlider=function(){if(!h.initialized){return}h.initialized=false;$('.bx-clone',this).remove();h.children.each(function(){if($(this).data('origStyle')!==undefined){$(this).attr('style',$(this).data('origStyle'))}else{$(this).removeAttr('style')}});if($(this).data('origStyle')!==undefined){this.attr('style',$(this).data('origStyle'))}else{$(this).removeAttr('style')}$(this).unwrap().unwrap();if(h.controls.el){h.controls.el.remove()}if(h.controls.next){h.controls.next.remove()}if(h.controls.prev){h.controls.prev.remove()}if(h.pagerEl&&h.settings.controls&&!h.settings.pagerCustom){h.pagerEl.remove()}$('.bx-caption',this).remove();if(h.controls.autoEl){h.controls.autoEl.remove()}clearInterval(h.interval);if(h.settings.responsive){$(window).unbind('resize',U)}if(h.settings.keyboardEnabled){$(document).unbind('keydown',O)}$(this).removeData('bxSlider')};el.reloadSlider=function(a){if(a!==undefined){g=a}el.destroySlider();j();$(el).data('bxSlider',this)};j();$(el).data('bxSlider',this);return this}})(jQuery);


!function(a){function c(){a(".crf-sm.opened").length&&(a(".crf-s.opened").removeClass("opened"),a(".crf-sm.opened").removeClass("opened").hide(),b.close.call())}a.fn.crfi=function(){this.change(function(){"radio"==a(this).attr("type")&&a("input[name="+a(this).attr("name")+"]").not(this).next(".crf").removeClass("checked"),a(this).prop("checked")?a(this).next().addClass("checked"):a(this).next().removeClass("checked")}),this.not(".crf-i").each(function(b){a(this).attr("id","crf-input-"+b).css({position:"absolute",left:"-9999em"}).addClass("crf-i").next("label").addClass("crf").attr("for","crf-input-"+b),a(this).prop("checked")&&a(this).next().addClass("checked")})};var b,d={init:function(d){b=a.extend({select:function(){},done:function(){},open:function(){},close:function(){}},d),a(document).unbind("click.crfs").on("click.crfs",".crf-s",function(){var d=a("div[data-id="+a(this).attr("id")+"]");if(d.is(":visible"))return c(),!1;c();var e=a(this).outerHeight(),f=a(this).find("select").attr("class"),g=a(this).offset(),h=d.show().height();d.css({position:"absolute",left:"-9999em"}),a(this).addClass("opened"),d.addClass("opened "+f).css({left:g.left,top:g.top+e+h>a(document).height()?g.top-h:g.top+e,width:a(this).outerWidth()}).show(),b.open.call()}),a(document).click(function(b){return a(b.target).closest(".crf-sm.opened, .crf-s.opened").length>0?!1:(c(),void 0)}),a(window).resize(function(){var b=a(".crf-s.opened");if(b.length){var c=a(".crf-sm.opened"),d=b.outerHeight(),e=b.offset(),f=c.height();c.css({left:e.left,top:e.top+d+f>a(document).height()?e.top-f:e.top+d,width:b.outerWidth()})}}),a(document).on("click.crfs",".crf-sm li",function(){var d=a(this).parentsUntil(".crf-sm").parent().attr("data-id"),e=a("#"+d).attr("class");return a("#"+d).attr("class","crf-s").addClass(a(this).attr("class").replace("selected","")).addClass(e.replace("hided-s","").replace("opened","")).find(".option").text(a(this).text()),a("#"+d).find("select").children().prop("selected",!1).eq(a(this).index()).prop("selected",!0).change(),a(this).parentsUntil(".crf-sm").parent().find(".selected").removeClass("selected"),a(this).addClass("selected"),c(),b.select.call(),!1}),this.not(".hided-s").each(function(c){a(this).addClass("hided-s").hide().wrap("<span class='crf-s "+a(this).attr("class")+"' id='crf-s-"+c+"' />").parent().append("<span class='option'>"+a(this).find("option:selected").text()+"</span>");var d=a("<ul></ul>");a(this).children().each(function(){d.append("<li class='"+(void 0!=a(this).attr("class")?a(this).attr("class")+"":"")+(a(this).is(":selected")?" selected":"")+"'><span class='link'>"+a(this).text()+"</span></li>")}),a("<div class='crf-sm' data-id='crf-s-"+c+"'/>").append(d).appendTo("body"),b.done.call()})},hide:function(){c()}};a.fn.crfs=function(a){return d[a]?d[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?void 0:d.init.apply(this,arguments)}}(jQuery);