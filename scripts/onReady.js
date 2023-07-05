function isPhone() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
}
 
 
const About = () => {  
    $js(`#aboutClose`).onClick(() => {
         window.location.href = '/Index/index.html' 
    }) 
}
 



document.addEventListener("DOMContentLoaded", () => { 
   About()
});  

 