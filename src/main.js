//boton modo oscuro

const fondo = document.getElementById("fondo");


    fondo.addEventListener("click", function() {
      if(document.body.style.backgroundColor === "") {
        document.body.style.backgroundColor = "black";
        document.body.style.color= "";
      }else{
        document.body.style.backgroundColor = "";
        document.body.style.color= "black";

      }
    });

    const input = document.getElementById("input");
    const agregar = document.getElementById("agregar");
    const lista = document.getElementById("lista");
    const numero = document.getElementById("numero");
    const quitar = document.getElementById("quitar");

    agregar.addEventListener("click", function() {
        const texto = input.value;

        if(texto !== "") {
            const li = document.createElement("li");
            li.textContent = texto;

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Delete";

            const botonListo = document.createElement("button");
            botonListo.textContent = "Done";

            const botonEditar = document.createElement("button");
            botonEditar.textContent = "Edit";

            botonEliminar.onclick = function() {  
              li.remove();
              numero.textContent--;
            };
            botonListo.onclick = function() {  
              li.style.textDecoration = "line-through";
              li.style.textDecorationColor = "red"; 
            };
            
            botonEditar.onclick = function() {  
              const textoActual = li.firstChild.textContent; 

              const nuevoTexto = prompt("Editar tarea:", textoActual);
              if (nuevoTexto !== "") {
                li.firstChild.textContent = nuevoTexto;
              };
            }

            li.appendChild(botonEliminar);
            li.appendChild(botonEditar);
            li.appendChild(botonListo);
            
            lista.appendChild(li);
            numero.textContent++;


        }
    });


  //  quitar.addEventListener("click", function() {
  //         if (lista.firstElementChild) {
  //             lista.firstElementChild.remove();
  //             numero.textContent--;
  //         }
  //       });