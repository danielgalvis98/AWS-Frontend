<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.nombre"
            label="Nombre"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.apellidos"
            label="Apellidos"
            :rules="apellidosRules"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            type="number"
            v-model="client.cedula"
            label="Cedula"
            :rules="cedulaRules"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.correo"
            label="Correo"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.direccion"
            label="Direccion"
            :rules="direccionRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="save">
        Guardar Cliente
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import axios from "../config/axios";
import { Auth } from 'aws-amplify';

export default {
  data: () => ({
    valid: false,
    client: {
      nombre: "",
      apellidos: "",
      correo: "",
      direccion: "",
      cedula: "",
    },
    nameRules: [(v) => !!v || "Debe indicar nombre"],
    emailRules: [
      (v) => !!v || "Debe indicar email",
      (v) => /.+@.+/.test(v) || "email debe ser valido",
    ],
    cedulaRules: [
      (v) => !!v || "Debe indicar cédula",
      (v) => v > 0 || "Cedula debe de ser positiva",
    ],
    apellidosRules: [(v) => !!v || "Debe de indicar apellidos"],
    direccionRules: [(v) => !!v || "Debe de indicar una dirección"],
  }),
  methods: {
    async save() {
      const jwtToken = await this.findUserToken();
      if(jwtToken === undefined) return;
      console.log('New token is ' + jwtToken)
      const config = {
        headers: {
          authorization: jwtToken
        }
      };
      axios
        .post("/clientes", this.client, config)
        .then((res) => {
          console.log("Hola la bandaaaaaa");
          console.log(res);
          alert("El usuario fue agregado/editado exitosamente!");
          this.clearFields();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    clearFields() {
      console.log("Clearing Fields");
      this.client = {
        nombre: "",
        apellidos: "",
        correo: "",
        direccion: "",
        cedula: "",
      };
    },
    async findUserToken() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user.getSignInUserSession().getIdToken().getJwtToken());
        return user.getSignInUserSession().getIdToken().getJwtToken();
      } catch (err) {
        alert('You need to be logged in!');
      }
    },
  },
};
</script>