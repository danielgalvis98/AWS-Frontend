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
            :rules="nameRules"
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
            :rules="apellidosRules"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field type="number"
            v-model="client.cedula"
            label="Cedula"
            :rules="cedulaRules"
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
            :rules="emailRules"
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
            :rules = "direccionRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
      :disabled="!valid"
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
        valid: false,
        client: {
            nombre: "",
            apellidos: "",
            correo: "",
            direccion: "",
            cedula: ""
        },
        nameRules: [
          v => !!v || 'Debe indicar nombre',
        ],
        emailRules: [
          v => !!v || 'Debe indicar email',
          v => /.+@.+/.test(v) || 'email debe ser valido',
        ],
        cedulaRules: [
          v => !!v || 'Debe indicar cédula',
          v => v > 0 || 'Cedula debe de ser positiva' 
        ],
        apellidosRules: [
          v => !!v || 'Debe de indicar apellidos'
        ],
        direccionRules: [
          v => !!v || 'Debe de indicar una dirección'
        ],
    }),
    methods: {
        save (){
            axios.post("/clientes", this.client).then((res) => {
                console.log('Hola la bandaaaaaa');
                console.log(res);
                alert('El usuario fue agregado/editado exitosamente!');
                this.clearFields()
            }).catch((err) => {
              console.log(err);
              alert(err);
              this.clearFields()
            });
        },
        clearFields(){
          console.log('Clearing Fields');
          this.client = {
            nombre: "",
            apellidos: "",
            correo: "",
            direccion: "",
            cedula: ""
          }
        }
    }
}
</script>