import Box2D from 'box2dweb';

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;

class Body {
    constructor() {}

    static createDefinition(x, y) {
        let bodyDef = new b2BodyDef();

        bodyDef.type = b2Body.b2_dynamicBody;
        // eslint-disable-next-line
        bodyDef.position.Set(x, y);

        return bodyDef;
    }
}

export default Body;
