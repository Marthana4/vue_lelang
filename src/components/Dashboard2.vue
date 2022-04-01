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
              <ul class="breadcrumb"></ul>
            </nav>
          </div>
          <div class="container">
            <h1 class="h3 mb-4 text-gray-800">Auction Items</h1>
            <div class="row">
                <div class="col-md-4" v-for="(l, index) in lelang" :key="index">
              <div>
                  <div class=" stretch-card grid-margin">
                    <div class="card card-img-holder card-outline-dark">
                      <img
                        class="card-img-top"
                        :src="
                          'http://localhost/latihan_lelang/public/foto/' +
                          l.foto
                        "
                        style="height: 200px"
                      />
                      <div class="card-body">
                        <h2 class="font-weight-normal mb-3">
                          {{ l.nama_barang }}
                        </h2>
                        <h4 class="card-text">Price : {{ l.harga_awal }}</h4>
                        <h4 class="card-text">{{ l.deskripsi }}</h4>
                        <router-link
                            :to="{
                              name: 'tambahpenawaran',
                              params: { id: l.id_lelang },
                            }"
                          >
                        <button
                          type="button"
                          class="btn btn-inverse-primary btn-rounded"
                        >
                            Choose  
                        </button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              <div v-if="l.status == ditutup">
                <h4>Tidak Ada Barang yang dilelang</h4>
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
      level: "",
      lelang: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser)
          var level = data.level
          if(level == 'admin' || level == 'petugas' )
          {
              this.$swal("This page cannot be access")
              this.$router.push('/') 
          }
    var user = JSON.parse(this.$store.state.datauser);
    this.level = user.level;
    this.axios
      .get("http://localhost/latihan_lelang/public/api/lelang", {
        headers: { Authorization: "Bearer" + this.$store.state.token },
      })
      .then((res) => {
        this.lelang = res.data;
        console.log(this.lelang.status)
      });
    this.axios.get(`http://localhost/latihan_lelang/public/api/tambahpenawaran/${this.$route.params.id}`,
      {
          headers : { Authorization : 'Bearer' + this.$store.state.token}
      })
      .then(res=>{
          this.penawaran = res.data
      });
  },
};
</script>