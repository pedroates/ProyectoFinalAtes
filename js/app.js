//e-commerce: El array con los productos los coloco en un archivo js (products.js).
//Lo que tiene que ver con el carrito tambien lo coloco en otro archivo js (carrito.js).

//Aca creo etiquetas con DOM y utilizo evento click.
//Creo un carrito con un modal.
//eliminto productos del carrito y agrego cantidades.
//guardo el carrito en el localstorage.
//agrego promesas y asincronia con archivo json.
//agregue libreria toastify js para agregar un producto al carrito y otro para eliminar.



const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <Image src= "${product.Image}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement("button")
        comprar.innerText = "comprar";
        comprar.className = "comprar"
    
        content.append(comprar);
    
        comprar.addEventListener("click", () => {
            Toastify({
                text: "producto agregado",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "blue",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: "0.75rem" 
                },
                offset: {
                    x: '2rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: '5.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
                onClick: function(){} // Callback after click
                }).showToast();
            const repetido = carrito.some((repetidoProduct) => repetidoProduct.id === product.id);
    
            if (repetido){
                carrito.map((prod) => {
                    if(prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
            carrito.push({
                id: product.id,
                Image: product.Image,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
            console.log(carrito);
            carritoCounter();
            saveLocal();
        });
    });
    
}

getProducts();




//set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};





