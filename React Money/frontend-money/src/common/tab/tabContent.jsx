import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import If from '../../operator/if'


class TabContent extends Component {
    render() {
        const selected = this.props.tab.selected === this.props.id
        const visible = this.props.tab.visible[this.props.id]
     //   console.log(visible)
        return (
            <If test={visible}>
                <div id={this.props.id}
                    className={`tab-pane ${selected ? 'active' : ''}`}  >
                    {this.props.children}
                </div>
            </If>
        )
    }
}


const mapStateAToProps = state => ({ tab: state.tab })
export default connect(mapStateAToProps)(TabContent)