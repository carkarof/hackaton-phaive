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
             <Card3/>
             <Card3/>
             <Card3/>
             <Card3/>
             <Card3/> 
        </div>
        <content-footer />   
    </div>
</template>
<script>
import Card3 from "../components/Card3"
import ContentFooter from '../layout/ContentFooter';
  export default {
    name: 'user-profile',
    components:{Card3,ContentFooter},
    data() {
      return {
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        }
      }
    },
  };
</script>
<style></style>
