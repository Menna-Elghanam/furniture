const showhidepw = document.querySelectorAll(".showhidepw");
const password = document.querySelectorAll(".password");
//js code to show/hide password txt and icon
showhidepw.forEach(eyeicon => {
    eyeicon.addEventListener("click", () => {
        password.forEach(password => {
            if (password.type == "password") {
                password.type = "text";
                showhidepw.forEach(icon => {
                    icon.classList.replace("fa-eye-slash", "fa-eye");
                })
            }
            else {
                password.type = "password";
                showhidepw.forEach(icon => {
                    icon.classList.replace("fa-eye", "fa-eye-slash");
                })
            }
        })
    })

})

//  start search bar
const search = () => {
    // search_box variable store what user enter
    const saerch_box = document.getElementById("search_item").value.toUpperCase();
    //for parent
    const store_itemm = document.getElementById("modern-container");
    //for single product
    const product = document.querySelectorAll(".product_list");
    // to get single product name
    const p_name = store_itemm.getElementsByTagName("h3");

    //for loop to arrange products according to product name (search values)
    for (var i = 0; i < p_name.length; i++) {
        let match = product[i].getElementsByTagName('h3')[0];
        if (match) {
            let data_entered = match.textContent || match.innerHTML
            if (data_entered.toLocaleUpperCase().indexOf(saerch_box) > -1) {
                product[i].style.display = "";
            }
            else {
                product[i].style.display = "none";
            }
        }

    }

}
//end search bar


// cart 
let cart_icon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let close_cart = document.querySelector('#close-cart');
//open cart
cart_icon.onclick = () => {
    cart.classList.add('active');
};
//close cart
close_cart.onclick = () => {
    cart.classList.remove('active');
};
//cart working
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
//making functions 
function ready() {
    //remove
    var remove_cart_button = document.getElementsByClassName('cart-remove');
    console.log(remove_cart_button);
    for (var i = 0; i < remove_cart_button.length; i++) {
        var button = remove_cart_button[i];
        button.addEventListener('click', remove_cart_item);

    }
    //quantity change
    var quantity_inputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantity_inputs.length; i++) {
        var input = quantity_inputs[i];
        input.addEventListener('change', quantity_change);
    }
    //add to cart
    var add_cart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < add_cart.length; i++) {
        var button = add_cart[i];
        button.addEventListener('click', add_cart_click);
    }


}
//remove items from cart
function remove_cart_item(event) {
    var buutton_clicked = event.target;
    buutton_clicked.parentElement.remove();
    update_total();

}
//quantity_change
function quantity_change(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    update_total()
}
//add to cart
function add_cart_click(event) {
    var button = event.target;
    var shop_products = button.parentElement;
    var title = shop_products.getElementsByClassName('product_title')[0].innerText;
    var price = shop_products.getElementsByClassName('product-price')[0].innerText;
    var image = shop_products.getElementsByClassName('product-img')[0].src;


    add_product_to_catr(title, price, image);
    update_total()

}

function add_product_to_catr(title, price, image) {
    var cart_shop_box = document.createElement("div");
    cart_shop_box.classList.add('cart-box');
    var cart_items = document.getElementsByClassName('cart-content')[0];
    var cart_item_names = cart_items.getElementsByClassName('cart-product-title');


    var cart_box_content = `
    <img src="${image}" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>`;
    cart_shop_box.innerHTML = cart_box_content;
    cart_items.append(cart_shop_box);
    cart_shop_box.getElementsByClassName('cart-remove')[0].addEventListener('click', remove_cart_item);
    cart_shop_box.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantity_change);

    return;
}




//update total 
function update_total() {
    var cart_content = document.getElementsByClassName('cart-content')[0];
    var cart_boxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cart_boxes.length; i++) {
        var cart_box = cart_boxes[i];
        var price_element = cart_box.getElementsByClassName('cart-price')[0];
        var quantity_element = cart_box.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(price_element.innerText.replace("$", ""));
        var quantity = quantity_element.value;
        total = total + price * quantity;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;



    }
}


//cart