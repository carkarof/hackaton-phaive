<template>
  <footer class="footer px-4 col-lg-12 " style="position:fixed;bottom:0;">
    <div class="row justify-content-lg-between" >
      <input type="button" class="btn btn-primary col-md-1" value="Enviar"/>
      
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
