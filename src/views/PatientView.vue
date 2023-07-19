<template>
  <div>
    <h5>Pacientes</h5>
    <tabs>
      <template v-slot:lista>
        <search placeholder="Busqueda General" @searchtext="searchFx($event)"></search>
        <filter-group>
          <filter-item :items="generos" label="Filtro de genero:" @onfilter="onFilterFx('genero', $event)"></filter-item>
        </filter-group>
        <table class="highlight responsive-table card">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Edad</th>
              <th>Genero</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in items">
              <td>{{ item.nombre }}</td>
              <td>{{ item.edad }}</td>
              <td>{{ item.genero }}</td>
              <td>{{ item.direccion }}</td>
              <td>{{ item.telefono }}</td>
              <td>
                <router-link :to="'/patient/' + item.id">
                  <i class="material-icons">create</i>
                </router-link>
                <i class="material-icons" style="color: red" @click="eliminarItem(item.id)">delete_forever</i>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-slot:nuevo>
        <div class="row card p-2" style="max-width: 650px">
          <h6>Formulario para paciente nuevo</h6>
          <form class="col s12" @submit.prevent="savePatient()">
            <div class="row">
              <div class="input-field col s12">
                <input id="nombre" type="text" class="validate" v-model="payload.nombre"/>
                <label for="nombre">Nombre Completo</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="edad" type="number" class="validate" v-model="payload.edad"/>
                <label for="edad">Edad</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <select v-model="payload.genero">
                  <option value="" disabled selected>
                    Elija un genero
                  </option>
                  <option value="Masculino">
                    Masculino
                  </option>
                  <option value="Femenino">
                    Femenino
                  </option>
                </select>
                <label>Genero</label>
              </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                  <input id="direccion" type="text" class="validate" v-model="payload.direccion"/>
                  <label for="direccion">Direccion</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                  <input id="telefono" type="number" class="validate" v-model="payload.telefono"/>
                  <label for="telefono">Telefono</label>
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
import FilterItem from "@/components/FilterItem.vue";
import FilterGroup from "@/components/FilterGroup.vue";
export default {
  name: "Patient",
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      toSearch: "",
      generos:[{id:"Masculino",name:"Masculino"},{id:"Femenino",name:"Femenino"}],
      toFilter: "",
      payload: {
        nombre: "",
        edad: null,
        genero: null,
        direccion: null,
        telefono: null,
      },
    };
  },
  methods: {
    onFilterFx(field, event) {
      if (event === "") {
        this.toFilter = "";
      } else {
        this.toFilter = "?" + field + "=" + event;
      }
      this.getItems();
    },
    getItems() {
      this.axios({
        method: "get",
        url:
          this.api +
          "/pacientes" +
          this.toSearch +
          this.toFilter,
      })
        .then((response) => {
          this.items = response.data;
          // console.log(this.items);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    savePatient() {
      this.axios({
        method: "post",
        url: this.api + "/pacientes",
        data: this.payload,
      }).then((response) => {
        this.payload = {
            nombre: "",
            edad: null,
            genero: null,
            direccion: null,
            telefono: null,
        };
        setTimeout(function () {
          var elems = document.querySelectorAll("select");
          var select = M.FormSelect.init(elems);
        });
        this.getItems();

        // console.log(response);
      });
    },
    searchFx(event) {
      if (event === "") {
        this.toSearch = "";
      } else {
        this.toSearch = "?q=" + event;
      }
      this.getItems();
      // console.log("search", event);
    },
    eliminarItem(id) {
      if (confirm("Esta seguro que desea eliminar.")) {
        this.axios({
          method: "delete",
          url: this.api + "/pacientes/" + id,
        }).then((response) => {
          this.getItems();
        });
      }
    },
  },
  mounted() {
    this.getItems();
  },
  components: {
    Tabs,
    Search,
    FilterItem,
    FilterGroup,
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
