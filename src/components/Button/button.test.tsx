import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

//@testing-library/react, 用的是decribe将所用的测试用例包裹，注意这里的it就是之前的test；

describe('test button compont', ()=> {
  it('should render the correct default button', ()=> {
    const wrapper = render(<Button>shabi gugu</Button>)
    const element = wrapper.getByText(/gugu/i) as HTMLButtonElement
    //console.log("element-->>", element)
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.className).toEqual('btn btn-default')//通过
    expect(element.disabled).toBeFalsy()//通过
  })

  it('should render the correct props', ()=> {
    const testProps: ButtonProps = {
      btnType: 'primary',
      size: 'lg',
      className: 'klass'
    }
    // const wrapper = render(<Button size={ButtonSize.Large} btnType={ButtonType.Primary} >diandian gugu</Button>)
    const wrapper = render(<Button {...testProps} >diandian gugu</Button>)
    const element = wrapper.getByText(/gugu/i) as HTMLButtonElement
    //console.log("element-->>", element)
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-primary btn-lg')
  })

  const disabledProps: ButtonProps = {
    disabled: true,
    //用于监控click的需用这个jest.fn()
    onClick: jest.fn(),
  }
  it('test components click', ()=>{
    const wrapper = render(<Button {...disabledProps}>hanhan gugu</Button>)
    const element = wrapper.getByText(/gugu/i) as HTMLButtonElement
    expect(element.tagName).toEqual('BUTTON')
    fireEvent.click(element)
    //expect(disabledProps.onClick).toHaveBeenCalled()
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})