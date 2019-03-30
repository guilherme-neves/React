import React, { Component } from 'react'
import Grid from '../layout/grid'
import Row from '../layout/row'
import ValueBox from '../widget/valueBox'

export default ({ credit, debt }) => {
   //  console.log(credit)
  //   console.log(debt)
   return  (<Grid cols='12'>
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <ValueBox cols='12 4' color='green' icon='bank'
                    value={`R$ ${credit}`} text='Total de Creditos' />
                <ValueBox cols='12 4' color='red' icon='credit-card'
                    value={`R$ ${debt}`} text='Total de Debitos' />
                <ValueBox cols='12 4' color='blue' icon='money'
                    value={`R$ ${credit - debt}`} text='valor Consolidado' />
            </Row>
        </fieldset>
    </Grid>)
}
