import MenuList from 'mesh/menu/menu-list';

class Menu {
    constructor(scene) {
        const itemList = [
            ['Start Game', 40, 0.25, [-0.5, 1.25, 1]],
            ['Load Game', 40, 0.25, [-0.5, 0.5, 1]],
        ];
        new MenuList(itemList, scene);
    }
}

export default Menu;
