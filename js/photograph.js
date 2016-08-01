(function(){
			var oCanter=document.getElementById("conter");
			var oPrev=document.getElementById('prev');
			var oNext=document.getElementById("next");
			var ROW=4,
				COL=6,
				ThumImgWid=ThumImgHei=125,
				BigImgWid=750,
				BigImgHei=500;
			var now=0;
			var iNow=0;
			var bClick=false;
			for (var i =1; i <= ROW*COL; i++) {
				var oBigImg=new Image();
				oBigImg.src='../images/'+i+'.jpg';
				 oBigImg.onload=function(){
				 now++;
				 if (++now==(ROW*COL)*2) {
				 	loadsucceed();
				 }	
				}
				var oThumImg=new Image();
				oThumImg.src='../images/thumbs/'+i+'.jpg';
				oThumImg.onload=function(){
					now++;
					if (++now==(ROW*COL)*2) {
						loadsucceed();
					}
				}
			}
			var index=0;
     		function loadsucceed(){
     			var iCol=(oCanter.offsetWidth-COL*ThumImgWid)/(COL+1);
     			var iRow=(oCanter.offsetHeight-ROW*ThumImgHei)/(ROW+1);
     			for (var i = 0; i <ROW; i++) {
     				for (var j = 0; j < COL; j++) {
     				 var oDiv=document.createElement("div");
     				 oDiv.pos={
     				 	left:parseInt(iCol+j*(iCol+ThumImgWid)),
     				 	top:parseInt(iRow+i*(iRow+ThumImgHei))
     				 };
     				 // oDiv.index=index;
     				 oDiv.matrix={
     				 	col:j,
     				 	row:i
     				 };
     				 oDiv.className="img";
     	oDiv.style.background='url(../images/thumbs/'+(index+1)+'.jpg)';
     				 oDiv.style.left=(-Math.random()*300-200)+"px";
     				 oDiv.style.top=(-Math.random()*300-200)+"px";
     				 oDiv.innerHTML="<span></span>";
     				 oCanter.appendChild(oDiv);
     				 index++;
     				}
     			}

     		var aImg=document.getElementsByClassName('img');
     		var timer=null;
     		index--;
     		timer=setInterval(function(){
     			aImg[index].index=index;
     			// console.log(aImg[index].index);
     			aImg[index].style.left=aImg[index].pos.left+"px";
     			aImg[index].style.top=aImg[index].pos.top+'px';
     			setStyle(aImg[index],"Transform","rotate("+(Math.random()*40-20)+"deg)");
     		aImg[index].addEventListener("click",clickFun,false);
     			index--;
     			if (index==-1) {
     				clearInterval(timer);
     			}
     		},100);
     		function clickFun(){
     			if (bClick) {
     		for (var i = 0; i < aImg.length; i++) {
     			var oSpan=aImg[i].getElementsByTagName("span")[0];
     			aImg[i].style.left=aImg[i].pos.left+"px";
     			aImg[i].style.top=aImg[i].pos.top+'px';
     			setStyle(aImg[i],"Transform","rotate("+(Math.random()*40-20)+"deg)");
                 oSpan.style.opacity=0;
                 aImg[i].className="img";
     				}
     				oPrev.style.display='none';
     				oNext.style.display='none';	
     			}
     			else{
     				var bigImgpos={
    //  			BigImgWid=750,
				// BigImgHei=500;
     					left:(oCanter.offsetWidth-BigImgWid)/2,
     					top:(oCanter.offsetHeight-BigImgHei)/2
     				};
     				for (var i = 0; i < aImg.length; i++) {
     				var oSpan=aImg[i].getElementsByTagName("span")[0];
     				// 设置背景图片及定位
     				iNow=this.index+1;
     				console.log(iNow);
     			oSpan.style.background='url(../images/'+(this.index+1)+'.jpg )'+(-aImg[i].matrix.col*ThumImgWid)+'px '+(-aImg[i].matrix.row*ThumImgHei)+'px';
     			oSpan.style.background='url(../images/'+(this.index+1)+'.jpg '+(-aImg[i].matrix.col*ThumImgWid)+'px '+(-aImg[i].matrix.row*ThumImgHei)+'px)';

     			oSpan.style.opacity=1;
     			aImg[i].style.left=bigImgpos.left+aImg[i].matrix.col*(ThumImgWid+1)+"px";
     			aImg[i].style.top=bigImgpos.top+aImg[i].matrix.row*(ThumImgHei+1)+"px";
     			// aImg[i].style.WebkitTransfrom='rotate(0deg)';
     			setStyle(aImg[i],'Transform',"rotate(0deg)");
     				aImg[i].className="img contraction";
     				}
     				oPrev.style.display='block';
     				oNext.style.display='block';	
     			}
     			bClick=!bClick;	
     		}
     		oPrev.onmouseover=oNext.onmouseover=function(){
     			if (this==oPrev) {
     				this.style.left=0;
     			}else{
     				this.style.right=0;
     			}
     		}
     		oPrev.onmouseout=oNext.onmouseout=function(){
     			if (this==oPrev) {
     				this.style.left=-10+'px';
     			}else{
     				this.style.right=-10+'px';
     			}
     		}
     		oPrev.onclick=oNext.onclick=function(){
     			if (this==oPrev) {
     				iNow--;
     				if (iNow<=0) {
     					iNow=ROW*COL;
     				}
     			}else{
     				iNow++;
     				if (iNow>ROW*COL) {
     					iNow=1;
     				}
     			}
     			var arr=[];
     		for (var i = 0; i < ROW*COL; i++) {
     			arr.push(i);
     		}
     		arr.sort(function(){
     			return Math.random()-0.5;
     		});
     		var timers=setInterval(function(){
     				var aPop=arr.pop();
   aImg[aPop].getElementsByTagName('span')[0].style.background='url(../images/'+(iNow)+'.jpg) '+(-aImg[aPop].matrix.col*ThumImgWid)+'px '+(-aImg[aPop].matrix.row*ThumImgHei)+'px';
     				if (arr.length==0) {
     					clearInterval(timers);
     				}
     			},30)
     		}
     	}
     		// .charAt(0).toUpperCase()+attr.substr(1)
     		function setStyle(elem,attr,value){
     			["Webkit"].forEach(function(prefix){
     				elem.style[prefix+attr]=value;
     			});  
     		}
     		
     		








})()