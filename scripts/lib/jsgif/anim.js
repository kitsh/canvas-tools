function animDelayValue(){var a=new Number(document.getElementById("animDelay").value/1e3);a.toFixed(2),document.getElementById("animDelayVal").innerHTML=a}animDelayValue(),this.animDelayValue=animDelayValue,this.gifalizer=function(){function a(){for(var a=document.getElementsByName("animScale"),b="4",c=0;c<a.length;c++)if(a[c].checked){b=a[c].value;break}return"1"==b?1:"2"==b?2:4}var b=document.getElementById("animDelay").value,c=a(),d=new Array(paintedCanvases.length),e=new Worker("animWorker.js");e.onmessage=function(a){var b=a.data.frame_index,c=a.data.frame_data;d[b]=c,console.log(b);for(var e=0;e<paintedCanvases.length;e++)if(null==d[e])return;console.log("append");var f=d.join(""),g="data:image/gif;base64,"+window.btoa(f),h=new Image;h.src=g;for(var i=document.getElementById("gifContainer");i.hasChildNodes();)i.removeChild(i.lastChild);document.getElementById("gifContainer").appendChild(h)};for(var f=new Array,g=0;g<paintedCanvases.length;g++)f[g]=new Image,f[g].src=paintedCanvases[g],f[g].isloaded=!1,f[g].index=g,f[g].onload=function(){var a=document.createElement("canvas");a.width=comicPane.width/c,a.height=comicPane.height/c;var d=a.getContext("2d");d.fillStyle="#FFFFFF",d.fillRect(0,0,a.width,a.height),d.drawImage(this,0,0,a.width,a.height);var f=d.getImageData(0,0,a.width,a.height).data;console.log(this.index),e.postMessage({frame_index:this.index,delay:b,frame_length:paintedCanvases.length-1,height:a.height,width:a.width,imageData:f})}};
//# sourceMappingURL=anim.map