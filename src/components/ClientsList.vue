<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
import axios from "../config/axios";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      headers: [
        {
          text: "Cédula",
          value: "cedula",
        },
        {
          text: "Nombre",
          value: "nombre",
        },
        {
          text: "Apellidos",
          value: "apellidos",
        },
        {
          text: "Correo Electrónico",
          value: "correo",
        },
        {
          text: "Dirección",
          value: "direccion",
        },
      ],
      clients: [],
    };
  },
  methods: {
    async findUserToken() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user.getSignInUserSession().getIdToken().getJwtToken());
        return user.getSignInUserSession().getIdToken().getJwtToken();
      } catch (err) {
        alert("You need to be logged in!");
      }
    },
  },
  async created() {
    const jwtToken = await this.findUserToken();
    console.log("el token " + jwtToken);
    if (jwtToken === undefined) return;
    const config = {
      headers: {
        authorization: jwtToken,
      },
    };
    axios.get("/clientes", config).then((res) => {
      console.log(res.data.body);
      this.clients = res.data.body;
    });
  },
};
</script>