<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 50px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img src="img/theme/casa.jpg" class="rounded-circle" />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            ></div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  >
                    <!-- <div>
                                            <span class="heading">1</span>
                                            <span class="description">Código</span>
                                        </div>
                                        <div>
                                            <span class="heading">10</span>
                                            <span class="description">Photos</span>
                                        </div>
                                        <div>
                                            <span class="heading">89</span>
                                            <span class="description">Comments</span>
                    </div>-->
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Fundação Acolhimento Infantil</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Salvador, Bahia
                </div>
                <div class="h5 mt-2">
                  <i class="ni business_briefcase-24 mr-2"></i>CNPJ -
                  858.910.356/0000-57
                </div>
                <div>
                  <div class="row">
                    <stats-card
                      title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      class="mb-4 mb-xl-0 card-dark"
                    >
                      <template slot="footer">
                        <span class="text-nowrap">12 acolhidos Atualmente</span>
                      </template>
                    </stats-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-4">
                  <h3 class="mb-0">Entidades</h3>
                </div>
                <div class="col-8 row">
                  <div class="col-10">
                    <base-input
                      placeholder="Pesquisar Entidade"
                      class="input-group-alternative"
                      alternative
                      addon-right-icon="fas fa-search"
                    ></base-input>
                  </div>
                  <div class="col-2">
                    <base-button @click="modals.modal0 = true"
                      >Novo</base-button
                    >
                    <modal :show.sync="modals.modal0">
                      <template slot="header">
                        <h2 class="modal-title">Cadastro de Entidades</h2>
                      </template>
                      <div>
                        <h3 class="modal-title titulo-grid-dados">
                          Dados Entidade
                        </h3>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <base-input
                            label="Nome"
                            v-model="model.NomeEntidade"
                            required
                          ></base-input>
                          <base-input
                            label="Responsavel da Entidade"
                            v-model="model.Responsavel"
                          ></base-input>
                          <base-input
                            label="Quantidade de acolhido"
                            type="number"
                            v-model="model.QtdAcolhidos"
                          ></base-input>
                        </div>
                        <div class="col-md-4">
                          <base-input
                            label="Modalidade"
                            v-model="model.Modalidade"
                          ></base-input>
                          <base-input
                            label="Telefone de contato"
                            v-model="model.Telefone"
                            v-mask="'(##) #####-####'"
                          ></base-input>
                          <base-input
                            label="Capacidade(Max) de acolhido"
                            type="number"
                            v-model="model.CapacidadeTotalAcolhidos"
                          ></base-input>
                        </div>
                        <div class="col-md-4">
                          <base-input
                            label="Atendido por:"
                            v-model="model.AtendidoPor"
                          ></base-input>
                          <label class="form-control-label">Status</label>
                          <select class="form-control" v-model="model.Status">
                            <option value>Selecione</option>
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <h3 class="modal-title titulo-grid-dados">
                          Dados Endereço
                        </h3>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <base-input
                            label="Endereço"
                            v-model="model.Endereco"
                          ></base-input>
                          <base-input
                            label="Bairro"
                            v-model="model.Bairro"
                          ></base-input>
                        </div>
                        <div class="col-md-4">
                          <base-input
                            label="UF"
                            v-model="model.UF"
                          ></base-input>
                          <base-input
                            label="Cep"
                            v-model="model.Cep"
                          ></base-input>
                        </div>
                        <div class="col-md-4">
                          <base-input
                            label="Cidade"
                            v-model="model.Cidade"
                          ></base-input>
                        </div>
                      </div>
                      <template slot="footer">
                        <base-button @click="Salvar">Salvar</base-button>
                      </template>
                    </modal>
                  </div>
                </div>
              </div>
            </div>

            <template>
              <form @submit.prevent>
                <div class="pl-lg-1">
                  <div class="row">
                    <div class="col-xl-6 col-lg-6">
                      <a href="#">
                        <stats-card
                          title="Total traffic"
                          type="gradient-red"
                          sub-title="350,897"
                          class="mb-4 mb-xl-0 card-dark"
                        >
                          <template slot="footer">
                            <span class="text-nowrap"
                              >12 acolhidos Atualmente</span
                            >
                          </template>
                        </stats-card>
                      </a>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                      <stats-card
                        title="Total traffic"
                        type="gradient-red"
                        sub-title="350,897"
                        class="mb-4 mb-xl-0 card-n-select"
                      >
                        <template slot="footer">
                          <span class="text-nowrap"
                            >12 acolhidos Atualmente</span
                          >
                        </template>
                      </stats-card>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-6 col-lg-6">
                      <stats-card
                        title="Total traffic"
                        type="gradient-red"
                        sub-title="350,897"
                        class="mb-4 mb-xl-0 card-n-select"
                      >
                        <template slot="footer">
                          <span class="text-nowrap"
                            >12 acolhidos Atualmente</span
                          >
                        </template>
                      </stats-card>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                      <stats-card
                        title="Total traffic"
                        type="gradient-red"
                        sub-title="350,897"
                        class="mb-4 mb-xl-0 card-n-select"
                      >
                        <template slot="footer">
                          <span class="text-nowrap"
                            >12 acolhidos Atualmente</span
                          >
                        </template>
                      </stats-card>
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-profile",
  data() {
    return {
      model: {
        NomeEntidade: "",
        Modalidade: "",
        Endereco: "",
        UF: "",
        Cidade: "",
        Cep: "",
        InstiMantedora: "",
        Telefone: "",
        Responsavel: "",
        AtendidoPor: "",
        QtdAcolhidos: "",
        CapacidadeTotalAcolhidos: "",
        Status: ""
      },
      modals: {
        modal0: false
      }
    };
  },
  methods: {
    Salvar: function() {
      this.modals.modal0 = false;
    }
  },
  mounted() {}
};
</script>
<style>
.card-dark {
  background-color: #172b4d;
  margin-top: 5%;
}
.card-n-select {
  box-shadow: #333232 0px 0px 1px;
  margin-top: 5%;
}
a {
  text-decoration: none;
  color: inherit;
}
a:visited {
  color: white;
}
a:hover {
  color: white;
}

.titulo-grid-dados {
  margin-bottom: 2%;
}
</style>
