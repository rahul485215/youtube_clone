export const API_KEY = 'AIzaSyBwoZmjJeq3peLjmZgUwbwIT-3yHMfaUSs';

export const valuConverter = (value) =>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }

    else if(value>=1000){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }
}