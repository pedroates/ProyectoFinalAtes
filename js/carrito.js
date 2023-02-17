    const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML =`
        <image src="${product.Image}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <p>Cantidad: ${product.cantidad}</p>
        <p> Total: ${product.cantidad * product.precio}</p>
    `;

    modalContainer.append(carritoContent);

    let eliminar = document.createElement("span");
    eliminar.innerText = "❌";
    eliminar.className = "borrar-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarproducto);

    });



    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
    };

    verCarrito.addEventListener("click", pintarCarrito);

    const eliminarproducto = () => {

        Toastify({
            text: "producto eliminado",
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
                x: '1.2rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '5.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            onClick: function(){} // Callback after click
            }).showToast();
        const encontrar = carrito.find((el) => el.id);

        
        carrito = carrito.filter((carritoId) => {
            return carritoId !== encontrar;
            
        });

        


        carritoCounter();
        saveLocal();
        pintarCarrito();
    };

    const carritoCounter = () => {
        cantidadCarrito.style.display = "block";

        const carritoLength = carrito.length;

        localStorage.setItem("carritoLength", JSON.stringify(carritoLength));



        cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

    };

    carritoCounter();
