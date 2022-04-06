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
              <h4>Hello! let's get started</h4>
              <h6 class="font-weight-light">Sign in to continue.</h6>
              <form class="pt-3 user" @submit.prevent="login">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Username"
                    v-model="account.username"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    v-model="account.password"
                  />
                </div>
                <div class="mt-3">
                  <button
                    class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                    type="submit"
                  >
                    SIGN IN
                  </button>
                </div>
                <div class="text-center mt-4 font-weight-light col">
                  Don't have an account?
                  <router-link class="nav-link col" to="/register">
                    Create
                  </router-link>
                </div>
              </form>
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
      account: {},
    };
  },
  methods: {
    login() {
      this.axios
        .post("http://localhost/latihan_lelang/public/api/login", this.account)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("setUser", JSON.stringify(res.data.user));
            let loginType = res.data.user.level;
            if (loginType === "pengguna") {
              this.$router.push("/home");
            } else {
              this.$router.push("/");
            }
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
