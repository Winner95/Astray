import Box2D from 'box2dweb';

import Body from 'physics/body';
import { ballRadius } from '../../mesh/ball/ball';

const B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
const B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
const B2Vec2 = Box2D.Common.Math.b2Vec2;

class Player {
    constructor(createHandler) {
        this.playerDefinition = Body.createDefinition(1, 1);
        this.playerShape = createHandler(this.playerDefinition);

        this.createFixture();

        // return this.playerShape;
    }

    createFixture() {
        // eslint-disable-next-line
        let fixDef = new B2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.0;
        fixDef.restitution = 0.25;
        fixDef.shape = new B2CircleShape(ballRadius);
        // eslint-disable-next-line
        this.playerShape.CreateFixture(fixDef);
    }

    setVelocity() {
        // eslint-disable-next-line
        let lv = this.playerShape.GetLinearVelocity();

        lv.Multiply(0.95);

        this.playerShape.SetLinearVelocity(lv);
    }

    applyBoost(keyAxis) {
        // Apply user-directed force.
        const force = new B2Vec2(
            keyAxis[0] * this.playerShape.GetMass() * 0.25,
            keyAxis[1] * this.playerShape.GetMass() * 0.25
        );
        this.playerShape.ApplyImpulse(force, this.playerShape.GetPosition());
    }

    getShape() {
        return this.playerShape;
    }
}

export default Player;
