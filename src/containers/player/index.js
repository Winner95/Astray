import Box2D from 'box2dweb';
import Body from '../body';
import { ballRadius } from '../../mesh/ball/ball';

const B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
const B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

class Player {
    constructor(createHandler) {
        this.playerDefinition = Body.createDefinition(1, 1);
        this.playerShape = createHandler(this.playerDefinition);

        this.createFixture();

        return this.playerShape;
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
}

export default Player;
