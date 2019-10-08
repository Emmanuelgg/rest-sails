import React, {Component} from "react"
import DataTable from 'react-data-table-component';

import ENV from "../config.js"
import axios from 'axios'
import showNotification from './Notification'


class ProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
            productList: [],
            columns: [
              {
                name: 'Nombre',
                selector: 'name',
                sortable: true,
              },
              {
                name: 'Categoria',
                selector: 'category',
                sortable: true
              },
              {
                name: 'Precio',
                selector: 'price',
                sortable: true
              },
              {
                name: 'Acciones',
                selector: 'actions',
                ignoreRowClick: true,
                cell: row => {
                    return(
                        <div>
                            <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.handleEventClickEditProduct.bind(this,row.actions)}>
                                <span className="icon icon-pencil"></span>
                            </button>
                            <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.handleEventClickDeleteProduct.bind(this,row.actions)}>
                                <span className="icon icon-trash"></span>
                            </button>
                        </div>
                    )
                }

              },
            ]
        }
        this.getProductList = this.getProductList.bind(this)
    }

    componentDidMount() {

    }

    handleEventClickEditProduct(value) {
        let self = this 
        axios.get(`${ENV.API_ROUTE}product/${value}`)
        .then(function (res) {
            // handle success
            res = res.data
            if (!res.success)
                return res.message
            self.props.callbackFromParent(res.data);
            $('#modalProductList').modal('hide')
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        })
    }
    handleEventClickDeleteProduct(value) {
        let self = this 
        axios.delete(`${ENV.API_ROUTE}product/delete/${value}`)
        .then(function (res) {
            // handle success
            res = res.data
            
            if (!res.success) {
                showNotification("Error", "El producto no se ha podido eliminar", "danger")
                return res.message
            }
            showNotification("Exito", "El producto se ha eliminado correctamente")
            self.getProductList()
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        })
    }

    getProductList(event) {
        //event.preventDefault()
        let self = this 
        axios.get(`${ENV.API_ROUTE}products/`)
        .then(function (res) {
            // handle success
            res = res.data
            if (!res.success)
                return res.message

            let productList = res.data.map(item => {
                return({
                    name:item.name,
                    category:item.category.name,
                    price:item.price,
                    actions: item.id
                })
            })
            self.setState({productList: productList})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        })
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary py-1 px-3" data-toggle="modal" data-target="#modalProductList" onClick={this.getProductList}>Listar</button>
                <div className="modal fade" id="modalProductList" tabIndex="-1" role="dialog" aria-labelledby="modalProductList" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Productos</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <DataTable
                                                    noHeader={true}
                                                    pagination={true}
                                                    columns={this.state.columns}
                                                    data={this.state.productList}
                                                    className="table"
                                                    noDataComponent="No se encontraron productos"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            <div className="modal-footer">
                                <button type="button" className="ml-2 btn btn-white btn-outline-white" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductList;
