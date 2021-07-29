
//VARIABLES

let total = 0;
const PREFIJO = "productoID";
const CARRITO = [];
const carritoStorage = [];
let listaDatos = [];
let almacenados = "";
let cantidades = 0;
let totalcantidad = 0;


//MUESTRO LOS PRUDUCTOS POR DOM
//elijo el sector del html
let contenedorProduct = document.getElementById("container-productos");
//EJECUTO METODO READY PARA CARGAR UNA VEZ ME DIGA QUE ESTA TODO OK
$(document).ready(function () {

    //OBTENGO DATOS DESDE JSON - PETISION ASINCRONICA
    $.getJSON("data/data.json", function (respuesta, estado) {
        console.log(respuesta);
        console.log(estado);
        if (estado === "success") {
            listaDatos = respuesta;
            //AGREGAMOS UN NUEVO ELEMENTO AL HTML POR CADA REGISTRO DE DATO ESTATICO
            for (const bici of listaDatos) {
                $(contenedorProduct).append(crearElemento(bici));
            }
             //DETECTAR EVENTOS DE VER
             let botones = document.getElementsByClassName("btnVer");
             console.log(botones);
             for (const boton of botones) {
                 boton.onclick = manejadorVista;
             }

            if ($("#ordenar > option[value=3]").attr("selected", true)) {
              let ordPrecioMenor = listaDatos.sort((precioUno, precioDos) => precioUno.precio - precioDos.precio);
              console.log(ordPrecioMenor);
              
              for (const bici of ordPrecioMenor) {
                $(contenedorProduct).append(crearElemento(bici));
            }
            };
        }
    }
    );
});


//funcion para crear en elemento del DOM
function crearElemento(dato) {
 
    let nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add("col-md-4");
    nuevoElemento.classList.add("col-sm-6");
    nuevoElemento.classList.add("col-xs-12");
    //creo la plantilla del contenido
    nuevoElemento.innerHTML = `
    
                <div class="product-item">
                  <div class="pi-img-wrapper">
                    <img src="${dato.img}" class="img-responsive" alt="${dato.nombre}">
                    <div>
                        <a href="${dato.img}" class="btn btn-default fancybox-button">Zoom</a>
                        <a href="#product-pop-up" class="btn btn-default fancybox-fast-view" ><button id="${dato.id}" class="btnVer" style="background: transparent; border: none; outline: none">View</button></a>
                    </div>
                  </div>
                  <h3><a href="shop-item.html">${dato.nombre}</a></h3>
                  <div class="pi-price">$ ${dato.precio}</div>
                  <a href="javascript:;" class="btn btn-default add2cart">Add to cart</a>
                </div>
               `;
    //agrego cada nodo creado al padre
    contenedorProduct.appendChild(nuevoElemento);
    
    
}
//EVENTO AL HACER CLICK A VER
let productPopUp = document.getElementById("product-pop-up");
function manejadorVista(evento) {
    //determino el id del seleccionado
    //let seleccionado = evento.target.id;
    let seleccionado = listaDatos.find(objeto => objeto.id == evento.target.id);
    console.log(seleccionado);
    productPopUp.innerHTML = "";
    let nuevaVista = document.createElement("div");
    nuevaVista.classList.add("product-page");
    nuevaVista.classList.add("product-pop-up");
    
    
    nuevaVista.innerHTML  = `
    <div class="product-page product-pop-up">
    <div class="row">
      <div class="col-md-6 col-sm-6 col-xs-3">
        <div class="product-main-image">
          <img src="${seleccionado.img}" alt="${seleccionado.nombre}" class="img-responsive">
        </div>
        <div class="product-other-images">
          <a href="javascript:;" class="active"><img alt="${seleccionado.nombre}" src="${seleccionado.img}"></a>
          <a href="javascript:;"><img alt="${seleccionado.nombre}" src="${seleccionado.img}"></a>
          <a href="javascript:;"><img alt="${seleccionado.nombre}" src="${seleccionado.img}"></a>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-9">
        <h1>${seleccionado.nombre}</h1>
        <div class="price-availability-block clearfix">
          <div class="price">
            <strong><span>$</span>${seleccionado.precio}</strong>
            <em>$<span>62.00</span></em>
          </div>
          <div class="availability">
            Availability: <strong>In Stock</strong>
          </div>
        </div>
        <div class="description">
          <p>Lorem ipsum dolor ut sit ame dolore  adipiscing elit, sed nonumy nibh sed euismod laoreet dolore magna aliquarm erat volutpat 
Nostrud duis molestie at dolore.</p>
        </div>
        <div class="product-page-options">
          <div class="pull-left">
            <label class="control-label">Size:</label>
            <select class="form-control input-sm">
              <option>L</option>
              <option>M</option>
              <option>XL</option>
            </select>
          </div>
          <div class="pull-left">
            <label class="control-label">Color:</label>
            <select class="form-control input-sm">
              <option>Red</option>
              <option>Blue</option>
              <option>Black</option>
            </select>
          </div>
        </div>
        <div class="product-page-cart">
          <div class="product-quantity">
              <input id="product-quantity" type="text" value="1" readonly name="product-quantity" class="form-control input-sm">
          </div>
          <button class="btn btn-primary" type="submit">Add to cart</button>
          <a href="shop-item.html" class="btn btn-default">More details</a>
        </div>
      </div>

      <div class="sticker sticker-sale"></div>
    </div>
  </div>
    `;

    productPopUp.appendChild(nuevaVista);

};

