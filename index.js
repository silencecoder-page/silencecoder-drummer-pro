$(document).ready(function(){
    medaiStorageUpdate();
    let generatePadsAndBoxes = new GeneratePadsAndBoxes();
    let dragCatch = new DragEvents();
    let playItEngine = new playEngine();
    generatePadsAndBoxes.createContainsers();
    dragCatch.dragCatch();
    $('#play-btn').click(function(){
        playItEngine.play()
    });
    $('#stop-btn').click(function(){
        playItEngine.resetloop()
    });
    $('.beat-container').click(function(e){
        let target = this.textContent.replaceAll(' ', '');
        $('.beat-select').hide();
        $(`#${target}`).show();
    })
    $('#menu-toggle-open').click(function(){
        $('#track-menu').css('display','inline-flex')
    });
    $('#menu-toggle-close').click(function(){
        $('#track-menu').hide()
    });
    // ADD ROW
    const addRow = ()=> {

        let addroll = () =>{
            let currentRow = $('.track')[0].children
            let trackDiv = document.createElement('div')
            trackDiv.classList.add('track')
            for (let numDiv of currentRow) {
                let inerDiv = document.createElement('div')
                inerDiv.classList.add('track-box')
                trackDiv.appendChild(inerDiv)
            }
            $('.track-contanier')[0].appendChild(trackDiv)
            dragCatch.dragCatch()
        }
        let columns = $('.track-contanier')[0]
        console.log(columns.children.length)
        if (columns.children.length === 5){}else{addroll()} 
        
    };$('#add-row').click(addRow)
    // ADD Column
    const addColumn = () => {
        let columns = $('.track')
        for (let currentColumn of columns) {
            let inerDiv = document.createElement('div')
            inerDiv.classList.add('track-box')
            currentColumn.appendChild(inerDiv)
            currentColumn.appendChild(inerDiv)
            currentColumn.appendChild(inerDiv)
            currentColumn.appendChild(inerDiv)
        }
        dragCatch.dragCatch()
        return true
    };$('#add-column').click(addColumn)
    // remove roll
    const removeRoll = () => { 
        let columns = $('.track-contanier')[0]
        console.log(columns.children.length)
        if (columns.children.length < 2){}else{
            columns.removeChild(columns.lastChild)   
        }  
    };$('#del-roll').click(removeRoll)

    // remove column
    // const removecolumn=()=> {  
    //     let columns = $('.track')
    //     console.log(columns[0].lastChild)
    //     columns[0].removeChild(columns[0].lastChild)
    //     return true
    // }
    // $('#del-roll').click(removeRoll)

    // Rates
    $('#decrease-rate').click(function(){
        let rate = $('#rate').text()
        $('#rate')[0].textContent = Number(rate) - 1 
        playItEngine.playTimeout = Number(rate) - 1 
        console.log(Number(rate) -1)
    })

    $('#increase-rate').click(function(){
        let rate = $('#rate').text()
        $('#rate')[0].textContent = Number(rate) + 1
        playItEngine.playTimeout = Number(rate) + 1  
        console.log(Number(rate) -1)
    })
});