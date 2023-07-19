<template>
    <div>
        <h5>Editar Paciente </h5>
        <div class="row card p-2" style="max-width: 650px;">
            <h6>Formulario editar paciente</h6>
            <form class="col s12" @submit.prevent="savePatient()">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="nombre" type="text" class="validate" v-model="payload.nombre">
                        <label for="nombre">Nombre Completo</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="edad" type="number" class="validate" v-model="payload.edad">
                        <label for="edad">Edad</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <select v-model="payload.genero" >
                            <option value="" disabled selected>Elija una categoria</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                        <label>Genero</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="direccion" type="text" class="validate" v-model="payload.direccion">
                        <label for="direccion">Direccion</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="telefono" type="text" class="validate" v-model="payload.telefono">
                        <label for="telefono">Telefono</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Enviar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'PatientEditView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            payload: {
                
            }
        }
    },
    methods: {

        getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/pacientes/'+this.$route.params.id
            })
                .then((response) => {
                    this.payload = response.data;
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    // console.log(this.payload);
                });
        },
        savePatient() {
            this.axios({
                method: 'patch',
                url: this.api + '/pacientes/'+this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                   this.$router.push('/patient');

                    // console.log(response);
                });
        }
        
    },
    mounted() {
        this.getItem();
    },
    components: {
        
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style scoped lang="scss">
i {
    cursor: pointer;
    margin-right: 10px;

}
</style>