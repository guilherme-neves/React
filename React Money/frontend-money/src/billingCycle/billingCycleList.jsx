import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, showUpdate, showDelete } from './billingCycleAction'

class BillingCycleList extends Component {


    componentWillMount() {
        this.props.getList()

    }

    renderRow() {
        const list = this.props.list || []
        return list.map(bc => (
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)} >
                        <i className='fa fa-pencil'></i>
                    </button>

                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)} >
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }


    render() {
       // console.log(this.props.list)
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th>Açoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>

            </div>
        )
    }


}


const mapStateToProps = state => ({ list: state.billingCycle.list })
const mapDispatchToProps = disptach => bindActionCreators({ getList, showUpdate, showDelete }, disptach)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)
