<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Entidades</h3>
        </div>
        <div class="col text-right">
          <!-- <a href="#!" class="btn btn-sm btn-primary">See all</a> -->
          <base-dropdown>
              <base-button slot="title" size="sm" type="primary" class="dropdown-toggle">
                Filtrar por
              </base-button>
              <a class="dropdown-item" href="#">Nome</a>
              <a class="dropdown-item" href="#">Total Acolhimento</a>
              <a class="dropdown-item" href="#">Até 3 meses</a>
              <a class="dropdown-item" href="#">De 3 a 18 meses</a>
              <a class="dropdown-item" href="#">Mais 18 meses</a>
          </base-dropdown>
        </div>
      </div>
    </div>

    <div class="table-responsive" style="overflow-y: auto; height: 300px;">
      <base-table thead-classes="thead-light"
                  :data="tableData">
        <template slot="columns">
          <th>Cód</th>
          <th>Nome</th>
          <th>Acolhidos</th>
          <th>Status</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.id_entidade}}
          </th>
          <td>
            {{row.nome}}
          </td>
          <td>
            {{row.total_acolhidos}}
          </td>
          <td>
            {{row.status_entidade}}
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
import axios from "axios";
  export default {
    name: 'page-visits-table',
    data() {
      return {
        dados: [],
        tableData: []
      }
    },
    methods: {
      DadosEntidade: function (){
         axios.get('http://localhost:8090/dashboard_entidades')
            .then((response) => {
              this.tableData = response.data;
             console.log(this.tableData);
            })
            .catch((error) => {
              // handle error
              console.log(error);
          })
          
      }
    },
    mounted(){
        this.DadosEntidade();
    }
  }
</script>
<style>
</style>