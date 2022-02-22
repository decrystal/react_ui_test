import { FC } from "react";
import { Menuprops } from "./Menu";
import { MenuItemProps } from "./MenuItem";
import { SubMenuPops } from "./SubMenu";
export declare type IMenuComponent = FC<Menuprops> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuPops>;
};
declare const MenuComponent: IMenuComponent;
export default MenuComponent;
