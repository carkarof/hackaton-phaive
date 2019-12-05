<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-4 d-flex align-items-center"
      style=""
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center"></div>
    </base-header>
    <form 
     id="app"
     action="/API/scr"
     method="POST"
    >
      <div>
        <Card2
          @salvar-resp="SalvarResposta"
          pergunta="Voce esta funcionando ?"
          id-pergunta="1"
        />

         <Card2
          @salvar-resp="SalvarResposta"
          pergunta="Voce esta funcionando2 ?"
          id-pergunta="2"
        />

      </div>
      <content-footer id="footer">
        <input id="btn_enviar" type="submit" @click.prevent="Salvar" class="btn btn-primary" value="Enviar" />
      </content-footer>
    </form>
  </div>
</template>
<script>
import Card2 from "../components/Card2";
import ContentFooter from "../layout/ContentFooter";
import Api from '../api'
export default {
  name: "dimensao",
  components: { Card2, ContentFooter },
  data() {
    return {
      respostas: []
    };
  },
  methods: {
    Salvar: function() {
       Api.post("/inspecoes",this.respostas).then(response=>{

       }).catch(error=>{

       })
    },
    SalvarResposta:function(payload){
      const f_perguntas = this.respostas.filter(item=> item.id_pergunta == payload.id_pergunta)
      if(f_perguntas.length == 0){
         this.respostas.push(payload)
      }else{
         this.respostas.map(item=>{
             if(item.id_pergunta === payload.id_pergunta){
               item.resp = payload.resp
             }
         })
      }
    }
  }
};


</script>
<style>
#footer{
  height: 10%;
}
#btn_enviar{
  position: relative;
  bottom: 20px;
  margin-left: 72%
}
</style>
