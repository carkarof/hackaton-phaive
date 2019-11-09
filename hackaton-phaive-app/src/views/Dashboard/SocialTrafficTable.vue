<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Roteiro</h3>
        </div>
        <div class="col text-right">
          <!-- <base-button size="sm" type="primary">See all</base-button> -->
          <base-dropdown>
              <base-button slot="title" size="sm" type="primary" class="dropdown-toggle">
                Filtrar por
              </base-button>
              <a class="dropdown-item" href="#">Entidade</a>
              <a class="dropdown-item" href="#">Município</a>
              <a class="dropdown-item" href="#">Status</a>
          </base-dropdown>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="tableData">
        <template slot="columns">
          <th>Entidade</th>
          <th>Município</th>
          <th>Status</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.entidade}}
          </th>
          <td>
            {{row.municipio}}
          </td>
          <td>
            <div class="d-flex align-items-center">
            <span class="mr-3">{{row.status}}</span>
            <div class="sinalizador"></div>
            </div>
              
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'social-traffic-table',
    data() {
      return {
        tableData: [
          {
            entidade: 'entidade',
            municipio: 'Salvador',
            status: 'Ativo'
          },
          {
            entidade: 'entidade',
            municipio: 'Salvador',
            status: 'Ativo'
          },
          {
            entidade: 'entidade',
            municipio: 'Salvador',
            status: 'Ativo'
          },
          {
            entidade: 'entidade',
            municipio: 'Salvador',
            status: 'Ativo'
          },
          {
            entidade: 'entidade',
            municipio: 'Salvador',
            status: 'Ativo',
          }
        ]
      }
    }

  }
</script>
<style>

.sinalizador{
  -moz-border-radius:50%;
  -webkit-border-radius:50%;
  border-radius:50%;
  width:10px;
  height:10px;
  background:#2dce89;
}
</style>
