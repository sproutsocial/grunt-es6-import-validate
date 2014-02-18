
import { missing } from 'foo';
import { bar } from 'bar';
import Resolver from 'resolver';

var bim = {
	property: true
};

export var baz = bim;

export { bim };

export default { bim: bim, baz: baz };