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
                    <h4 class="card-title">Lelang</h4>
                    <p class="card-description">Item Auction Data</p>
                    <div class="table-responsive">
                      <router-link to="lelang/tambah" class="btn btn-outline-primary btn-fw text-right" style="float: right">
                        <span class="icon">
                          <i class="mdi mdi-plus-circle-outline"> </i>
                        </span>
                        <span class="text"> Add New </span>
                      </router-link>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> <i class="mdi mdi-emoticon-happy"></i> </th>
                            <th> Operator Name</th>
                            <!-- <th> Foto</th> -->
                            <th> Item Name</th>
                            <th> Date </th>
                            <th> Final Price </th>
                            <th> Winner ID </th>
                            <th> Status</th>
                            <th> Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(l,index) in lelang" :key="index">
                            <td class="py-1">
                              {{index+1}}
                            </td>
                            <td> {{l.nama}}</td>
                            <!-- <td> <img :src="'http://localhost/latihan_lelang/public/foto/'+l.foto" class="me-2" alt="image"> </td> -->
                            <td> {{l.nama_barang}} </td>
                            <td> {{l.tgl_lelang}} </td>
                            <td> {{l.harga_akhir}} </td>
                            <td> {{l.id_pengguna}}</td>
                            <td>
                                <span v-if="l.status == 'dibuka'" class="badge bg-info text-light">Open</span>
                                <span v-if="l.status == 'ditutup'" class="badge bg-dark text-light">Close</span>
                            </td>
                            <td>
                              <button type="button" class="btn btn-inverse-success btn-rounded btn-icon">
                                <router-link :to="{name :'detaillelang',  params : {id : l.id_lelang}}" >
                                  <i class="mdi mdi-eye"></i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-inverse-warning btn-rounded btn-icon">
                                <router-link :to="{name :'editlelang',  params : {id : l.id_lelang}}" class="btn-inverse-warning">
                                  <i class="mdi mdi-lead-pencil"></i>
                                </router-link>
                              </button>
                              <button type="button" @click="hapus(l.id_lelang)" class="btn btn-inverse-danger btn-rounded btn-icon">
                                <i class="mdi mdi-delete"></i>
                              </button>
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
                lelang :{}
            }
        },
        created(){
            this.axios.get('http://localhost/latihan_lelang/public/api/lelang',
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.lelang = res.data
            })
        },
        methods : {
            hapus(id_lelang){
                this.axios.delete(`http://localhost/latihan_lelang/public/api/lelang/${id_lelang}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(() => {
                let i = this.lelang.map((item) => item.id_lelang).indexOf(id_lelang);
                this.lelang.splice(i, 1);
            });
            }
        }
    } 
</script>   