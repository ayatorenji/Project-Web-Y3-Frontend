<template>
  <q-page>
    <div style="text-align: center">
      <h2>Register</h2>
    </div>
    <div class="flex justify-center">
      <q-card class="my-card bg-grey-1 q-px-md q-py-md" style="width: 25rem">
        <div class="flex flex-center">
          <q-icon name="account_circle" color="grey-6" size="4rem" />
        </div>
        <q-card-section>
          <q-form
            @submit.prevent="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            ref="myRegisterForm"
          >
            <div>
              <q-input
                v-model="fullname"
                type="text"
                label="Your Fullname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field is required',
                ]"
              />
            </div>
            <div>
              <q-input
                v-model="email"
                type="text"
                label="Your Email"
                lazy-rules
                :rules="[emailValidate, requiredValidate]"
              />
            </div>
            <div>
              <q-input
                v-model="username"
                type="text"
                label="Your username"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field is required',
                ]"
              />
              <text-caption
                style="font-size: 0.9em"
                v-if="usernameCaption.show"
                :class="[
                  usernameCaption.showClass ? 'text-positive' : 'text-negative',
                ]"
              >
                <q-icon :name="usernameCaption.icon" size="1.5em" />
                {{ usernameCaption.msg }}
              </text-caption>
            </div>
            <div>
              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Your Password"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length >= 6) || 'Must be at least 6 characters',
                ]"
              >
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { emailValidate, requiredValidate } from "../utils/validations";
import { useLoginUserStore } from "../stores/loginUserStore.js";
import { Notify } from "quasar";
export default {
  name: "RegisterPage",
  data() {
    return {
      fullname: "",
      email: "",
      username: "",
      password: "",
      isPwd: true,
      usernameCaption: {
        show: false,
        showClass: false,
        icon: null,
        msg: null,
      },
      storeLogUser: useLoginUserStore(),
    };
  },
  methods: {
    emailValidate,
    requiredValidate,
    onSubmit() {
      if (!this.usernameCaption.showClass) {
        Notify.create({
          type: "negative",
          message: "Username is already taken",
        });
        return;
      }

      const data = {
        fullname: this.fullname,
        email: this.email,
        username: this.username,
        password: this.password,
      };

      this.$api.post("/auth/signup", data)
        .then((response) => {
          if (response && response.data) {
            this.storeLogUser.userid = response.data.id;
            this.storeLogUser.fullname = response.data.fullname;
            this.storeLogUser.username = response.data.username;
            this.storeLogUser.accessToken = response.data.accessToken;
            this.storeLogUser.userType = response.data.userType;

            Notify.create({
              color: 'positive',
              message: 'Registration successful'
            });

            this.$router.push('/user/dashboard');
          } else {
            throw new Error('Invalid response from server');
          }
        })
        .catch((error) => {
          console.error(error);
          Notify.create({
            color: 'negative',
            message: `Registration failed: ${error.message}`
          });
        })
        .finally(() => {
          this.onReset();
        });
    },
    onReset() {
      this.fullname = null;
      this.email = null;
      this.username = null;
      this.password = null;
      this.resetUserCaption();
    },
    resetUserCaption() {
      this.usernameCaption.show = false;
      this.usernameCaption.showClass = false;
      this.usernameCaption.icon = null;
      this.usernameCaption.msg = null;
    },
    usernameValidate() {
      if (this.username) {
        this.$api
          .get("/auth/" + this.username)
          .then((response) => {
            // console.log(response.data)
            if (response.data.valid) {
              this.usernameCaption.show = true;
              this.usernameCaption.showClass = true;
              this.usernameCaption.icon = "check_circle_outline";
              this.usernameCaption.msg = "This username is Available.";
            } else {
              this.usernameCaption.show = true;
              this.usernameCaption.showClass = false;
              this.usernameCaption.icon = "highlight_off";
              this.usernameCaption.msg = "This username is NOT Available.";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.resetUserCaption();
      }
    },
  },
  watch: {
    username() {
      this.usernameValidate();
    },
  },
};
</script>
