import expect from 'expect.js';
import { object } from './31';
import { compose } from './16';

describe('immutable object', () => {
  const robots = compose(
    object.set('C3PO', 'Star Wars'),
    object.set('HAL9000', '2001: a space odessay')
  )(object.empty);
  it('get', () => {
    expect(object.get('HAL9000')(robots)).to.eql('2001: a space odessay');
    expect(object.get('C3PO')(robots)).to.eql('Star Wars');
    expect(object.get('鉄腕アトム')(robots)).to.eql(null);
  });
});
