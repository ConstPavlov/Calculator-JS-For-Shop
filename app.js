const tariff = Array.from(document.querySelectorAll('.tariff'));
const options = Array.from(document.querySelectorAll('.option'));
const total = document.getElementById('total');
const orderTariff = document.querySelector('#order__tariff');
const orderTime = document.querySelector('#order__time');
const orderOption = document.querySelector('#order__option');

const time = document.querySelector('#time');
const volume = document.querySelector('#volume');

const priceInfo = {
  tariff: {
    economy: 500,
    comfort: 800,
    business: 1100,
    premium: 1400,
  },
  option: {
    option1: 1000,
    option2: 1500,
    option3: 1500,
    option4: 2000,
  },
};
let currentSet = {
  tariff: "comfort",
  time: 2,
  option: [],
  getTariffPrice() {
    return priceInfo.tariff[this.tariff];
  },
  getOptionPrice(){
    let optionPrice = 0;
    if (!this.option.length == 0){
      this.option.forEach(el =>{
        optionPrice += priceInfo.option[el]
      })
    }
    return optionPrice;
  }


};

tariff.forEach((el) => {
  el.addEventListener('click', tariffUpdate);
})

options.forEach(el => {
  el.addEventListener('change', optionUpdate);
})

time.addEventListener('input', timeUpdate);


function tariffUpdate(e){
  currentSet.tariff = e.target.id;
  updatePrice();
  orderUpdate();
}

function timeUpdate(){
  currentSet.time = time.value
  volume.value = currentSet.time
  updatePrice();
  orderUpdate()

}
function optionUpdate(e){
  e.stopPropagation()
  let opt = e.target.id
  if (e.target.checked){
    currentSet.option.push(opt);
  } else {
    let index = currentSet.option.indexOf(opt);
    currentSet.option.splice(index, 1);
  }
  updatePrice();
  orderUpdate();
  console.log(currentSet.option)
}


function updatePrice() {
  let currentOptPrice = currentSet.getOptionPrice();
  let price = currentSet.getTariffPrice();
  let totalPrice = price * currentSet.time + currentOptPrice
  total.value = totalPrice;
}

function orderUpdate(){
  if (currentSet.time < 5){
    orderTime.value = currentSet.time + "часа";
  } else {
    orderTime.value = currentSet.time + "часов";
  }
  orderTariff.value = currentSet.getTariffPrice() + " \u{20BD}/час";

  orderOption.value = currentSet.getOptionPrice() + " \u{20BD}";
}


