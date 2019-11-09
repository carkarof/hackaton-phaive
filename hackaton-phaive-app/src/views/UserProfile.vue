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
             <Card2/>
             <Card2/>
             <Card2/>
             <Card2/>
             <Card2/> 
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
