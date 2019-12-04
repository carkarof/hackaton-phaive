<template>
  <div class="container-fluid mt--7  ">
    <div class="row align-items-center">
      <div class="col-xl-12 order-xl-1">
        <div class="card">
          <div slot="header" class="card-header bg-white border-1">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Pergunta</h3>
              </div>
            </div>
          </div>
          <div class="card-body border-0 " >
            <p>{{ pergunta }}</p>
          </div>
          <div slot="footer" class="card-footer col-xl-12 order-xl-1">
            <form>
              <input
                type="radio"
                name="opt_resposta"
                v-model="perg"
                :id="pergunta"
                @change="setarPergunta"
                value="Sim"
              />
              <label for="Sim" class="col-3">Sim</label>
              <input
                type="radio"
                name="opt_resposta"
                v-model="perg"
                :id="pergunta"
                @change="setarPergunta"
                value="Nao"
              />
              <label for="Nao" class="col-3">Não</label>
            </form>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  name: "Card2",
  props: ["pergunta", "idPergunta"],
  data() {
    return {
      perg: ""
    };
  },
  methods: {
    setarPergunta() {
      this.$emit("salvar-resp");
    }
  }
};
</script>
