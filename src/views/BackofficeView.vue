<template>
  <div class="container_div">
    <div class="title">
      <h1>Bienvenido...🥳</h1>
      <v-btn dark small @click="closedSession" class="mr-2">
        Cerrar Sesion
      </v-btn>
      <v-btn dark color="info" small to="/" class="mr-2">
        Volver al inicio
      </v-btn>
    </div>
    <div class="table_data">
      <div>
        <v-btn dark small color="primary" @click="addModal">
          Agregar
        </v-btn>
      </div>
      <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" :loading="loading"
        loading-text="Loading... Please wait">

        <!---Acctions-->
        <template v-slot:item.acction="{ item }">
          <div class="d-flex">
            <v-btn class="mx-2" fab dark small color="primary" @click="editItem(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark small color="error" @click="deleteItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>

        <!---Image-->
        <template v-slot:item.img="{ item }">
          <v-img :src="item.img" max-width="100" max-height="100" contain></v-img>
        </template>

        <!---Promediun-->
        <template v-slot:item.promediun="{ item }">
          <v-rating :value="item.promediun" color="amber" dense half-increments readonly size="14"></v-rating>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="modal" max-width="500px">
      <v-card>
        <v-card-title>
          {{ textModal }}
        </v-card-title>
        <v-card-text>
          <v-text-field class="mt-6" v-model="dataModal.name" label="Nombre" :rules="rules"
            hide-details="auto"></v-text-field>
          <v-textarea class="mt-6" v-model="dataModal.description" label="Descripcion" :rules="rules"
            hide-details="auto"></v-textarea>
          <v-textarea class="mt-6" v-model="dataModal.img" label="URL de la Imagen" :rules="rules"
            hide-details="auto"></v-textarea>
          <v-text-field class="mt-6" v-model="dataModal.autor" label="Autor" :rules="rules"
            hide-details="auto"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="closedModalEdit">
            Cerrar
          </v-btn>
          <v-btn color="success" @click="saveItem" v-if="dataModal.id !== 0" :loading="loadingIPI">
            Guardar
          </v-btn>
          <v-btn color="success" @click="addCourse" v-else :loading="loadingIPI">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BackofficeView',
  data: () => ({
    headers: [
      { text: 'Nombre', value: 'name', },
      { text: 'Descripcion', value: 'description' },
      { text: 'Imagen', value: 'img' },
      { text: 'Autor', value: 'autor' },
      { text: 'Calificaciones', value: 'califications' },
      { text: 'Promedio', value: 'promediun' },
      { text: 'Accion', value: 'acction' },
    ],
    desserts: [],
    loading: true,
    loadingIPI: false,
    modal: false,
    textModal: 'Editar Curso',
    dataModal: {
      id: 0,
      name: '',
      description: '',
      img: '',
      autor: '',
      califications: '',
      promediun: '',
    },
    rules: [
      v => !!v || 'Campo requerido',
    ],
  }),
  methods: {
    async getDesserts() {
      this.loading = true;
      const { data } = await axios.get(process.env.VUE_APP_BASE_URL + 'courses');
      this.desserts = data;
      this.loading = false;
    },
    addModal() {
      this.modal = true;
      this.textModal = 'Agregar Curso';
      this.dataModal = {
        id: 0,
        name: '',
        description: '',
        img: '',
        autor: '',
        califications: '',
        promediun: '',
      };
    },
    async addCourse() {
      this.loadingIPI = true;
      this.dataModal.idUser = localStorage.getItem('sub_backoffice');
      const { data } = await axios.post(process.env.VUE_APP_BASE_URL + 'courses', this.dataModal);
      if (data.success) {
        setTimeout(() => {
          this.closedModalEdit()
        }, 200);
      }
      this.loadingIPI = false;
    },
    editItem(item) {
      this.modal = true;
      this.textModal = 'Editar Curso';
      this.dataModal = item;
    },
    closedModalEdit() {
      this.modal = false;
      this.getDesserts();
    },
    deleteItem(item) {
      confirm('¿Estas seguro de eliminar este curso?') && this.deleteItemApi(item.id);
    },
    async deleteItemApi(id) {
      const { data } = await axios.delete(process.env.VUE_APP_BASE_URL + `courses/${id}`);
      this.getDesserts();
    },
    async saveItem() {
      this.loadingIPI = true;
      const { data } = await axios.put(process.env.VUE_APP_BASE_URL + `courses/${this.dataModal.id}`, this.dataModal);
      this.modal = false;
      this.getDesserts();
      this.loadingIPI = false;
    },
    closedSession() {
      localStorage.removeItem('token_backoffice');
      localStorage.removeItem('sub_backoffice');
      this.$router.push('/login-backoffice');
    }
  },
  async created() {
    const token = localStorage.getItem('token_backoffice');
    if (!token) {
      this.$router.push('/login-backoffice');
    }
    await this.getDesserts();
  },
}
</script>

<style>
.title {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.container_div {
  width: 100%;
  margin: 20px;
  display: grid;
  place-content: center;

}

.container_div h1 {
  text-align: center;
  margin-bottom: 5%;
}

.table_data {
  width: 70vw;
  display: inline-grid;
  justify-items: end;

}
</style>
