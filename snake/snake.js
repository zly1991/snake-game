	var Snake={
		score:0,
		speed:10,
		snake:null,
		maps:null,
		rownum:20,
		colnum:10,
		snakeDIVPosition:null,
		speed:300,
		eggPositon:null,
		direction:'right',
		x:null,
		y:null,
		moveId:null,
		//produce a map
		init:function(){
			//debugger;
			 
			  maps=document.getElementById('grid');
			  this.snakeDIVPosition = [];
			var mapWidth = this.colnum*20 + 'px';// 地图的宽
			var mapHeight = this.rownum*20+ 'px';// 地图的高
			maps.style.width = mapWidth;
			maps.style.height = mapHeight;// 设置地图宽高
			for (var i =0; i <= this.rownum-1; i++) {
					var line=document.createElement('div');
			  	line.className='row';
			  	var rowArray = [];
			  	maps.appendChild(line);
				 for(var j =0; j <= this.colnum-1; j++){
				 	
				 	var cube=document.createElement('div');
				cube.className='col';
				line.appendChild(cube);
				rowArray.push(cube);
				 	 
				 }
				 this.snakeDIVPosition.push(rowArray);
			}
		},
		//produce a snake 
		initSnake:function(){
			this.direction='right';
			this.snake=[];
			for(var i=0;i<3;i++){
				this.snakeDIVPosition[0][i].className='snake';
				this.snake.push(this.snakeDIVPosition[0][i]);
			}
			//初始位置
			this.x=2;
			this.y=0;
		},
		initEgg:function(){
			var x=this.random(0,this.colnum-1);
			var y=this.random(0,this.rownum-1);
			this.eggPositon=this.snakeDIVPosition[y][x];		
			for (var i = this.snake.length - 1; i >= 0; i--) {
				if(this.snake[i]==this.eggPositon){
					this.initEgg();
				}
			}
			this.snakeDIVPosition[y][x].className='egg';
		},
		btnControl:function(){
			
			// 添加键盘事件监听方向键来改变蛇的移动方向
			 
				var changeDir=true;
				    // 先判断是否需要改变方向,true表示需要,false表示不需要
			    if (!changeDir) {
			        return;// return空表示直接结束函数,后续代码不执行
			    }
			    event = event || window.event;
			    // 为了合理处理蛇的移动,需要判断蛇头和蛇身
			    // 假设蛇向右移动,点方向键左,右键都不需要做出响应
			    if (this.direction == 'right' && event.keyCode == 37) {
			        return;// 终止事件执行
			    }
			    if (this.direction == 'left' && event.keyCode == 39) {
			        return;
			    }
			    if (this.direction == 'up' && event.keyCode == 40) {
			        return;
			    }
			    if (this.direction == 'down' && event.keyCode == 38) {
			        return;
			    }
			    // 我们通过keyCode确定蛇要移动的方向
			    switch (event.keyCode) {
			    case 37:
			        this.direction = 'left';// 向左
			        break;
			    case 38:
			        this.direction = 'up';// 向上;
			        break;
				case 39:
			        this.direction = 'right';// 向右
			        break;
			    case 40:
			        this.direction = 'down';// 向下
			        break;
			    }
			    console.log(this.direction);
			    changeDir = false;
			    delayTimer = setTimeout(function() {
			        // 设置是否需要改变方向
			        changeDir = true;
			    }, this.speed);
		 
		},
		snakeMovng:function(){
			switch(this.direction){ 
				case 'up':
				this.y--;
				break;
				case 'down':
				this.y++;
				break;
				case 'right':
				this.x++;
				break;
				case 'left':
				this.x--;
				break;
			}
			if(this.x<0 || this.y<0 || this.x>this.colnum ||this.y>this.rownum){
				 clearInterval(this.moveId);
				 console.log('game over');
				 return;
				
			}
			var newDiv=this.snakeDIVPosition[this.y][this.x];
			//如果碰到自己了
			 for (var i = this.snake.length - 1; i >= 0; i--) {
			 	if(this.snake[i]==newDiv){
			 		console.log('game over');
			 		clearInterval(this.moveId);
			 		return;
			 	}
			 }
			 console.log(this.eggPositon);
			//如果碰到了
			 if(newDiv==this.eggPositon) {
			 	this.score+=10;
			 	this.eggPositon.className='snake';
			 	this.snake.push(newDiv);
			 	this.initEgg();//重新生成一个蛋
			 }else{
				 newDiv.className='snake';
				 this.snake[0].className='col';
				 this.snake.shift();
				 this.snake.push(newDiv);
			 }
			
		},
		random:function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	},
		  moveTimer :function(){
		  	this.moveId=setInterval('Snake.snakeMovng()', this.speed);
		  } ,
		  changeSpeed:function(){
		  	this.speed-=100;//加速
		  	clearInterval(this.moveId);
		  	this.moveId=setInterval('Snake.snakeMovng()', this.speed);
		  }


	//produce a egg
	//a snake is moving
	//button control
	}
	window.onload = function(){
	 Snake.init();
	 Snake.initSnake();
	 Snake.initEgg();
	 Snake.btnControl();//监听移动
	 Snake.moveTimer();//小蛇移动
	 // console.log(Snake.snakeDIVPosition);

	} 
