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
        <div class="row">
          <h1 class="h3 mb-4 text-gray-800">Auction Items</h1>
            <div class="row">
            <div class="col-md-4 stretch-card grid-margin" v-for="(l,index) in lelang" :key="index">
                <div class="card card-img-holder card-outline-dark">
                <img class="card-img-top" :src="'http://localhost/latihan_lelang/public/foto/'+l.foto" style="height:200px">
                <div class="card-body">
                    <h2 class="font-weight-normal mb-3"> {{l.nama_barang}} </h2>
                    <h4 class="card-text">Price : {{l.harga_awal}}</h4>
                    <h4 class="card-text">{{l.deskripsi}}</h4> 
                    <button type="button" class="btn btn-inverse-primary btn-rounded">Choose</button>
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
                level : '',
                lelang : {},
            };
        },
        created() {
            var user = JSON.parse(this.$store.state.datauser);
            this.level = user.level;

            this.axios.get('http://localhost/latihan_lelang/public/api/lelang',
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.lelang = res.data
            })
        }
    }
</script>