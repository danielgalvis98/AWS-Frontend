import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        current_order:{
            products:[]
        },
        is_user_logged:false,
    },
    actions:{},
    mutations:{
        addProductToCurrentOrder(state,product){
            state.current_order.products.push(product);
        },
        removeProductFromOrder(state,index){
            state.current_order.products.splice(index,1);
        }
    }
})