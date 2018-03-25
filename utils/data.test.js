import {getDeckInfos} from "./data";

test('getDeckInfos returns correct titles and sizes', () => {
    expect(getDeckInfos()).toEqual([
        {title: 'React', size: 2},
        {title: 'JavaScript', size: 1}
    ])
});