<template>
<div class="container-scroller">
  <div class="container-fluid page-body-wrapper">
    <sidebar-component></sidebar-component>
    <div class="main-panel">
      <div class="content-wrapper">
        <navbar-component></navbar-component>
        <div class="page-header">
          <h3 class="page-title"></h3>
            <nav aria-label="breadcrumb">
              <ul class="breadcrumb">   
              </ul>
            </nav>
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">History</h4>
                    <p class="card-description">Offer Data</p>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> <i class="mdi mdi-emoticon-happy"></i> </th>
                            <th> ID Lelang</th>
                            <th> Item Name</th>
                            <th> User Name </th>
                            <th> Bid </th>
                            <th> Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(h,index) in history" :key="index">
                            <td class="py-1">
                              {{index+1}}
                            </td>
                            <td> {{h.id_history}}</td>
                            <td> {{h.nama_barang}} </td>
                            <td> {{h.nama}} </td>
                            <td> {{h.penawaran_harga}} </td>
                            <td>
                                <span v-if="h.status_pemenang == 'proses'" class="badge bg-primary text-light">process</span>
                                <span v-if="h.status_pemenang == 'kalah'" class="badge bg-dark text-light">lose</span>
                                <span v-if="h.status_pemenang == 'menang'" class="badge bg-success text-light">win</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
        
      </div>
      <footer-component></footer-component>
    </div>
  </div>     
</div>
</template>

<script>
    export default {
        data() {
            return {
                history :{}
            }
        },
        created(){
            this.axios.get('http://localhost/latihan_lelang/public/api/history',
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.history = res.data
            })
        }
    } 
</script>   