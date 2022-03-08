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
                    <h4 class="card-title">Riwayat</h4>
                    <p class="card-description">Data Penawaran</p>
                    <div class="table-responsive">
                      <!-- <router-link to="lelang/tambah" class="btn btn-outline-primary btn-fw text-right" style="float: right">
                        <span class="icon">
                          <i class="mdi mdi-account-plus"> </i>
                        </span>
                        <span class="text"> Add New Lelang</span>
                      </router-link> -->
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> <i class="mdi mdi-emoticon-happy"></i> </th>
                            <th> ID Lelang</th>
                            <th> Nama Barang</th>
                            <th> Nama Pengguna </th>
                            <th> Penawaran Harga </th>
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
                                <span v-if="h.status_pemenang == 'proses'" class="badge bg-primary text-light">proses</span>
                                <span v-if="h.status_pemenang == 'kalah'" class="badge bg-dark text-light">kalah</span>
                                <span v-if="h.status_pemenang == 'menang'" class="badge bg-success text-light">menang</span>
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