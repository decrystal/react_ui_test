import React,{ FC, ButtonHTMLAttributes, AnchorHTMLAttributes }from "react";
import classNames from 'classnames'

export type ButtonSize = 'lg'|'sm'
//  {
//   Large = 'lg',
//   Small = 'sm'
// }

export type ButtonType = 'primary'|'default'|'danger'|'link'
// {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link',
// }

//定义接口
interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
//因为有些组合类型，所以导致一个问题，可能某些属性在button上是必须的
//但是在a链接上却不能填写，所以要将
//所以用ts的Partial属性将他们设着为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props)=> {
  const {
    btnType,
    disabled,
    size,
    children,
    className,
    href,
    ...restProps
  } = props;
  //从react导入ButtonHTMLAttributes, AnchorHTMLAttributes获取a、button标签剩余属性
  //通过...restProps来获取
  const classes = classNames('btn',{
    //下面btnType,size,只是充当布尔值的作用，true or false控制类名有没有
    //样式名（类名）[`btn-${btnType}`]来添加，而且
    //模版字符串为防止报错，用[]圈起来
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]:size,
    //这个disabled是针对a的，button直接传值
    'disabled': (btnType === "link")&&disabled
  })
  //console.log("className--->>", className, classes)
  if(btnType === 'link'&&href){
    //console.log("href=======",href)
    return(
      <a href={href}
      {...restProps}
      className={classes}>{children}</a>
    )
  }else{
    
    return (
      <button 
        
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button