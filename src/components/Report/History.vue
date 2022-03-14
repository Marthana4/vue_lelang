<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <sidebar-component></sidebar-component>
      <navbar-component></navbar-component>
      <div class="main-panel">
        <div class="content-wrapper">
          <br /><br />
          <div class="row purchace-popup">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card card-secondary">
                <div class="row">
                  <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <div class="card-header py-3">
                          <h4 class="card-title">Generate Report</h4>
                        </div>
                        <div class="card-body">
                          <form class="form-group" @submit.prevent="tampil">
                            <label>Status</label>
                            <select class="form-control" v-model="report.status_pemenang">
                              <option value="menang">win</option>
                              <option value="kalah">lose</option>
                              <option value="proses">process</option>
                            </select>
                            <button type="submit" class="btn btn-sm btn-info">
                              Show
                            </button>
                          </form>
                          <div class="report">
                            <VueHtml2pdf
                              :show-layout="true"
                              :float-layout="false"
                              :enable-download="true"
                              :preview-modal="true"
                              :paginate-elements-by-height="1400"
                              filename="report_transaksi_lelang"
                              :pdf-quality="2"
                              :manual-pagination="false"
                              pdf-format="a4"
                              pdf-orientation="portrait"
                              pdf-content-width="800px"
                              ref="html2Pdf"
                            >
                              <section slot="pdf-content">
                                <h1 class="text-center">Transaction Report</h1>
                                <h3 class="text-center">History</h3>
                                <h5 class="text-center">
                                  Platform User Lelang
                                </h5>
                                <br /><br />
                                <table class="table table-striped text-center">
                                  <thead>
                                    <tr>
                                      <th class="font-weight-bold">No</th>
                                      <th class="font-weight-bold">Item Name</th>
                                      <th class="font-weight-bold">User Name</th>
                                      <th class="font-weight-bold">Phone Number</th>
                                      <th class="font-weight-bold">Bid</th>
                                      <th class="font-weight-bold">Date</th>
                                      <th class="font-weight-bold">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(h, index) in history"
                                      :key="index"
                                    >
                                      <td>{{ index + 1 }}</td>
                                      <td>{{ h.nama_barang }}</td>
                                      <td>{{ h.nama }}</td>
                                      <td>{{ h.no_hp }}</td>
                                      <td>{{ h.harga_akhir }}</td>
                                      <td>
                                        {{ h.tgl_lelang | moment("DD/MM/YYYY") }}
                                      </td>
                                      <td>{{ h.status_pemenang }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </section>
                            </VueHtml2pdf>
                            <button type="button" @click="generateReport">
                              Export as PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.report {
  width: 800px;
  margin: 20px auto 0 auto;
}

th,
td {
  padding: 5px;
}
tbody tr {
  border-bottom: 1px solid #eee;
}
tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
tbody tr:last-of-type {
  border-bottom: 2px solid #0010a3;
}
button {
  width: 120px;
  height: 35px;
  margin-top: 20px;
  margin-left: 20px;
  border: none;
  background-color: #788bff;
  color: white;
  border-radius: 3px;
}
button:hover {
  background-color: #335fff;
}
button:active {
  background-color: #0028b8;
}
</style>
<script>
export default {
  data() {
    return {
      report: {},
      history: {},
    };
  },
  created() {

    // var data = JSON.parse(this.$store.state.datauser);
    // var role = data.role;
    // if (role == "admin" || role == "kasir") {
    //   this.$swal("Anda Tidak Dapat Mengakses Halaman Ini");
    //   this.$router.push("/");
    // }
  },
  methods: {
    tampil() {
      this.axios
        .post(
          "http://localhost/latihan_lelang/public/api/reporthistory",
          this.report,
          {
            headers: { Authorization: "Bearer " + this.$store.state.token },
          }
        )
        .then((res) => {
          this.history = res.data;
        })
        .catch((err) => console.log(err));
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>