<template>

    <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="client.nombre"
            label="Nombre"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="client.apellidos"
            label="Apellidos"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="client.cedula"
            label="Cedula"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="client.correo"
            label="Correo"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="client.direccion"
            label="Direccion"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
      color="success"
      class="mr-4"
      @click="save"
    >
      Guardar Cliente
    </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import axios from '../config/axios'

export default {
    data: () => ({
        client: {
            nombre: "Daniel",
            apellidos: "Galvis Torres",
            correo: "dan@dan.com",
            direccion: "Universidad Icesi",
            cedula: "134"
        }
    }),
    methods: {
        save (){
            axios.post("/clientes", this.client).then((res) => {
                console.log(res);
            })
        }
    }
}
</script>