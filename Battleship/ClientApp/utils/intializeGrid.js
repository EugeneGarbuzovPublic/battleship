import { EMPTY } from '../domain/squareStates';

export default function() {
    return new Array(10).fill(new Array(10).fill(EMPTY));
}
