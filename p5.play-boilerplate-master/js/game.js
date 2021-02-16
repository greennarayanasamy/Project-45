class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form();
        form.display();
      }
  
      robot1 = createSprite(displayWidth-1600,displayHeight-400);
      robot1.addImage("robot1",robot1Image);
      robot2 = createSprite(displayWidth-350,displayHeight-400);
      robot2.addImage("robot2",robot2Image);
      robots = [robot1,robot2];
    }
  
    play(){
      form.hide();
    
      
      Player.getPlayerInfo();
        image(backgroundImage, 0, 0, displayWidth,displayHeight );
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank+=1;
        Player.updateCarsAtEnd(player.rank);
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
  
    }
  }
  