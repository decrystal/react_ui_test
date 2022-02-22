import React from "react";
export interface SubMenuPops {
    index?: number;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}
declare const SubMenu: React.FC<SubMenuPops>;
export default SubMenu;
