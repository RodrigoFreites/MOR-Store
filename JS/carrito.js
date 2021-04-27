(function(){
    function $(selector){
        return document.querySelector(selector);
    }
    function Carrito(){
        this.catalogoPerfumes = [{id:'P01', nombre:'BOOS Intense', precio:3500 , imagen:'boose-intense.png'},
                                {id:'P02', nombre:'SHAKIRA Dance', precio:4300 , imagen:'shakira-dance.png'},
                                {id:'P03', nombre:'Gino Bogani TOUT NOIR', precio:3000 , imagen:'gino-bogani-tout.png'},
                                {id:'P04', nombre:'Wellington Polo Club (for her)', precio:2600 , imagen:'wellington-forher.png'},
                                {id:'P05', nombre:'Ciel Crystal', precio:3000 , imagen:'ciel-crystal.png'},
                                {id:'P06', nombre:'Ciel Nuit', precio:3000 , imagen:'ciel-nuit.jpg'},
                                {id:'P07', nombre:'Secret Temptation', precio:6000 , imagen:'secret-temp1.png'}];
        this.constructor = function(){
            if(!localStorage.getItem("carrito")){
                localStorage.setItem('carrito','[]');
            }
        }
        this.getCarrito = JSON.parse(localStorage.getItem("carrito"));
        this.agregarItem = function(item){
            for(i of this.catalogoPerfumes){
                if(i.id === item){
                    var registro = i
                }
            }
            if(!registro){
                return
            }

            for (i of this.getCarrito){
                if(i.id === item){
                    i.cantidad++;
                    console.log(this.getCarrito);
                    localStorage.setItem("carrito",JSON.stringify(this.getCarrito))
                    return;
                }
            }
            registro.cantidad = 1;
            this.getCarrito.push(registro);
            console.log(this.getCarrito);
            localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
        }
        this.getTotal = function(){
            var total = 0;
            for (i of this.getCarrito) {
                total += parseFloat(i.cantidad) * parseFloat(i.precio);
            }
            return total;
        }
        this.eliminarItem = function(item){
            for (var i in this.getCarrito) {
                if(this.getCarrito[i].id === item){
                    this.getCarrito.splice(i,1);
                }
            }
            localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
        }
    }
    function Carrito_View(){
        this.renderCatalogo = function(){
            var template = ``
        for (var i in carrito.catalogoPerfumes) {
            template += `
            <div class="column is-one-quarter">
            <div class="card">
                <div class="card-image">
                    <img src="./images/perfumes/${carrito.catalogoPerfumes[i].imagen}" alt="Placeholder">
                </div>
                <div class="card-content">
                    <h2 class="title is-3">${carrito.catalogoPerfumes[i].nombre}</h2>
                    <br>
                    <h3 class="subtitle is-4">Precio: <strong>$${carrito.catalogoPerfumes[i].precio}</strong></h3>
                </div>
                <div class="card-footer">
                    <a href="#" class="card-footer-item" id="addItem" data-producto="${carrito.catalogoPerfumes[i].id}">Agregar al Carrito</a>
                </div>
            </div>
        </div>
            `;
        }
        $("#catalogo").innerHTML = template
        }
        this.showModal = function(){
            $("#modal").classList.toggle('is-active');
            this.renderCarrito();
        }
        this.hideModal = function(ev){
            if (ev.target.classList.contains("toggle")) {
                this.showModal();
            }
        }
        this.renderCarrito = function(){
            if(carrito.getCarrito.length <= 0){
                var template = `<div class="is-12"><p class="title is-1 has-text-centered">No haz agregado Productos</p></div><br>`;
                $("#productosCarrito").innerHTML = template;
            }else{
                $("#productosCarrito").innerHTML = "";
                var template = ``
                for(i of carrito.getCarrito){
                    template += `
                    <div class="columns">
                    <div class="column is-3">
                    <figure>
                        <img src="./images/perfumes/${i.imagen}" alt="">
                    </figure>
                    </div>
                    <div class="column is-3">${i.nombre}</div>
                    <div class="column is-2 has-text-centered">$${i.precio}</div>
                    <div class="column is-1 has-text-centered">${i.cantidad}</div>
                    <div class="column is-2 has-text-centered"><strong><i>${i.cantidad * i.precio}</i></strong></div>
                    <div class="column is-1"><p class="field"><a href="#" class="button is-danger"><span class="icon"><i class="far fa-trash-alt" id="deleteProducto" data-producto="${i.id}"></i></span></a></p></div>
                </div>
                `;
            }
            $("#productosCarrito").innerHTML = template;
        }
        $("#totalCarrito > strong").innerHTML = "$"+carrito.getTotal();
        }
    }

    var carrito = new Carrito();
    var carrito_view = new Carrito_View();

    document.addEventListener('DOMContentLoaded',function(){
        carrito.constructor();
        carrito_view.renderCatalogo();
    });

    $("#btn_carrito").addEventListener("click",function(){
        carrito_view.showModal();
    });

    $("#modal").addEventListener("click",function(ev){
        carrito_view.hideModal(ev);
    })

    $("#catalogo").addEventListener("click",function(ev){
        ev.preventDefault();
        if(ev.target.id === "addItem"){
            var id = ev.target.dataset.producto;
            carrito.agregarItem(id);
        }
        alert("Se ha agregado el producto al carrito");
        carrito_view.showModal();
        carrito_view.totalProductos(); 
    });

    $("#productosCarrito").addEventListener("click",function(ev){
        ev.preventDefault();
        if(ev.target.id === "deleteProducto"){
            carrito.eliminarItem(ev.target.dataset.producto);
            carrito_view.renderCarrito();
            carrito_view.totalProductos();
        }
    })

})();