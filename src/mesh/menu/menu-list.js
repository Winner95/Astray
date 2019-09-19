import MenuItem from 'mesh/menu/menu-item';

class MenuList {
    constructor(menuItemList, scene) {
        menuItemList.map(item => {
            const menuItem = new MenuItem(...item);
            scene.add(menuItem);
        });
    }
}

export default MenuList;
