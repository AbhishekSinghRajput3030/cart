import React from 'react';
import Cart from "./Cart";
import Navbar from "./Navbar";
import * as firebase from "firebase";

class App extends React.Component {
  constructor() {
    super(); //wnevr we extend a class we should first call its contructor
    this.state = {
        products: [ ],
        loading : true
      }
      this.db= firebase.firestore();
    }

    componentDidMount() {
      this.db
        .collection("products")
        //.where('price','>',50000)
        //.where('title','==','ipad')
        .orderBy('price','desc')
        .onSnapshot((snapshot) => {
          const products=snapshot.docs.map((doc) => {
            const data= doc.data();
             data['id']=doc.id
            return data;
          });
          this.setState({
            products,
            loading: false
          })
      })
    }

    handleIncreaseQuantity = (product) => {
        console.log('Heyy please inc the qty of ', product);
        const { products } = this.state;
        const index = products.indexOf(product);
    
        // products[index].qty += 1;
    
        // this.setState({
        // products
        //});
        const docRef = this.db.collection('products').doc(products[index].id); //this will give refrence of particular project

        docRef
        .update({
          qty:products[index].qty +1
        })
        .then(() =>{
          console.log('Updated successfully')
        })
        .catch((error) => {
           console.log('Error:',error);
        })
      }

      handleDecreaseQuantity = (product) => {
        console.log('Heyy please inc the qty of ', product);
        const { products } = this.state;
        const index = products.indexOf(product);
        if (products[index].qty === 0) {
          return;
        }   
        // products[index].qty -= 1;
        // this.setState({
        //   products
        // })
        const docRef = this.db.collection('products').doc(products[index].id); //this will give refrence of particular project
        docRef
        .update({
          qty:products[index].qty -1
        })
        .then(() =>{
          console.log('Updated successfully')
        })
        .catch((error) => {
           console.log('Error:',error);
        })
      }
      handleDeleteProduct = (id) => {
        const { products } = this.state;
    
        // const items = products.filter((item) => item.id !== id); // [{}]
    
        // this.setState({
        //   products: items
        const docRef = this.db.collection('products').doc(id);
        docRef
        .delete()
        .then(() =>{
          console.log('Updated successfully')
        })
        .catch((error) => {
           console.log('Error:',error);
        })
      }

      getCartCount = () => {
        const { products } = this.state;
    
        let count = 0;
    
        products.forEach((product) => {
          count += product.qty;
        })
    
        return count;
      }
      getCartTotal = () => {
        const { products } = this.state;
    
        let cartTotal = 0;
    
        products.map((product) => {
          if (product.qty > 0) {
          cartTotal = cartTotal + product.qty * product.price
        }
        return '';
        });
        return cartTotal;
      }

      addProduct= () => {
        this.db
        .collection('products')
        .add({
          img:'',
          price:900,
          qty:3,
          title:'washing machine'
        })
        .then((docRef)=>{
          console.log('Product has been added',docRef)
        })
        .catch((error)=>{
          console.log('Error:',error);
        })
      }

  render () {
    const {products , loading} =this.state;
  return (
    <div className="App">
      <Navbar count={this.getCartCount()} />
      <button onClick={this.addProduct} style={{padding:20,fontSize:20}} >ADD A PRODUCT</button>
      <Cart
      products = {products}
        onIncreaseQuantity={this.handleIncreaseQuantity}
        onDecreaseQuantity={this.handleDecreaseQuantity}
        onDeleteProduct={this.handleDeleteProduct}
      />
      {loading && <h1>Loading Products...</h1>}
      <div style={{padding: 10 , fontSize:20}}> TOTAL: {this.getCartTotal()}</div>
      
    </div>
  );
  }
}

export default App;
 