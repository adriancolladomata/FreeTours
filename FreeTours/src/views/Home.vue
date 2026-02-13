<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Import Bootstrap CSS y JS desde node_modules o assets
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Importar el CSS de la plantilla (carousel.css)
import '../assets/carousel.css'

import NavBar from '@/components/NavBar.vue'

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
            <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                 aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
            </svg>
            <div class="container">
              <div class="carousel-caption text-start">
                <h1>Example headline.</h1>
                <p>Some representative placeholder content for the first slide of the carousel.</p>
                <p><a class="btn btn-lg btn-primary" href="login">Sign up today</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                 aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
            </svg>
            <div class="container">
              <div class="carousel-caption">
                <h1>Another example headline.</h1>
                <p>Some representative placeholder content for the second slide of the carousel.</p>
                <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                 aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
            </svg>
            <div class="container">
              <div class="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>Some representative placeholder content for the third slide of this carousel.</p>
                <p><a class="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
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
      <p class="float-end"><a href="#">Back to top</a></p>
      <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>

  </div>
</template>
