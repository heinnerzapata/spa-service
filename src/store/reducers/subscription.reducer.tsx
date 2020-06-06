import { SET_SUBSCRIPTION, CLEAN_SUBSCRIPTION } from '../types/subscription.types';

const initState = {
 subscription: {
   subscriptionType: null,
   paymentType: null
 }
}
export default (state = initState, action: any) => {
switch(action.type) {
 case SET_SUBSCRIPTION :
 return {...state, subscription: action.payload}
 case CLEAN_SUBSCRIPTION :
 return {...state, subscription: initState.subscription}
 default :
 return state
 }
}