<template>
  <v-container>
      <div
            class="d-flex flex-wrap"
        >
            <v-card 
                v-for="(product,i) in allProducts"
                :key="i"
                class="d-flex align-center flex-column ma-2 expandable-card"
                width="190"
                @mouseover="showByIndex = i"
                @mouseleave="showByIndex = null"
                @click="showProductDetails(product)"
                height='100%'
            >

                <v-img
                    :src="product.image"
                    max-height="130"
                    style="width: 100%; height: 100%;"
                    class="mb-n2"
                ></v-img>

                <div v-show="showByIndex!=i" style="height:100%">
                    <v-card-title class="mt-2">
                        {{product.price | currency}}
                    </v-card-title>
                </div>
                <div v-show="showByIndex===i" style="height:100%">
                    <v-card-title
                        class="mb-n6"
                    >
                        {{product.price | currency}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{product.title}}
                    </v-card-subtitle>
                    <v-card-actions class="mt-n5">
                        <v-btn color="primary" @click="add_product_to_order(product)">
                            Agregar al pedido
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </div>
        <v-dialog 
            v-model="product_details_dialog"
        >
            <v-card
                class="pa-5"
            >
                <v-card-title>
                    {{showed_product.title}}
                </v-card-title>
                <v-img
                    :src="showed_product.image"
                ></v-img>
                <v-card-text>
                    {{showed_product.description}}
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="exit_product_dialog">
                        Salir
                    </v-btn>
                    <v-btn color="primary" @click="add_product_to_order(product)">
                        ¡Agregar al pedido!
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
            v-model="snackbar_active"
            :timeout="snackbar_timeout"
        >
            {{snackbar_message}}
        </v-snackbar>
  </v-container>
</template>

<script>
import axios from '../config/axios'

export default {
    data(){
        return {
            allProducts:[],
            showByIndex:null,

            product_details_dialog:false,
            showed_product:'',

            snackbar_message:'',
            snackbar_active:false,
            snackbar_timeout:2000
        }
    },
    methods:{
        add_product_to_order(product){
            this.$store.commit("addProductToCurrentOrder",product);
            this.snackbar_active=true;
            this.snackbar_message="Producto añadido al pedido actual";
        },
        showProductDetails(product){
            console.log(product);
            this.product_details_dialog=true;
            this.showed_product=product;
        },
        exit_product_dialog(){
            this.product_details_dialog=false;
        }
    },
    mounted(){
        axios.get("https://g9io6stxi2.execute-api.us-west-2.amazonaws.com/Produccion/products").then((res)=>{
            this.allProducts=res.data.body;
            console.log(this.allProducts);
        }).catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style scoped>
.expandable-card:hover{
    transform: translate3D(0,-1px,0) scale(1.04);
    cursor: pointer;
}
</style>