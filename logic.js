

document.addEventListener('DOMContentLoaded', function () {
    let currentPosition;
    let gameStarted = false;
    let numCount = 98;
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
            if(numCount < 100){
                isSameCellClicked(cell);
            }else if(numCount === 100){
                cell.style.backgroundColor = "#76c893"
                isTheLastCell()
            }
            
        }
    }


    function isSameCellClicked(clickedCell) {
        // Compare the innerText of the clicked cell with the last clicked cell
        console.log("Clicked Cell:", clickedCell);
        console.log("Last Clicked Cell:", lastClickedCell);

        
            if (cellIsEmpty(clickedCell)) {
                // If the cell is empty, display the number
                numCount += 1; // Increment numCount
                clickedCell.style.backgroundColor = "#ffcc00"
                clickedCell.innerText = numCount;
            } else {
                // If the cell has a number, clear it
               
                clearCell(clickedCell);
                console.log("Same cell clicked");
                return true;
            }

        

         // Clear the last clicked cell
        lastClickedCell = clickedCell; // Update the last clicked cell
        console.log("Different cell clicked");
        return false;
    }

    function isTheLastCell(cell) {
        console.log("entering isTheLastCell");
    
        
            // Apply styling to the specific cell with the number 100
            cell.style.backgroundColor = "#76c893";
            cell.innerText = numCount
    
            // Hide all elements with the class "grid-container"
            var gridContainers = document.getElementsByClassName("grid-container");
            for (var i = 0; i < gridContainers.length; i++) {
                gridContainers[i].style.display = "none";
            }
    
            // Delay the display of the congratulations message by 3 seconds
            setTimeout(function () {
                // Show the first element with the class "congratulations"
                var congratulationsElements = document.getElementsByClassName("congratulations");
                if (congratulationsElements.length > 0) {
                    congratulationsElements[0].style.display = "flex";
                }
            }, 3000); // 3000 milliseconds = 3 seconds
        
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
        } else {
            console.log("Cannot clear this cell");
        }
        console.log("And this is the lastClickedCell after clearCell " + lastClickedCell);
    }
    

    function startGame(startingCell) {
        console.log("Game begins!")
        currentPosition = parseInt(startingCell.textContent, 10);
        startingCell.innerText = numCount;
        startingCell.classList.add('start-cell');
        lastClickedCell = startingCell; // Store the cell reference
        gameStarted = true; // Set gameStarted to true
        
    }
});
