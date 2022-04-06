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
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Edit Users</h4>
                <form @submit.prevent="edit" class="forms-sample">
                  <div class="form-group">
                    <label for="exampleInputName1">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputName1"
                      placeholder="Name"
                      v-model="user.nama"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputAlamat1">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputAlamat1"
                      placeholder="Address"
                      v-model="user.alamat"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputNoHp1">Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputNoHp1"
                      placeholder="Phone Number"
                      v-model="user.no_hp"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputUsername1">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Username"
                      v-model="user.username"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleSelectLevel">Level</label>
                    <select
                      class="form-control"
                      id="exampleSelectLevel"
                      v-model="user.level"
                    >
                      <!-- <option value="{{user.level}}">{{user.level}}</option> -->
                      <option value="petugas">Operator</option>
                      <option value="pengguna">User</option>
                    </select>
                  </div>
                  <br />
                  <button type="submit" class="btn btn-gradient-primary me-2">
                    Submit
                  </button>
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
      user: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var level = data.level;
    if (level == "pengguna" || level == "petugas") {
      this.$swal("This page cannot be access");
      this.$router.push("/");
    }
    this.axios
      .get(
        `http://localhost/latihan_lelang/public/api/show/${this.$route.params.id}`,
        {
          headers: { Authorization: "Bearer" + this.$store.state.token },
        }
      )
      .then((res) => {
        this.user = res.data;
      });
  },
  methods: {
    edit() {
      this.axios
        .put(
          `http://localhost/latihan_lelang/public/api/edit/${this.$route.params.id}`,
          this.user,
          {
            headers: { Authorization: "Bearer" + this.$store.state.token },
          }
        )
        .then((res) => {
          if (res.data.success) {
            this.$swal(res.data.message);
            this.$router.push("/user");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
