(()=>{"use strict";class t{constructor(t){this.selector=t,this.element=document.querySelector(`#${t}`),this.closeBtn=this.element.querySelector(`#btnClose${t}`),this.closeBtn.addEventListener("click",(()=>{this.close()}))}toggle(){this.element.hasAttribute("open")?this.close():this.open()}open(){this.element.setAttribute("open","")}close(){this.element.removeAttribute("open"),window.localStorage.setItem("startup","false")}}class e{constructor(){this.width=16,this.height=16,this.palette=[],this.data=Array(1).fill(Array(16).fill(Array(16).fill(0)))}}class s{constructor(t,e){this.selector=t,this.app=e,this.commands={n:()=>{this.app.newFile()},e:()=>{},w:()=>{},h:()=>{this.app.helpDialog.toggle()},p:()=>{},P:()=>{}},this.element=document.querySelector(`#${t}`),this.element.addEventListener("keydown",(t=>{"Enter"===t.key&&(this.execute(this.element.value),this.close())}))}open(){this.element.classList.add("open"),this.element.focus(),this.element.value=":"}close(){this.element.classList.remove("open"),this.element.value=""}execute(t){t=t.slice(1);const[e,...s]=t.split(" ");e in this.commands&&this.commands[e](...s)}}const i=[[0,0,0,0],[255,255,255,255],[0,0,0,255]];new class{constructor(){this.history={prev:null,next:null},this.tool="pencil",this.layer=0,this.color=1,this.file=new e,this.ui=document.querySelector("#ui"),this.startupDialog=new t("DialogStartup"),this.helpDialog=new t("DialogHelp"),this.inputCommand=new s("InputCmd",this),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.style.backgroundColor="white",this.canvas.width=this.file.width,this.canvas.height=this.file.height,window.localStorage.getItem("startup")&&"true"!==window.localStorage.getItem("startup")||this.startupDialog.open();let a=4;this.canvas.style.width=this.file.width*a+"px",this.canvas.style.height=this.file.height*a+"px",this.canvas.style.imageRendering="pixelated",this.canvas.addEventListener("wheel",(t=>{t.preventDefault();const e=Math.sign(t.deltaY);a+=e,this.canvas.style.width=this.file.width*a+"px",this.canvas.style.height=this.file.height*a+"px"})),document.body.querySelector("#main").append(this.canvas);const n=this.ctx.createImageData(16,16);for(let t=0;t>this.file.data.length;t++)for(let e=0;e<16;e++)for(let s=0;s<16;s++){const a=this.file.palette?this.file.palette[this.file.data[t][e][s]]:i[this.file.data[t][e][s]],h=4*(16*e+s);n.data[h]=a[0],n.data[h+1]=a[1],n.data[h+2]=a[2],n.data[h+3]=a[3]}this.ctx.putImageData(n,0,0),this.canvas.addEventListener("click",(t=>{this.savePrevRev(this.ctx.getImageData(0,0,16,16));const e=this.canvas.getBoundingClientRect(),s=Math.floor((t.clientX-e.left)/a),i=4*(16*Math.floor((t.clientY-e.top)/a)+s);n.data[i]=0,n.data[i+1]=0,n.data[i+2]=0,n.data[i+3]=255,this.ctx.putImageData(n,0,0),this.saveNextRev(this.ctx.getImageData(0,0,16,16))})),this.canvas.addEventListener("mousemove",(t=>{if(1===t.buttons){this.savePrevRev(this.ctx.getImageData(0,0,16,16));const e=this.canvas.getBoundingClientRect(),s=Math.floor((t.clientX-e.left)/a),i=4*(16*Math.floor((t.clientY-e.top)/a)+s);n.data[i]=0,n.data[i+1]=0,n.data[i+2]=0,n.data[i+3]=255,this.ctx.putImageData(n,0,0),this.saveNextRev(this.ctx.getImageData(0,0,16,16))}})),document.addEventListener("keydown",(t=>{switch(t.key){case"?":t.preventDefault(),this.helpDialog.toggle();break;case"Escape":t.preventDefault(),this.inputCommand.element.classList.contains("open")?this.inputCommand.close():this.inputCommand.open()}}))}newFile(){console.log("new")}undo(){this.history.prev&&(console.log("undo"),this.ctx.putImageData(this.history.prev,0,0))}redo(){}savePrevRev(t){this.history.prev=t}saveNextRev(t){this.history.next=t}changeTool(t){this.tool=t}}})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UyxFQUN4Qk4sRUFBVXJELEtBQUsyRCxFQUFRLEdBQUssRUFDNUJOLEVBQVVyRCxLQUFLMkQsRUFBUSxHQUFLLEVBQzVCTixFQUFVckQsS0FBSzJELEVBQVEsR0FBSyxJQUM1QjlFLEtBQUswRCxJQUFJcUIsYUFBYVAsRUFBVyxFQUFHLEdBQ3BDeEUsS0FBS3lGLFlBQVl6RixLQUFLMEQsSUFBSXVCLGFBQWEsRUFBRyxFQUFHLEdBQUksSUFDckQsS0FHSi9FLFNBQVNHLGlCQUFpQixXQUFZc0IsSUFDbEMsT0FBUUEsRUFBRU0sS0FDTixJQUFLLElBQ0ROLEVBQUVzQyxpQkFDRmpFLEtBQUs4QixXQUFXdkIsU0FDaEIsTUFDSixJQUFLLFNBQ0RvQixFQUFFc0MsaUJBQ0VqRSxLQUFLdUQsYUFBYXRELFFBQVFtQyxVQUFVdUQsU0FBUyxRQUM3QzNGLEtBQUt1RCxhQUFhakQsUUFHbEJOLEtBQUt1RCxhQUFhOUMsT0FFOUIsR0FFUixDQUNBaUIsVUFDSWtFLFFBQVFDLElBQUksTUFDaEIsQ0FDQUMsT0FDUTlGLEtBQUs4QyxRQUFRQyxPQUNiNkMsUUFBUUMsSUFBSSxRQUNaN0YsS0FBSzBELElBQUlxQixhQUFhL0UsS0FBSzhDLFFBQVFDLEtBQU0sRUFBRyxHQUVwRCxDQUNBZ0QsT0FBUyxDQUNUZixZQUFZZ0IsR0FDUmhHLEtBQUs4QyxRQUFRQyxLQUFPaUQsQ0FDeEIsQ0FDQVAsWUFBWU8sR0FDUmhHLEtBQUs4QyxRQUFRRSxLQUFPZ0QsQ0FDeEIsQ0FDQUMsV0FBV2hELEdBQ1BqRCxLQUFLaUQsS0FBT0EsQ0FDaEIsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RzYnAvLi9zcmMvZGlhbG9nLnRzIiwid2VicGFjazovL3RzYnAvLi9zcmMvZmlsZS50cyIsIndlYnBhY2s6Ly90c2JwLy4vc3JjL2lucHV0LWNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vdHNicC8uL3NyYy9wYWxldHRlLnRzIiwid2VicGFjazovL3RzYnAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdHNicC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbG9nRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzZWxlY3Rvcn1gKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0biA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuQ2xvc2Uke3NlbGVjdG9yfWApO1xuICAgICAgICB0aGlzLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKFwib3BlblwiKSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgXCJcIik7XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RhcnR1cFwiLCBcImZhbHNlXCIpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBXaXpGaWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IDE2O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE2O1xuICAgICAgICB0aGlzLnBhbGV0dGUgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhID0gQXJyYXkoMSkuZmlsbChBcnJheSgxNikuZmlsbChBcnJheSgxNikuZmlsbCgwKSkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0Q29tbWFuZCB7XG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGFwcCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgICAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgICAgICAgbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLm5ld0ZpbGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlOiAoKSA9PiB7IH0sXG4gICAgICAgICAgICB3OiAoKSA9PiB7IH0sXG4gICAgICAgICAgICBoOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuaGVscERpYWxvZy50b2dnbGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwOiAoKSA9PiB7IH0sXG4gICAgICAgICAgICBQOiAoKSA9PiB7IH0sIC8vIHBhbGV0dGVzXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NlbGVjdG9yfWApO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlKHRoaXMuZWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gXCI6XCI7XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgfVxuICAgIGV4ZWN1dGUoY21kKSB7XG4gICAgICAgIGNtZCA9IGNtZC5zbGljZSgxKTtcbiAgICAgICAgY29uc3QgW2NvbW1hbmQsIC4uLmFyZ3NdID0gY21kLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgaWYgKGNvbW1hbmQgaW4gdGhpcy5jb21tYW5kcykge1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kc1tjb21tYW5kXSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbGV0dGUge1xufVxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQYWxldHRlID0gW1swLCAwLCAwLCAwXSxcbiAgICBbMjU1LCAyNTUsIDI1NSwgMjU1XSxcbiAgICBbMCwgMCwgMCwgMjU1XSxcbl07XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL2FwcFwiO1xuY29uc3QgZGVmYXVsdFBhbGV0dGUgPSBbXG4gICAgWzAsIDAsIDAsIDBdLFxuICAgIFsyNTUsIDI1NSwgMjU1LCAyNTVdLFxuICAgIFswLCAwLCAwLCAyNTVdLFxuXTtcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbiIsImltcG9ydCBEaWFsb2dFbGVtZW50IGZyb20gXCIuL2RpYWxvZ1wiO1xuaW1wb3J0IHsgV2l6RmlsZSB9IGZyb20gXCIuL2ZpbGVcIjtcbmltcG9ydCBJbnB1dENvbW1hbmQgZnJvbSBcIi4vaW5wdXQtY29tbWFuZFwiO1xuaW1wb3J0IHsgZGVmYXVsdFBhbGV0dGUgfSBmcm9tIFwiLi9wYWxldHRlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhpc3RvcnkgPSB7XG4gICAgICAgICAgICBwcmV2OiBudWxsLFxuICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b29sID0gXCJwZW5jaWxcIjtcbiAgICAgICAgdGhpcy5sYXllciA9IDA7XG4gICAgICAgIHRoaXMuY29sb3IgPSAxO1xuICAgICAgICB0aGlzLmZpbGUgPSBuZXcgV2l6RmlsZSgpO1xuICAgICAgICB0aGlzLnVpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1aVwiKTtcbiAgICAgICAgdGhpcy5zdGFydHVwRGlhbG9nID0gbmV3IERpYWxvZ0VsZW1lbnQoXCJEaWFsb2dTdGFydHVwXCIpO1xuICAgICAgICB0aGlzLmhlbHBEaWFsb2cgPSBuZXcgRGlhbG9nRWxlbWVudChcIkRpYWxvZ0hlbHBcIik7XG4gICAgICAgIHRoaXMuaW5wdXRDb21tYW5kID0gbmV3IElucHV0Q29tbWFuZChcIklucHV0Q21kXCIsIHRoaXMpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5maWxlLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmZpbGUuaGVpZ2h0O1xuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0YXJ0dXBcIikgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0YXJ0dXBcIikgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0dXBEaWFsb2cub3BlbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vem9vbSBjYW52YXNcbiAgICAgICAgbGV0IHpvb20gPSA0O1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3RoaXMuZmlsZS53aWR0aCAqIHpvb219cHhgO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmZpbGUuaGVpZ2h0ICogem9vbX1weGA7XG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nID0gXCJwaXhlbGF0ZWRcIjtcbiAgICAgICAgLy8gYWJpbGl0eSB0byB6b29tIGluIGFuZCBvdXQgd2l0aCBtb3VzZSB3aGVlbFxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gTWF0aC5zaWduKGUuZGVsdGFZKTtcbiAgICAgICAgICAgIHpvb20gKz0gZGVsdGE7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3RoaXMuZmlsZS53aWR0aCAqIHpvb219cHhgO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5maWxlLmhlaWdodCAqIHpvb219cHhgO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI21haW5cIikuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5jdHguY3JlYXRlSW1hZ2VEYXRhKDE2LCAxNik7XG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsID4gdGhpcy5maWxlLmRhdGEubGVuZ3RoOyBsKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTY7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTY7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuZmlsZS5wYWxldHRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZmlsZS5wYWxldHRlW3RoaXMuZmlsZS5kYXRhW2xdW3ldW3hdXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0UGFsZXR0ZVt0aGlzLmZpbGUuZGF0YVtsXVt5XVt4XV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHkgKiAxNiArIHgpICogNDtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXhdID0gY29sb3JbMF07XG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV0gPSBjb2xvclsxXTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAyXSA9IGNvbG9yWzJdO1xuICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gY29sb3JbM107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgICAvLyBhYmlsaXR5IHRvIGRyYXcgcGl4ZWwgd2l0aCBtb3VzZSBjbGlja1xuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVByZXZSZXYodGhpcy5jdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIDE2LCAxNikpO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgLyB6b29tKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKChlLmNsaWVudFkgLSByZWN0LnRvcCkgLyB6b29tKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHkgKiAxNiArIHgpICogNDtcbiAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2luZGV4XSA9IDA7XG4gICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpbmRleCArIDFdID0gMDtcbiAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2luZGV4ICsgMl0gPSAwO1xuICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgICAgICAgdGhpcy5zYXZlTmV4dFJldih0aGlzLmN0eC5nZXRJbWFnZURhdGEoMCwgMCwgMTYsIDE2KSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhYmlsaXR5IHRvIGRyYXcgcGl4ZWwgd2l0aCBtb3VzZSBtb3ZlXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmJ1dHRvbnMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVQcmV2UmV2KHRoaXMuY3R4LmdldEltYWdlRGF0YSgwLCAwLCAxNiwgMTYpKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgLyB6b29tKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcigoZS5jbGllbnRZIC0gcmVjdC50b3ApIC8gem9vbSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSAoeSAqIDE2ICsgeCkgKiA0O1xuICAgICAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2luZGV4XSA9IDA7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXSA9IDA7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAyXSA9IDA7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA9IDI1NTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVOZXh0UmV2KHRoaXMuY3R4LmdldEltYWdlRGF0YSgwLCAwLCAxNiwgMTYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFiaWxpdHkgdG8gdW5kbyBjaGFuZ2VzIHdpdGggY21kICsgelxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlLmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCI/XCI6XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWxwRGlhbG9nLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRXNjYXBlXCI6XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRDb21tYW5kLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BlblwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dENvbW1hbmQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRDb21tYW5kLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbmV3RmlsZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJuZXdcIik7XG4gICAgfVxuICAgIHVuZG8oKSB7XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkucHJldikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bmRvXCIpO1xuICAgICAgICAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMuaGlzdG9yeS5wcmV2LCAwLCAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWRvKCkgeyB9XG4gICAgc2F2ZVByZXZSZXYocmV2KSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5wcmV2ID0gcmV2O1xuICAgIH1cbiAgICBzYXZlTmV4dFJldihyZXYpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5Lm5leHQgPSByZXY7XG4gICAgfVxuICAgIGNoYW5nZVRvb2wodG9vbCkge1xuICAgICAgICB0aGlzLnRvb2wgPSB0b29sO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJEaWFsb2dFbGVtZW50IiwiY29uc3RydWN0b3IiLCJzZWxlY3RvciIsInRoaXMiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xvc2VCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2UiLCJ0b2dnbGUiLCJoYXNBdHRyaWJ1dGUiLCJvcGVuIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIldpekZpbGUiLCJ3aWR0aCIsImhlaWdodCIsInBhbGV0dGUiLCJkYXRhIiwiQXJyYXkiLCJmaWxsIiwiSW5wdXRDb21tYW5kIiwiYXBwIiwiY29tbWFuZHMiLCJuIiwibmV3RmlsZSIsImUiLCJ3IiwiaCIsImhlbHBEaWFsb2ciLCJwIiwiUCIsImtleSIsImV4ZWN1dGUiLCJ2YWx1ZSIsImNsYXNzTGlzdCIsImFkZCIsImZvY3VzIiwicmVtb3ZlIiwiY21kIiwic2xpY2UiLCJjb21tYW5kIiwiYXJncyIsInNwbGl0IiwiZGVmYXVsdFBhbGV0dGUiLCJoaXN0b3J5IiwicHJldiIsIm5leHQiLCJ0b29sIiwibGF5ZXIiLCJjb2xvciIsImZpbGUiLCJ1aSIsInN0YXJ0dXBEaWFsb2ciLCJpbnB1dENvbW1hbmQiLCJjYW52YXMiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiZ2V0SXRlbSIsInpvb20iLCJpbWFnZVJlbmRlcmluZyIsInByZXZlbnREZWZhdWx0IiwiZGVsdGEiLCJNYXRoIiwic2lnbiIsImRlbHRhWSIsImJvZHkiLCJhcHBlbmQiLCJpbWFnZURhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJsIiwibGVuZ3RoIiwieSIsIngiLCJpbmRleCIsInB1dEltYWdlRGF0YSIsInNhdmVQcmV2UmV2IiwiZ2V0SW1hZ2VEYXRhIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImZsb29yIiwiY2xpZW50WCIsImxlZnQiLCJjbGllbnRZIiwidG9wIiwic2F2ZU5leHRSZXYiLCJidXR0b25zIiwiY29udGFpbnMiLCJjb25zb2xlIiwibG9nIiwidW5kbyIsInJlZG8iLCJyZXYiLCJjaGFuZ2VUb29sIl0sInNvdXJjZVJvb3QiOiIifQ==