import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'
import axios from 'axios'
import Form from './todoForm'
import List from './todoLista'


const url = 'http://localhost:3003/api/todo'

export default class todo extends Component {

    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSeach = this.handleSeach.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsPendig = this.handleMarkAsPendig.bind(this)
        this.state = { description: '', list: [] }
        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        //  console.log(search) 
        axios.get(`${url}?sort=-createdAt${search}`)
            .then(resp =>
                //  console.log("Lista :" + resp.data)
                this.setState({ ...this.state, description, list: resp.data })
            )
    }

    handleClear() {
        this.refresh()
    }

    handleSeach() {
        this.refresh(this.state.description)
    }

    handleAdd() {
        const description = this.state.description
        axios.post(url, { description })
            .then(resp =>
                this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${url}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleMarkAsDone(todo) {
        axios.put(`${url}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPendig(todo) {
        axios.put(`${url}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description))
    }


    render() {
        return (
            <div>
                <PageHeader name='Todo' small='Tarefa' />
                <Form handleAdd={this.handleAdd} description={this.state.description}
                    handleChange={this.handleChange}
                    handleSeach={this.handleSeach}
                    handleClear={this.handleClear} />
                <List list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPendig={this.handleMarkAsPendig}
                />
            </div>
        )
    }
}