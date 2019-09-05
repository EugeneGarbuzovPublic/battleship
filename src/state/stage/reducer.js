import stages from '../../domain/stages';

export default function (state = stages.ARRANGEMENT, action) {
    switch (action.type) {
        default:
            return state;
    }
}