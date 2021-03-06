import Box2D from 'box2dweb';

import Player from 'physics/player';
import Maze from 'physics/maze';

const B2World = Box2D.Dynamics.b2World;
const B2Vec2 = Box2D.Common.Math.b2Vec2;

class World {
    constructor(maze) {
        this.createItemFixture = this.createItemFixture.bind(this);
        this.createItemInWorld = this.createItemInWorld.bind(this);

        this.world = new B2World(new B2Vec2(0, 0), true);
        this.maze = new Maze(maze, this.createItemFixture);
        this.player = new Player(this.createItemInWorld);
    }

    createItemInWorld(defenition) {
        return this.world.CreateBody(defenition);
    }

    createItemFixture(definition, fixture) {
        return this.createItemInWorld(definition).CreateFixture(fixture);
    }

    update(keyAxis) {
        this.player.setVelocity();
        this.player.applyBoost(keyAxis);

        // Take a time step.
        this.world.Step(1 / 60, 8, 3);
    }

    getPlayerShape() {
        return this.player.getShape();
    }
}

export default World;
