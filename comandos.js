/*comandos que tuve que utilizar en el terminal
 npm install express body-parser cors
 npm init -y
 touch src/app.js
  node app.js (si no ejecutas app no se conectara al puerto y no se podra utilizar)
  */
    $(function () {
    
      function cargarClientes() {
        $.get('http://localhost:3000/clientes', function (data) {
          $('#cartas').empty();
          for (let cliente of data) {
            $("#cartas").append(
              `<div class="carta" data-id="${cliente.id}">
                <div class="imagen">
                  <img src="${cliente.imagen}" alt="${cliente.nombre}">
                </div>
                <div class="nombre">${cliente.nombre}</div>
                <div class="descripcion">${cliente.descripcion}</div>
                <div class="eliminar"><button>🗑</button></div>
              </div>`
            );
          }
        });
      }

      cargarClientes(); 


      $("#busqueda button").click(function () {
        let elemento = $("#busqueda input").val().toLowerCase();
        $(".carta").each(function () {
          let nombre = $(this).find(".nombre").text().toLowerCase();
          if (nombre.includes(elemento)) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
      });


      $("#cartas").on("click", ".eliminar button", function () {
        let id = $(this).closest(".carta").data("id");
        $.ajax({
          url: `http://localhost:3000/clientes/${id}`,
          type: 'DELETE',
          success: function () {
            cargarClientes();
          }
        });
      });


      $("#añadir").click(function () {
        $("#modal").show();
      });


      $("#crear").click(function () {
        let nombre = $("#nombre").val();
        let descripcion = $("#descripcion").val();
        let imagen = $("#imagen").val();

        if (nombre && descripcion && imagen) {
          let nuevoCliente = {
            imagen: imagen,
            nombre: nombre,
            descripcion: descripcion
          };

          $.post('http://localhost:3000/clientes', nuevoCliente, function (data) {
            cargarClientes();
            $("#modal").hide();
            $("#nombre").val("");
            $("#descripcion").val("");
            $("#imagen").val("");
          });
        }
      });

      $(document).on("click", function (e) {
        if (!$(e.target).closest("#modalpadre, #añadir").length) {
          $("#modal").hide();
        }
      });
    });
