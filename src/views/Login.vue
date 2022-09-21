<template>
  <v-row style="height: 100%" no-gutters>
    <v-col cols="5">
      <v-img
        class="login-col fill-height d-flex justify-center align-center"
        src="../assets/rect375.png"
      ></v-img>
    </v-col>
    <v-col
      cols="7"
      class="login-col fill-height d-flex justify-center align-center"
    >
      <v-card color="transparent" elevation="0" class="connection-card">
        <v-card-title
          v-if="mode == 'login'"
          class="connection-title font-weight-black pl-0"
        >
          Se Connecter
        </v-card-title>
        <v-card-title v-else class="connection-title font-weight-black pl-0">
          S'inscrire
        </v-card-title>
        <div>
          <div class="pt-8" v-if="mode == 'login'">
            <p class="mb-2 text-field-title">Identifiant / E-mail</p>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-account-outline"
              hide-details="true"
              v-model="form.email"
            ></v-text-field>
            <p class="mt-1 text-right caption text-decoration-underline">
              Identifiant oublié ?
            </p>
            <div>
              <p class="mb-2 text-field-title">Mot de Passe</p>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-key-outline"
                :append-icon="
                  visiblePass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                hide-details="true"
                :type="visiblePass ? 'password' : ''"
                @click:append="visiblePass = !visiblePass"
                v-model="form.password"
              ></v-text-field>
              <p class="mt-1 text-right caption text-decoration-underline">
                Mot de passe oublié ?
              </p>
            </div>
          </div>
          <div v-else-if="mode == 'create'">
            <div class="pt-6">
              <p class="mb-2 text-field-title">Email</p>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-email"
                hide-details="true"
                v-model="form.email"
              ></v-text-field>
            </div>

            <div class="pt-8">
              <p class="mb-2 text-field-title">Mot de Passe</p>
              <v-text-field
              outlined
                prepend-inner-icon="mdi-key-outline"
                :append-icon="
                  visiblePass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                hide-details="true"
                :type="visiblePass ? 'password' : ''"
                @click:append="visiblePass = !visiblePass"
                v-model="form.password"
              ></v-text-field>
            </div>
          </div>
          <div v-else>
            <v-row>
              <v-col>
                <div class="pt-8">
                  <p class="mb-2 text-field-title">Nom</p>
                  <v-text-field
                    hide-details="true"
                    v-model="name"
                    outlined
                  ></v-text-field>
                </div>
              </v-col>
              <v-col>
                <div class="pt-8">
                  <p class="mb-2 text-field-title">Prénom</p>
                  <v-text-field
                    outlined
                    hide-details="true"
                    v-model="firstname"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <div class="pt-8">
              <p class="mb-2 text-field-title">Dénomination</p>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-briefcase"
                hide-details="true"
                v-model="denomination"
              ></v-text-field>
            </div>

            <div class="pt-6">
              <p class="mb-2 text-field-title">Rue</p>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-account-outline"
                hide-details="true"
                v-model="street"
              ></v-text-field>
            </div>

            <v-row>
              <v-col>
                <div class="pt-6">
                  <p class="mb-2 text-field-title">Code Postal</p>
                  <v-text-field
                    outlined
                    prepend-inner-icon="mdi-account-outline"
                    hide-details="true"
                    v-model="postal"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col>
                <div class="pt-6">
                  <p class="mb-2 text-field-title">Commune</p>
                  <v-text-field
                    outlined
                    prepend-inner-icon="mdi-account-outline"
                    hide-details="true"
                    v-model="city"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <div class="pt-6">
              <p class="mb-2 text-field-title">Téléphone</p>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-phone"
                hide-details="true"
                v-model="phone"
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="pt-8">
          <v-checkbox v-model="checkbox" dense class="ma-0" color="secondary">
            <template v-slot:label>
              <div class="caption ml-n2">Rester connecté</div>
            </template>
          </v-checkbox>
          <div class="mt-n6">
            <v-btn
              v-if="mode == 'login'"
              block
              elevation="1"
              class="my-4 py-8 no-uppercase"
              color="secondary"
              @click="submit"
            >
              <div class="font-weight-bold button-text">Se Connecter</div>
            </v-btn>
            <v-btn
              v-else-if="mode == 'infos'"
              block
              elevation="1"
              class="my-4 py-8 no-uppercase"
              color="secondary"
              @click="
                handleSubmit();
                goToHome();
              "
            >
              <div class="font-weight-bold button-text">Valider</div>
            </v-btn>
            <v-btn
              v-else
              block
              elevation="1"
              class="my-4 py-8 no-uppercase"
              color="secondary"
              @click="
                register();
               
              "
            >
              <div class="font-weight-bold button-text">Valider</div>
            </v-btn>
            <!-- <v-btn
              v-if="mode == 'login'"
              block
              elevation="1"
              class="my-4 py-8 white--text no-uppercase"
              @click="switchToCreateAccount()"
              color="#2C2C2C"
            >
              <div class="button-text font-weight-bold">S'inscrire</div>
            </v-btn> -->
            <v-btn
              v-else
              block
              elevation="1"
              class="my-4 py-8 white--text no-uppercase"
              @click="switchToLogin()"
              color="#2C2C2C"
            >
              <div class="button-text font-weight-bold">Retour</div>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    mode: "login",
    registerRes:{},
    mode1: "data",
    checkbox: false,
    visiblePass: true,
    type: "password",
    form: {
      email: "",
      password: "",
    },

    name: "",
    firstname: "",
    denomination: "",
    street: "",
    city: "",
    postal: "",
    phone: "",

    showError: false,
  }),
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      try {
        await this.LogIn(this.form);
        this.$router.push("/Dashboard");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
  //  ...mapActions(["Register"]),
     register() {
      
         axios.post("user/signup", this.form).then(res=>{
          this.registerRes=res.data;
        console.log(this.registerRes,"register response");
        //this.$router.push("/Dashboard");
        this.showError = false;
        this.switchToinfos();
         }).catch(e=>{
          alert("Something went wrong in registration")
          this.showError = true;
         })
        
    
    },
    async goToHome() {
      try {
        await this.LogIn(this.form);
        this.$router.push("/Dashboard");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    switchToinfos: function () {
      this.mode = "infos";
    },
    handleSubmit() {
      const data = {
        lastname: this.name,
        firstname: this.firstname,
        denomination: this.denomination,
        street: this.street,
        city: this.city,
        postal: this.postal,
        phone: this.phone,
        userId:this.registerRes.userId
      };
      const headers = {
          authorization: "Bearer " + this.registerRes.token,
        };
      console.log(data);
      axios
        .post("/fiche",data,{
          headers,
        })
        .then((res) => {
          this.submit().catch((e)=>console.error(e));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.background {
  height: 100%;
}
.login-col {
  background: linear-gradient(
    132.92deg,
    rgba(49, 54, 203, 0.15) 0.01%,
    rgba(142, 80, 222, 0.15) 27.08%,
    rgba(124, 93, 155, 0.15) 55.73%,
    rgba(110, 102, 203, 0.15) 85.25%,
    rgba(49, 54, 203, 0.15) 100%
  );
}
.connection-card {
  width: 55%;
}
.connection-title {
  font-size: 37px !important;
}
.no-uppercase {
  text-transform: unset !important;
}
.text-field-title {
  font-size: 18px;
}
.button-text {
  font-size: 20px;
}
.v-text-field input {
  margin-left: 10px !important;
}
</style>
