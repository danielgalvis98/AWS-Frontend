<template>
  <v-data-table
    :headers="headers"
    :items="orders_info"
    :items-per-page="5"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
      ></v-text-field>
    </template>
  </v-data-table>
</template>
<script>
import axios from "../config/axios";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      headers: [
        {
          text: "Dirección de solicitud",
          value: "deliveryAddress",
        },
        {
          text: "Número de productos",
          value: "totalProducts",
        },
        {
          text: "Precio Final",
          value: "finalPrice",
        },
        {
          text: "Telefono de contacto",
          value: "telephone"
        }
      ],
      orders: [],
      orders_info: [],
      search:''
    };
  },
  methods: {
    async findUserToken() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        // console.log(
        //   "Keeeeeee " + user.getSignInUserSession().getIdToken().getJwtToken()
        // );
        return user.getSignInUserSession().getIdToken().getJwtToken();
      } catch (err) {
        alert("You need to be logged in!");
      }
    },
  },
  async created() {
    const jwtToken = await this.findUserToken();
    // console.log("Y acaaaaa " + jwtToken);
    if (jwtToken === undefined) return;
    const config = {
      headers: {
        authorization: jwtToken,
      },
    };
    axios.get("/orders", config).then((res) => {
    //   console.log(res.data.body);
      this.orders = res.data.body;
      this.orders.forEach(order => {
          console.log(order)
          this.orders_info.push({
              id: order.id,
              deliveryAddress: order.deliveryAddress,
              totalProducts: order.orderedProducts.length,
              finalPrice: order.orderedProducts.reduce((a, b) => a + b.price, 0),
              telephone: order.telephone
          })
      });
    });
  },
};
</script>