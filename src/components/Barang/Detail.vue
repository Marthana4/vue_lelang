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
        <div class="col-12 grid-margin stretch-card">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                      <h4 class="card-title">Items Data</h4>
                  </div>
                  <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col text-center">
                            <img :src="'http://localhost/latihan_lelang/public/foto/'+barang.foto" style="height:300px;" alt="image">
                        </div>
                        <div class="col">
                            <div class="text-xs font-weight-bold text-uppercase">Name</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ barang.nama_barang }}</div>
                            <div class="text-xs font-weight-bold text-uppercase">Register Date</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ barang.tanggal_daftar }}</div>
                            <div class="text-xs font-weight-bold text-uppercase">Price</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ barang.harga_awal }}</div>
                            <div class="text-xs font-weight-bold text-uppercase">Description</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ barang.deskripsi }}</div>
                        </div>
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
          var data = JSON.parse(this.$store.state.datauser)
          var level = data.level
          if(level == 'pengguna')
          {
              this.$swal("This page cannot be access")
              this.$router.push('/home') 
          }
            this.axios.get(`http://localhost/latihan_lelang/public/api/barang/${this.$route.params.id}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.barang = res.data
            })
            .catch(err => console.log(err))
        }
    } 
</script>
