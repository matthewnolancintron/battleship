const ship = require('./ship');

//testing hit method
const Destroyer = ship(3);
test('testing the hit method of a ship',()=>{
    const spy = jest.spyOn(Destroyer,'hit');
    const randomPosInRange = Math.floor(Math.random() * Destroyer.length);
    //hit a random position that is within the range of the ships length
    const isHit = Destroyer.hit(randomPosInRange);
    
    let expectedValue = Object.fromEntries(Array.from(Array(Destroyer.length).keys(), x => [x,'notHit']))
    for (const key in expectedValue) {
      if(key==randomPosInRange){
        expectedValue[key] = 'hit'
      }
    }

    expect(spy).toHaveBeenCalled();
    expect(isHit).toStrictEqual(expectedValue);
    
});

//testing isSunk method
const Carrier = ship(5);
//hit all positions
for (let i = 0; i < 5; i++) {
  Carrier.hit(i);
}

test('sinking a ship test', ()=>{
  //const spy = jest.spyOn(Destroyer,'isSunk');
  const isSunk = Carrier.isSunk();
  //expect(spy).toHaveBeenCalled();
  expect(isSunk).toBe(true);
});