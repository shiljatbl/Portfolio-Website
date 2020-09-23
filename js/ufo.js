$(function() {
    $(".ufo").delay(5000).fadeIn();
  });

let ufo = document.querySelector('.ufo');

ufo.addEventListener('mousemove', (e) => {
  let eyes = document.querySelector('.eyes');
  let mouseX = (eyes.getBoundingClientRect().left); 
  let mouseY = (eyes.getBoundingClientRect().top);
  let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
  let rotationDegrees = (radianDegrees * (180/ Math.PI) * -1) + 180;
  eyes.style.transform = `rotate(${rotationDegrees}deg)`
});

let ufo2 = document.querySelector('.ufo2');

ufo2.addEventListener('mousemove', (e) => {
  let eyes = document.querySelector('.eyes');
  let mouseX = (eyes.getBoundingClientRect().left); 
  let mouseY = (eyes.getBoundingClientRect().top);
  let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
  let rotationDegrees = (radianDegrees * (180/ Math.PI) * -1) + 180;
  eyes.style.transform = `rotate(${rotationDegrees}deg)`
});