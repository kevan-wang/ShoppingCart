"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  Search for FIXTHIS string to find corrections and optimizations that need to be made further down the line.

//////////
//
//  Front End Components
//
//////////

var ShoppingCart = function (_React$Component) {
  _inherits(ShoppingCart, _React$Component);

  //  The master component that represents the entire webpage.
  //    Contains the Header, Store, and Cart components, as well as the checkout button.
  //  FIXTHIS:  Inventory icons are stored online rather than in a local directory.
  function ShoppingCart(props) {
    _classCallCheck(this, ShoppingCart);

    var _this = _possibleConstructorReturn(this, (ShoppingCart.__proto__ || Object.getPrototypeOf(ShoppingCart)).call(this, props));

    _this.addItem = _this.addItem.bind(_this);
    _this.updateCart = _this.updateCart.bind(_this);
    _this.deleteItem = _this.deleteItem.bind(_this);
    _this.checkOut = _this.checkOut.bind(_this);
    _this.state = {
      inventory: {
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
        1: { name: "flubber", price: 200, stock: 8, url: "https://i.imgur.com/TV76x8g.png" },
        2: { name: "one_ring", price: 500, stock: 1, url: "https://i.imgur.com/hqtv9q8.png" },
        3: { name: "plumbus", price: 30, stock: 8000, url: "https://i.imgur.com/Kqy41pY.png" },
        4: { name: "portal_gun", price: 499, stock: 4, url: "https://i.imgur.com/6zW18SO.png" },
        5: { name: "sock_monkey", price: 10, stock: 20, url: "https://i.imgur.com/3dY9aqG.png" },
        6: { name: "sonic_screwdriver", price: 300, stock: 14, url: "https://i.imgur.com/9OiKtsX.png" }
      },
      cart: [
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
      { itemKey: 1, qty: 2 }, { itemKey: 2, qty: 1 }],
      //  Message to be displayed when the shopping cart is empty
      //  Shopping cart can be empty if items have been deleted, or if cart has been checked out.
      message: "Your cart is empty."
    };
    return _this;
  }

  _createClass(ShoppingCart, [{
    key: "addItem",
    value: function addItem(key) {
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
      if (this.state.inventory[key].stock < 1) {
        //  Checks to see if this item is in stock
        //  FIXTHIS:  Alerts are annoying.  Consider a new way to pass error messages.
        alert("This item is out of stock!  Sorry!");
        return;
      }
      for (var i = 0; i < this.state.cart.length; i++) {
        //  Checks to see if item is already in the cart
        var cartItem = this.state.cart[i];
        if (cartItem.itemKey == key) {
          //  FIXTHIS:  Alerts are annoying.  Consider a new way to pass error messages.
          alert("This item is already in the cart!");
          return;
        }
      }
      this.setState(function (prevState) {
        //  Update the shopping cart if prior two checks are passed, adding the desired item set at quantity of 1.
        return {
          cart: prevState.cart.concat({ itemKey: key, qty: 1 })
        };
      });
    }
  }, {
    key: "updateCart",
    value: function updateCart(event, key) {
      var _this2 = this;

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
      var newQty = event.target.value;

      var _loop = function _loop(i) {
        //  Search through the cart for the item you want to update.
        if (_this2.state.cart[i].itemKey == key) {
          if (_this2.state.inventory[key].stock < newQty) {
            //  If the desired quantity exceeds the stock, send an error message.
            //  FIXTHIS:  Alerts are annoying.  Consider a new way to pass error messages.
            alert("Sorry!  The store doesn't have enough stock!");
            event.target.value = _this2.state.cart[i].qty;
            return {
              v: void 0
            };
          }
          _this2.setState(function (prevState) {
            //  If there is sufficient stock, update the cart with the new quantity.
            var newCart = prevState.cart;
            newCart[i].qty = newQty;
            return {
              cart: newCart
            };
          });
        }
      };

      for (var i = 0; i < this.state.cart.length; i++) {
        var _ret = _loop(i);

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }, {
    key: "deleteItem",
    value: function deleteItem(event, key) {
      var _this3 = this;

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

      var _loop2 = function _loop2(i) {
        //  This for loop searches through the shopping cart (this.state.cart) for the item to be deleted, then removes it from the cart array and updates the state. 
        if (_this3.state.cart[i].itemKey == key) {
          _this3.setState(function (prevState) {
            var newCart = prevState.cart;
            newCart.splice(i, 1);
            return {
              cart: newCart,
              message: "Your cart is empty."
            };
          });
        }
      };

      for (var i = 0; i < this.state.cart.length; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "checkOut",
    value: function checkOut(event) {
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
      var newInventory = this.state.inventory;
      for (var i = 0; i < this.state.cart.length; i++) {
        var item = this.state.cart[i];
        var key = item.itemKey;
        var qty = item.qty;
        newInventory[key].stock -= qty;
      }
      this.setState(function () {
        return {
          inventory: newInventory,
          cart: [],
          message: "Thank you for your purchase!"
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Header, null),
        React.createElement(Store, { inventory: this.state.inventory, addItem: this.addItem }),
        React.createElement(Cart, {
          inventory: this.state.inventory,
          cart: this.state.cart,
          updateCart: this.updateCart,
          deleteItem: this.deleteItem,
          message: this.state.message
        }),
        React.createElement(
          "button",
          { onClick: this.checkOut },
          "Check out!"
        )
      );
    }
  }]);

  return ShoppingCart;
}(React.Component);

///////////

var Header = function Header() {
  //  Header of the store page.
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { id: "title" },
      "Welcome to the Store!"
    )
  );
};

///////////

var Store = function (_React$Component2) {
  _inherits(Store, _React$Component2);

  //  The store is currently a table of items to be purchased.
  //  FIXTHIS:  Currently all the store's items exist in one row.
  //    Adjust the code so that the store's items can be split into multiple rows.
  function Store(props) {
    _classCallCheck(this, Store);

    var _this4 = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, props));

    _this4.createStoreItem = _this4.createStoreItem.bind(_this4);
    _this4.keys = Object.keys(props.inventory);
    return _this4;
  }

  _createClass(Store, [{
    key: "createStoreItem",
    value: function createStoreItem(key) {
      var _this5 = this;

      /*
        Helper function for render()
        Creates a table entry for the StoreItem using the item's key to populate the table.
        INPUT:  key, integer representing the store item's ID# (the numerical keys in this.state.inventory of the main ShoppingCart component)
        OUTPUT:  JSX for a table entry in the store.
        EFFECTS:  No secondary effects.
      */
      var item = this.props.inventory[key];
      return React.createElement(
        "td",
        { key: key },
        React.createElement(
          "p",
          null,
          item.name
        ),
        React.createElement("img", { src: item.url }),
        React.createElement(
          "p",
          null,
          "$" + item.price
        ),
        React.createElement(
          "p",
          null,
          item.stock
        ),
        React.createElement(
          "button",
          { onClick: function onClick() {
              return _this5.props.addItem(key);
            } },
          "Add to Cart"
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        //  Should display a list of StoreItems
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Store:"
          ),
          React.createElement(
            "table",
            { id: "storeTable" },
            React.createElement(
              "tbody",
              null,
              React.createElement(
                "tr",
                null,
                this.keys.map(this.createStoreItem)
              )
            )
          )
        )
      );
    }
  }]);

  return Store;
}(React.Component);

///////////

var Cart = function (_React$Component3) {
  _inherits(Cart, _React$Component3);

  //  The cart is currently a table of individual items to be purchased.
  //  In each row there are the following columns:
  //    Item:  Name of object to be purchased.
  //    Image:  Image of item to be purchased.
  //    #Units:  A text input field displaying quantity of items to be purchased.
  //    Subtotal:  Price of purchase of this quantity of items * cost per unit
  //    Actions:  The delete button to remove this item from the cart.
  function Cart(props) {
    _classCallCheck(this, Cart);

    var _this6 = _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).call(this, props));

    _this6.createCartItem = _this6.createCartItem.bind(_this6);
    return _this6;
  }

  _createClass(Cart, [{
    key: "createCartItem",
    value: function createCartItem(item) {
      var _this7 = this;

      /*
        Helper function for render()
        Creates a table entry for the item to be purchased using the cart object to populate the table.
        INPUT:  a cart item, which is a JS object with two key-value pairs.
          see this.state.cart in ShoppingCart component for more info.    
        OUTPUT:  JSX for a table entry in the store.
        EFFECTS:  No secondary effects.
      */
      var key = item.itemKey;
      var storeItem = this.props.inventory[item.itemKey];
      return React.createElement(
        "tr",
        { key: key },
        React.createElement(
          "td",
          null,
          storeItem.name
        ),
        React.createElement(
          "td",
          null,
          React.createElement("img", { src: storeItem.url })
        ),
        React.createElement(
          "td",
          null,
          React.createElement("input", {
            type: "text",
            name: "qtyInput",
            defaultValue: item.qty,
            onChange: function onChange(event) {
              return _this7.props.updateCart(event, key);
            }
          })
        ),
        React.createElement(
          "td",
          null,
          "$" + item.qty * storeItem.price
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { onClick: function onClick(event) {
                return _this7.props.deleteItem(event, key);
              } },
            "Delete"
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "Cart:"
        ),
        React.createElement(
          "form",
          null,
          React.createElement(
            "table",
            { id: "cartTable" },
            React.createElement(
              "tbody",
              null,
              this.props.cart.length > 0 ? React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  null,
                  "Item"
                ),
                React.createElement(
                  "th",
                  null,
                  "Image"
                ),
                React.createElement(
                  "th",
                  null,
                  "#Units"
                ),
                React.createElement(
                  "th",
                  null,
                  "Subtotal"
                ),
                React.createElement(
                  "th",
                  null,
                  "Actions"
                )
              ) : this.props.message,
              this.props.cart.map(this.createCartItem)
            )
          )
        )
      );
    }
  }]);

  return Cart;
}(React.Component);

///////////

var app = document.getElementById("app");
ReactDOM.render(React.createElement(ShoppingCart, null), app);
