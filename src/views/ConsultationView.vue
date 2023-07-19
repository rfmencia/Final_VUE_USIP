<template>
  <div>
    <h5>Consultas</h5>
    <tabs>
      <template v-slot:lista>
        <table class="highlight responsive-table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Motivo</th>
              <th>Diagnostico</th>
              <th>Tratamiento</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in items">
              <td>{{ item.pacientes.nombre }}</td>
              <td>{{ item.fecha }}</td>
              <td>{{ item.motivo }}</td>
              <td>{{ item.diagnostico }}</td>
              <td>{{ item.tratamiento }}</td>
              <td>
                <router-link :to="'/consultation/' + item.id"><i class="material-icons">create</i></router-link>
                <i class="material-icons" style="color: red" @click="eliminarItem(item.id)">delete_forever</i>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:nuevo>
        <div class="row card p-2" style="max-width: 650px">
          <h6>Consultas realizadas:</h6>
          <form class="col s12" @submit.prevent="saveConsultation()">
            <div class="row">
                <div class="input-field col s12">
                    <select v-model="payload.pacientesId" >
                        <option value="" disabled selected>Elija un paciente</option>
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
    </tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import Search from "@/components/Search.vue";
import FilterGroup from "@/components/FilterGroup.vue";
import FilterItem from "@/components/FilterItem.vue";
export default {
  name: "ConsultationView",
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      pacientes: [],
      toSearch: "",
      toFilter: "",
      payload: {
        fecha: null,
        motivo: null,
        diagnostico: null,
        tratamiento: null,
        pacientesId: 0,
      },
    };
  },
  methods: {
    getItems() {
      this.axios({
        method: "get",
        url:
          this.api +
          "/consultas?_expand=pacientes" +
          this.toSearch +
          this.toFilter,
      })
        .then((response) => {
          this.items = response.data;
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
        url: this.api + "/pacientes",
      }).then((response) => {
        this.pacientes = response.data;
        setTimeout(function () {
          var elems = document.querySelectorAll("select");
          var select = M.FormSelect.init(elems);
        });
        // console.log(response);
      });
    },
    saveConsultation() {
      this.axios({
        method: "post",
        url: this.api + "/consultas",
        data: this.payload,
      }).then((response) => {
        this.payload = {
            fecha: null,
            motivo: null,
            diagnostico: null,
            tratamiento: null,
            pacientesId: 0,
        };
        setTimeout(function () {
          var elems = document.querySelectorAll("select");
          var select = M.FormSelect.init(elems);
        });
        this.getItems();

        // console.log(response);
      });
    },
    eliminarItem(id) {
      if (confirm("Esta seguro de eliminar?")) {
        this.axios({
          method: "delete",
          url: this.api + "/consultas/" + id,
        }).then((response) => {
          this.getItems();
        //   console.log(response);
        });
      }
    },
  },
  mounted() {
    this.getItems();
    this.getPacientes();
  },
  components: {
    Tabs,
    Search,
    FilterGroup,
    FilterItem,
  },
  created() {
    setTimeout(() => {
      var elems = document.querySelectorAll("select");
      var select = M.FormSelect.init(elems);
    });
  },
};
</script>

<style></style>
