import Box2D from 'box2dweb';
import Body from '../body';

const B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
const b2Body = Box2D.Dynamics.b2Body;
const B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

class Maze {
    constructor(maze, mazeBuilder) {
        this.mazeDefinition = Body.createDefinition(1, 1);
        this.mazeDefinition.type = b2Body.b2_staticBody;

        this.fixture = this.createFixture();
        this.createMazeBody(maze, mazeBuilder);
    }

    createMazeBody(maze, mazeBuilder) {
        for (let i = 0; i < maze.dimension; i++) {
            for (let j = 0; j < maze.dimension; j++) {
                if (maze[i][j]) {
                    this.mazeDefinition.position.x = i;
                    this.mazeDefinition.position.y = j;
                    // eslint-disable-next-line
                    mazeBuilder(this.mazeDefinition, this.fixture);
                }
            }
        }
    }

    createFixture() {
        let fixDef = null;
        fixDef = new B2FixtureDef();
        fixDef.shape = new B2PolygonShape();
        // eslint-disable-next-line
        fixDef.shape.SetAsBox(0.5, 0.5);

        return fixDef;
    }
}

export default Maze;
