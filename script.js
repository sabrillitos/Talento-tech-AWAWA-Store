document.addEventListener("DOMContentLoaded", ()=>{

    var productsContainer=document.getElementById('products-container');

    fetch("https://dummyjson.com/products?limit=14")
        .then(response=>response.json())
        .then(data=>{

            var products =data.products ;

            productsContainer.innerHTML = "";

            products.forEach((product) =>{
            
                const prodDiv = document.createElement("div");

                prodDiv.className = "col-md-3";

                prodDiv.innerHTML = `
                <div class="card mt-3">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-price">${product.price}USD</p>
                    <div class="button-container d-grid gap-3 d-md-flex justify-content-md-center">
                        <button class="delete-button btn btn-primary me-md-2" type="button">Delete</button>
                        <button class="add-button btn btn-primary" type="button">Add to <i class="bi bi-cart"></i></button>
                    </div>
                    </div>
                </div>`;

                const buttonAdd = prodDiv.querySelector(".add-button");

                buttonAdd.addEventListener("click",()=>{
                    addToCart(product)
                });    

                productsContainer.appendChild(prodDiv);
            })
            .catch(error=>console.log("Errror de conexión", error));

    });
});

    function addToCart(product){
        let cart= JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.title} has been added to cart!`);
    }

//////////////////////////CART FUNCTIONS/////////////////////////////

document.addEventListener("DOMContentLoaded", ()=>{

    const cartItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];

    const cartTableBody = document.getElementById('cart-items');
    
    const totalPrice = document.getElementById('total');
    let total = 0;
    let subtotal = 0;

    cartItemsStorage.forEach(item =>{

        const row = document.createElement("tr");

        var cellName=document.createElement('td');
        cellName.textContent=item.title;
        row.appendChild(cellName);

        var cellPrice=document.createElement('td');
        cellPrice.textContent=item.price;
        row.appendChild(cellPrice);

        var cellQuantity=document.createElement('td');
        cellQuantity.textContent= 1;
        row.appendChild(cellQuantity);

        subtotal+= item.price
        var cellSubtotal = document.createElement('td');
        cellSubtotal.textContent = subtotal.toFixed(2);
        row.appendChild(cellSubtotal);

        cartTableBody.appendChild(row);

    });

    total+=subtotal;
    totalPrice.textContent = total.toFixed(2);

//boton limpiar carrito
    document.getElementById('clean-cart').addEventListener('click', () => {

        localStorage.removeItem('cart');
        window.location.href = 'index.html';

    });

//botón finalizar compra
    document.getElementById('end-purchase').addEventListener('click', () => {

        localStorage.removeItem('cart');
        alert(`Purchase processed. Your purchase number is: #4586`);
        window.location.href = 'index.html';

    });

});
