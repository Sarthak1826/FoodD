let order = JSON.parse(localStorage.getItem('order')) || [];
const orderList = document.getElementById('order-list');
const steps = document.querySelectorAll('.step');

order.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}`;
    orderList.appendChild(li);
});

let currentStep = 0;

function advanceStep(){
    if(currentStep < steps.length){
        steps[currentStep].classList.add('active');
        currentStep++;
    } else {
        clearInterval(timer);
    }
}


window.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress-line");

  // animate slowly to 100% (10 seconds total)
  setTimeout(() => {
    progress.style.width = "100%";
  }, 500);
});

const timer = setInterval(advanceStep, 3000);
