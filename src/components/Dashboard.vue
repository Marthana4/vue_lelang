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

          <div class="row">
            <h1 class="h3 mb-4 text-gray-800">Hai, {{ level }}</h1>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-danger card-img-holder text-white">
                <div class="card-body">
                  <img
                    src="../../public/images/dashboard/circle.svg"
                    class="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 class="font-weight-normal mb-3">
                    Total Users
                    <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                  </h4>
                  <h2 class="mb-5">{{ data.user }}</h2>
                </div>
              </div>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-info card-img-holder text-white">
                <div class="card-body">
                  <img
                    src="../../public/images/dashboard/circle.svg"
                    class="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 class="font-weight-normal mb-3">
                    Total Items
                    <i
                      class="mdi mdi-bookmark-outline mdi-24px float-right"
                    ></i>
                  </h4>
                  <h2 class="mb-5">{{ data.barang }}</h2>
                </div>
              </div>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-success card-img-holder text-white">
                <div class="card-body">
                  <img
                    src="../../public/images/dashboard/circle.svg"
                    class="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 class="font-weight-normal mb-3">
                    Total Penawaran
                    <i class="mdi mdi-diamond mdi-24px float-right"></i>
                  </h4>
                  <h2 class="mb-5">{{ data.history }}</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 grid-margin">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Recent Penawaran</h4>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th><i class="mdi mdi-emoticon-happy"></i></th>
                          <th>ID Lelang</th>
                          <th>Item Name</th>
                          <th>User Name</th>
                          <th>Bid</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(h, index) in history" :key="index">
                          <td class="py-1">
                            {{ index + 1 }}
                          </td>
                          <td>{{ h.id_history }}</td>
                          <td>{{ h.nama_barang }}</td>
                          <td>{{ h.nama }}</td>
                          <td>{{ h.penawaran_harga }}</td>
                          <td>
                            <span
                              v-if="h.status_pemenang == 'proses'"
                              class="badge bg-primary text-light"
                              >process</span
                            >
                            <span
                              v-if="h.status_pemenang == 'kalah'"
                              class="badge bg-dark text-light"
                              >lose</span
                            >
                            <span
                              v-if="h.status_pemenang == 'menang'"
                              class="badge bg-success text-light"
                              >win</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
      level: "",
      data: {},
      history: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var level = data.level;
    if (level == "pengguna") {
      this.$swal("This page cannot be access");
      this.$router.push("/home");
    }
    var user = JSON.parse(this.$store.state.datauser);
    this.level = user.level;

    this.axios
      .get("http://localhost/latihan_lelang/public/api/dashboard", {
        headers: { Authorization: "Bearer " + this.$store.state.token },
      })
      .then((res) => {
        this.data = res.data;
      });
    this.axios
      .get("http://localhost/latihan_lelang/public/api/dash?page=1", {
        headers: { Authorization: "Bearer " + this.$store.state.token },
      })
      .then((res) => {
        this.history = res.data;
      });
  },
};
</script>
