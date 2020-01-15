const products_container = document.getElementById('products');
const span_status = document.getElementById('span-status');
const create_submit = document.getElementById('create-submit');

const carrito = document.getElementById('carrito');
const cart_container = document.querySelector('.cart-container');
const items_container = document.getElementById('items-container');



class Product {
    constructor(nombre, precio, categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

function displayQuanty() {
    document.getElementById("quanty_items").innerHTML = `(${sessionStorage.length - 1})`;
}

window.onload = () => {
    if (localStorage.length > 1) {
        displayQuanty();
        displayProducts();
        displayCart();
    }
}

carrito.addEventListener('click', (e) => {
    cart_container.style.display = 'block';
});



create_submit.addEventListener('click', (e) => {
    createProduct();
    e.preventDefault();
    displayProducts();
})

function createProduct() {
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    let categoria = document.getElementById('categories').value;
    span_status.innerHTML = '';
    if (nombre.length > 0) {
        producto = new Product(nombre, precio, categoria);
        localStorage.setItem(`product-${localStorage.length + 1}`, JSON.stringify(producto));
        span_status.innerHTML = 'Producto cargado.';
        document.getElementById('nombre').value = '';
        document.getElementById('precio').value = '';
    } else {
        span_status.innerHTML = 'Datos incorrectos.'
    }
}

function displayProducts() {
    products_container.innerHTML = '';
    if (localStorage.length > 0 && localStorage !== null) {
        for (let i = 0; i < 8; i++) {
            const ObjProduct = JSON.parse(localStorage.getItem(localStorage.key(i)));
            let product_box = document.createElement('div');
            product_box.className = 'product_box';
            product_box.innerHTML = `
            <img src="/cruce/assets/images/img_reloj.png" alt="">
            <div class='product-info'>
            <p class='prod_cat'>${ObjProduct.categoria}</p>
            <p class='prod_name'>${ObjProduct.nombre}</p>
            <p class='prod_price'>$${ObjProduct.precio}</p>
            </div>`;
            btn_add = document.createElement('button');
            btn_add.className = 'add-item';
            btn_add.innerHTML = 'Agregar';
            btn_add.id = localStorage.key(i);
            btn_add.addEventListener('click', (e) => {
                sessionStorage.setItem(`item-${e.target.id}`,localStorage.getItem(localStorage.key(i)));
                displayQuanty();
                displayCart();
            });
            products_container.append(product_box);
            product_box.append(btn_add);
        }
    }
};


function displayCart() {
    items_container.innerHTML = '';
    if (localStorage.length > 0) {
        for (key in sessionStorage) {
            if (sessionStorage.getItem(key) !== 'true') {
                const ObjItem = JSON.parse(sessionStorage.getItem(key));
                let item_box = document.createElement('div');
                item_box.className = 'item_box';
                item_box.innerHTML = `
                <img class='cart-img' src="/cruce/assets/images/img_reloj.png" alt="">
                <p>${ObjItem.nombre}</p>
                <p>$${ObjItem.precio}</p>`;
                btn_remove = document.createElement('p');
                btn_remove.innerHTML = 'Quitar';
                btn_remove.className = 'remove-btn';
                btn_remove.id = key;
                btn_remove.addEventListener('click', (e) => {
                    sessionStorage.removeItem(e.target.id);
                    displayCart();
                })
                items_container.append(item_box);
                item_box.append(btn_remove);
            }
        }
    }
}

const info_cart = document.createElement('div');
info_cart.innerHTML = `
    <button class='btn-cart'>Finalizar compra</button>
    <a href='#'>Seguir comprando</a>
`;
cart_container.append(info_cart);