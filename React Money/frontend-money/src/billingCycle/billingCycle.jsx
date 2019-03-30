import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsContent from '../common/tab/tabsContent'
import TabsHeader from '../common/tab/tabsHeader'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectTab, showTabs } from '../common/tab/tabActions'
import BillingCycleList from './billingCycleList'
import BillingCycleForm from './billingCycleForm'
import {init,create, update, deleta} from  './billingCycleAction'


class BillingCyCles extends Component {

    componentWillMount() {
        this.props.init()
       // this.props.selectTab('tabList')
     //   this.props.showTabs('tabList', 'tabCreate')
    }


    render() {
        return (
            <div>
                <ContentHeader title='BillingCyCles' small='Cadastro' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <BillingCycleList />
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <BillingCycleForm onSubmit={this.props.create} 
                                   submitClass='primary' submitLabel='Incluir'  />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                 <BillingCycleForm onSubmit={this.props.update} 
                                   submitClass='info' submitLabel='Alterar'     />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <BillingCycleForm onSubmit={this.props.deleta} readOnly={true} 
                                   submitClass='danger' submitLabel='Excluir'   /> 
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({ init,selectTab, showTabs, create, update, deleta }, dispatch)
export default connect(null, mapDispatchToProps)(BillingCyCles)
