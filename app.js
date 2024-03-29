
document.addEventListener('DOMContentLoaded',() =>{
    const gridDisplay= document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resulDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0
    var click = new Audio("Audio/mixkit-video-game-mystery-alert-234.wav");
    var winSound = new Audio("Audio/mixkit-clapping-male-crowd-439.wav");
    var loseSound = new Audio("Audio/mixkit-lose-life-falling-2029.wav");
    //<script src = "Audio/mixkit-video-game-mystery-alert-234.wav"></script>
   // Console.log(click.src)
    //create a playing board
    function createBoard(){
        for(let i=0; i<width*width; i++){
        
            const square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
    
    }
    createBoard()
   
    //generate a number randomly
    function generate(){
        randNumber = Math.floor(Math.random()*squares.length)
        if(squares[randNumber].innerHTML ==0){
            squares[randNumber].innerHTML =2
            
            checkForGameOver()
            
        }
        else generate()
    }
    //swipe right
    function moveRight(){
        for(let i=0; i<16; i++){
            if(i%4 ===0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num=>num)
                let missing = 4-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
    //moveRight()

    //swipe left
    function moveLeft(){
        for(let i=0; i<16; i++){
            if(i%4 ===0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num=>num)
                let missing = 4-filteredRow.length
                let zeros = Array(missing).fill(0)
                //let newRow = zeros.concat(filteredRow) I was wrong here that's why left arrow was not working properly
                let newRow = filteredRow.concat(zeros)
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    //swipe down
    function moveDown(){
        for(let i=0; i<4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+ width].innerHTML
            let totalThree = squares[i+ (width*2)].innerHTML
            let totalFour = squares[i+ (width*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
            let filteredColumn = column.filter(num => num)
            let missing = 4-filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn= zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+ width].innerHTML = newColumn[1]
            squares[i+ (width*2)].innerHTML = newColumn[2]
            squares[i+ (width*3)].innerHTML = newColumn[3]

        }
    }


    //swipe up
    function moveUp(){
        for(let i=0; i<4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+ width].innerHTML
            let totalThree = squares[i+ (width*2)].innerHTML
            let totalFour = squares[i+ (width*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
            let filteredColumn = column.filter(num => num)
            let missing = 4-filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn= filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+ width].innerHTML = newColumn[1]
            squares[i+ (width*2)].innerHTML = newColumn[2]
            squares[i+ (width*3)].innerHTML = newColumn[3]

        }
    }
    function combineRow(){
        for(let i=0; i<15; i++){
            if(i%4!==3 && squares[i].innerHTML===squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score +=combinedTotal
                scoreDisplay.innerHTML = score
           }
        }
        checkForWin()
    }
    function combineColumn(){
        for(let i=0; i<12; i++){
            if(squares[i].innerHTML===squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score +=combinedTotal
                scoreDisplay.innerHTML = score


            }
        }
        checkForWin()
    }

    //assign keycodes
    function control(e){
        if(e.keyCode ===39){
            keyRight()
        }
        else if(e.keyCode ===37){
            keyLeft()
        }
        else if(e.keyCode ===38){
            keyUp()
        }
        else if(e.keyCode ===40){
            keyDown()
        }
    }
    //for keybutton press for arrow keys
    document.addEventListener('keyup',control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
        click.play();
    }
    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
        click.play();
    }
    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
        click.play();
    }
    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
        click.play();
    }
    //check for the number 2048 in the squares to win
    function checkForWin(){
        for(let i = 0; i<squares.length; i++){
            if(squares[i].innerHTML == 2048){
                winSound.play();
                resulDisplay.innerHTML = "<b>You won!</b>"
                resulDisplay.style.fontSize = "40px"
                document.removeEventListener('keyup',control)
               
            }
        }
    }
    //check if there are no zeros on the board to lose
    function checkForGameOver(){
        let zeros = 0
        for(let i=0; i<squares.length; i++){
            if(squares[i].innerHTML ==0){
                zeros++
            }
        }
        if(zeros ===0){
            loseSound.play();
            resulDisplay.innerHTML = "<b>You lose</b>"
            resulDisplay.style.fontSize = "40px"
            document.removeEventListener('keyup',control)
            
        }
    }
})