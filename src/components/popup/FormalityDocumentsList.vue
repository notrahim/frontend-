<template>
  <div class="d-flex">
    <v-row align="center">
      <v-dialog :value="show" persistent max-width="700"
      class="rounded-xl mt-5"
      width="500"
      color="white"
      :elevation="hover ? 0 : 12"
      :class="{ 'on-hover': hover }">
        <v-tabs v-model="tab" color="accent" slider-color="accent">
          <v-tab ripple href="#tab-1">Questions</v-tab>
          <v-tab ripple href="#tab-2">Documents</v-tab>
          <v-tab-item value="tab-1">
            <formality-pop-up-list
              :selectedItem="selectedItem"
              ref="popupList"
            ></formality-pop-up-list>
            <v-btn
              class="ma-2"
              outlined
              rounded
              color="#f0a443"
              @click="changeTab()">Documents
            </v-btn>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card-text>
              <v-card-text>
                <div
                  v-for="(document, index) in documents"
                  :key="index"
                  class="files-status-container">
                  <v-btn class="ma-2" outlined rounded color="#f0a443"
                    @click="handleFileImport(document, 'required')">
                    <v-icon left> mdi-file </v-icon>
                    {{ document }} </v-btn
                  ><span class="status">
                    {{ documentsList[document] }}</span>
                </div>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  id="files"
                  accept="application/pdf"
                  @change="onFileChanged"/>
                <div v-if="fonds==true">
                  <div class="files-status-container">
                    <v-btn class="ma-2" outlined rounded color="#f0a443" @click="handleFileImport('fonds')">
                    <v-icon left>mdi-file</v-icon>Contrat de fonds</v-btn>
                    <span class="status">{{addDocList['fonds']}}</span>
                  </div>
                </div>
                <div v-if="autorisation==true">
                  <div class="files-status-container">
                    <v-btn class="ma-2" outlined rounded color="#f0a443" @click="handleFileImport('autorisation')">
                    <v-icon left>mdi-file</v-icon>Autorisation d'activité</v-btn>
                    <span class="status">{{addDocList['autorisation']}}</span>
                  </div>
                </div>
                <!-- <div v-for="(info, i) in additionalFields" :key="'$' + i">
                  <div
                    v-if="Object.keys(info).length">
                    <div
                      v-for="(doc, doc_index) in Object.values(info)[0]"
                      :key="'$' + i + doc_index"
                      class="files-status-container">
                      <v-btn
                        class="ma-2"
                        outlined
                        rounded
                        color="#f0a443"
                        @click="
                          handleFileImport(
                            Object.keys(info)[0] + '_' + doc,
                            'additional')">
                        <v-icon left> mdi-file </v-icon>
                        {{ doc }}
                      </v-btn>
                      <span class="status">
                        {{ addDocList[Object.keys(info)[0] + "_" + doc] }}
                      </span>
                    </div>
                  </div>
                </div> -->
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div>
                <v-btn color="darken-1" 
                text 
                :disabled="dialog"
                :loading="dialog"
                @click="submitFiles();
                dialog = true"
                >Envoyer
                </v-btn>

                <v-dialog
                v-model="dialog"
                hide-overlay
                persistent
                width="300">
                <v-card
                    color="accent"
                    dark>
                    <v-card-text>
                    En cours de traitement
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                    </v-card-text>
                </v-card>
                </v-dialog>

                <v-dialog 
                max-width="500" 
                transition="dialog-bottom-transition" 
                persistent hide-overlay 
                v-model="dialog2">
                </v-dialog>

              </div>
                <v-btn
                  color="darken-1"
                  text
                  @click="selected = [];
                  $emit('close');
                  ">Fermer
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-tab-item>
        </v-tabs>
      </v-dialog>
    </v-row>
  </div>
</template>
  

<script>
import axios from "axios";
export default {
  props: ["show", "form", "nameTask", "documents", "additionalFields", "selectedItem", "fonds", "autorisation"],
  components: {
    FormalityPopUpList: () => import("@/components/popup/FormalityPopUpList.vue"),
},

  data() {
    return {
      tab: "tab-1",
      readonly: true,
      dialog: true,
      selected: [],
      dialog2: false,
      file: "",
      files: [],
      documentsList: {},
      addDocList: {},
      type: "",
      dialog: false,
      result: null,
      doc: "",
      docFormData: {},
      storeFileNameWithKeys: {},
      userData: {
        UserDenom : '',
        UserTel : '',
        UserZip : '',
        UserRue : '',
        UserVille : ''
      }
    };
  },
  mounted() {
    this.fetchData()
    this.documentsList = this.documents.reduce(function (acc, curr) {
      acc[curr] = "";
      return acc;
    }, {});
    for (let key of this.additionalFields) {
      for (let val of Object.values(key)[0]) {
        console.log("line 106", key, Object.keys(key)[0] + "_" + val);
        this.addDocList[Object.keys(key)[0] + "_" + val] = "";
      }
    }
  },
  watch: {
          dialog (val) {
            if (!val) return
    
            setTimeout(() => (this.dialog = false, this.dialog2 = true), 2000)
          },
        },
  methods: {
    async fetchData() {
      try {
        const headers = {
          authorization: "Bearer " + this.$store.state.auth.user.token,
        };
        let response = await axios.get("fiche", {
          headers,
        });
        response = [...response.data][0]
        this.userData.UserDenom = response.denomination
        this.userData.UserTel = response.phone
        this.userData.UserZip = response.postal
        this.userData.UserRue = response.street
        this.userData.UserVille = response.city
      } catch (err) {
        console.log(err);
      }
    },

    changeTab() {
      this.tab = "tab-2";
    },
    handleFileImport(doc, type) {
      this.doc = doc;
      this.type = type;
      this.$refs.uploader.click();
    },
    onFileChanged(event) {
      console.log(event.target.files)
      if (this.type == "required") {
        this.documentsList[this.doc] = event.target.files[0]['name'];
      }
      if (this.type == "additional") {
        this.addDocList[this.doc] = event.target.files[0]['name'];
        this.$forceUpdate();
      }
      this.docFormData = {
        ...this.docFormData,
        [this.doc]: event.target.files[0]
      }
      this.storeFileNameWithKeys[event.target.files[0]['name']] = this.doc;
    },

    submitFiles() {
      const formData = new FormData();
      Object.values(this.docFormData).forEach(val => {
        formData.append('files', val);
      })      
      let requestData = {};
      Object.keys(this.$refs.popupList.$refs).forEach(val=> {
        requestData = {
          ...requestData,
          ...this.$refs.popupList.$refs[val][0]['postData']
        }
      })
      let form = {
        ...requestData,
        ...this.userData
      }
      // formData.append('fileKeys', JSON.stringify({...this.storeFileNameWithKeys}))
      // formData.append('name', this.nameTask)
      formData.append('questions_form', JSON.stringify(form));


      formData.append('form', 'M0-SC')
      formData.append('userid', '123')

      console.log(JSON.stringify(form))
      // formData.append('form', this.form);

      
    //   console.log(this.form)
    //   console.log(JSON.stringify(form))
    //   console.log(this.nameTask)

    //  console.log('file names', JSON.stringify({...this.storeFileNameWithKeys}))

      axios.post(
          'http://localhost:8000/create_request',
          formData,
        )
        .then(() => {response => {
          this.result = response.data
        }
          console.log(response);
        })
        .catch((err) => {
          [];
          console.log(err);
        });
    },
  },
};
</script>

<style>
.v-tabs {
  align-items: center;
}
.test {
  padding: 10px;
  margin-left: 10px;
}
</style>




