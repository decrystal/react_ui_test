import React ,{createContext, useState} from "react";
import classNames from "classnames";
import {MenuItemProps} from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
export interface Menuprops {
  defaultIndex?: number;
  className?: string;
  mode: MenuMode;
  style?: React.CSSProperties;
  //onselect?: (selectedIndex: number) => void
}

interface ImenuProps {
  index?: number;
  onselect?: (selectedIndex: number) => void;
  mode?:MenuMode;
  isExpand?: boolean
  handleIsExpand?: (isOpen: boolean) => void;
}
export const MenuContext = createContext<ImenuProps>({index:0})

const Menu : React.FC<Menuprops> = (props) => {
  const {className, mode, style, children, defaultIndex } = props;
  const classes = classNames('menu', className, {
    'menuVertical': mode === 'vertical',
    'menuHorizontal': mode === 'horizontal'
  })
  //打印出一个数组，元素是一个Reactelement
  //自动给child添加index
  const [ currentActive, setActive ] = useState(defaultIndex);
  const [ isExpand, setIsExpand ] = useState(false);
  const handleClick = (index: number) => {
    setActive(index);
    //console.log(`index, ${index}`)
  }
  const handleIsExpand =(isOpen: boolean)=> {
    setIsExpand(isOpen)
  }
  const newchildren = () => {
    return React.Children.map(children, (child, index)=> {
      //console.log("menu", index, child)
      
      //将child声明为react元素（即jsx语法）
      const newChild = child as React.FunctionComponentElement<MenuItemProps>
      //console.log("child.tagName",newChild)
      const { name } = newChild.type;
      //这个过滤了非MenuItem组件的标签
      if(name === 'MenuItem'||'SubMenu'){
        return React.cloneElement(newChild, {index: index})
      }else{
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  //console.log("children", children)
  const passContext:ImenuProps = {
    index: currentActive? currentActive: 0,
    onselect: handleClick,
    mode: mode,
    isExpand: isExpand,
    handleIsExpand: handleIsExpand
  }
  return (
    //因为一般测试是通过渲染后获取元素节点，所以要事先获取节点，通过添加一个data-testid="test-menu来解决
    //测试里用getByTestId来获取
    //data-testid="test-menu是测试时为了让
    <ul style={style} className={classes} data-testid="test-menu">
      <MenuContext.Provider value={passContext}>
        {newchildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal"
}
export default Menu;