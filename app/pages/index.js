import React, {Component} from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"
import TableGrid from "../components/TableGrid"
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'



class IndexPage extends Component {
    render() {
       return (
           <div>
               <CustomHead/>
               <NavBar active={"index"}/>
               <TableGrid />
               <ReactNotification/>
           </div>
       )
    }
}


export default IndexPage
