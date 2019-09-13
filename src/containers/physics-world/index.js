import Box2D from 'box2dweb';
import Player from '../player';
import Maze from '../maze';

const B2World = Box2D.Dynamics.b2World;
const B2Vec2 = Box2D.Common.Math.b2Vec2;

let lv = null;

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
        return this.world.CreateBody(definition).CreateFixture(fixture);
    }

    update(keyAxis) {
        // eslint-disable-next-line
        lv = this.player.GetLinearVelocity();
        lv.Multiply(0.95);
        this.player.SetLinearVelocity(lv);

        // Apply user-directed force.
        const force = new B2Vec2(
            keyAxis[0] * this.player.GetMass() * 0.25,
            keyAxis[1] * this.player.GetMass() * 0.25
        );
        this.player.ApplyImpulse(force, this.player.GetPosition());

        // Take a time step.
        this.world.Step(1 / 60, 8, 3);
    }

    getPlayer() {
        return this.player;
    }
}

export default PhysicsWorld;
