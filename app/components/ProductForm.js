import React, {Component} from "react"
import ENV from "../config.js"
import ProductList from "./ProductList"
import * as FileUpload from "../utils/FileUpload"
import axios from 'axios'
import showNotification from './Notification'

class ProductForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: null,
            fileUrl: `${ENV.IMAGE_ROUTE}not-found.png`,
            fileName: "Sin imagen",
            units: [],
            categories: [],
            code: "",
            name: "",
            idCategory: "",
            quantityByPackage: "",
            idUnit: "",
            price: "",
            idProduct: ""
        }
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.handleChangeCode = this.handleChangeCode.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeQuantityByPackage = this.handleChangeQuantityByPackage.bind(this)
        this.handleChangeIdUnit = this.handleChangeIdUnit.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
        this.handleChangeIdProduct = this.handleChangeIdProduct.bind(this)
        this.handlePostRequest = this.handlePostRequest.bind(this)
        this.getProductToEdit = this.getProductToEdit.bind(this)
        this.resetProductForm = this.resetProductForm.bind(this)
    }

    componentDidMount() {
        this.getUnitsAndCategories()
    }

    getProductToEdit(product) {
        this.resetProductForm()
        let fileUrl = `${ENV.IMAGE_ROUTE}not-found.png`
        let fileName = "Sin imagen"
        if (product.imageUrl != "" && product.imageUrl != null && product.imageUrl != "Sin imagen") {
            fileUrl = ENV.API_FILES_ROUTE+product.imageUrl
            fileName = product.imageUrl
        }
        this.setState({
            idProduct: product.id,
            code:product.code,
            name: product.name,
            idCategory: product.category.id,
            quantityByPackage: product.quantityPackage,
            idUnit: product.unit.id,
            price: product.price,
            file: null,
            fileUrl: fileUrl,
            fileName: fileName
        })
        showNotification("Exito", "Producto obtenido correctamente para editar")
    }

    resetProductForm() {
        this.setState({
            idProduct: "",
            code:"",
            name: "",
            quantityByPackage: "",
            idCategory: "0",
            idUnit: "0",
            price: "",
            file: null,
            fileUrl: `${ENV.IMAGE_ROUTE}not-found.png`,
            fileName: "Sin imagen"
        })
    }

    getUnitsAndCategories() {
        let self = this
        axios.get(`${ENV.API_ROUTE}units`)
        .then(function (res) {
            // handle success
            res = res.data
            if (!res.success)
                return res.message

            let units = res.data.map(item => {
                return(
                    <option key={"unit_"+item.id} value={item.id}>{item.name}</option>
                )
            })
            self.setState({units:units})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

        axios.get(`${ENV.API_ROUTE}categories`)
        .then(function (res) {
            // handle success
            res = res.data
            if (!res.success)
                return res.message

            let categories = res.data.map(item => {
                return(
                    <option key={"category_"+item.id} value={item.id}>{item.name}</option>
                )
            })
            self.setState({categories:categories})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        })
    }

    handleChangeFile(event) {
        event.preventDefault()
        this.setState({
            fileUrl: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
            fileName: event.target.files[0].name
        })
    }

    handleChangeCode(event) { this.setState({ code: event.target.value }) }
    handleChangeName(event) { this.setState({ name: event.target.value }) }
    handleChangeCategory(event) { this.setState({ idCategory: event.target.value }) }
    handleChangeQuantityByPackage(event) { this.setState({ quantityByPackage: event.target.value }) }
    handleChangeIdUnit(event) { this.setState({ idUnit: event.target.value }) }
    handleChangePrice(event) { this.setState({ price: event.target.value }) }
    handleChangeIdProduct(event) { this.setState({ idProduct: event.target.value }) }



    handlePostRequest(event) {
        event.preventDefault()
        let self = this
        axios.post(`${ENV.API_ROUTE}product/add`,
            {
                id: self.state.idProduct,
                code: self.state.code,
                name: self.state.name, 
                category: self.state.idCategory,
                quantityPackage: self.state.quantityByPackage,
                unit: self.state.idUnit,
                price: self.state.price,
                imageUrl: self.state.fileName,
                status: 1
            }
        )
        .then(function (res) {
            res = res.data
            if (!res.success) {
                showNotification("Error", "El producto no se ha podido agregar revisa por favor el formulario", "danger")
                return res.message
            }
            showNotification("Exito", "Producto agregado correctamente")
            // let file = this.state.file
            // let fileName = this.state.fileName
            // if (file != null)
            //     FileUpload.uploadDocumentRequest(file)
            self.resetProductForm()
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
            <div className="container">
                <div className="col-12 text-right">
                    <button type="button" className="btn btn-primary py-1 px-3 btn-action" onClick={this.resetProductForm}>Reiniciar</button>
                    <ProductList callbackFromParent={this.getProductToEdit}/>
                </div>
                <form method="post" name="produtForm">
                    <div className="row">
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="code" className="form-control" placeholder="Clave" value={this.state.code} onChange={this.handleChangeCode} />
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="name" className="form-control" placeholder="Descripción" value={this.state.name} onChange={this.handleChangeName} />
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <select name="category" className="form-control" value={this.state.idCategory} onChange={this.handleChangeCategory}>
                                <option value="0">Seleccione una opción...</option>
                                {this.state.categories}
                            </select>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="quantity_by_package" className="form-control" placeholder="Cantidad por empaque" value={this.state.quantityByPackage} onChange={this.handleChangeQuantityByPackage}/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <select name="id_unit" className="form-control" value={this.state.idUnit} onChange={this.handleChangeIdUnit}>
                                <option value="0">Seleccione una opción...</option>
                                {this.state.units}
                            </select>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="price" className="form-control" placeholder="Precio" value={this.state.price} onChange={this.handleChangePrice}/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-12 text-center">
                            <img style={{ width: "200px", height:"200px" }} src={this.state.fileUrl} className="rounded" alt="product images"/>
                        </div>
                    </div>
                    <br/>
                    <div className="row justify-content-md-center">
                        <div className="col-sd-12 col-md-6 text-center">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">{this.state.fileName} </label>
                                <input type="file" className="form-control-file btn btn-primary py-3 px-5" name="product_image" onChange={this.handleChangeFile}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <input type="hidden" name="id_product" className="form-control" value={this.state.idProduct} onChange={this.handleChangeIdProduct}/>
                    <div className="row">
                        <div className="col-12 text-center">
                            <button type="button" className="btn btn-primary py-3 px-5" onClick={this.handlePostRequest}>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductForm
