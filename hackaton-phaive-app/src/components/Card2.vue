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
          <div class="card-body border-0 ">
            <p>{{ pergunta }}</p>
          </div>
          <div slot="footer" class="card-footer col-xl-12 order-xl-1">
            <input
              type="radio"
              name="opt_resposta"
              :data-id="idPergunta"
              v-model="perg"
              :id="pergunta"
              @click="setarPergunta"
              value="Sim"
            />
            <label for="Sim" class="col-3">Sim</label>
            <input
              type="radio"
              name="opt_resposta"
              :data-id="idPergunta"
              v-model="perg"
              :id="'perg' + idPergunta"
              @click="setarPergunta"
              value="Nao"
            />
            <label for="Nao" class="col-3">Não</label>

            <label for="inpt_qtd">Quantidade:</label>
            <input type="number" name="qtd" id="inpt_qtd" />
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
    setarPergunta(e) {
      const el = document.getElementById(e.target.id);
      const id_pergunta = el.getAttribute("data-id");
      const resp = el.value;
      this.$emit("salvar-resp", { id_pergunta, resp });
    }
  }
};
</script>

<style>
#inpt_qtd{
  width: 8%;
  margin-left: 2%;
  border-radius: 5px
}
</style>
