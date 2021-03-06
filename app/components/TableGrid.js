import React, {Component} from "react"
import ENV from "../config.js"
import ManageFoodOrder from "./ManageFoodOrder"
import axios from 'axios'

class TableGrid extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableGrid: []
        }
        this.getTableGrid = this.getTableGrid.bind(this)
        this.triggerGetManageFoodOrder = this.triggerGetManageFoodOrder.bind(this)
    }

    componentDidMount() {
        this.getTableGrid(this)
    }

    triggerGetManageFoodOrder(idDiningTable){
        this.refs.productGrid.getProductGrid()
        this.refs.productGrid.getDiningTableOrder(idDiningTable)
    }

    getTableGrid = (event) => {
        let self = this
        axios.get(`${ENV.API_ROUTE}diningTables`)
        .then(function (res) {
            // handle success
            res = res.data
            if (!res.success)
                return res.message
                let tableGrid = res.data.map(item => {
                    return(
                        <div key={"table_"+item.id} className="col-6 col-md-4 text-center container-grid" onClick={self.triggerGetManageFoodOrder.bind(self, item.id)}>
                            <img src={ENV.IMAGE_ROUTE+"table.svg"} className="img-table"/>
                            <br/>
                            <span className="span-table-number"><b>{item.number}</b></span>
                            <br/>
                            <span className="span-table-name"><b>({item.name})</b></span>
                        </div>
                    )
                })
                self.setState({tableGrid: tableGrid})
                
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    render() {
        return (
            <React.Fragment>
                <br/>
                <div className="container">
                    <div className="row">
                        {this.state.tableGrid}
                    </div>
                </div>
                <ManageFoodOrder ref="productGrid" />
            </React.Fragment>
        )
    }
}

export default TableGrid;
