<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="brand-logo">
                <img src="../../public/images/logo.svg" />
              </div>
              <h4>New here?</h4>
              <h6 class="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
              <form class="pt-3" @submit.prevent="tambah">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Name"
                    v-model="register.nama"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Address"
                    v-model="register.alamat"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Phone Number"
                    v-model="register.no_hp"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Username"
                    v-model="register.username"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    v-model="register.password"
                  />
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-gradient-primary me-2">
                    Submit
                  </button>
                </div>
              </form>
              <div class="text-center mt-4 font-weight-light col">
                Already have an account?
                <router-link class="nav-link col" to="/login">
                  Login
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: {},
    };
  },
  methods: {
    tambah() {
      this.axios
        .post(
          "http://localhost/latihan_lelang/public/api/register",
          this.register,
          {
            headers: { Authorization: "Bearer" + this.$store.state.token },
          }
        )
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
