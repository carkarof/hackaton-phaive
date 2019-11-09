<template>
    <div class="container-fluid mt--7  ">
            <div class="row align-items-center">    
                <div class="col-xl-12 order-xl-1"  >
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Pergunta</h3>
                                </div>                                
                            </div>
                        </div>
                        <div class='card-body'>
                        <p> Uma pergunta ? </p>
                        </div>
                        <div slot="footer" class='col-xl-12 order-xl-1'>
                        <form >
                          <input type="radio" name="opt_resposta" id="Sim" value="Sim" checked >
                          <label for="Sim" class='col-3'>Sim</label>                          
                          <input type="radio" name="opt_resposta" id="Nao" value="Não"  >
                          <label for="Nao" class="col-3">Não</label> 
                          </form>                         
                        </div>                          
                    </card>                                        
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
</template>
<script>
export default {
    name:"Card2",
    data(){
        return{}
    }
}
</script>