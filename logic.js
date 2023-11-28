document.addEventListener('DOMContentLoaded', function () {
    let currentPosition;
    let gameStarted = false;
    let numCount = 1;
    let lastClickedCell; // Variable to store the last clicked cell

    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('click', function () {
            handleCellClick(cell);
        });
    });


    function handleCellClick(cell) {
        if (!gameStarted) {
            startGame(cell);

        } else {
            if (lastClickedCell) {
                resetHighlight()
                isSameCellClicked(cell);
                
            } else {
                console.error("lastClickedCell is null");
            }
        }
    }
    

    function isSameCellClicked(clickedCell) {
        console.log("Clicked Cell:", clickedCell);
        console.log("Last Clicked Cell:", lastClickedCell);
    
        if (cellIsEmpty(clickedCell) && lastClickedCell) {
            if (isValidMove(clickedCell)) {
                // If the cell is empty and the move is valid, display the number
                numCount += 1; // Increment numCount
                highlightCells(clickedCell)

                clickedCell.style.backgroundColor = "#ffcc00";
                clickedCell.innerText = numCount;

            } else {
                // If the move is not valid, clear the cell
                clearCell(clickedCell);
                console.log("Not a valid move");
                return false;
            }
    
            // Clear the last clicked cell
            lastClickedCell = clickedCell; // Update the last clicked cell
            console.log("Different cell clicked");
            return false;
        } else {
            console.log("Cell is not empty or lastClickedCell is null");
            return true; // Return true to prevent further execution
        }
    }
    

    


    function cellIsEmpty(cell) {
        return cell.innerText === '';
    }



    function clearCell(cell) {
        // Reset the cell to its original state only if it's the last clicked cell
        console.log("This is the clearCell");
    
        if (lastClickedCell === cell) {
            numCount -= 1
            cell.innerText = '';
            cell.style.backgroundColor = 'white';
            lastClickedCell = null; // Reset the last clicked cell
            console.log("Cleared the cell");
        }
        console.log("And this is the lastClickedCell after clearCell " + lastClickedCell);
    }

    function isValidMove(clickedCell) {
        console.log("Entering isValidMove");
        
        // Get the index of the clicked cell
        const clickedIndex = Array.from(clickedCell.parentElement.children).indexOf(clickedCell);
        
        // Get the index of the last clicked cell
        const lastClickedIndex = Array.from(lastClickedCell.parentElement.children).indexOf(lastClickedCell);
        
        // Calculate the row and column indices based on the assumed grid layout (10 cells in a row)
        const clickedRow = Math.floor(clickedIndex / 10);
        const clickedCol = clickedIndex % 10;
        
        const lastClickedRow = Math.floor(lastClickedIndex / 10);
        const lastClickedCol = lastClickedIndex % 10;
        
        // Calculate the absolute difference in rows and columns
        const rowDifference = Math.abs(clickedRow - lastClickedRow);
        const colDifference = Math.abs(clickedCol - lastClickedCol);
        
        console.log("Move is valid:", rowDifference, colDifference, "Clicked Cell Inner Text:", clickedCell.innerText);
        
        if(clickedCell.innerText === ""){
            if ((rowDifference === 0 && colDifference === 3) ||  // 2 horizontally
                (rowDifference === 3 && colDifference === 0) ||  // 2 vertically
                (rowDifference === 2 && colDifference === 2)) {   // 1 diagonally
                return true;
            } else {
                alert("Not a Valid Move! You must play in 2 cells difference horizontally or vertically or 1 cell diagonally!");
                return false;
            }
        }
        return false;  // If the cell is not empty, return false
    }
    function highlightCells(clickedCell) {
        const clickedIndex = Array.from(clickedCell.parentElement.children).indexOf(clickedCell);
        const clickedRow = Math.floor(clickedIndex / 10);
        const clickedCol = clickedIndex % 10;
    
        // Highlight cells that are 3 cells horizontally or vertically and 2 cells diagonally
        document.querySelectorAll('.grid-cell').forEach(cell => {
            const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
            const cellRow = Math.floor(cellIndex / 10);
            const cellCol = cellIndex % 10;
    
            const rowDifference = Math.abs(clickedRow - cellRow);
            const colDifference = Math.abs(clickedCol - cellCol);
            
            if (!lastClickedCell && (
                (rowDifference === 3 && colDifference === 0) ||
                (rowDifference === 0 && colDifference === 3) ||
                (rowDifference === 2 && colDifference === 2)
            )) {
                // Highlight the clicked cell
                clickedCell.style.backgroundColor = '#ffcc00'; // Set your desired highlight color
            }
        });
    }
    
    function resetHighlight() {
        // Clear the highlight only from cells that were previously highlighted
        document.querySelectorAll('.grid-cell').forEach(cell => {
        if (cell.style.backgroundColor === 'rgb(252, 239, 180)') {
                cell.style.backgroundColor = 'white';
            }
           
        });
    }
    
    function startGame(startingCell) {
        console.log("Game begins!")
        currentPosition = parseInt(startingCell.textContent, 10);
        startingCell.innerText = numCount;
        startingCell.classList.add('start-cell');
        startingCell.style.backgroundColor = "#ffcc00"
        lastClickedCell = startingCell; // Store the cell reference
        gameStarted = true; // Set gameStarted to true
        
    }
  
    document.getElementById('restart-btn').addEventListener('click', restartGame);

    function restartGame() {
        // Reset game variables
        currentPosition = null;
        gameStarted = false;
        numCount = 1;
        lastClickedCell = null;
    
        // Reset cell elements
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.innerText = '';
            cell.style.backgroundColor = 'white';
            cell.classList.remove('start-cell');
        });
    
        // Display the grid-container
        var gridContainers = document.getElementsByClassName('grid-container');
        for (var i = 0; i < gridContainers.length; i++) {
            gridContainers[i].style.display = 'grid';
        }
    
        // Hide the congratulations message
        var congratulationsElements = document.getElementsByClassName('congratulations');
        for (var i = 0; i < congratulationsElements.length; i++) {
            congratulationsElements[i].style.display = 'none';
        }
    }
});
