import React from 'react'
import MenuItem from './menuItem'
import MenuTreen from './menuTree'

export default props=>(
    <ul className='sidebar-menu'>
         <MenuItem path='#' icon='dashboard' label='Dashboard' />
         <MenuTreen  icon='edit' label='Cadastro'>
             <MenuItem path='#billingCycles'
                  label='Ciclos de Pagamento' icon='usd'/>      
         </MenuTreen>
    </ul>
)