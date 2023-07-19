<template>
  <div>
    <h5>Editar Consulta: {{ $route.params.id }}</h5>
    <form class="col s12" @submit.prevent="saveConsultation()">
    <div class="row">
        <div class="input-field col s12">
            <select v-model="payload.pacientesId" >
                <option v-for="(value, key) in pacientes" :key="key" :value="value.id">{{ value.nombre }}
                </option>
            </select>
            <label>Pacientes</label>
        </div>
    </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="fecha" type="date" class="validate" v-model="payload.fecha"/>
          <label for="fecha">Fecha</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="motivo" type="text" class="validate" v-model="payload.motivo"/>
          <label for="motivo">Motivo</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="diagnostico" type="text" class="validate" v-model="payload.diagnostico"/>
          <label for="diagnostico">Diagnostico</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="tratamiento" type="text" class="validate" v-model="payload.tratamiento"/>
          <label for="tratamiento">Tratamiento</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <button class="btn waves-effect waves-light" type="submit" name="action">
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ConsultationEditView",
  data() {
    return {
      api: process.env.VUE_APP_API,
      pacientes: [],
      payload: {

      },
    };
  },
  methods: {
    getItem() {
      const id = this.$route.params.id;
    //   console.log(id);
      this.axios({
        method: "get",
        url: this.api + "/consultas/" + id,
      })
        .then((response) => {
          this.payload = response.data;
          this.getPacientes(this.payload.pacientesId);
          setTimeout(function () {
            M.updateTextFields();
          });
        //   console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    getPacientes() {
      this.axios({
        method: "get",
        url: this.api + "/pacientes/",
      })
        .then((response) => {
          this.pacientes = response.data;
          setTimeout(function () {
            var elems = document.querySelectorAll("select");
            var select = M.FormSelect.init(elems);
          });
        //   console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    saveConsultation() {
      this.axios({
        method: "patch",
        url: this.api + "/consultas/" + this.$route.params.id,
        data: this.payload,
      })
        .then((response) => {
          this.pacientes = response.data;
          setTimeout(function () {
            var elems = document.querySelectorAll("select");
            var select = M.FormSelect.init(elems);
          });
          this.$router.push('/consultation');
        //   console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
  created() {
    this.getItem();
    this.getPacientes();
  },
};
</script>
