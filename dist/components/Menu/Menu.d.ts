import React from "react";
declare type MenuMode = 'horizontal' | 'vertical';
export interface Menuprops {
    defaultIndex?: number;
    className?: string;
    mode: MenuMode;
    style?: React.CSSProperties;
}
interface ImenuProps {
    index?: number;
    onselect?: (selectedIndex: number) => void;
    mode?: MenuMode;
    isExpand?: boolean;
    handleIsExpand?: (isOpen: boolean) => void;
}
export declare const MenuContext: React.Context<ImenuProps>;
declare const Menu: React.FC<Menuprops>;
export default Menu;
