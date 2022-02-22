import { FC } from "react";
import Menu, {Menuprops} from "./Menu";
import MenuItem, {MenuItemProps} from "./MenuItem";
import SubMenu, {SubMenuPops} from "./SubMenu";

export type IMenuComponent = FC<Menuprops> & {
  Item:FC<MenuItemProps>,
  SubMenu: FC<SubMenuPops>
}
const MenuComponent = Menu as IMenuComponent
MenuComponent.Item = MenuItem
MenuComponent.SubMenu = SubMenu

export default MenuComponent;