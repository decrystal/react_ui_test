import React from "react";
import { render, RenderResult, fireEvent} from '@testing-library/react'
import Menu, {Menuprops} from "./Menu";
import MenuItem from "./MenuItem";


const testProps: Menuprops = {
  defaultIndex: 1,
  mode:'vertical' 
}

const generateMenu = (props: Menuprops) => {
  return (
    <Menu {...props}>
        <MenuItem>
            clickItem0
        </MenuItem >
        <MenuItem>
          active
        </MenuItem>  
        <MenuItem>
            clickItem2
        </MenuItem>
        <MenuItem disabled> 
          disabled
        </MenuItem>
        <MenuItem>
            clickItem4
        </MenuItem>
      </Menu>  
  )
}
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu', ()=> {
  beforeEach(()=> {
    wrapper = render(generateMenu(testProps))
    
    menuElement= wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    //console.log(activeElement)
  })
  it('should render correct Menu and MenuItem based on default props', ()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu menuVertical')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('MenuItem is-active')
    expect(disabledElement).toHaveClass('MenuItem is-disabled')
  })

  it('test onclick', ()=> {
    const firstItem = wrapper.getByText('clickItem0')
    fireEvent.click(firstItem)
    expect(firstItem).toHaveClass('MenuItem is-active')
    expect(activeElement).toHaveClass('MenuItem')
  })

})