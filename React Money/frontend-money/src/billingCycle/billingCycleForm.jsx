import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import labelAndInput from '../common/form/labelAndInput'
import { init } from './billingCycleAction'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    calcularSummary(credit) {
        const sum = (t, v) =>{ 
            console.log(t)
            console.log(v)    
            return t + v
        }
        
          console.log('Creditos:', this.props.credits.map(c => c.value))
        //   console.log('Debitos:', this.props.debts)
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebt: this.props.debts.map(b => +b.value || 0).reduce(sum)
        }
    }

    render() {

        const { handleSubmit, readOnly, credits, debts } = this.props
        const { sumOfCredits, sumOfDebt } = this.calcularSummary(credits)
        return (
            <form role='form' onSubmit={handleSubmit} >
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='month' component={labelAndInput} readOnly={readOnly}
                        label='Mes' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={labelAndInput} readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o Ano' />

                    <Summary credit={sumOfCredits} debt={sumOfDebt} />

                    <ItemList cols='12 6' list={credits} field='credits'
                        legend='Creditos' readOnly={readOnly} />
                    <ItemList cols='12 6' list={debts} field='debts'
                        legend='Debitos' readOnly={readOnly} showStatus={true} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`} >{this.props.submitLabel}</button>
                    <button type='submit' className='btn btn-default'
                        onClick={this.props.init} >Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')
const mapStateToMap = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToMap, mapDispatchToProps)(BillingCycleForm)