var Utility = {
  capitalise: function(str){
    if(str){
      return str.slice(0,1).toUpperCase() + str.slice(1);
    }
    else{
      return str;
    }
  }
}

module.exports = Utility;
