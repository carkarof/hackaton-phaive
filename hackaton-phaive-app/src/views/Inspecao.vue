<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row col-md-12" style="justify-content:center">
        <div class="col-xl-3 col-lg-6 ">
          <router-link to="/dimensao">
            <stats-card
              title="Total traffic"
              type="gradient-red"
              sub-title="350,897"
              class="mb-4 mb-xl-0"
              style="cursor:pointer; background-color:#172B4D;"
            >
              <h2 style="color:#FFFFFF">Dimensão 1 - só que o nome inteiro</h2>
              <img src="img/brand/concluido.png" />
            </stats-card>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link to="/dimensao">
            <stats-card
              title="Total traffic"
              type="gradient-orange"
              sub-title="2,356"
              class="mb-4 mb-xl-0"
              style="cursor:pointer; background-color:#172B4D;"
            >
              <h2 style="color:#FFFFFF">Dimensão 1 - só que o nome inteiro</h2>
              <img src="img/brand/concluido.png" />
            </stats-card>
          </router-link>
        </div>
      </div>
      <br />
      <div class="row col-md-12" style="justify-content:center">
        <div class="col-xl-3 col-lg-6">
          <router-link to="/dimensao">
            <stats-card
              title="Sales"
              type="gradient-green"
              sub-title="924"
              class="mb-4 mb-xl-0"
              style="cursor:pointer; background-color:#172B4D;"
            >
              <h2 style="color:#FFFFFF">Dimensão 1 - só que o nome inteiro</h2>
              <img src="img/brand/concluido.png" />
            </stats-card>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link to="/dimensao">
            <stats-card
              title="Performance"
              type="gradient-info"
              sub-title="49,65%"
              class="mb-4 mb-xl-0"
              style="cursor:pointer;background-color:#172B4D;"
            >
              <h2 style="color:#FFFFFF">Dimensão 1 - só que o nome inteiro</h2>
              <img src="img/brand/concluido.png" />
            </stats-card>
          </router-link>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <label for="relatorio">Relatório</label>
          <br />
          <textarea
            id="relatorio"
            style="border-radius:6px; height:100%"
            class="col-md-12"
          />
          <br />
          <input
            type="button"
            value="enviar"
            class="btn btn-primary"
            style="float:right"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style></style>
