class Index extends React.Component {
    // componentDidMount() {
    //     this.getTableGrid()
    // }
    // getTableGrid(event) {
    //     axios.get(`./api/products`)
    //         .then(function (response) {
    //             // handle success
    //             console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //         .finally(function () {
    //             // always executed
    //         });
  
    // }
    render() {
        return (
            <Welcome/>
        )
    }
}


ReactDOM.render(
    <Index/>,
    document.getElementById('root')
);