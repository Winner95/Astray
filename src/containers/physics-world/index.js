import Box2D from 'box2dweb';
import Body from '../body';
import Player from '../player';

const B2World = Box2D.Dynamics.b2World;
const B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
const b2Body = Box2D.Dynamics.b2Body;
const B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
const B2Vec2 = Box2D.Common.Math.b2Vec2;

//
let fixDef = null;
let lv = null;

class PhysicsWorld {
    constructor() {
        this.createItemInWorld = this.createItemInWorld.bind(this);
        this.world = new B2World(new B2Vec2(0, 0), true);

        this.player = new Player(this.createItemInWorld);
    }

    init(maze) {
        // Create the world object.

        // Create the maze.
        const mazeDefinition = Body.createDefinition(1, 1);
        mazeDefinition.type = b2Body.b2_staticBody;

        fixDef = new B2FixtureDef();
        fixDef.shape = new B2PolygonShape();
        // eslint-disable-next-line
        fixDef.shape.SetAsBox(0.5, 0.5);

        for (let i = 0; i < maze.dimension; i++) {
            for (let j = 0; j < maze.dimension; j++) {
                if (maze[i][j]) {
                    mazeDefinition.position.x = i;
                    mazeDefinition.position.y = j;
                    // eslint-disable-next-line
                    this.world.CreateBody(mazeDefinition).CreateFixture(fixDef);
                }
            }
        }
    }

    createItemInWorld(defenition) {
        return this.world.CreateBody(defenition);
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
