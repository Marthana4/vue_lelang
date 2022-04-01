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
                          <h4 class="card-title">Cetak Report</h4>
                        </div>
                        <div class="card-body">
                          <form class="form-group" @submit.prevent="tampil">
                            <label>Bulan</label>
                            <select class="form-control" v-model="report.bulan">
                              <option value="01">Januari</option>
                              <option value="02">Februari</option>
                              <option value="03">Maret</option>
                              <option value="04">April</option>
                              <option value="05">Mei</option>
                              <option value="06">Juni</option>
                              <option value="07">Juli</option>
                              <option value="08">Agustus</option>
                              <option value="09">September</option>
                              <option value="10">Oktober</option>
                              <option value="11">November</option>
                              <option value="12">Desember</option>
                            </select>
                            <br />
                            <label>Tahun</label>
                            <select class="form-control" v-model="report.tahun">
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                            </select>
                            <button type="submit" class="btn btn-sm btn-info">
                              Tampilkan
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
                                <h3 class="text-center">Lelang</h3>
                                <h5 class="text-center">
                                  Platform User Lelang
                                </h5>
                                <br /><br />
                                <table class="table table-striped text-center">
                                  <thead>
                                    <tr>
                                      <th class="font-weight-bold">No</th>
                                      <th class="font-weight-bold">Item Name</th>
                                      <th class="font-weight-bold">Started Price</th>
                                      <th class="font-weight-bold">Final Price</th>
                                      <th class="font-weight-bold">User Name</th>
                                      <th class="font-weight-bold">Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(l, index) in lelang"
                                      :key="index"
                                    >
                                      <td>{{ index + 1 }}</td>
                                      <td>{{ l.nama_barang }}</td>
                                      <td>{{ l.harga_awal }}</td>
                                      <td>{{ l.harga_akhir }}</td>
                                      <td>{{ l.nama }}</td>
                                      <td>
                                        {{ l.tgl_lelang | moment("DD/MM/YYYY") }}
                                      </td>
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
      lelang: {},
    };
  },
  created() {
    var date = new Date();
    this.report.tahun = date.getFullYear();
    this.report.bulan = ("0" + (date.getMonth() + 1)).slice(-2);

          var data = JSON.parse(this.$store.state.datauser)
          var level = data.level
          if(level == 'pengguna' )
          {
              this.$swal("This page cannot be access")
              this.$router.push('/home') 
          }
  },
  methods: {
    tampil() {
      this.axios
        .post(
          "http://localhost/latihan_lelang/public/api/reportlelang",
          this.report,
          {
            headers: { Authorization: "Bearer " + this.$store.state.token },
          }
        )
        .then((res) => {
          this.lelang = res.data;
        })
        .catch((err) => console.log(err));
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>