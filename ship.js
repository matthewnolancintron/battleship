function ship(/**unsure of inputs?*/){
    return {
        //should there be a postion prop?
        length:length,//number
        hasBeenHit:hasBeenHit,//bool
        hasBeenSunk:hasBeenSunk,//bool
        hit:(postionNumber)=>{},//mark position as hit,
        isSunk:()=>{}//calculate based on ship length, and if all of it's positions are hit
    }
}
module.exports = ship;