<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
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
                                        <img src="img/theme/casa.jpg" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
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
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>
                                    Fundação Acolhimento Infantil
                                </h3>
                                <div class="h5 font-weight-300">
                                    <i class="ni location_pin mr-2"></i>Salvador, Bahia
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>CNPJ - 858.910.356/0000-57
                                </div>
                                <div>
                                    <div class="pl-lg-1">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-6">
                                                <stats-card title="Total traffic"
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
                    </div> 
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Entidades</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                    <div class="pl-lg-1">
                                        <div class="row">
                                            <div class="col-xl-6 col-lg-6">
                                                <stats-card title="Total traffic"
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
    name: 'user-profile',
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
<style>
    .card-dark{
        background-color: #172B4D;
    }
</style>
