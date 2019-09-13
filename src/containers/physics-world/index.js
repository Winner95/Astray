import Box2D from 'box2dweb';
import Player from '../player';
import Maze from '../maze';

const B2World = Box2D.Dynamics.b2World;
const B2Vec2 = Box2D.Common.Math.b2Vec2;

class PhysicsWorld {
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

export default PhysicsWorld;
