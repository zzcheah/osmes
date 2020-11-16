import { Divider } from '@material-ui/core'
import React, {Component} from 'react'
import ProductList from './ProductList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class ViewProduct extends Component {
    render(){

        const {products} = this.props;
        return(
            <div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <h2>View Products</h2>
                </div>
                <div>
                    <ProductList products = {products} />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    console.log(state);
    return {
        products: state.firestore.ordered.products
    }
}

export default compose( 
    connect (mapStateToProps),
    firestoreConnect([
        {collection: 'products' }
    ])
)(ViewProduct)