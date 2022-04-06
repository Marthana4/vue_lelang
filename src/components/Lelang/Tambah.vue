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
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Add Auction Data</h4>
                <form @submit.prevent="tambah" class="forms-sample">
                  <div class="form-group row">
                    <label
                      for="exampleInputUsername2"
                      class="col-sm-3 col-form-label"
                      >Item</label
                    >
                    <div class="col-sm-9">
                      <select v-model="lelang.id_barang">
                        <option
                          v-for="(b, index) in barang"
                          :key="index"
                          :value="b.id_barang"
                        >
                          {{ b.nama_barang }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-gradient-primary me-2">
                    Submit
                  </button>
                  <button class="btn btn-light">Cancel</button>
                </form>
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
      lelang: {},
      barang: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var level = data.level;
    if (level == "pengguna" || level == "admin") {
      this.$swal("This page cannot be access");
      this.$router.push("/");
    }
    this.axios
      .get(`http://localhost/latihan_lelang/public/api/barang`, {
        headers: { Authorization: "Bearer" + this.$store.state.token },
      })
      .then((res) => {
        this.barang = res.data;
      });
  },
  methods: {
    tambah() {
      this.axios
        .post(
          "http://localhost/latihan_lelang/public/api/lelang",
          this.lelang,
          {
            headers: { Authorization: "Bearer" + this.$store.state.token },
          }
        )
        .then((res) => {
          if (res.data.success) {
            this.$swal(res.data.message);
            this.$router.push("/lelang");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
