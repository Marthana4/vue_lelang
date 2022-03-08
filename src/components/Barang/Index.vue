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
                    <h4 class="card-title">Data Barang</h4>
                    <p class="card-description">Data Barang Lelang</p>
                    <div class="table-responsive">
                      <router-link to="barang/tambah" class="btn btn-outline-primary btn-fw text-right" style="float: right">
                        <span class="icon">
                          <i class="mdi mdi-account-plus"> </i>
                        </span>
                        <span class="text"> Add New Barang</span>
                      </router-link>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> <i class="mdi mdi-emoticon-happy"></i> </th>
                            <th> Foto </th>
                            <th> Nama Barang</th>
                            <th> Tanggal Daftar </th>
                            <th> Harga Awal </th>
                            <th> Aksi </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(b,index) in barang" :key="b.id_barang">
                            <td class="py-1">
                              {{index+1}}
                            </td>
                            <td><img :src="'http://localhost/latihan_lelang/public/foto/'+b.foto" class="me-2" alt="image"></td>
                            <td> {{b.nama_barang}} </td>
                            <td> {{b.tanggal_daftar}} </td>
                            <td> {{b.harga_awal}} </td>
                            <td>
                              <button type="button" class="btn btn-inverse-success btn-rounded btn-icon">
                                <router-link :to="{name :'detailbarang',  params : {id : b.id_barang}}" >
                                  <i class="mdi mdi-eye"></i>
                                </router-link>
                              </button>
                              <!-- <button type="button" class="btn btn-inverse-warning btn-rounded btn-icon">
                                <router-link :to="{name :'editbarang',  params : {id : b.id_barang}}" class="btn-inverse-warning">
                                  <i class="mdi mdi-lead-pencil"></i>
                                </router-link>
                              </button> -->
                              <button type="button" @click="hapus(b.id_barang)" class="btn btn-inverse-danger btn-rounded btn-icon">
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
                barang :{}
            }
        },
        created(){
            this.axios.get('http://localhost/latihan_lelang/public/api/barang',
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.barang = res.data
            })
        },
        methods : {
            hapus(id_barang){
                this.axios.delete(`http://localhost/latihan_lelang/public/api/barang/${id_barang}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(() => {
                let i = this.barang.map((item) => item.id_barang).indexOf(id_barang);
                this.barang.splice(i, 1);
            });
            }
        }
    } 
</script>