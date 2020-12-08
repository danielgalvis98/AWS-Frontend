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
      <v-btn
        to="/registerClient"
        text
      >
        <span class="mr-2">Registrar cliente</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn
        to="/login"
        text
      >
        <span class="mr-2">Iniciar sesion / salir</span>
      </v-btn>
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
        class="pa-5"
      >
        <v-text-field
          v-model="client_identification"
          label="Cédula"
        ></v-text-field>
        <v-text-field
          v-model="delivery_address"
          label="Dirección de entrega"
        ></v-text-field>
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
// import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data: () => ({
    cart_dialog:false,


    client_identification:'',
    delivery_address:''
  }),
  computed:{
    products(){
      return this.$store.state.current_order.products;
    },
    order_product_count(){
      return this.$store.state.current_order.products.length;
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
      console.log("WORKING");
    },
    remove_product_from_order(i){
      this.$store.commit("removeProductFromOrder",i);
    }
  }
};
</script>
