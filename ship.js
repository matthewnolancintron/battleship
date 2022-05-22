function ship(){
    return {
        length:length,//number
        hasBeenHit:hasBeenHit,//bool
        hasBeenSunk:hasBeenSunk,//bool
        hit:(postionNumber)=>{},//mark position as hit,
        isSunk:()=>{}//calculate based on ship length, and if all of it's positions are hit
    }
}

/**
 * note for testing:
 * REMEMBER you only have to test your object’s
 * public interface.
 * 
 * Only methods or properties that
 * are used outside of your ‘ship’ object
 * need unit tests.
 */