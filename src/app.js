//  Search for FIXTHIS string to find corrections and optimizations that need to be made further down the line.

//////////
//
//  Front End Components
//
//////////

class ShoppingCart extends React.Component {
  //  The master component that represents the entire webpage.
  //    Contains the Header, Store, and Cart components, as well as the checkout button.
  //  FIXTHIS:  Inventory icons are stored online rather than in a local directory.
  constructor(props) {
    super (props)
    this.addItem = this.addItem.bind(this)
    this.updateCart = this.updateCart.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.checkOut = this.checkOut.bind(this)
    this.state = {
      inventory : {
        /*  Store's inventory. The inventory itself is an object.
              Keys are integers representing the item's ID#
              Values are objects representing the individual item to be sold in the store.
            Each individual store item has the following key-value pairs:
              name:  A string representing the name of the item.
              price:  Numerical cost of the item.
              stock:  Integer representing how many of this item are in stock.
              url:  url of the image for this object.
            FIXTHIS:  Images should be stored in a local directory rather than on imgur.
        */ 
       // Dummy data for testing/demonstration purposes.
        1 : { name : "flubber", price : 200, stock: 8, url: "https://i.imgur.com/TV76x8g.png" },
        2 : { name : "one_ring", price : 500, stock: 1, url: "https://i.imgur.com/hqtv9q8.png" },
        3 : { name : "plumbus", price : 30, stock: 8000, url: "https://i.imgur.com/Kqy41pY.png" },
        4 : { name : "portal_gun", price : 499, stock: 4, url: "https://i.imgur.com/6zW18SO.png" },
        5 : { name : "sock_monkey", price : 10, stock: 20, url: "https://i.imgur.com/3dY9aqG.png" },
        6 : { name : "sonic_screwdriver", price : 300, stock: 14, url: "https://i.imgur.com/9OiKtsX.png" }
      },
      cart : [ 
        /*  Shopping cart.  Individual shopping cart items are objects.
              These include the ID# of the item to be purchased, and quantity.
              DESIGN DECISION:  The cart was designed to be an array rather than an object.
                While an object would be faster to search through with key-value pairs, an array keeps things in a set order.
                Keeping things in order is important, as new cart items would be added to the end when the cart updates.
                This prevents items from being put into a different order each time it updates.
                Thus, efficiency was sacrificed for presentability.
              FIXTHIS:  Objects are inefficient to use for shopping cart purposes.
                Consider instead a tuple.  But functions that depend on the cart will need to be updated to reflect the change.
                DESIGN DECISION:  Decided to use objects for cart items because key-value pairs are more coder-friendly than indices.
        */
        //  Dummy data for testing/demonstration purposes.
        { itemKey: 1, qty: 2 },
        { itemKey: 2, qty: 1 },
      ],
      //  Message to be displayed when the shopping cart is empty
      //  Shopping cart can be empty if items have been deleted, or if cart has been checked out.
      message : "Your cart is empty."
    }
  }

  addItem(key) {
    /*
      Adds an item to the shopping cart.  Will be passed to the Store component as a prop.
      Is executed when the "Add to Cart" button for a given item is pressed.
      INPUT:  key, which is an integer representing the store item's ID# (the numerical keys in this.state.inventory)
      OUTPUT:  Void.
      EFFECTS:
        *If the item is out of stock, give an error message alert.
        *If the item is already in the cart, give an error message alert.
        *Otherwise, add this item to the cart with a quantity of 1.
    */
    if(this.state.inventory[key].stock < 1) {
      //  Checks to see if this item is in stock
      //  FIXTHIS:  Alerts are annoying.  Consider a new way to pass error messages.
      alert("This item is out of stock!  Sorry!")
      return
    }
    for(let i = 0; i < this.state.cart.length; i++) {
      //  Checks to see if item is already in the cart
      let cartItem = this.state.cart[i]
      if(cartItem.itemKey == key) {
        //  FIXTHIS:  Alerts are annoying.  Consider a new way to pass error messages.
        alert("This item is already in the cart!")
        return
      }
    }
    this.setState( (prevState) => {
      //  Update the shopping cart if prior two checks are passed, adding the desired item set at quantity of 1.
      return {
        cart : prevState.cart.concat( { itemKey: key, qty: 1 } )
      }
    })
  }

  updateCart( event, key ) {
    /*
      Updates the shopping cart.  Will be passed to the Cart component as a prop.
      Is executed when the value for the quantity of items desired is changed.
      INPUT:  
        event (the event object of the input field being updated)
        The event object is used to access the value of the field, which indicates new qty.
        and key, which is the integer representing the store item's ID# (the numerical keys in this.state.inventory)
      OUTPUT:  Void.
      EFFECTS:
        *Checks store to see if it has enough stock to meet the new qty demand for this item.
        *If the supply is insufficient, use an alert as an error message
        *If the supply is sufficient, update the cart
      FIXTHIS:  There is a bug.  If you press "enter" in the input field, the item is deleted from the cart instead
        Would using a custom div with an "onClick" function rather than an html button labeled "delete" fix this?
      FIXTHIS:  Sanitize input to clear edge cases where the input is NOT an integer.
    */
    event.preventDefault();
    const newQty = event.target.value
    for(let i = 0; i < this.state.cart.length; i++) {
      //  Search through the cart for the item you want to update.
      if(this.state.cart[i].itemKey == key) {
        if(this.state.inventory[key].stock < newQty) {
          //  If the desired quantity exceeds the stock, send an error message.
          //  FIXTHIS:  Alerts are annoying.  Consider a new way to pass error messages.
          alert("Sorry!  The store doesn't have enough stock!")
          event.target.value = this.state.cart[i].qty
          return
        }
        this.setState( (prevState) => {
          //  If there is sufficient stock, update the cart with the new quantity.
          let newCart = prevState.cart
          newCart[i].qty = newQty
          return {
            cart: newCart
          }
        })
      }
    }
  }

  deleteItem( event, key ) {
    /*
      Deletes an item from the cart.  Will be passed to the cart component as a prop.
      Executes when the "delete" button for a cart item is clicked.
      INPUT:  event for the delete button click.
        and key, which is the integer representing the store item's ID# (the numerical keys in this.state.inventory)
      OUTPUT:  Void.
      EFFECTS:
        Delete the given item from the cart.
        If the cart is empty, will update the this.state.message to say "Your cart is empty"
    */
    event.preventDefault();
    for(let i=0; i < this.state.cart.length; i++) {
      //  This for loop searches through the shopping cart (this.state.cart) for the item to be deleted, then removes it from the cart array and updates the state. 
      if(this.state.cart[i].itemKey == key) {
        this.setState( (prevState) => {
          let newCart = prevState.cart
          newCart.splice(i, 1)
          return {
            cart: newCart,
            message: "Your cart is empty."
          }
        })
      }
    }
  }

  checkOut(event) {
    /*
      Checks out the cart.
      INPUT:  Event for the "Check out!" button click.
      OUTPUT:  Void.
      EFFECTS:  
        Goes through the shopping cart and removes the quantity purchased for each item from the store's inventory stock.
        Clears the cart.
        Changes message to "Thank you for your purchase!"
    */
    event.preventDefault();
    let newInventory = this.state.inventory;
    for(let i = 0; i < this.state.cart.length; i++) {
      let item = this.state.cart[i];
      let key = item.itemKey;
      let qty = item.qty;
      newInventory[key].stock -= qty;
    }
    this.setState( () => {
      return {
        inventory: newInventory,
        cart : [],
        message : "Thank you for your purchase!"
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Store inventory={this.state.inventory} addItem={this.addItem} />
        <Cart 
          inventory={this.state.inventory} 
          cart={this.state.cart} 
          updateCart={this.updateCart} 
          deleteItem={this.deleteItem}
          message={this.state.message}
        />
        <button onClick={this.checkOut}>Check out!</button>
      </div>
    )
  }
}

///////////

const Header = () => {
  //  Header of the store page.
  return (
    <div>
      <h1 id="title">Welcome to the Store!</h1>
    </div>
  )
}

///////////

class Store extends React.Component {
  //  The store is currently a table of items to be purchased.
  //  FIXTHIS:  Currently all the store's items exist in one row.
  //    Adjust the code so that the store's items can be split into multiple rows.
  constructor(props) {
    super(props)
    this.createStoreItem = this.createStoreItem.bind(this);
    this.keys = Object.keys(props.inventory)
  }
  
  createStoreItem(key) {
    /*
      Helper function for render()
      Creates a table entry for the StoreItem using the item's key to populate the table.
      INPUT:  key, integer representing the store item's ID# (the numerical keys in this.state.inventory of the main ShoppingCart component)
      OUTPUT:  JSX for a table entry in the store.
      EFFECTS:  No secondary effects.
    */
    const item = this.props.inventory[key];
    return (
      <td key={key}>
        <p>{item.name}</p>
        <img src={item.url} />
        <p>{"$"+item.price}</p>
        <p>{item.stock}</p>
        <button onClick={ () => this.props.addItem(key) }>Add to Cart</button>
      </td>
    )
  }

  render() {
    return (
    //  Should display a list of StoreItems
      <div>
        <h2>Store:</h2>
        <table id="storeTable">
          <tbody>
            <tr>
              { this.keys.map(this.createStoreItem) }
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

///////////

class Cart extends React.Component {
  //  The cart is currently a table of individual items to be purchased.
  //  In each row there are the following columns:
  //    Item:  Name of object to be purchased.
  //    Image:  Image of item to be purchased.
  //    #Units:  A text input field displaying quantity of items to be purchased.
  //    Subtotal:  Price of purchase of this quantity of items * cost per unit
  //    Actions:  The delete button to remove this item from the cart.
  constructor(props) {
    super(props)
    this.createCartItem = this.createCartItem.bind(this)
  }

  createCartItem(item) {
    /*
      Helper function for render()
      Creates a table entry for the item to be purchased using the cart object to populate the table.
      INPUT:  a cart item, which is a JS object with two key-value pairs.
        see this.state.cart in ShoppingCart component for more info.    
      OUTPUT:  JSX for a table entry in the store.
      EFFECTS:  No secondary effects.
    */
    const key = item.itemKey;
    const storeItem = this.props.inventory[item.itemKey];
    return (
      <tr key={key}>
        <td>{storeItem.name}</td>
        <td><img src={storeItem.url} /></td>
        <td>
          <input 
            type="text" 
            name="qtyInput" 
            defaultValue={item.qty} 
            onChange={ (event) => this.props.updateCart(event, key) }
          />
        </td>
        <td>{`$${item.qty*storeItem.price}`}</td>
        <td>
          <button onClick={ (event) => this.props.deleteItem(event, key) }>Delete</button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h2>Cart:</h2>
        <form>
          <table id="cartTable">
            <tbody>
              {
                this.props.cart.length > 0 ?
                <tr>
                  <th>Item</th>
                  <th>Image</th>
                  <th>#Units</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
                : this.props.message
              }
              { this.props.cart.map(this.createCartItem) }
            </tbody>
          </table>
        </form>
      </div>
    )
  }

}

///////////

const app = document.getElementById("app")
ReactDOM.render(<ShoppingCart />, app);