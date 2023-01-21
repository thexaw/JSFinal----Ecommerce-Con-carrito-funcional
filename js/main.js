// Femenino //
let women = document.getElementById("women");

let menmen = document.getElementById("men");

let basket = JSON.parse(localStorage.getItem("data")) || [];



let generateWomen = () => {
    return (women.innerHTML = womenItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div class="card">
        <img src=${img} alt="Pantalon claro 1">
        <div class="card__info"><h3>${name}
        </h3>
            <p>${desc} 
            </p>  
            <div class="btnbuy">
                <div class="price-quantity">
                <p><span>${price}</span>$</p>
            </div>
            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>

              </div>
                
                <button onclick="location.href = '../pages/cart.html'" type="button"> buy now</button>
            </div> 
            </div> 
        </div>
        `;
      })
      .join(""));
  };


let generateMen = () => {
    return (men.innerHTML = menItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div class="mcard">
        <img src=${img} alt="pantalon masculino deportivo claro">
        <div class="mcard__info"><h3>${name}
        </h3>
            <p>${desc}
            </p>  
            <div class="mbtnbuy">
            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                <p><span>${price}</span>$</p>

            </div>
            <button onclick="location.href = '../pages/cart.html'" type="button"> buy now</button> 
            </div> 
    </div>
        `;
      })
      .join(""));
  };

  function checkForId() {
    var element = document.getElementById("women");
    if (element) {
        generateWomen();
    } else {
        generateMen();
    }
}
checkForId();


let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
    search.item += 1;
    }

    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
  };

  let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((acc, cur) => acc + cur, 0);
  };
  
  calculation();