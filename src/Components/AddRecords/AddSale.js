import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import { DBfirebase } from '../../Database/DBfirebase'
import { signUp } from '../../Store/Actions/Auth'
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import * as firebase from 'firebase';
import { Search } from '../../Store/Actions/Auth'

const style = {
    padding: '10px',
    textAlign: 'center'
};

class AddSaleOrder extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            stores: [],
            productName: '',
            description: '',
            qty: 0,
            unitPrice: 0,
            storeName: ''

        }
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.GetAllProducts = this.GetAllProducts.bind(this);
         this.GetAllStores = this.GetAllStores.bind(this);
        //  this.handleUpdateInput = this.handleUpdateInput.bind(this);
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        e.preventDefault();
        let multipath = {};
        let productDetails = {
            productName: this.state.productName,
            storeName: this.state.storeName,
          //    productName: this.refs.productName,
            description: this.state.description,
            qty: this.state.qty,
            unitPrice: this.state.unitPrice
        }
        console.log(productDetails)
          DBfirebase.ref.child('/AddedSales').push(productDetails);
          browserHistory.push('/home/view-sales')
          
    }

    GetAllProducts(e) {
        let _self = this;
        // e.preventDefault()
        let refProducts = firebase.database().ref().child('/Stock/');
        _self.products = [];

        //  console.log(this.refs.selectedCity.value)
        //  ref.orderByChild('city').equalTo(this.refs.selectedCity.value).once('value', function (snapshot) {
        refProducts.once('value', function (snapshot) {



            snapshot.forEach(childSnapshot => {

                _self.products.push(childSnapshot.val())
                console.log("products", _self.products)

            })
            _self.props.serachProducts(_self.products)
            _self.setState({
                products: _self.props.storeReducer.products

            })
        });
    }

        GetAllStores(e) {
        let _self = this;
        // e.preventDefault()
        let refStores = firebase.database().ref().child('/AddedStores/');
        _self.stores = [];

       //   console.log(this.refs.selectedCity.value)
      //    ref.orderByChild('city').equalTo(this.refs.selectedCity.value).once('value', function (snapshot) {
        refStores.once('value', function (snapshot) {



            snapshot.forEach(childSnapshot => {

                _self.stores.push(childSnapshot.val())
                console.log("Stores", _self.stores)

            })
            _self.props.serachProducts(_self.stores)
            _self.setState({
                stores: _self.props.storeReducer.products

            })
        });
    }

    componentWillMount() {
        this.GetAllProducts();
        this.GetAllStores();
    }

    handleUpdateInput = (e) => {
        this.setState({

            [e.target.name]: e.target.value

        });
    };


    render() {
        return (
            <div ><center>
                <AddProductForm signUpState={this.state} _inputHandler={this.inputHandler} _submit={this.submit} />
            </center>
            </div>
        );
    }
}

// AddSaleOrder.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }


class AddProductForm extends React.Component {


    render() {
      //  console.log("this.props.signUpState.products", this.props.signUpState.products)
        const datasource = []

        {
            this.props.signUpState.products.map((v, i) => {
                return (
                    datasource.push(v.productName)
                )
            })
        }

        console.log("datasource", datasource)

        return (
            <div >

                <h1>Add Sale Order</h1>
                <form onSubmit={this.props._submit} >


                    <select style={style}
                        required
                       // autoFocus
                        name="productName"
                        ref="productName"
                        onChange={this.props._inputHandler}
                        value={this.props.signUpState.productName}
                    >
                    <option value="Select Product" > Select Product  </option>
                        {
                            this.props.signUpState.products.map((v, i) => {
                                return (
                                    
                                    <option value={v.productName} key={i}> {v.productName} </option>
                                )
                            })}
                    </select>
                    <br />
                    <br />
                      <br />

 <select style={style}
                        required
                        
                        name="storeName"
                        ref="storeName"
                        defaultValue="Select Store"
                        onChange={this.props._inputHandler}
                        value={this.props.signUpState.storeName}
                    >
                    <option value="Select Store" > Select Store  </option>
                        {
                            this.props.signUpState.stores.map((s, i) => {
                                return (
                                    <option value={s.storeName} key={i}> {s.storeName} </option>
                                )
                            })}
                    </select>
                    <br />
                    <br />


                    {/*<AutoComplete
                        hintText="Product Name"
                        // filter={AutoComplete.noFilter}
                        // filter={AutoComplete.fuzzyFilter}
                        filter={AutoComplete.caseInsensitiveFilter}
                        openOnFocus={true}
                        name="productName"
                        ref="productName"
                        value={this.props.signUpState.productName}
                        dataSource={datasource}
                        floatingLabelText="Product Name"
                        hintText="Product Name"
                        onChange={this.props._inputHandler}
                    // onUpdateInput={this.props.handleUpdateInput}
                    //  onUpdateInput={this.props._inputHandler}
                    //   dataSourceConfig={dataSourceConfig}

                    />
                    <br /><br />*/}

                  

                    <TextField
                        type="number"
                        hintText="qty"
                        name="qty"
                        value={this.props.signUpState.qty}
                        floatingLabelText="qty"
                        onChange={this.props._inputHandler}
                    /><br />
                    <br />

                        <TextField
                        type="number"
                        hintText="unitPrice"
                        name="unitPrice"
                        value={this.props.signUpState.unitPrice}
                        floatingLabelText="unitPrice"
                        onChange={this.props._inputHandler}
                    /><br />
                    <br />

                      <TextField
                        type="text"
                        hintText="description"
                        name="description"
                        value={this.props.signUpState.description}
                        floatingLabelText="description"
                        onChange={this.props._inputHandler}
                    /><br /><br />

                    <RaisedButton type="submit" label="Add Product" primary={false} secondary={true} /> <br /><br />
                </form>

            </div>
        )
    }
}

AddProductForm.PropTypes = {
    _inputHandler: React.PropTypes.func.isRequired,
    _submit: React.PropTypes.func.isRequired

}

const mapStateToProps = (state) => {
    console.log(state.ProductReducer)
    return {
        storeReducer: state.ProductReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        serachProducts: (data) => {
            console.log(data)
            dispatch(Search(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSaleOrder);