<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-4 d-flex align-items-center" style="">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                
            </div>
        </base-header>
        <div>
             <Card2 salvar-resp="SalvarResposta" 
             pergunta="Voce esta funcionando ?"
             id-pergunta="1"
             />
             <Card2 salvar-resp="SalvarResposta"
             pergunta="Voce esta correto disso ?"
             id-pergunta="2"/>
             <Card2 salvar-resp="SalvarResposta"
             pergunta="Voce tem certeza ?"
             id-pergunta="3"/>
             <Card2 salvar-resp="SalvarResposta"
             pergunta="Voce vai embora ?"
             id-pergunta="4"/>
             <Card2 salvar-resp="SalvarResposta"
             pergunta="Vai embora mesmo ?"
             id-pergunta="5"/> 
        </div>
        <content-footer />   
    </div>
</template>
<script>
import Card2 from "../components/Card2"
import ContentFooter from '../layout/ContentFooter';
  export default {
    name: 'user-profile',
    components:{Card2,ContentFooter},
    data() {
      return {
        model: {          
          respostas:[]
        }
      }
    },
    methods:{
      SalvarResposta(){
        alert("resposta")
      }
    }
  };
</script>
<style></style>
