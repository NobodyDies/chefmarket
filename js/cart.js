$(function() {
  var Cart = React.createClass({
    getInitialState: function () {
      return {
        items: [],
        total: 0
      }
    },
    addItem: function (item) {
      for(var i = 0; i < this.state.items.length; i++) {
        if(item.name == this.state.items[i].name && item.price == this.state.items[i].price) {
          return false;
        }
      }
      this.state.items.push(item);
      this.setState({
        items: this.state.items,
        total: this.state.total + item.price
      });

      return true;
    },
    deleteItem: function (item) {
      for(var i = 0; i < this.state.items.length; i++) {
        if(item.name == this.state.items[i].name && item.price == this.state.items[i].price) {
          this.state.items.splice(i, 1);
          this.setState({
            items: this.state.items,
            total: this.state.total - item.price
          });
          item.el.html('Добавить в корзину')
            .toggleClass('open-cart')
            .toggleClass('add-to-cart');
          return true;
        }
      }
      return false;
    },
    render: function() {
      return (
        <div>
          <div>Товаров: { this.state.items.length } на сумму { this.state.total } рублей.</div>
          <a className='open-cart waves-effect waves-light btn-flat' href="#cart">
            Перейти в корзину
          </a>
          <CartModal items={this.state.items} total={this.state.total} deleteItem={this.deleteItem}/>
        </div>
      )
    },
    componentDidMount: function() {
      $('.cart .open-cart').leanModal();
      $('.item').delegate('.open-cart', 'click', function () {
        $('#cart').openModal();
      });
      var cart = this;
      $('.item').delegate('.add-to-cart', 'click', function (e) {
        var $this = $(this);
        var item = {
          name: $this.siblings('h1').html(),
          price: +$this.attr('data-price'),
          el: $this
        };
        if(cart.addItem(item)) {
          $this.html('Перейти в корзину')
            .toggleClass('open-cart')
            .toggleClass('add-to-cart');
        };
        return;
      })
    }
  });

  var CartModal = React.createClass({
    propTypes: {
      items:      React.PropTypes.array,
      total:      React.PropTypes.number,
      deleteItem: React.PropTypes.func
    },
    render: function() {
      var displayItem = function (item, i) {
        return (
          <tr key={ Math.random() * 100 }>
            <td>{ item.name }</td>
            <td>{ item.price }</td>
            <td>
              <a href="#!" className="delete btn" onClick={ this.props.deleteItem.bind(null, item) }>
                <i className="material-icons">delete</i>
              </a>
            </td>
          </tr>
        )
      };
      return (
        <div id="cart" className="modal modal-cart">
          <div className="modal-content">
            <h4>Корзина</h4>
            <table>
              <thead>
                <tr>
                  <td>Название</td>
                  <td>Стоимость</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                { this.props.items.map(displayItem, this) }
              </tbody>
            </table>
            <p>Товаров: { this.props.items.length } на сумму { this.props.total } рублей.</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Заказать</a>
          </div>
        </div>
      )
    }
  });
  ReactDOM.render(<Cart />, document.getElementsByClassName('cart')[0]);
});
