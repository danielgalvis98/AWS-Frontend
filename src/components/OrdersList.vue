<template>
  <v-container>
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
      <template v-slot:[`item.actions`]="{ item }">
          <v-icon
              class="mr-2"
              @click="showItem(item)"
          >
              mdi-eye
          </v-icon>
          <v-icon
              class="mr-2"
              @click="editItem(item)"
          >
              mdi-pencil
          </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog 
      v-model="order_details_dialog"
    >
      <v-card class="pa-5">
        <v-card-title>
          Dirección del pedido: {{showed_order.deliveryAddress}}
        </v-card-title>
        <v-card class="pa-5">
          <v-list>
            <v-list-item-title>
              Lista de productos del pedido
            </v-list-item-title>
            <v-list-item
              v-for="(product,i) in showed_order.products"
              :key="i"
            >
              <v-list-item-title>
                {{product.title}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card-actions>
            <v-btn :href="showed_order.clientId" target="_blank">
              Documento de identificación del cliente
            </v-btn>
            <v-btn :href="showed_order.quotation" target="_blank">
                Cotizaciones del cliente
            </v-btn>
        </v-card-actions>
        <v-card-subtitle>
          Telefono de contacto del cliente: {{showed_order.telephone}}
        </v-card-subtitle>
      </v-card>
    </v-dialog>
    <v-dialog v-model="order_attend_dialog">
      <v-btn @click="attend_current_order">
        Atender orden
      </v-btn>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from "../config/axios";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      headers: [
        {
          text: "Identificador de la solicitud",
          value: "id"
        },
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
        },
        {
          text: "Estado del pedido",
          value: "state"
        },
        {
          text: "Acciones",
          value: 'actions'
        }
      ],
      orders: [],
      orders_info: [],
      search:'',

      showed_order:'',
      order_details_dialog:false,

      order_attend_dialog:false,
      order_to_be_attended:''
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
    showItem(item){
      this.order_details_dialog=true;
      this.showed_order=item;
    },
    editItem(item){
      this.order_attend_dialog=true;
      this.order_to_be_attended=item;
    },
    async attend_current_order(){
      console.log(this.order_to_be_attended.id);
      const jwtToken = await this.findUserToken();
      // console.log("Y acaaaaa " + jwtToken);
      if (jwtToken === undefined) return;
      const config = {
        headers: {
          authorization: jwtToken
        },
      };
      let data={
        id:this.order_to_be_attended.id
      }
      axios.put("/orders",data,config).then((res)=>{
        console.log(res);
        this.reset_order_list();
      })
    },
    initialize(){
      console.log("REBOOTED")
    },
    async reset_order_list(){
      this.orders_info=[];
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
                telephone: order.telephone,
                products: order.orderedProducts,
                clientId: order.identificationFile,
                quotation: order.quotationFile,
                state: order.orderState,
            })
        });
      });
    }
  },
  async created() {
    this.reset_order_list();
  },
};
</script>