<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dark
    >
      <v-btn
        icon
        to="/"
      >
        <v-icon
          color="white"
        >
          mdi-circle
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click="open_cart_dialog"
      >
        <v-badge
          color="red"
          :content="order_product_count"
        >
          <v-icon
            color="white"
          >
            mdi-cart
          </v-icon>
        </v-badge>
      </v-btn>

      <v-spacer></v-spacer>
      <div v-if="is_logged">
        <v-btn
          to="/registerClient"
          text
        >
          <span class="mr-2">Registrar cliente</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
        <v-btn
          to="/clients"
          text
        >
          <span class="mr-2">Ver Clientes</span>
        </v-btn>
        <v-btn
          to="/orders"
          text
        >
          <span class="mr-2">Ver Pedidos</span>
        </v-btn>
        <v-btn
          to="/login"
          text
        >
          <span class="mr-2">Iniciar sesion / salir</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          to="/login"
          text
        >
          <span class="mr-2">Iniciar sesion / salir</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-overlay
      v-model="cart_dialog"
    >
      <v-card
        v-click-outside="onClickOutside"
        light
        class="pa-5 order-vcard"
      >
        <v-card class="pa-5">   
          <v-text-field
            v-model="delivery_address"
            label="Dirección de entrega"
          ></v-text-field>
          <v-text-field
            v-model="telephone"
            label="Contacto telefonico"
          ></v-text-field>
          <v-file-input
            show-size
            label="Documento de identificación"
            @change="selectIdentificationFile"
          ></v-file-input>
          <v-file-input
            show-size
            label="Cotizaciones"
            @change="selectQuoteFile"
          ></v-file-input>
        </v-card>

        <v-card class="mt-5">
          <v-card-title>
            Productos en el pedido
          </v-card-title>
          <v-list>
            <v-list-item
              v-for="(product,i) in products"
              :key="i"
            >
              <v-list-item-title>
                {{product.title}}
              </v-list-item-title>
              <v-list-item-action>
                  <v-btn @click="remove_product_from_order(i)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card-actions>
          <v-btn
            @click="send_order"
          >
            Enviar pedido
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-app>
</template>

<script>
import axios from './config/axios'
import { Auth } from "aws-amplify";

export default {
  name: 'App',
  data: () => ({
    cart_dialog:false,

    client_identification:'',
    client_quotation:'',
    delivery_address:'',
    telephone:''
  }),
  computed:{
    products(){
      return this.$store.state.current_order.products;
    },
    order_product_count(){
      return this.$store.state.current_order.products.length;
    },
    is_logged(){
      return this.$store.state.is_user_logged;
    }
  },
  methods:{
    onClickOutside(){
      this.cart_dialog=false;
    },
    open_cart_dialog(){
      this.cart_dialog=true;
    },
    send_order(){
      let data={
        client_identification_base64:this.client_identification,
        client_quotation_base64: this.client_quotation,
        delivery_address: this.delivery_address,
        ordered_products: this.$store.state.current_order.products,
        telephone: this.telephone,
        state: 'PENDIENTE'
      }
      axios.post("/orders",data).then((res)=>{
        console.log(res)
        alert("Pedido enviado exitosamente")
      }).catch((err)=>{
        console.log(err)
      })
    },
    remove_product_from_order(i){
      this.$store.commit("removeProductFromOrder",i);
    },
    selectIdentificationFile(file){
      this.getBase64(file).then(
        data => this.client_identification=data
      );
    },
    selectQuoteFile(file){
      this.getBase64(file).then(
        data => this.client_quotation=data
      );
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  },
  mounted(){
    console.log("executes")
    Auth.currentAuthenticatedUser().then((res)=>{
      console.log(res);
      this.$store.state.is_user_logged=true;
    }).catch((err)=>{
      console.log(err);
      this.$store.state.is_user_logged=false;
    })
  }
};
</script>

<style lang="scss" scoped>
.order-vcard{
  height:550px;/* or any height you want */
  width:500px;
  overflow-y:auto
}
</style>