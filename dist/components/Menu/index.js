import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
var MenuComponent = Menu;
MenuComponent.Item = MenuItem;
MenuComponent.SubMenu = SubMenu;
export default MenuComponent;
