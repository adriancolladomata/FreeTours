<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Import Bootstrap CSS y JS desde node_modules o assets
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Importar el CSS de la plantilla (carousel.css)
import '../assets/carousel.css'

import NavBar from '@/components/NavBar.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'


</script>

<template>

  <div id="app">

    <!-- HEADER / NAVBAR -->
    <NavBar></NavBar>

    <!-- MAIN CONTENT -->
    <main class="mt-5 pt-5"> <!-- Ajuste para navbar fixed-top -->
      
      <!-- CAROUSEL -->
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"
                  aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" style="width: 1857px;">
          <div class="carousel-item active">
            <div class="bd-placeholder-img" style="
                width: 100%; 
                height: 100%; 
                background-image: url('https://images.unsplash.com/photo-1561632669-7f55f7975606?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                background-size: cover;
                background-position: center;
                filter: brightness(50%);">
            </div>
            <div class="container">
              <div class="carousel-caption text-start">
                <h1 class="font-weight-bold">Wanderly</h1>
                <p style="font-weight: bold;">Únete a algunos de nuestros tours por toda España y adéntrate en nuevas aventuras acompañado</p>
                <p><a class="btn btn-lg text-light btn-danger" href="/about_us" aria-label="Ver más">Ver más</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="bd-placeholder-img" style="
                width: 100%; 
                height: 100%; 
                background-image: url('https://images.unsplash.com/photo-1600818767171-fde3f6e1d275?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                background-size: cover;
                background-position: center;
                filter: brightness(50%);">
            </div>
            <div class="container">
              <div class="carousel-caption">
                <h1>¿Aún no has iniciado sesión?</h1>
                <p style="font-weight: bold;">Anímate a compartir experiencias con otras personas y reserva la ruta que prefieras</p>
                <p><button class="btn btn-lg text-light btn-danger" data-bs-toggle="modal" data-bs-target="#loginModal">Inicia sesión</button> o 
                  <button class="btn btn-lg text-light btn-danger" data-bs-toggle="modal" data-bs-target="#registerModal">Regístrate</button></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="bd-placeholder-img" style="
                width: 100%; 
                height: 100%; 
                background-image: url('https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                background-size: cover;
                background-position: center;
                filter: brightness(50%);">
            </div>
            <div class="container">
              <div class="carousel-caption text-end">
                <h1>Rutas por toda España</h1>
                <p style="font-weight: bold;">Al alcance de un click. Descubre nuevas localizaciones y aprende más sobre la tierra que nos rodea.</p>
                <p><a class="btn btn-lg text-light btn-danger" href="#">Ver rutas disponibles</a></p>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <!-- MARKETING CONTENT / FEATURETTES -->
      <div class="container marketing mt-5">

        <div class="row">
          <div class="col-lg-4 text-center mb-4">
            <svg class="bd-placeholder-img rounded-circle" width="140" height="140">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </svg>
            <h2>Heading</h2>
            <p>Some representative placeholder content for the first column.</p>
            <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
          </div>
          <div class="col-lg-4 text-center mb-4">
            <svg class="bd-placeholder-img rounded-circle" width="140" height="140">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </svg>
            <h2>Heading</h2>
            <p>Some representative placeholder content for the second column.</p>
            <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
          </div>
          <div class="col-lg-4 text-center mb-4">
            <svg class="bd-placeholder-img rounded-circle" width="140" height="140">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </svg>
            <h2>Heading</h2>
            <p>Some representative placeholder content for the third column.</p>
            <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
          </div>
        </div>

        <!-- FEATURETTES -->
        <hr class="featurette-divider">
        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
            <p class="lead">Some great placeholder content for the first featurette here.</p>
          </div>
          <div class="col-md-5">
            <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500">
              <rect width="100%" height="100%" fill="#eee"/>
              <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
            </svg>
          </div>
        </div>

        <!-- Puedes repetir los featurettes igual que en la plantilla original -->

      </div>

    </main>

    <!-- FOOTER -->
    <footer class="container mt-5">
      <p class="float-end"><a href="#">Volver arriba</a></p>
      <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>

    <!-- LOGIN MODAL -->
    <div class="modal fade" id="loginModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title text-uppercase" style="color: #dc3545;">Wanderly</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <Login />
          </div>

          <div class="modal-footer d-flex justify-content-center align-items-center">
            <p class="text-center">¿No tienes cuenta?</p>
            <button class="btn btn-link text-center" data-bs-toggle="modal" data-bs-target="#registerModal" data-bs-dismiss="modal"> Regístrate</button>
          </div>

        </div>
      </div>
    </div>

    <!-- REGISTER MODAL -->
    <div class="modal fade" id="registerModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title text-uppercase" style="color: #dc3545;">Wanderly</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <Register />
          </div>

          <div class="modal-footer d-flex justify-content-center align-items-center">
            <p class="text-center">¿Ya estás registrado/a?</p>
            <button class="btn btn-link text-center" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-dismiss="modal">Inicia sesión</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
