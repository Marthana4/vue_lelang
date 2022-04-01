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
          <div class="col-12 grid-margin stretch-card">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h4 class="card-title">Auction Bid Data</h4>
              </div>
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col text-center">
                    <img
                      :src="
                        'http://localhost/latihan_lelang/public/foto/' +
                        lelang.foto
                      "
                      style="height: 300px"
                      alt="image"
                    />
                  </div>
                  <div class="col">
                    <div class="text-xs font-weight-bold text-uppercase">
                      Item Name
                    </div>
                    <div class="h6 mb-0 text-gray-800 mb-2">
                      {{ lelang.nama_barang }}
                    </div>
                    <div class="text-xs font-weight-bold text-uppercase">
                      Date
                    </div>
                    <div class="h6 mb-0 text-gray-800 mb-2">
                      {{ lelang.tgl_lelang }}
                    </div>
                    <div class="text-xs font-weight-bold text-uppercase">
                      Status
                    </div>
                    <div class="h6 mb-0 text-gray-800 mb-2">
                      {{ lelang.status }}
                    </div>
                    <div class="text-xs font-weight-bold text-uppercase">
                      Starting Price
                    </div>
                    <div class="h6 mb-0 text-gray-800 mb-2">
                      {{ lelang.harga_awal }}
                    </div>
                    <div class="text-xs font-weight-bold text-uppercase">
                      Final Price
                    </div>
                    <div
                      class="h6 mb-0 text-gray-800 mb-2"
                      v-if="lelang.harga_akhir === null"
                    >
                      -
                    </div>
                    <div class="h6 mb-0 text-gray-800 mb-2" v-else>
                      {{ lelang.harga_akhir }}
                    </div>
                    <div class="text-xs font-weight-bold text-uppercase">
                      User Name
                    </div>
                    <div
                      class="h6 mb-0 text-gray-800 mb-2"
                      v-if="lelang.nama === null"
                    >
                      -
                    </div>
                    <div class="h6 mb-0 text-gray-800 mb-2" v-else>
                      {{ lelang.nama }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="lelang.status == 'dibuka'">
            <div v-if="penawaran.penawaran_harga == null">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">
                    Penawaran {{ lelang.nama_barang }}
                  </h6>
                </div>
                <form @submit.prevent="tambah">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="">Tawarkan Harga</label>
                      <input
                        type="number"
                        class="form-control"
                        name="penawaran_harga"
                        v-model="history.penawaran_harga"
                        required
                      />
                    </div>
                    <center>
                      <input
                        type="submit"
                        class="btn btn-danger"
                        value="Tawarkan"
                      />
                    </center>
                  </div>
                </form>
              </div>
            </div>
            <div v-else class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                  Penawaran {{ lelang.nama_barang }}
                </h6>
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  Anda Telah Menawar Barang Ini dengan harga
                  {{ penawaran.penawaran_harga }}
                </h5>
              </div>
            </div>
          </div>
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Penawaran</h4>
                <p class="card-description">Data Penawaran Anda</p>
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th><i class="mdi mdi-emoticon-happy"></i></th>
                        <th>Item Name</th>
                        <th>Bid</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(h, index) in history" :key="index">
                        <td class="py-1">
                          {{ index + 1 }}
                        </td>
                        <td>{{ h.nama_barang }}</td>
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
        <footer-component></footer-component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: {},
      lelang: {},
      penawaran: {},
      penawaranbrg: {},
      src: "",
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var level = data.level;
    if (level == "admin" || level == "petugas") {
      this.$swal("This page cannot be access");
      this.$router.push("/");
    }
    this.axios
      .get(
        `http://localhost/latihan_lelang/public/api/lelang/${this.$route.params.id}`,
        {
          headers: { Authorization: "Bearer" + this.$store.state.token },
        }
      )
      .then((res) => {
        this.lelang = res.data;
        this.src =
          "http://localhost/latihan_lelang/public/foto/" + this.lelang.foto;
        console.log(this.src);
      }),
    this.showPenawaranLelang();

    this.axios
      .get(
        `http://localhost/latihan_lelang/public/api/tambahpenawaran/${this.$route.params.id}`,
        {
          headers: { Authorization: "Bearer" + this.$store.state.token },
        }
      )
      .then((res) => {
        this.penawaran = res.data;
      });
  },
  methods: {
    showPenawaranLelang() {
      this.axios
        .get(
          `http://localhost/latihan_lelang/public/api/showpenawaranlelang/${this.$route.params.id}`,
          {
            headers: { Authorization: "Bearer" + this.$store.state.token },
          }
        )
        .then((res) => {
          this.history = res.data;
        });
    },
    tambah() {
      console.log(this.lelang);
      console.log(this.history);
      let form = {
        id_lelang: this.lelang.id_lelang,
        id_barang: this.lelang.id_barang,
        penawaran_harga: this.history.penawaran_harga,
      };

      this.axios
        .post("http://localhost/latihan_lelang/public/api/penawaran", form, {
          headers: { Authorization: "Bearer" + this.$store.state.token },
        })

        .then((res) => {
          if (res.data.success) {
            this.$swal(res.data.message);
            this.$router.push("/penawaran/tambah");
            this.showPenawaranLelang();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>   