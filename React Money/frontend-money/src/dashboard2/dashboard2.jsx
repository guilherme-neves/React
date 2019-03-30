import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Row from '../layout/row'
import ValueBox from '../widget/valueBox'
import axios from 'axios'

const BASE_URL  = 'http://localhost:3003/api'

class Dashboard2 extends Component {
  
   constructor(props){
       super(props)
       this.state = {credit:0, debt:0}
   }
   
   componentWillMount(){
       console.log('willMount')
    axios.get(`${BASE_URL}/billingCycles/summary`)  
    .then(resp => this.setState(resp.data))

   }
   
   
    render() {
        
        const {credit,debt}= this.state
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='green' icon='bank'
                            value={`R$ ${credit}`} text='Total de Creditos' />
                        <ValueBox cols='12 4' color='red' icon='credit-card'
                            value={`R$ ${debt}`} text='Total de Debito' />
                        <ValueBox cols='12 4' color='blue' icon='money'
                            value={`R$ ${credit - debt}`} text='Valor Consolidado' />
                    </Row>
                </Content>
            </div>
        )
    }
}

export default Dashboard2