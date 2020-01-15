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

window.onload = () => {
    displayProducts();
    displayQuanty();
}

carrito.addEventListener('click', e => {
    displayCart();
    if(document.querySelector('.subtotal')){
        getTotal();
    }
    cart_container.style.display = 'block';
});

create_submit.addEventListener('click', (e) => {
    createProduct();
    e.preventDefault();
    displayProducts();
})

// Muestra cantidad de items en el carrito

function displayQuanty() {
    document.getElementById("quanty_items").innerHTML = `${sessionStorage.length - 1}`;
}

// Crea un producto nuevo

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
        span_status.innerHTML = 'Datos incorrectos.';
    }
}

// Muestra el carrousel de productos

function displayProducts() {
    products_container.innerHTML = '';
    if (localStorage.length > 0) {
        for (let i = 0; i < 8; i++) {
            if (localStorage.getItem(localStorage.key(i)) !== null) {
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
                // Agrega item al carrito
                btn_add.addEventListener('click', (e) => {
                    sessionStorage.setItem(`item-${e.target.id}`, localStorage.getItem(localStorage.key(i)));
                    displayCart();
                    displayQuanty();
                    getTotal();
                });
                products_container.append(product_box);
                product_box.append(btn_add);
            }
        }
    }
};

// Muestra el carrito de compras

function displayCart() {
    items_container.innerHTML = '';
    let info_cart = document.createElement('div');
    if (sessionStorage.length > 1) {
        for (let i = 0; i < sessionStorage.length; i++) {
            if (sessionStorage.key(i).startsWith('item-product')) {
                const ObjItem = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
                let item_box = document.createElement('div');
                item_box.className = 'item_box';
                item_box.innerHTML = `
                <img class='cart-img' src="/cruce/assets/images/img_reloj.png" alt="">
                <p class='item-name'>${ObjItem.nombre}</p>
                <p class='item-price'>$${ObjItem.precio}</p>`;
                btn_remove = document.createElement('p');
                btn_remove.innerHTML = 'Quitar';
                btn_remove.className = 'remove-btn';
                btn_remove.id = sessionStorage.key(i);
                // Remueve item del carrito
                btn_remove.addEventListener('click', (e) => {
                    sessionStorage.removeItem(e.target.id);
                    displayCart();
                    displayQuanty();
                    if (document.querySelector('.subtotal')) {
                        getTotal();
                    }
                })
                items_container.append(item_box);
                item_box.append(btn_remove);
            }
        }
        info_cart.innerHTML = `
            <div>
            <span>Subtotal</span><span class='subtotal'></span>
            </div>
            <button class='btn-cart'>Finalizar compra</button>
            <a class='seguir-comprando' href='#'>Seguir comprando</a>`;
    }
    else {
        info_cart.innerHTML = 'Aún no hay artículos cargados';
    }
    items_container.append(info_cart);
}

// Obtiene el total de los items del carrito

function getTotal() {
    let total = 0;
    if (sessionStorage.length > 0) {
        for (let i = 0; i < sessionStorage.length; i++) {
            if (sessionStorage.key(i).startsWith('item-product')) {
                let obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
                total = total + (+obj.precio);
            }
        }
        document.querySelector('.subtotal').innerHTML = `$${total}`;
        return total;
    }
}